defmodule Bustracker.Fetchjson do
  def fetch(latitude, longitude) do
    url(latitude, longitude)
    |> HTTPoison.get
    |> handle_response
    |> extract
    |> IO.inspect
  end

  # def url(id) do
  #   "https://api-v3.mbta.com/stops?filter[route_type]=3"
  # end

  def url(latitude, longitude) do
    "https://api-v3.mbta.com/stops?filter[route_type]=3&filter[latitude]="<>Float.to_string(latitude)<>"&filter[longitude]="<>Float.to_string(longitude)<>"&filter[radius]=0.01"
  end

  def fetch_buses(stopid) do
    "https://api-v3.mbta.com/routes?filter[stop]="<>Integer.to_string(stopid)
    |> HTTPoison.get
    |> handle_response
    |> extractRouteids
    |> extractBuses
    |> IO.inspect
  end

  def fetch_vehicleDetails(routeid) do
    "https://api-v3.mbta.com/vehicles?filter[route]="<>routeid
    |> HTTPoison.get
    |> handle_response
    |> extractHeadsign
    |> IO.inspect
  end

  def fetch_headsign(tripid) do
    tripmap = "https://api-v3.mbta.com/trips/"<>tripid
              |> HTTPoison.get
              |> handle_response
    tripmap["attributes"]["headsign"]
  end

  defp extractHeadsign(vidlist) do
    Enum.map(vidlist, fn (x) -> %{"id" => x["id"], "hs" => fetch_headsign(x["relationships"]["trip"]["data"]["id"])} end)
  end

  defp extractBuses(routeidlist) do
    Enum.map(routeidlist, fn (x) -> fetch_vehicleDetails(x["id"]) end)
  end

  defp extractRouteids(routes) do
    Enum.map(routes, fn (x) -> %{"id" => x["id"]} end)
  end

  defp extract(maps) do
    Enum.map(maps, fn (x) -> %{"id" => x["id"], "name" => x["attributes"]["name"]} end)
  end

  def handle_response({:ok, %{status_code: 200, body: body}}) do
    temp = Poison.Parser.parse!(body)
    temp["data"]
  end
end
