defmodule Bustracker.Repo.Migrations.AddUniqueEmail do
  use Ecto.Migration

  def change do
    create unique_index(:users, [:emailid])
  end
end
