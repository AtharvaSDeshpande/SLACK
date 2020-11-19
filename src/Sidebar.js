import React, { useEffect, useState } from 'react'
import './Sidebar.css'
import AddBoxIcon from '@material-ui/icons/AddBox';
import { Tooltip } from '@material-ui/core';
import ChannelName from './ChannelName';
import db from './firebase';
function Sidebar() {
    const[channels,setChannels]= useState([]);
    const addNewChannel = () => {
        const channelName = prompt("Enter Channel Name")
        if (channelName) {
            db.collection("channels").add({name: channelName});
        }
    }
    useEffect(()=>{
       db.collection("channels").onSnapshot((snapshot)=>{
           setChannels(snapshot.docs.map(doc=>(
               {
                   id: doc.id,
                   data: doc.data(),
               }
           )))
       }) 
    },[]);
    return (
        <div className = "sidebar">
            <div className = "sidebar__header">
                <p className = "sidebar__header__title">Workspace</p>
                <Tooltip title = "New Channel">
                    <AddBoxIcon onClick = {addNewChannel}/>
                </Tooltip>
            </div>
            <div className = "sidebar__channels">
                <b>Channels : </b>
                
                {channels.map(channel=>(
                    
                        <ChannelName id = {channel.id} name = {channel.data.name}/>
                 
                   
                ))}
            </div>
        </div>
    )
}

export default Sidebar
