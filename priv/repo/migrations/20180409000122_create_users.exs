defmodule Bustracker.Repo.Migrations.CreateUsers do
  use Ecto.Migration

  def change do
    create table(:users) do
      add :username, :string, null: false
      add :emailid, :string, null: false
      add :password, :string, null: false
      add :phonenum, :string

      timestamps()
    end

  end
end
