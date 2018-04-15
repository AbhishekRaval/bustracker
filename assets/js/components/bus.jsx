import React from 'react';
import {Button} from 'reactstrap';

export default function bus(props)  {

    function addFav()   {
        // TODO
        // api.addFavourite();
    }

    return <div>
        <span>Bus Heading Towards: {props.bus.hs}</span>
        <Button onClick={addFav} >Add To Favourite</Button>
    </div>;
}