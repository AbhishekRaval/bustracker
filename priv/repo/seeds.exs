# Script for populating the database. You can run it as:
#
#     mix run priv/repo/seeds.exs
#
# Inside the script, you can read and write to any of your
# repositories directly:
#
#     Bustracker.Repo.insert!(%Bustracker.SomeSchema{})
#
# We recommend using the bang functions (`insert!`, `update!`
# and so on) as they will fail if something goes wrong.
defmodule Seeds do

  alias Bustracker.Repo
  alias Bustracker.Stops.Stop

  def fetchAllStops() do
    stops = "https://api-v3.mbta.com/stops?filter[route_type]=3&api_key=250808d6ad5140889bde5176bcb5392c"
              |> HTTPoison.get
              |> handle_response
    Enum.map(stops, fn(x) -> %{"stopname" => x["attributes"]["name"], "stopid" => x["id"], "latitude" => x["attributes"]["latitude"], "longitude" => x["attributes"]["longitude"]} end)
  end

  def handle_response({:ok, %{status_code: 200, body: body}}) do
    temp = Poison.Parser.parse!(body)
    temp["data"]
  end
  def handle_response({_, %{status_code: _}}) do
    "Check your network connection"
  end

  def run do
    stopdetails = fetchAllStops()
    for x <- stopdetails, do: Repo.insert!(%Stop{stopid: x["stopid"], stopname: x["stopname"], latitude: x["latitude"], longitude: x["longitude"] })
  end
end

Seeds.run
