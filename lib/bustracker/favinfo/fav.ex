defmodule Bustracker.Favinfo.Fav do
  use Ecto.Schema
  import Ecto.Changeset


  schema "favs" do
    belongs_to :user, Bustracker.Users.User
    field :route_id, :string
    field :stop_id, :integer

    timestamps()
  end

  @doc false
  def changeset(fav, attrs) do
    fav
    |> cast(attrs, [:user_id, :route_id, :stop_id])
    |> validate_required([:user_id, :route_id, :stop_id ])
  end
end
