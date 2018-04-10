import store from './store';
import React from 'react';
import swal from 'sweetalert'
import {Socket} from "../../deps/phoenix/assets/js/phoenix";

class ApiFunctions {
  request_tasks() {
    $.ajax("/api/v1/tasks", {
      method: "get",
      dataType: "json",
      contentType: "application/json; charset=UTF-8",
      success: (resp) => {
        store.dispatch({type: 'TASKS_LIST', tasks: resp.data});
      }
    });
  }

  request_users() {
    $.ajax("/api/v1/users", {
      method: "get",
      dataType: "json",
      contentType: "application/json; charset=UTF-8",
      success: (resp) => {
        store.dispatch({type: 'USERS_LIST', users: resp.data});
      }
    });
  }

  create_user(data,history){
     let socket = new Socket("/socket", {params: {register: data}});
     socket.connect().success((resp) => {
       console.log("Socket Connection successful");
       // TODO
     })
         .error(err => {
             console.log("Socket Connection not successful");
             // TODO
         })
  }

    reconnect(token,history){
        let socket = new Socket("/socket", {params: {token: token}});
        socket.connect().success((resp) => {
            console.log("Socket Connection successful");
            // TODO
        })
            .error(err => {
                console.log("Socket Connection not successful");
                // TODO
            })
    }

  // submit_post(data) {
  //   $.ajax("/api/v1/tasks", {
  //     method: "post",
  //     dataType: "json",
  //     contentType: "application/json; charset=UTF-8",
  //     data: JSON.stringify({ token: data.token, task: data}),
  //     success: (resp) => {
  //       swal("Created Task: " + resp.data.name + "successfully");
  //       store.dispatch({type: 'ADD_TASK', task: resp.data});
  //     },
  //      error: () => {swal("Failed to post, Make sure you don't mask data, or keep Unsatiable Input");}
  //   });
  // }

  submit_login(data,history) {
      let socket = new Socket("/socket", {params: {login: data}});
      socket.connect().success((resp) => {
          console.log("Socket Connection successful");
          // TODO
      })
          .error(err => {
              console.log("Socket Connection not successful");
              // TODO
          })
  }


  update_task(data, id) {
    $.ajax("/api/v1/tasks" + "/" + id, {
      method: "put",
      dataType: "json",
      contentType: "application/json; charset=UTF-8",
      data: JSON.stringify({task: data}),
      success: (resp) => {
        swal("Updated Task: " + resp.data.name +  " successfully");
        //console.log(resp.data);
        store.dispatch({type: 'UPDATE_TASK_IN_FEED', task: resp.data});
      },
       error: () => {swal("Failed to post, None of the fields should be empty");}
    });
  }

  populate_task_details(id){
    $.ajax("/api/v1/tasks" + "/" + id, {
      method: "get",
      dataType: "json",
      contentType: "application/json; charset=UTF-8",
      data: "",
      success: (resp) => {
        let taskFormatted ={
          user_id: resp.data.user.id,
          name: resp.data.name,
          description: resp.data.description,
          assigns_id: resp.data.assigns.id,
          complete: resp.data.complete,
          timespent: resp.data.timespent,
          task_id: resp.data.id
        };
        store.dispatch({type: 'POPULATE_TASK', task: taskFormatted});
      },
     error: () => {swal("Failed to fetch post, try again later");}
    });
  }

    reset_token(){
      store.dispatch({
        type: 'SET_TOKEN',
        token: "",
      });
    }

  delete_task(data, id) {
    $.ajax("/api/v1/tasks" + "/" + id, {
      method: "delete",
      dataType: "json",
      contentType: "application/json; charset=UTF-8",
      data: "",
      success: (resp) => {
        swal("Deleted Task successfully");
        store.dispatch({type: 'REMOVE_TASK', task: id});
      },
     error: () => {swal("Failed to Delete, some Error Occurred");}
    });
  }
}

export default new ApiFunctions();
