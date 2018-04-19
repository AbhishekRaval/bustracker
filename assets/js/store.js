import {createStore, combineReducers} from 'redux';
import deepFreeze from 'deep-freeze';

/*
*  state layout:
*  {
*   tasks: [... tasks ...],
*   users: [... Users ...],
*   form: {
*       user_id: "",
name: "",
description: "",
assigns_id: "",
complete: "",
timespent: ""
*   }
* }
*
* */

function users(state = [], action) {
    switch (action.type) {
        case 'USERS_LIST':
            return [...action.users];
        case 'ADD_USER':
            return [action.user, ...state];
        default:
            return state;
    }
}

let empty_form = {
    user_id: "",
    name: "",
    description: "",
    complete: "",
    timespent: ""
};

function form(state = empty_form, action) {
    switch (action.type) {
        case 'UPDATE_FORM':
            return Object.assign({}, state, action.data);
        case 'CLEAR_FORM':
            return Object.assign({}, state, empty_form);
        case 'SET_TOKEN':
            return Object.assign({}, state, action.token);
        default:
            return state;
    }
}

function edit_form(state = empty_form, action) {
    switch (action.type) {
        case 'UPDATE_TASK':
            return Object.assign({}, state, action.data);
        case 'POPULATE_TASK':
            return Object.assign({}, state, action.task);
        case 'CLEAR_EDIT_FORM':
            return Object.assign({}, state, empty_form);
        case 'SET_TOKEN':
            return Object.assign({}, state, action.token);
        default:
            return state;
    }
}

var initialSession = null;

function session(state = initialSession, action) {
    switch (action.type) {
        case 'SET_SESSION':
            return Object.assign({}, {token: action.token},
                {channel: action.channel}, {socket: action.socket});
        case 'DELETE_SESSION':
            return null;
        default:
            return state;
    }
}


let user_profile = {
    username: "",
    emailid: "",
    phonenum: "",
    favs: []
};

function profile(state = user_profile, action) {
    switch (action.type) {
        case 'SET_PROFILE':
            return Object.assign({}, state, action.profile);
        case 'REMOVE_PROFILE':
            return user_profile;
        // case 'SET_FAVOURITES':
        //     return Object.assign({}, state, {favs: action.favs});
        // case 'ADD_FAVOURITE':
        //     return Object.assign({}, state, {favs: [action.fav, ...state.favs]})
        // case 'REMOVE_FAVOURITE':
        //     let favs = state.favs.filter(fav => !(fav.route_id === action.data.route_id))
        //     return Object.assign({}, state, {favs: favs})
        default:
            return state;
    }
}

function favourite(state = {favs: [], favs_live: []}, action)  {
    switch (action.type)    {
        case 'ADD_FAVOURITE':
            return Object.assign({}, state, {favs: [action.fav, ...state.favs]});
        case 'SET_FAVOURITES':
            return Object.assign({}, state, {favs: action.favs});
        case 'REMOVE_FAVOURITE':
            let favs = state.favs.filter(fav => !(fav.route_id === action.data.route_id))
            return Object.assign({}, state, {favs: favs})
        case 'SET_FAVOURITES_LIVE':
            return Object.assign({}, state, {favs_live: action.favs_live});
        default:
            return state;
    }
}

let empty_login = {
    emailid: "",
    password: "",
};

let empty_reg = {
    username: "",
    emailid: "",
    phonenum: "",
    password: ""
};

function login(state = empty_login, action) {
    switch (action.type) {
        case 'UPDATE_LOGIN_FORM':
            return Object.assign({}, state, action.data);
        default:
            return state;
    }
}

function register(state = empty_reg, action) {
    switch (action.type) {
        case 'UPDATE_REGISTER_FORM':
            return Object.assign({}, state, action.data);
        default:
            return state;
    }
}


var list_of_stops = {
    busStops: []
}

function listStops(state = list_of_stops, action) {
    switch (action.type) {
        case 'SET_BUS_STOPS':
            return Object.assign({}, state, {busStops: action.busStops});
        case 'SET_LOCATION':
            return Object.assign({}, state, {coords: action.coords});
        default:
            return state;
    }
}

function bus_live(state = {}, action)   {
    switch (action.type)    {
        case 'UPDATE_BUS_INFORMATION':
            return Object.assign({}, {bus: action.bus}, {bus_stops: action.bus_stops}, {channel: action.channel});
        case 'CLEAR_BUS_LIVE':
            return {};
        default:
            return state;
    }
}

function root_reducer(state0, action) {
    let reducer = combineReducers({users, form, edit_form, login, register, profile, session, listStops, favourite, bus_live});
    let state1 = reducer(state0, action);
    return state1;
};

let store = createStore(root_reducer);
export default store;

//Source: http://www.ccs.neu.edu/home/ntuck/courses/2018/01/cs4550/notes/20-redux/notes.html
