defmodule Bustracker.Repo.Migrations.CreateBuses do
  use Ecto.Migration

  def change do
    create table(:buses) do
      add :busid, :string, null: false

      timestamps()
    end

  end
end
