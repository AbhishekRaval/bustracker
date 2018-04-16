defmodule BusinfoGens do
  use GenServer

  def start_link(id) do
    GenServer.start_link(__MODULE__, %{"id" => id, "bus" => %{}}, name: __MODULE__)
  end

  def get_bus(id) do
    # GenServer.call(__MODULE__, {:get_bus, id})
    bus = "https://api-v3.mbta.com/vehicles/"<>id<>"?api_key=250808d6ad5140889bde5176bcb5392c"
    |> HTTPoison.get
    |> handle_response
    %{"id" => id, "bus" => bus}
  end

  def init(state) do
    schedule_work()
    {:ok, state}
  end

  defp schedule_work() do
    Process.send_after(self(), :work, 10000)
  end

  def handle_info(:work, state) do
    state = get_bus(state["id"])
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
