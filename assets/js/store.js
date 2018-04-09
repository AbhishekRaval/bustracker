import {createStore, combineReducers} from 'redux';

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

function tasks(state = [], action) {
  switch (action.type) {
    case 'TASKS_LIST':
      return [...action.tasks];
    case 'ADD_TASK':
      return [action.task, ...state];
    case 'REMOVE_TASK':
      const newState = Object.assign([], state);
      const indexOfTaskToDelete = state.findIndex(tasks => {
         return tasks.id == action.task
       })
       newState.splice(indexOfTaskToDelete, 1);
       return newState;
    case 'UPDATE_TASK_IN_FEED':
      const newState2 = Object.assign([], state);
      const indexOfTaskToUpdate = state.findIndex(tasks => {
         return tasks.id == action.task.id
       })
       newState2.splice(indexOfTaskToUpdate, 1);
      return [action.task, ...newState2];
    default:
      return state;
  }
}

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

function edit_form(state = empty_form,action){
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

function token(state = null, action) {
  switch (action.type) {
    case 'SET_TOKEN':
      return action.token;
    default:
      return state;
  }
}

let empty_login = {
  name: "",
  email: "",
  pass: "",
};

let empty_reg = {
  name: "",
  email: "",
  password: "",
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


function root_reducer(state0, action) {
  // console.log("reducer", action);
  // {tasks, users, form} is ES6 shorthand for
  // {tasks: tasks, users: users, form: form}
  let reducer = combineReducers({tasks, users, form, edit_form, login, token,register});
  let state1 = reducer(state0, action);
  // console.log("state1", state1);
  return state1;
};

let store = createStore(root_reducer);
export default store;

//Source: http://www.ccs.neu.edu/home/ntuck/courses/2018/01/cs4550/notes/20-redux/notes.html
