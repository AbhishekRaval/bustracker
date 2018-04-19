defmodule Bustracker.Stops.Stop do
  use Ecto.Schema
  import Ecto.Changeset


  schema "stops" do
    field :latitude, :float
    field :longitude, :float
    field :stopid, :string
    field :stopname, :string

    timestamps()
  end

  @doc false
  def changeset(stop, attrs) do
    stop
    |> cast(attrs, [:stopid, :stopname, :latitude, :longitude])
    |> validate_required([:stopid, :stopname, :latitude, :longitude])
  end
end
