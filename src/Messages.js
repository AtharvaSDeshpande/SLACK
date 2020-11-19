import { Avatar, Tooltip } from '@material-ui/core'
import React from 'react'
import './Messages.css'
function Messages({sendersName,message,photoURL,email,timestamp}) {
    var dateAndTime;
    dateAndTime = new Date(timestamp?.toDate()).toDateString() + " at ";
    var time = new Date(timestamp?.toDate()).toTimeString().split("G");
    dateAndTime +=time[0];
    
    return (
        <div className = "messages">
            <div className = "messages__avatar"> 
                <Tooltip title = {email}>
                   <Avatar src = {photoURL}/> 
                </Tooltip>
                
            </div>
            <div className ="messages__details">
                <div className = "message__details__senders__nameAndTime">
                    <h4>{sendersName}</h4>
                    <p>{dateAndTime}</p>
                </div>
                
                <p>{message}</p>
            </div>
            
        </div>
    )
}

export default Messages
