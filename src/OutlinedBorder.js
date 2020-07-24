import React from 'react';

function OutlinedBorder(props) {
  return (
    <div className={'OutlinedBorder OutlinedBorder-' + props.color}>
      {props.pre}
      {props.children}
    </div>
  );
}

export default OutlinedBorder;
