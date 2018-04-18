  defmodule Bustracker.Users.User do
  use Ecto.Schema
  import Ecto.Changeset

  alias Bustracker.Favinfo.Fav

  schema "users" do
    field :emailid, :string
    field :password_hash, :string
    field :phonenum, :string
    field :username, :string
    field :password, :string, virtual: true

    has_many :favourite_list, Fav, foreign_key: :user_id
    has_many :favourites, through: [:favourite_list, :bus]

    timestamps()
  end

  @doc false
  def changeset(user, attrs) do
    user
    |> cast(attrs, [:username, :emailid, :password, :phonenum])
    |> put_pass_hash()
    |> unique_constraint(:emailid)
    |> validate_required([:username, :emailid, :password_hash, :phonenum])
    |> validate_format(:emailid, ~r/@/)
  end

  ## the following code has been adopted from the Comeonin documentation
  defp put_pass_hash(%Ecto.Changeset{valid?: true, changes:
    %{password: password}} = changeset) do
      change(changeset, Comeonin.Argon2.add_hash(password))
    end
  defp put_pass_hash(changeset), do: changeset
end
