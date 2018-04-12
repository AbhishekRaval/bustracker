defmodule Bustracker.Requesthandler do
  def fetchfavs(userid) do
    favs = Bustracker.Favinfo.favs_map_for(userid)
    favs
  end

  def addfav() do

  end
end
