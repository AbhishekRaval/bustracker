import store from './store';
import React from 'react';
import swal from 'sweetalert'
import {Socket} from "../../deps/phoenix/assets/js/phoenix";

class ApiFunctions {

    create_user(data, history) {
        let socket = new Socket("/socket", {params: {register: data}});
        socket.connect();
        socket.onError((resp) => {
            window.alert("Error in connection");
            socket.disconnect();
        });
        socket.onOpen(() => {
            this.fetch_information(socket);
            history.push("/");
        })
    }

    reconnect() {
        console.log("Trying to reconnect");
        if (localStorage.getItem("token") != null) {
            let token = localStorage.getItem("token");
            let socket = new Socket("/socket", {params: {token: token}});
            socket.connect();
            socket.onOpen(() => {
                this.fetch_information_without_token(socket, token);
            });

            socket.onError(() => {
                socket.disconnect();
            });
        }
    }

    fetch_bus_stops(channel, position)    {
        console.log("fetch bus stops called");
        let coordinates = {"latitude" : position.coords.latitude, "longitude" : position.coords.longitude};
        channel.push("bus_stops", coordinates).receive("ok", payload => {
          console.log("Callback called");
          console.log(payload);
            store.dispatch({
                type: "SET_BUS_STOPS",
                busStops: payload.bus_stops
            });
        });
    }

    fetch_bus(busStopId, position)  {
        // TODO
        // Fetch list of buses for this bus stop
    }

    submit_login(data, history) {
        let socket = new Socket("/socket", {params: {login: data}});
        socket.connect();
        socket.onError((resp) => {
            swal("Invalid Email or Password");
            socket.disconnect();
        });
        socket.onOpen(() => {
            this.fetch_information(socket);
        })
    }

    fetch_information_without_token(socket, token) {
        console.log("fetch_information_without_token");
        let channel = socket.channel("travellers:lobby");
        channel.join();
        store.dispatch({
            type: "SET_SESSION",
            token: token,
            channel: channel,
            socket: socket
        });
    }

    fetch_information(socket) {
        let channel = socket.channel("travellers:lobby");
        channel.join();
        channel.push("token").receive("ok", payload => {
            localStorage.setItem("token", payload.token);
            store.dispatch({
                type: "SET_SESSION",
                token: payload.token,
                channel: channel,
                socket: socket
            });
        });
    }

    fetch_favourites(channel)    {
        channel.push("fetchfavs").receive("ok", payload => {
            store.dispatch({
                type: "SET_FAVOURITES",
                favs: payload.favs
            })
        })
    }

    logout(socket, history) {
        store.dispatch({
            type: 'DELETE_SESSION',
        });
        store.dispatch({
            type: 'REMOVE_PROFILE',
        });
        localStorage.removeItem("token");
        history.push("/");
        socket.disconnect();
    }

    addFavourite(channel, data)  {
        channel.push("addfav", data).receive("ok", (resp) => {
            store.dispatch({
               type: "ADD_FAVOURITE",
               fav: resp.fav
            });
        });
    }

    removeFavourite(channel, data)  {
        channel.push("delfav", data).receive("ok", (resp) => {
            store.dispatch({
                type: "REMOVE_FAVOURITE",
                data: data
            });
        });
    }

    fetch_favourites_live_info(channel) {
        channel.push("fav_live_info").receive("ok", (resp) => {
            store.dispatch({
                type: "SET_FAVOURITES_LIVE",
                favs_live: resp.favs_live
            })
        })
    }

    fetch_live_information(channel) {
        console.log("Fetching Live Information");

        channel.push("fetchbusdata").receive("ok", (payload) => {
            console.log("Live data is" , payload);
            store.dispatch({
                type: "UPDATE_BUS_INFORMATION",
                bus: payload.bus,
                bus_stops: payload.all_stops,
                channel: channel
            })
        })

        channel.on("update_bus", (payload) => {

            store.dispatch({
                type: "UPDATE_BUS_INFORMATION",
                bus: payload.bus,
                bus_stops: payload.all_stops,
                channel: channel
            });
        })
    }

    fetch_results(channel, data)    {
        channel.push("bus_to_from", data).receive("ok", (resp) => {
             store.dispatch({
                     type: 'SET_RESULTS',
                     results: resp.results
             })
        });
    }

    fetch_auto_bus_stops(channel) {
        console.log("Fetch Auto bus stops");
        channel.push("auto_bus_stops").receive("ok", resp => {
            store.dispatch(
                {
                     type: 'SET_AUTO_BUS_STOPS',
                     bus_stops: resp.auto_bus_stops
                }
            )
        })
    }
}

export default new ApiFunctions();
