defmodule Bustracker.BusinfoGens do
  use GenServer

  def start_link(id) do
    GenServer.start_link(__MODULE__, %{"id" => id, "bus" => %{}, "count" => 1}, name: __MODULE__)
  end

  def get_bus(id) do
    # GenServer.call(__MODULE__, {:get_bus, id})
    "https://api-v3.mbta.com/vehicles/"<>id<>"?api_key=250808d6ad5140889bde5176bcb5392c"
    |> HTTPoison.get
    |> handle_response
  end

  def handle_join() do
    IO.puts("in handle join")
    GenServer.cast(__MODULE__, {:increment_count, 1})
  end

  def handle_cast({:increment_count, 1}, state) do
    count = state["count"]
    countc = count + 1
    IO.puts("count val:")
    state1 = %{"id" => state["id"], "bus" => state["bus"], "count" => countc}
    {:noreply, state1}
  end

  def handle_leave() do
    GenServer.cast(__MODULE__, {:decrement_count, 1})
  end

  def handle_cast({:decrement_count, 1}, state) do
    count = state["count"]
    countc = count - 1
    IO.puts("count val:")
    IO.inspect(countc)
    state1 = %{"id" => state["id"], "bus" => state["bus"], "count" => countc}
    {:noreply, state1}
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
