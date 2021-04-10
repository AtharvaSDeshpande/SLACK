import React, { useEffect, useState } from 'react'
import './Sidebar.css'
import AddBoxIcon from '@material-ui/icons/AddBox';
import AddIcon from '@material-ui/icons/Add';
import { Tooltip } from '@material-ui/core';
import ChannelName from './ChannelName';
import db from './firebase';
import FriendName from './FriendName';
import { useStateValue } from './StateProvider';
function Sidebar() {
    const[channels,setChannels]= useState([]);
    const [friends,setFriends] = useState([]);
    const [{user},dispatch] = useStateValue();
    const addNewChannel = () => {
        const channelName = prompt("Enter Channel Name")
        if (channelName) {
            db.collection("channels").add({name: channelName});
        }
    }
    const addNewFriend = () => {
        const friendId = prompt("Enter EmailId")
        const friendName = prompt("Enter Name")
        if (friendId) {
            // db.collection("users").doc(friendId)?.onSnapshot(snapshot=>(setNewFriendName(snapshot.data().name)));
            db.collection("users").doc(friendId).collection("friends").doc(user.email).set(
                {
                    name: user.displayName,
                    email: user.email
                }
            );
            db.collection("users").doc(user.email).collection("friends").doc(friendId).set(
                {
                    name: friendName,
                    email: friendId
                }
            )
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
        });
        db.collection("users").doc(user.email).collection("friends").onSnapshot((snapshot)=>{
        setFriends(snapshot.docs.map(doc=>(
            {
                id: doc.id,
                data: doc.data(),
            }
        )))
    });
    },[]);
    return (
        <div className = "sidebar">
            <div className = "sidebar__header highlight">
                <p className = "sidebar__header__title">Workspace</p>
                
                
            </div>
            <div className = "sidebar__header">
                <p className = "sidebar__header__title">Channels: </p>
                <Tooltip title = "New Channel">
                    <AddBoxIcon onClick = {addNewChannel}/>
                </Tooltip>
            </div>
            <div className = "sidebar__channels">
           
                
                {channels.map(channel=>(
                    
                        <ChannelName id = {channel.id} name = {channel.data.name}/>
                 
                   
                ))}
            </div>
            <div className = "sidebar__header">
                <p className = "sidebar__header__title">Messages: </p>
                <Tooltip title = "New Conversation">
                    <AddIcon onClick = {addNewFriend}/>
                </Tooltip>
                </div>
            <div className = "sidebar__channels">
            
                {friends.map(channel=>(
                        <FriendName id = {channel.id} name = {channel.data.name}/>
                ))}
            </div>
        </div>
    )
}

export default Sidebar
