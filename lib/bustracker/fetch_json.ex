defmodule Bustracker.Fetchjson do
  def fetch(latitude, longitude) do
    url(latitude, longitude)
    |> HTTPoison.get
    |> handle_response
    |> extract
  end

  def fetchToFrom(from, to) do
    "https://api-v3.mbta.com/stops?filter[id]="<>from<>"&filter[route_type]=3&api_key=250808d6ad5140889bde5176bcb5392c"
    |> HTTPoison.get
    |> handle_response
    |> extractByTo(to)
  end

  def url(latitude, longitude) do
    "https://api-v3.mbta.com/stops?filter[route_type]=3&filter[latitude]="<>Float.to_string(latitude)<>"&filter[longitude]="<>Float.to_string(longitude)<>"&filter[radius]=0.003"<>"&api_key=250808d6ad5140889bde5176bcb5392c"
  end

  defp extractByTo(stops, to) do
    Enum.map(stops, fn (x) -> %{"stopid" => x["id"], "stopname" => x["attributes"]["name"],
                                "catbuses" => fetch_buses_to(x["id"], to)} end)
  end

  def fetch_buses_to(stopid, to) do
    "https://api-v3.mbta.com/routes?api_key=250808d6ad5140889bde5176bcb5392c&filter[stop]="<>stopid
    |> HTTPoison.get
    |> handle_response
    |> extractRouteids
    |> extractTo(to)
    |> extractBusesTo(stopid, to)
  end

  def extractTo(list1, to) do
    list2 = "https://api-v3.mbta.com/routes?api_key=250808d6ad5140889bde5176bcb5392c&filter[stop]="<>to
            |> HTTPoison.get
            |> handle_response
            |> extractRouteids
    list3 = list1 -- list2
    result = list1 -- list3
    # https://kmrakibulislam.wordpress.com/2015/10/25/find-common-items-in-two-lists-in-elixir/
    result
  end

  defp extractBusesTo(routeidlist, stopid, to) do
    rlist = Enum.filter(routeidlist, fn(x) -> extractStopSeq(x["id"], stopid) < extractStopSeq(x["id"], to) end)
    Enum.map(rlist, fn (x) -> %{"routeid" => x["id"],"route_name" => x["rname"],
                                "buses" => fetch_vehicleDetails(x["id"], stopid),
                                "directionid" => fetch_directions(x["id"], stopid)} end)
  end

  defp extractStopSeq(rid, sid) do
    rmap = "https://api-v3.mbta.com/predictions?api_key=250808d6ad5140889bde5176bcb5392c&filter[stop]="<>sid<>"&filter[route]="<>rid
           |> HTTPoison.get
           |> handle_response
           |> Enum.at(0)
    rmap["attributes"]["stop_sequence"]
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

  def fetch_predictions(tripid, stopid) do
    "https://api-v3.mbta.com/predictions?filter[stop]="<>stopid<>"&filter[trip]="<>tripid<>"&include=vehicle&api_key=250808d6ad5140889bde5176bcb5392c"
    |> HTTPoison.get
    |> handle_response
    |> extractReqd
    |> Enum.at(0)
  end

  def fetch_directions(routeid, stopid) do
    preds = "https://api-v3.mbta.com/predictions?filter[stop]="<>stopid<>"&filter[route]="<>routeid<>"&api_key=250808d6ad5140889bde5176bcb5392c"
            |> HTTPoison.get
            |> handle_response
            |> Enum.at(0,%{"attributes" => %{"direction_id" => "2"}})
    preds["attributes"]["direction_id"]
  end

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
                                      "buses" => fetch_vehicleDetails(x["id"], stopid),
                                      "directionid" => fetch_directions(x["id"], stopid)} end)
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

end
