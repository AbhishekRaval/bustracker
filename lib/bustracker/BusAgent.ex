defmodule Bustracker.BusAgent do
  use Agent

  def start_link() do
    Agent.start_link(fn -> %{} end, name: __MODULE__)
  end

  def save(busid, pid) do
    Agent.update __MODULE__, fn state ->
      Map.put(state, busid, pid)
    end
  end

  def load(busid) do
    Agent.get __MODULE__, fn state ->
      Map.get(state, busid)
    end
  end

  def remove(busid) do
    Agent.get __MODULE__, fn state ->
      Map.delete(state, busid)
    end
  end

end
