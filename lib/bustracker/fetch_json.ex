defmodule Bustracker.Fetchjson do
  def fetch(latitude,longitude) do
    url(latitude, longitude)
    |> HTTPoison.get
    |> handle_response
  end

#  def url(id) do
#    "https://api-v3.mbta.com/stops?filter[route_type]=3"
#  end

  defp url(latitude, longitude) do
    "https://api-v3.mbta.com/stops?filter[latitude]="<>Float.to_string(latitude)<>"&filter[longitude]="<>Float.to_string(longitude)<>"&filter[radius]=0.01"
  end

  defp handle_response({:ok, %{status_code: 200, body: body}}) do
      Poison.Parser.parse!(body)
  end

  defp handle_response({:error, %{status_code: code}}) do
    # TODO
  end
end
