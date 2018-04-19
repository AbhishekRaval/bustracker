defmodule Bustracker.BusinfoGens do
  use GenServer

  def start_link(tripid) do
    all_stops = fetch_all_busstops(tripid)
    GenServer.start_link(__MODULE__, %{"id" => tripid, "bus" => %{},"all_stops" => all_stops, "count" => 0}, name: via_tuple(tripid))
  end

  def get_bus(id) do
    # GenServer.call(__MODULE__, {:get_bus, id})
    "https://api-v3.mbta.com/vehicles/"<>id<>"?api_key=250808d6ad5140889bde5176bcb5392c"
    |> HTTPoison.get
    |> handle_response
  end

  def bus_pid(tripid) do
    tripid
    |> via_tuple()
    |> GenServer.whereis()
  end

  def handle_join(pid) do
    IO.puts("in handle join")
    GenServer.cast(pid, {:increment_count, 1})
  end

  def via_tuple(tripid) do
    {:via, Registry, {Bustracker.BusRegistry, tripid}}
  end

  def handle_cast({:increment_count, 1}, state) do
    count = state["count"]
    countc = count + 1
    IO.puts("count val:")
    state1 = %{"id" => state["id"], "bus" => state["bus"], "count" => countc, "all_stops" => state["all_stops"]}
    {:noreply, state1}
  end

  def handle_leave(pid) do
    GenServer.cast(pid, {:decrement_count, 1})

  end

  def handle_cast({:decrement_count, 1}, state) do
    count = state["count"]
    countc = count - 1
    IO.puts("count val:")
    IO.inspect(countc)
    state1 = %{"id" => state["id"], "bus" => state["bus"], "count" => countc, "all_stops" => state["all_stops"]}
    if countc == 0 do
      Bustracker.BusSupervisor.stop_bustracking(state["id"])
      {:stop, "NO USERS TRACKING THIS BUS", state1}
    else
      {:noreply, state1}
    end
  end

  def init(state) do
    schedule_work()
    {:ok, state}
  end

  defp schedule_work() do
    Process.send_after(self(), :work, 1000 * 10)
  end

  def handle_info(:work, state) do
    ##bus = get_bus(state["id"])
    IO.inspect(state["id"])
    bus = fetch_current_bus_status(state["id"])
    IO.inspect(bus)
    state = %{"id" => state["id"], "bus" => bus, "count" => state["count"], "all_stops" => state["all_stops"]}
    packet = %{"id" => state["id"], "bus" => bus, "all_stops" => state["all_stops"]}
    BustrackerWeb.Endpoint.broadcast!("buses:"<>state["id"], "update_bus", packet)
    schedule_work()
    {:noreply, state}
  end

  # def handle_call({:get_bus, id}, _from, state) do
  #   bus = "https://api-v3.mbta.com/vehicles/"<>state["id"]
  #   |> HTTPoison.get
  #   |> handle_response
  #   {:reply, %{"id" => state["id"], "bus" => bus} , state}
  # end

  def handle_response({:ok, %{status_code: 200, body: body}}) do
    temp = Poison.Parser.parse!(body)
    temp["data"]
  end


  ### Data manipulation Functions
  def fetch_all_busstops(tripid) do
    schedules = "https://api-v3.mbta.com/schedules?filter[trip]="<>tripid<>"&api_key=250808d6ad5140889bde5176bcb5392c"
            |> HTTPoison.get
            |> handle_response
    Enum.map(schedules, fn (x) -> %{"stopid" => x["relationships"]["stop"]["data"]["id"],
                                    "stopname" => fetch_stopname(x["relationships"]["stop"]["data"]["id"]),
                                    "stopseq" => x["attributes"]["stop_sequence"]}end)
  end

  def fetch_stopname(stopid) do
    x = "https://api-v3.mbta.com/stops/"<>stopid<>"?api_key=250808d6ad5140889bde5176bcb5392c"
         |> HTTPoison.get
         |> handle_response

    x["attributes"]["name"]

  end

  def fetch_current_bus_status(tripid) do
    vehicle = "https://api-v3.mbta.com/vehicles?filter[trip]="<>tripid<>"&api_key=250808d6ad5140889bde5176bcb5392c"
        |> HTTPoison.get
        |> handle_response
    Enum.at(Enum.map(vehicle, fn (x) -> x["attributes"] end), 0)
  end


end
