defmodule BustrackerWeb.PageController do
  use BustrackerWeb, :controller

  def index(conn, _params) do
    current_user = conn.assigns[:current_user]
    favs = Bustracker.Favinfo.favs_map_for(current_user.id)
    render conn, "index.html", favs: favs
  end
end
