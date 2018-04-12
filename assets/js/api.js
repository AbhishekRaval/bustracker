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
            })
        }
    }

    fetch_bus_stops(channel, position)    {
        var coordinates = {"latitude" : position.coords.latitude, "longitude" : position.coords.longitude};
        channel.push("bus_stops", coordinates).receive("ok", payload => {
            console.log(payload);
            store.dispatch({
                type: "SET_BUS_STOPS",
                busStops: payload.bus_stops
            });
        });
    }

    submit_login(data, history) {
        let socket = new Socket("/socket", {params: {login: data}});
        socket.connect();
        socket.onError((resp) => {
            window.alert("Error in connection");
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

    logout(socket, history) {

        store.dispatch({
            type: 'DELETE_SESSION',
        });
        localStorage.removeItem("token");
        history.push("/");
        socket.disconnect();
    }
}

export default new ApiFunctions();
