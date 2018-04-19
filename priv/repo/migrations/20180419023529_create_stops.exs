defmodule Bustracker.Repo.Migrations.CreateStops do
  use Ecto.Migration

  def change do
    create table(:stops) do
      add :stopid, :string, null: false
      add :stopname, :string
      add :latitude, :float
      add :longitude, :float

      timestamps()
    end

  end
end
