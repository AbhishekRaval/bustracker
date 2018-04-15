defmodule BusinfoGens do
  use GenServer



  def start_link() do
    GenServer.start_link(__MODULE__, %{}, name: __MODULE__)
  end

  def get_bus(id) do
    GenServer.call(__MODULE__, {:get_bus, id})
  end

  # def init() do
  #   schedule_work()
  #   {:ok, state}
  # end

  def handle_call({:get_bus, id}, _from, state) do
    state1 = "https://api-v3.mbta.com/vehicles/"<>id
    |> HTTPoison.get
    |> handle_response
    {:reply, state1 , state1}
  end

  def handle_response({:ok, %{status_code: 200, body: body}}) do
    temp = Poison.Parser.parse!(body)
    temp["data"]
  end


end
