defmodule Bustracker.BusinfoTest do
  use Bustracker.DataCase

  alias Bustracker.Businfo

  describe "buses" do
    alias Bustracker.Businfo.Bus

    @valid_attrs %{id: "some id"}
    @update_attrs %{id: "some updated id"}
    @invalid_attrs %{id: nil}

    def bus_fixture(attrs \\ %{}) do
      {:ok, bus} =
        attrs
        |> Enum.into(@valid_attrs)
        |> Businfo.create_bus()

      bus
    end

    test "list_buses/0 returns all buses" do
      bus = bus_fixture()
      assert Businfo.list_buses() == [bus]
    end

    test "get_bus!/1 returns the bus with given id" do
      bus = bus_fixture()
      assert Businfo.get_bus!(bus.id) == bus
    end

    test "create_bus/1 with valid data creates a bus" do
      assert {:ok, %Bus{} = bus} = Businfo.create_bus(@valid_attrs)
      assert bus.id == "some id"
    end

    test "create_bus/1 with invalid data returns error changeset" do
      assert {:error, %Ecto.Changeset{}} = Businfo.create_bus(@invalid_attrs)
    end

    test "update_bus/2 with valid data updates the bus" do
      bus = bus_fixture()
      assert {:ok, bus} = Businfo.update_bus(bus, @update_attrs)
      assert %Bus{} = bus
      assert bus.id == "some updated id"
    end

    test "update_bus/2 with invalid data returns error changeset" do
      bus = bus_fixture()
      assert {:error, %Ecto.Changeset{}} = Businfo.update_bus(bus, @invalid_attrs)
      assert bus == Businfo.get_bus!(bus.id)
    end

    test "delete_bus/1 deletes the bus" do
      bus = bus_fixture()
      assert {:ok, %Bus{}} = Businfo.delete_bus(bus)
      assert_raise Ecto.NoResultsError, fn -> Businfo.get_bus!(bus.id) end
    end

    test "change_bus/1 returns a bus changeset" do
      bus = bus_fixture()
      assert %Ecto.Changeset{} = Businfo.change_bus(bus)
    end
  end

  describe "buses" do
    alias Bustracker.Businfo.Bus

    @valid_attrs %{busid: "some busid"}
    @update_attrs %{busid: "some updated busid"}
    @invalid_attrs %{busid: nil}

    def bus_fixture(attrs \\ %{}) do
      {:ok, bus} =
        attrs
        |> Enum.into(@valid_attrs)
        |> Businfo.create_bus()

      bus
    end

    test "list_buses/0 returns all buses" do
      bus = bus_fixture()
      assert Businfo.list_buses() == [bus]
    end

    test "get_bus!/1 returns the bus with given id" do
      bus = bus_fixture()
      assert Businfo.get_bus!(bus.id) == bus
    end

    test "create_bus/1 with valid data creates a bus" do
      assert {:ok, %Bus{} = bus} = Businfo.create_bus(@valid_attrs)
      assert bus.busid == "some busid"
    end

    test "create_bus/1 with invalid data returns error changeset" do
      assert {:error, %Ecto.Changeset{}} = Businfo.create_bus(@invalid_attrs)
    end

    test "update_bus/2 with valid data updates the bus" do
      bus = bus_fixture()
      assert {:ok, bus} = Businfo.update_bus(bus, @update_attrs)
      assert %Bus{} = bus
      assert bus.busid == "some updated busid"
    end

    test "update_bus/2 with invalid data returns error changeset" do
      bus = bus_fixture()
      assert {:error, %Ecto.Changeset{}} = Businfo.update_bus(bus, @invalid_attrs)
      assert bus == Businfo.get_bus!(bus.id)
    end

    test "delete_bus/1 deletes the bus" do
      bus = bus_fixture()
      assert {:ok, %Bus{}} = Businfo.delete_bus(bus)
      assert_raise Ecto.NoResultsError, fn -> Businfo.get_bus!(bus.id) end
    end

    test "change_bus/1 returns a bus changeset" do
      bus = bus_fixture()
      assert %Ecto.Changeset{} = Businfo.change_bus(bus)
    end
  end
end
