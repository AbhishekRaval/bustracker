defmodule BustrackerWeb.BusesChannel do
  use BustrackerWeb, :channel

  def join("buses:"<>id, payload, socket) do

    if authorized?(payload) do
      pid = Bustracker.BusinfoGens.bus_pid(id)
      case is_pid(pid) do
        false -> {:ok, pid } = Bustracker.BusSupervisor.start_bustracking(id)
               Bustracker.BusinfoGens.handle_join(pid)
               socket = assign(socket, "busid", id)
               {:ok, socket}
        true -> Bustracker.BusinfoGens.handle_join(pid)
                socket = assign(socket, "busid", id)
                {:ok, socket}
      end


      # if Bustracker.BusAgent.has_process?(id) do
      #   pid = Bustracker.BusAgent.load(id)
      #   IO.inspect(id)
      #   IO.puts("insideload")
      #   Bustracker.BusinfoGens.handle_join(pid)
      #   socket = assign(socket, "busid", id)
      #
      #   {:ok, socket}
      # else
      #   # {:ok, pid} = Bustracker.BusinfoGens.start_link(id)
      #   # Bustracker.BusAgent.save(id, pid)
      #
      #   Bustracker.BusinfoGens.handle_join(pid)
      #   socket = assign(socket, "busid", id)
      #   {:ok, socket}
      # end
    else
      {:error, %{reason: "unauthorized"}}
    end
  end

  def handle_in("fetchbusdata", payload, socket) do
    all_stops = Bustracker.BusinfoGens.fetch_all_busstops(socket.assigns["busid"])
    bus = Bustracker.BusinfoGens.fetch_current_bus_status(socket.assigns["busid"])
    state = %{"id" => socket.assigns["busid"], "bus" => bus, "all_stops" => all_stops}
    {:reply, {:ok, state}, socket}
  end

  def terminate(_reason, socket) do
    IO.puts "Terminate called"
    busid = socket.assigns["busid"]
    pid = Bustracker.BusinfoGens.bus_pid(busid)
    Bustracker.BusinfoGens.handle_leave(pid)
  end

  # Channels can be used in a request/response fashion
  # by sending replies to requests from the client
  def handle_in("ping", payload, socket) do
    {:reply, {:ok, payload}, socket}
  end

  # It is also common to receive messages from the client and
  # broadcast to everyone in the current topic (buses:lobby).
  def handle_in("shout", payload, socket) do
    broadcast socket, "shout", payload
    {:noreply, socket}
  end

  # Add authorization logic here as required.
  defp authorized?(_payload) do
    true
  end
end
