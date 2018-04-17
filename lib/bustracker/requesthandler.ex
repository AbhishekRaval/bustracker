defmodule Bustracker.Requesthandler do
  alias Bustracker.Fetchjson
  def fetchfavs(userid) do
    Bustracker.Favinfo.favs_map_for(userid)
  end

  def fetchfavslive_info(userid) do
    favs = Bustracker.Favinfo.favs_map_for(userid)
    Enum.map(
      favs,
      fn (%{"route_id" => route_id}) ->
        %{"route_id": route_id, "buses": Fetchjson.fetch_vehicleDetails(route_id)}
      end
    )
  end

  def addfav() do

  end
end
