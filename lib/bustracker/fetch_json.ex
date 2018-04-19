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
    |> extractBuses(stopid)
  end

  def fetch_vehicleDetails(routeid, stopid) do
    "https://api-v3.mbta.com/vehicles?filter[route]="<>routeid<>"&api_key=250808d6ad5140889bde5176bcb5392c"
    |> HTTPoison.get
    |> handle_response
    |> extractHeadsign(stopid)
  end

  def fetch_headsign(tripid) do
    tripmap = "https://api-v3.mbta.com/trips/"<>tripid<>"?api_key=250808d6ad5140889bde5176bcb5392c"
              |> HTTPoison.get
              |> handle_response
    tripmap["attributes"]["headsign"]
  end

# <<<<<<< HEAD
  # def fetch_predictions(tripid, stopid, routeid) do
    # "https://api-v3.mbta.com/predictions?filter[stop]="<>stopid<>"&filter[trip]="<>tripid<>"&filter[route]="<>routeid<>"&include=vehicle&api_key=250808d6ad5140889bde5176bcb5392c"
# =======
  def fetch_predictions(tripid, stopid) do
    IO.puts "stopid:"<>stopid<>" tripid"<>tripid
    "https://api-v3.mbta.com/predictions?filter[stop]="<>stopid<>"&filter[trip]="<>tripid<>"&include=vehicle&api_key=250808d6ad5140889bde5176bcb5392c"
# >>>>>>> bb20ad3b5f6c75eb9c0e2c7211e7a239ebbbd72e
    |> HTTPoison.get
    |> handle_response
    |> extractReqd
    |> Enum.at(0)
  end

# <<<<<<< HEAD
#   # def fetch_direction(routeid, stopid) do
#   #   preds = "https://api-v3.mbta.com/predictions?filter[stop]="<>stopid<>"&filter[route]="<>routeid<>"&api_key=250808d6ad5140889bde5176bcb5392c"
#   #           |> HTTPoison.get
#   #           |> handle_response
#   #           |> Enum.at(0,%{"attributes" => %{"direction_id" => "2"}})
#   #   preds["attributes"]["direction_id"]
#   # end
# =======
  def fetch_directions(routeid, stopid) do
    preds = "https://api-v3.mbta.com/predictions?filter[stop]="<>stopid<>"&filter[route]="<>routeid<>"&api_key=250808d6ad5140889bde5176bcb5392c"
            |> HTTPoison.get
            |> handle_response
            |> Enum.at(0,%{"attributes" => %{"direction_id" => "2"}})
    preds["attributes"]["direction_id"]
  end
# >>>>>>> bb20ad3b5f6c75eb9c0e2c7211e7a239ebbbd72e

  defp extractReqd(plist) do
    avail = Enum.filter(plist, fn(x) -> x["relationships"]["vehicle"]["data"] end)
    Enum.map(avail, fn(x) -> %{"arrivalTime" => x["attributes"]["arrival_time"],
                               "directionId" => x["attributes"]["direction_id"],
                               "stopSequence" => x["attributes"]["stop_sequence"]} end)
  end

  defp extractHeadsign(vlist, stopid) do
    a = Enum.map(vlist, fn (x) -> %{"vehicleid" => x["id"], "hs" => fetch_headsign(x["relationships"]["trip"]["data"]["id"]),
                                "preds" => fetch_predictions(x["relationships"]["trip"]["data"]["id"], stopid),
                                "tripid" => x["relationships"]["trip"]["data"]["id"]} end)
    Enum.filter(a, fn(x) -> x["preds"] !== nil end)
  end

  defp extractBuses(routeidlist, stopid) do
    Enum.map(routeidlist, fn (x) -> %{"routeid" => x["id"],"route_name" => x["rname"],
# <<<<<<< HEAD
                                      # "buses" => fetch_vehicleDetails(x["id"])} end)
# =======
                                      "buses" => fetch_vehicleDetails(x["id"], stopid),
                                      "directionid" => fetch_directions(x["id"], stopid)} end)
# >>>>>>> bb20ad3b5f6c75eb9c0e2c7211e7a239ebbbd72e
  # Enum.filter(buses, fn(x) -> x["directionid"] == x["buses"][])
  end

  defp extractRouteids(routes) do
     Enum.map(routes, fn (x) -> %{"id" => x["id"], "rname" => x["attributes"]["short_name"]} end)
  end

  defp extract(stops) do
    Enum.map(stops, fn (x) -> %{"stopid" => x["id"], "stopname" => x["attributes"]["name"],
                                "catbuses" => fetch_buses(x["id"])} end)
  end

  defp handle_response({:ok, %{status_code: 200, body: body}}) do
    temp = Poison.Parser.parse!(body)
    temp["data"]
  end

  defp handle_response({_, %{status_code: _}}) do
    "Check your network connection"
  end


  ### Functions for broadcast
  def fetchAllStops() do
    stops = "https://api-v3.mbta.com/stops?filter[route_type]=3&api_key=250808d6ad5140889bde5176bcb5392c"
              |> HTTPoison.get
              |> handle_response
    Enum.map(stops, fn(x) -> %{"stopname" => x["attributes"]["name"], "stopid" => x["id"]} end)
  end

  # def fetchToAndFrom(toid, fromid) do
  #   routes = "https://api-v3.mbta.com/routes?filter[route_type]=3&api_key=250808d6ad5140889bde5176bcb5392c"
  #             |> HTTPoison.get
  #             |> handle_response
  #   Enum.filter(routes, fn (x) -> routeHasBoth?(x, toid, fromid) end)
  # end
  #
  # def routeHasBoth?(x, to, from) do
  #
  # end
end
