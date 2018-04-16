// Brunch automatically concatenates all files in your
// watched paths. Those paths can be configured at
// config.paths.watched in "brunch-config.js".
//
// However, those files will only be executed if
// explicitly imported. The only exception are files
// in vendor, which are never wrapped in imports and
// therefore are always executed.

// Import dependencies
//
// If you no longer want to use a dependency, remember
// to also remove its path from "config.paths.watched".
import "phoenix_html"

// Import local files
//
// Local files can be imported directly using relative
// paths "./socket" or full ones "web/static/js/socket".

 import socket from "./socket"

 // import game_demo from "./grid"; // FIXME: change the name of the function


  //let channel = socket.channel("travellers:lobby",{} )
  let channel1 = socket.channel("buses:"+"y1772")
  channel1.join()
  
  channel1.on("update_bus", payload => {
    console.log("bus",payload.bus);
    console.log("count",payload.count);

  })

  //game_demo(root, channel); // FIXME: pass all required channels


 // Use jQuery to delay until page loaded.
