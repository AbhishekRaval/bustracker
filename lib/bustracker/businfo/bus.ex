defmodule Bustracker.Businfo.Bus do
  use Ecto.Schema
  import Ecto.Changeset


  schema "buses" do
    field :busid, :string

    timestamps()
  end

  @doc false
  def changeset(bus, attrs) do
    bus
    |> cast(attrs, [:busid])
    |> validate_required([:busid])
  end
end
