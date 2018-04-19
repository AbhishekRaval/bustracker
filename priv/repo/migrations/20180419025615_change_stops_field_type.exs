defmodule Bustracker.Repo.Migrations.ChangeStopsFieldType do
  use Ecto.Migration

  def change do
    alter table("stops") do
        remove :latitude
        remove :longitude
        add :longitude, :float
        add :latitude, :float
      end
  end
end
