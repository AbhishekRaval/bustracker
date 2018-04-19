defmodule Bustracker.Repo.Migrations.ChangeDirectionFieldTypeInFav do
  use Ecto.Migration

  def change do
    alter table("favs") do
      add :direction_id, :integer
    end
  end
end
