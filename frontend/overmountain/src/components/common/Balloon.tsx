import React from 'react';

function Balloon(props: { message: string }) {
  return <div className="balloon">{props.message}</div>;
}

export default Balloon;
