defmodule Bustracker.Repo.Migrations.Changefavfield do
  use Ecto.Migration

  def change do
    rename table("favs"), :bus_id, to: :route_id
  end
end
