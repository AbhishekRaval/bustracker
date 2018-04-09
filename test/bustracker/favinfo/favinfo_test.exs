defmodule Bustracker.FavinfoTest do
  use Bustracker.DataCase

  alias Bustracker.Favinfo

  describe "favs" do
    alias Bustracker.Favinfo.Fav

    @valid_attrs %{}
    @update_attrs %{}
    @invalid_attrs %{}

    def fav_fixture(attrs \\ %{}) do
      {:ok, fav} =
        attrs
        |> Enum.into(@valid_attrs)
        |> Favinfo.create_fav()

      fav
    end

    test "list_favs/0 returns all favs" do
      fav = fav_fixture()
      assert Favinfo.list_favs() == [fav]
    end

    test "get_fav!/1 returns the fav with given id" do
      fav = fav_fixture()
      assert Favinfo.get_fav!(fav.id) == fav
    end

    test "create_fav/1 with valid data creates a fav" do
      assert {:ok, %Fav{} = fav} = Favinfo.create_fav(@valid_attrs)
    end

    test "create_fav/1 with invalid data returns error changeset" do
      assert {:error, %Ecto.Changeset{}} = Favinfo.create_fav(@invalid_attrs)
    end

    test "update_fav/2 with valid data updates the fav" do
      fav = fav_fixture()
      assert {:ok, fav} = Favinfo.update_fav(fav, @update_attrs)
      assert %Fav{} = fav
    end

    test "update_fav/2 with invalid data returns error changeset" do
      fav = fav_fixture()
      assert {:error, %Ecto.Changeset{}} = Favinfo.update_fav(fav, @invalid_attrs)
      assert fav == Favinfo.get_fav!(fav.id)
    end

    test "delete_fav/1 deletes the fav" do
      fav = fav_fixture()
      assert {:ok, %Fav{}} = Favinfo.delete_fav(fav)
      assert_raise Ecto.NoResultsError, fn -> Favinfo.get_fav!(fav.id) end
    end

    test "change_fav/1 returns a fav changeset" do
      fav = fav_fixture()
      assert %Ecto.Changeset{} = Favinfo.change_fav(fav)
    end
  end
end
