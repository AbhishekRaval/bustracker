defmodule BusinfoGens do
  use GenServer

  def start_link(id) do
    GenServer.start_link(__MODULE__, %{"id" => id, "bus" => %{}, "count" => 0}, name: __MODULE__)
  end

  def get_bus(id) do
    # GenServer.call(__MODULE__, {:get_bus, id})
    "https://api-v3.mbta.com/vehicles/"<>id<>"?api_key=250808d6ad5140889bde5176bcb5392c"
    |> HTTPoison.get
    |> handle_response
  end

  def handle_join() do
    GenServer.call(__MODULE__, :increment_count)
  end

  def handle_call(:increment_count, _from , state) do
    count = state["count"]
    countc = count + 1
    state = %{"id" => state["id"], "bus" => state["bus"], "count" => countc}
    {:reply, :ok, state}
  end

  def handle_leave() do
    GenServer.call(__MODULE__, :decrement_count)
  end

  def handle_call(:decrement_count, _from , state) do
    count = state["count"]
    countc = count - 1
    state = %{"id" => state["id"], "bus" => state["bus"], "count" => countc}
    {:reply, :ok, state}
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
    state = %{state | bus: bus}
    BustrackerWeb.Endpoint.broadcast!("buses:"<>state["id"], "update_bus", state["bus"])
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
