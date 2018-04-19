defmodule Bustracker.Repo.Migrations.Changedirectionidtostopid do
  use Ecto.Migration

  def change do
    rename table("favs"), :direction_id, to: :stop_id
  end
end
