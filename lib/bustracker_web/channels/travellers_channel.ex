defmodule BustrackerWeb.TravellersChannel do
  use BustrackerWeb, :channel
  alias Bustracker.Users
  alias Bustracker.Requesthandler
  alias Bustracker.Favinfo
  alias Bustracker.Fetchjson
  alias Bustracker.Favinfo.Fav

  def join("travellers:lobby", payload, socket) do
    if authorized?(payload) do
      {:ok, socket}
    else
      {:error, %{reason: "unauthorized"}}
    end
  end

  # Channels can be used in a request/response fashion
  # by sending replies to requests from the client
  def handle_in("token", _payload, socket) do
    {:reply, {:ok, %{:token => socket.assigns[:token]}}, socket}
  end

  def handle_in("fetchfavs", %{}, socket) do
    token = socket.assigns[:token]
    case Phoenix.Token.verify(socket, "token", token, max_age: 86400) do
      {:ok, userid} ->
        {:reply, {:ok, %{"favs" => Requesthandler.fetchfavs(userid)}}, socket}
      {:error, :expired} ->
        {:error, %{reason: "Not logged in"}}
    end
  end

  def handle_in("addfav", %{"route_id" => routeid}, socket) do
    token = socket.assigns[:token]
    case Phoenix.Token.verify(socket, "token", token, max_age: 86400) do
      {:ok, userid} ->
      { :ok, fav } = Favinfo.create_fav(%{"user_id" => userid, "route_id" => routeid, "direction_id" => 0})
        {:reply, {:ok, %{ "fav" => %{"route_id" => fav.route_id, "fav_id" => fav.id, "direction_id" => fav.direction_id }}}, socket}
      {:error, :expired} ->
        {:error, %{reason: "Not logged in"}}
    end
  end

  def handle_in("delfav", %{"route_id" => route_id }, socket) do
    token = socket.assigns[:token]
    case Phoenix.Token.verify(socket, "token", token, max_age: 86400) do
      {:ok, userid} ->
        {:ok, favs} = Favinfo.delete_fav(userid, route_id)
        {:reply, {:ok, %{}}, socket}
      {:error, :expired} ->
        {:error, %{reason: "Not logged in"}}
    end
  end

  def handle_in("bus_stops", %{"latitude" => latitude, "longitude" => longitude}, socket) do
    IO.puts "Handle_in called"
    case Phoenix.Token.verify(socket, "token", socket.assigns[:token], max_age: 86400) do
      {:ok, userid} ->
        {:reply, {:ok, %{"bus_stops" => Fetchjson.fetch(latitude, longitude)}}, socket}
      {:error, :expired} ->
        {:error, %{reason: "Not logged in"}}
    end
  end


  def handle_in("fav_live_info", _params, socket) do
    token = socket.assigns[:token]
    case Phoenix.Token.verify(socket, "token", token, max_age: 86400) do
      {:ok, userid} ->
        favs = Requesthandler.fetchfavslive_info(userid)
        IO.inspect favs
        {:reply, {:ok, %{"favs_live" => favs}}, socket}
      {:error, :expired} ->
        {:error, %{reason: "Not logged in"}}
    end
  end
  # It is also common to receive messages from the client and
  # broadcast to everyone in the current topic (travellers:lobby).
  def handle_in("profile", payload, socket) do
    token = socket.assigns[:token]
    case Phoenix.Token.verify(socket, "token", token) do
      {:ok, userid} ->
        profile = Users.get_user(userid)
                  |> Map.delete(:id)
        profile =
          %{username: profile.username ,
            phonenum: profile.phonenum ,
          emailid: profile.emailid}
        {:reply, {:ok, %{:profile => profile}} , socket}
      {:error, :expired} ->
        :error
    end

  end

  # Add authorization logic here as required.
  defp authorized?(_payload) do
    true
  end
end
