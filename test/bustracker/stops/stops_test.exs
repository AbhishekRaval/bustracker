defmodule Bustracker.StopsTest do
  use Bustracker.DataCase

  alias Bustracker.Stops

  describe "stops" do
    alias Bustracker.Stops.Stop

    @valid_attrs %{latitude: "some latitude", longitude: "some longitude", stopid: "some stopid", stopname: "some stopname"}
    @update_attrs %{latitude: "some updated latitude", longitude: "some updated longitude", stopid: "some updated stopid", stopname: "some updated stopname"}
    @invalid_attrs %{latitude: nil, longitude: nil, stopid: nil, stopname: nil}

    def stop_fixture(attrs \\ %{}) do
      {:ok, stop} =
        attrs
        |> Enum.into(@valid_attrs)
        |> Stops.create_stop()

      stop
    end

    test "list_stops/0 returns all stops" do
      stop = stop_fixture()
      assert Stops.list_stops() == [stop]
    end

    test "get_stop!/1 returns the stop with given id" do
      stop = stop_fixture()
      assert Stops.get_stop!(stop.id) == stop
    end

    test "create_stop/1 with valid data creates a stop" do
      assert {:ok, %Stop{} = stop} = Stops.create_stop(@valid_attrs)
      assert stop.latitude == "some latitude"
      assert stop.longitude == "some longitude"
      assert stop.stopid == "some stopid"
      assert stop.stopname == "some stopname"
    end

    test "create_stop/1 with invalid data returns error changeset" do
      assert {:error, %Ecto.Changeset{}} = Stops.create_stop(@invalid_attrs)
    end

    test "update_stop/2 with valid data updates the stop" do
      stop = stop_fixture()
      assert {:ok, stop} = Stops.update_stop(stop, @update_attrs)
      assert %Stop{} = stop
      assert stop.latitude == "some updated latitude"
      assert stop.longitude == "some updated longitude"
      assert stop.stopid == "some updated stopid"
      assert stop.stopname == "some updated stopname"
    end

    test "update_stop/2 with invalid data returns error changeset" do
      stop = stop_fixture()
      assert {:error, %Ecto.Changeset{}} = Stops.update_stop(stop, @invalid_attrs)
      assert stop == Stops.get_stop!(stop.id)
    end

    test "delete_stop/1 deletes the stop" do
      stop = stop_fixture()
      assert {:ok, %Stop{}} = Stops.delete_stop(stop)
      assert_raise Ecto.NoResultsError, fn -> Stops.get_stop!(stop.id) end
    end

    test "change_stop/1 returns a stop changeset" do
      stop = stop_fixture()
      assert %Ecto.Changeset{} = Stops.change_stop(stop)
    end
  end
end
