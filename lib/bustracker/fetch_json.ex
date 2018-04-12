defmodule Bustracker.Fetchjson do
  def fetch(id) do
    url(id)
    |> HTTPoison.get
    |> handle_response
    |> IO.inspect
  end
  def url(id) do
    "https://api-v3.mbta.com/stops?filter[route_type]=3"
  end

  def url(latitude, longitude) do
    "https://api-v3.mbta.com/stops?filter[latitude]="<>latitude<>"&filter[longitude]="<>longitude<>"&filter[radius]=0.01"
  end

  def handle_response({:ok, %{status_code: 200, body: body}}) do
    Poison.Parser.parse!(body)

  end
end
