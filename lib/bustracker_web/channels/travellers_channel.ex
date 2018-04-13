defmodule BustrackerWeb.TravellersChannel do
  use BustrackerWeb, :channel
  alias Bustracker.Users

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
