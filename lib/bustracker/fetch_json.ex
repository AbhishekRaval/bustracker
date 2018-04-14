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

  defp url(latitude, longitude) do
    "https://api-v3.mbta.com/stops?filter[route_type]=3&filter[latitude]="<>Float.to_string(latitude)<>"&filter[longitude]="<>Float.to_string(longitude)<>"&filter[radius]=0.005"
  end

  defp extract(maps) do
    Enum.map(maps, fn (x) -> %{"id" => x["id"], "name" => x["attributes"]["name"]} end)
  end

  defp handle_response({:ok, %{status_code: 200, body: body}}) do
    temp = Poison.Parser.parse!(body)
    temp["data"]
  end
end
