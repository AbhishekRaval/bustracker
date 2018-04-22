defmodule BustrackerWeb.UserSocket do
  use Phoenix.Socket
  alias Bustracker.Users
  alias Bustracker.Users.User

  ## Channels
  # channel "room:*", BustrackerWeb.RoomChannel
  channel "travellers:*", BustrackerWeb.TravellersChannel
  channel "buses:*", BustrackerWeb.BusesChannel

  ## Transports
  transport :websocket, Phoenix.Transports.WebSocket
  # transport :longpoll, Phoenix.Transports.LongPoll

  # Socket params are passed from the client and can
  # be used to verify and authenticate a user. After
  # verification, you can put default assigns into
  # the socket that will be set for all channels, ie
  #
  #     {:ok, assign(socket, :user_id, verified_user_id)}
  #
  # To deny connection, return `:error`.
  #
  # See `Phoenix.Token` documentation for examples in
  # performing token verification on connect.


  def connect(%{"register" => user_params}, socket) do
    case Users.create_user(user_params) do
      {:ok, user} ->
        token = Phoenix.Token.sign(socket,"token", user.id)
        {:ok, assign(socket, :token, token)}
      {:error, changeset} ->
        :error
    end
  end

  def connect(%{"login" => user_params}, socket) do
    with {:ok, %User{} = user} <- Users.get_and_auth_user(user_params["emailid"], user_params["password"]) do
      case user do
        nil -> :error
        _ ->
          token = Phoenix.Token.sign(socket, "token", user.id)
          {:ok, assign(socket, :token, token)}
      end
    end
  end

  def connect(%{"token" => token}, socket) do
    case Phoenix.Token.verify(socket, "token", token, max_age: 86400) do
      {:ok, userid} ->
        {:ok, assign(socket, :token, token)}
      {:error, :expired} ->
        :error
    end
  end

  def id(_socket), do: nil
end
