defmodule Bustracker.Users.User do
  use Ecto.Schema
  import Ecto.Changeset

  alias Bustracker.Favinfo.Fav

  schema "users" do
    field :emailid, :string
    field :password, :string
    field :phonenum, :string
    field :username, :string

    has_many :favourite_list, Fav, foreign_key: :user_id
    has_many :favourites, through: [:favourite_list, :bus]

    timestamps()
  end

  @doc false
  def changeset(user, attrs) do
    user
    |> cast(attrs, [:username, :emailid, :password, :phonenum])
    |> validate_required([:username, :emailid, :password, :phonenum])
  end
end
