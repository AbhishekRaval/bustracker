defmodule Bustracker.BusSupervisor do
  @moduledoc """
  A supervisor that starts `BusinfoGens` processes dynamically.
  """

  use DynamicSupervisor

  alias Bustracker.BusinfoGens


  def start_link(_arg) do
    DynamicSupervisor.start_link(__MODULE__, :ok, name: __MODULE__)
  end

  def init(:ok) do
    DynamicSupervisor.init(strategy: :one_for_one)
  end

  @doc """
  Starts a `BusinfoGens` process and supervises it.
  """
  def start_bustracking(tripid) do
    DynamicSupervisor.start_child(__MODULE__, {BusinfoGens, tripid})
  end

  @doc """
  Terminates the `BusinfoGens` process normally. It won't be restarted.
  """
  def stop_bustracking(tripid) do
    child_pid = BusinfoGens.bus_pid(tripid)
    DynamicSupervisor.terminate_child(__MODULE__, child_pid)
  end


end
