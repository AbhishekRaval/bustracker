defmodule Bustracker.Fetchjson do
  def fetch(latitude, longitude) do
    url(latitude, longitude)
    |> HTTPoison.get
    |> handle_response
    |> extract


  end

  # def url(id) do
  #   "https://api-v3.mbta.com/stops?filter[route_type]=3"
  # end

  def url(latitude, longitude) do
    "https://api-v3.mbta.com/stops?filter[route_type]=3&filter[latitude]="<>Float.to_string(latitude)<>"&filter[longitude]="<>Float.to_string(longitude)<>"&filter[radius]=0.005"<>"&api_key=250808d6ad5140889bde5176bcb5392c"
  end

  def fetch_buses(stopid) do
   "https://api-v3.mbta.com/routes?api_key=250808d6ad5140889bde5176bcb5392c&filter[stop]="<>stopid
    |> HTTPoison.get
    |> handle_response
    |> extractRouteids
    |> extractBuses
  end

  def fetch_vehicleDetails(routeid) do
    "https://api-v3.mbta.com/vehicles?filter[route]="<>routeid<>"&api_key=250808d6ad5140889bde5176bcb5392c"
    |> HTTPoison.get
    |> handle_response
    |> extractHeadsign
  end

  def fetch_headsign(tripid) do
    tripmap = "https://api-v3.mbta.com/trips/"<>tripid<>"?api_key=250808d6ad5140889bde5176bcb5392c"
              |> HTTPoison.get
              |> handle_response
    tripmap["attributes"]["headsign"]
  end

  def fetch_predictions(tripid) do
    "https://api-v3.mbta.com/predictions?filter[trip]="<>tripid<>"&sort=stop_sequence&api_key=250808d6ad5140889bde5176bcb5392c"
    |> HTTPoison.get
    |> handle_response
  end

  defp extractHeadsign(vlist) do
    Enum.map(vlist, fn (x) -> %{"vehicle" => x, "hs" => fetch_headsign(x["relationships"]["trip"]["data"]["id"]),
                                "preds" => fetch_predictions(x["relationships"]["trip"]["data"]["id"])} end)
  end

  defp extractBuses(routeidlist) do
    IO.inspect(routeidlist)
    Enum.map(routeidlist, fn (px) -> %{"routeid" => x["id"],"route_name" => x["rname"],
                                      "buses" => fetch_vehicleDetails(x["id"])
                                      } end)
  end

  defp extractRouteids(routes) do
     Enum.map(routes, fn (x) -> %{"id" => x["id"], "rname" => x["attributes"]["short_name"]} end)
  end

  defp extract(stops) do
    Enum.map(stops, fn (x) -> %{"stopid" => x["id"], "stopname" => x["attributes"]["name"],
                                "catbuses" => fetch_buses(x["id"])} end)
  end

  def handle_response({:ok, %{status_code: 200, body: body}}) do
    temp = Poison.Parser.parse!(body)
    temp["data"]
  end
  def handle_response({_, %{status_code: _}}) do
    "Check your network connection"
  end
end
