import React from 'react';

//display validate messages
function ValidateMessage(props) {
  if (!props.valid){
    return <div className='errorMsg '>{props.message}</div>
  }
  return null;
}

export default ValidateMessage;