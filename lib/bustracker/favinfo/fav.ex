defmodule Bustracker.Favinfo.Fav do
  use Ecto.Schema
  import Ecto.Changeset


  schema "favs" do
    belongs_to :user, Bustracker.Users.User
    field :bus_id, :string

    timestamps()
  end

  @doc false
  def changeset(fav, attrs) do
    fav
    |> cast(attrs, [:user_id, :bus_id])
    |> validate_required([:user_id])
  end
end
