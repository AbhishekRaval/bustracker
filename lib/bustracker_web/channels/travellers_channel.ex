defmodule BustrackerWeb.TravellersChannel do
  use BustrackerWeb, :channel
  alias Bustracker.Requesthandler
  alias Bustracker.Favinfo

  def join("travellers:lobby", payload, socket) do
    if authorized?(payload) do
      {:ok, socket}
    else
      {:error, %{reason: "unauthorized"}}
    end
  end


  # Channels can be used in a request/response fashion
  # by sending replies to requests from the client
  def handle_in("ping", payload, socket) do
    {:reply, {:ok, payload}, socket}
  end

  def handle_in("fetchfavs", %{"token" => token}, socket) do
    case Phoenix.Token.verify(socket, "token", token, max_age: 86400) do
      {:ok, userid} ->
        {:reply, {:ok, %{"favs" => Requesthandler.fetchfavs(userid)}}, socket}
      {:error, :expired} ->
        {:error, %{reason: "Not logged in"}}
    end
  end

  def handle_in("addfav", %{"token" => token, "busid" => busid}, socket) do
    case Phoenix.Token.verify(socket, "token", token, max_age: 86400) do
      {:ok, userid} ->
        {:reply, {:ok, %{"favs" => Favinfo.create_fav(%{"user_id" => userid, "busid" => busid})}}, socket}
      {:error, :expired} ->
        {:error, %{reason: "Not logged in"}}
    end
  end

  def handle_in("delfav", %{"token" => token, "favid" => favid}, socket) do
    case Phoenix.Token.verify(socket, "token", token, max_age: 86400) do
      {:ok, userid} ->
        {:reply, {:ok, %{"favs" => Favinfo.delete_fav(favid)}}, socket}
      {:error, :expired} ->
        {:error, %{reason: "Not logged in"}}
    end
  end

  # It is also common to receive messages from the client and
  # broadcast to everyone in the current topic (travellers:lobby).
  def handle_in("shout", payload, socket) do
    broadcast socket, "shout", payload
    {:noreply, socket}
  end

  # Add authorization logic here as required.
  defp authorized?(_payload) do
    true
  end
end
