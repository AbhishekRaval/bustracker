defmodule Bustracker.BusinfoGens do
  use GenServer

  def start_link(busid) do
    GenServer.start_link(__MODULE__, %{"id" => busid, "bus" => %{}, "count" => 0}, name: via_tuple(busid))
  end

  def get_bus(id) do
    # GenServer.call(__MODULE__, {:get_bus, id})
    "https://api-v3.mbta.com/vehicles/"<>id<>"?api_key=250808d6ad5140889bde5176bcb5392c"
    |> HTTPoison.get
    |> handle_response
  end

  def bus_pid(busid) do
    busid
    |> via_tuple()
    |> GenServer.whereis()
  end

  def handle_join(pid) do
    IO.puts("in handle join")
    GenServer.cast(pid, {:increment_count, 1})
  end

  def via_tuple(busid) do
    {:via, Registry, {Bustracker.BusRegistry, busid}}
  end

  def handle_cast({:increment_count, 1}, state) do
    count = state["count"]
    countc = count + 1
    IO.puts("count val:")
    state1 = %{"id" => state["id"], "bus" => state["bus"], "count" => countc}
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
    state1 = %{"id" => state["id"], "bus" => state["bus"], "count" => countc}
    if countc == 0 do
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
    Process.send_after(self(), :work, 2000)
  end

  def handle_info(:work, state) do
    bus = get_bus(state["id"])
    state = %{"id" => state["id"], "bus" => bus, "count" => state["count"]}
    BustrackerWeb.Endpoint.broadcast!("buses:"<>state["id"], "update_bus", state)
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


end
