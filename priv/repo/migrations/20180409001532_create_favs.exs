defmodule Bustracker.Repo.Migrations.CreateFavs do
  use Ecto.Migration

  def change do
    create table(:favs) do
      add :user_id, references(:users, on_delete: :delete_all), null: false
      add :bus_id, references(:buses, on_delete: :delete_all), null: false

      timestamps()
    end

    create index(:favs, [:user_id])
    create index(:favs, [:bus_id])
  end
end
