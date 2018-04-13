import React from 'react';
import {Link} from 'react-router-dom';

function User(params) {
  return <p>{params.user.name}
    <Link to={"/users/" + params.user.id}>Tasks by {params.user.name}</Link>
  </p>;
}

export default function Users(params) {
  let users = _.map(params.users, (uu) => <User key={uu.id} user={uu}/>);
  return <div>
    {users}
  </div>;
}
