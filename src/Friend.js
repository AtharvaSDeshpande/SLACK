import React, { useEffect, useState } from 'react'
import './Channel.css'
import InfoIcon from '@material-ui/icons/Info';
import PersonAddIcon from '@material-ui/icons/PersonAdd';
import Messages from './Messages';
import { useStateValue } from './StateProvider';
import { useParams } from 'react-router-dom';
import db, { timeStamp } from './firebase';
import { Tooltip } from '@material-ui/core';
function Friend() {
    const {friendId} = useParams();
    const [channelName,setChannelName] = useState();
    const [sendPlaceholder,setSendPlaceholder] = useState('');
    const [{user},dispatch] = useStateValue();
    const [input,setInput] = useState('');
    const [messages,setMessages] = useState([]);
    const getMessages = async ()=> {
            await db.collection("users").doc(user.email).collection("friends").doc(friendId).onSnapshot(snapshot=>(setChannelName(snapshot.data().name)));
            await db.collection("users").doc(user.email).collection("friends").doc(friendId).collection("messages").orderBy('timestamp',"asc").onSnapshot((snapshot)=>{
               setMessages(snapshot.docs.map(doc=>doc.data()))
           })
    }
    const send = (e) => {
        e.preventDefault();
        if (input!=='')
        {
            if (friendId != user.email)
            {
                db.collection("users").doc(user.email).collection("friends").doc(friendId).collection("messages").add(
                {
                    message: input,
                    name: user.displayName,
                    email: user.email,
                    photoURL: user.photoURL,
                    timestamp: timeStamp,
                }
            )
            }
            
            db.collection("users").doc(friendId).collection("friends").doc(user.email).collection("messages").add(
                {
                    message: input,
                    name: user.displayName,
                    email: user.email,
                    photoURL: user.photoURL,
                    timestamp: timeStamp,
                }
            )
            setInput('');
        }
    }
    useEffect(()=>{
        if (friendId)
        {
            getMessages();
            setSendPlaceholder("Send a message to #" + channelName);
        }
    },[friendId,channelName])
    const rename = () => {
        const newName = prompt("Enter new name");
        if (newName)
        {
          db.collection("users").doc(user.email).collection("friends").doc(friendId).set({
            name: newName
        })  
        }
        
        //onSnapshot(snapshot=>(setChannelName(snapshot.data().name)));
    }
    return (
        <div className = "channel">
            <div className = "channel__header">
                <Tooltip title = "Rename">
                    {channelName?(<h1 onClick = {rename}>{channelName}</h1>):( <h1 onClick = {rename}>Channel Name</h1>)}
                </Tooltip>
               
                <div>
                    {/* <PersonAddIcon/> */}
                    <InfoIcon/>

                </div>
            </div>
            <div className = "channel__messages">
                
                {messages.map(message=>(
                    <Messages sendersName = {message.name} message = {message.message} photoURL = {message.photoURL} email = {message.email} timestamp = {message.timestamp}/>
                ))}
                {/* <Messages sendersName = "Anonymous" message = "Lorem ipsum dolor sit amet consectetur adipisicing elit. Repellat aut perspiciatis, laudantium officia aliquam voluptatum cupiditate dolore quasi consectetur quo magnam distinctio numquam dicta iste rerum nihil veritatis praesentium obcaecati."/>
                <Messages sendersName = "Atharva Deshpande" message = "Whats Up"/>
                */}
                


            </div>

            <div className = "channel__send">
                <form>
                    <input value={input} onChange={e => setInput(e.target.value)}  className = "sendMessage" type = "text" placeholder = {sendPlaceholder} />
                    <button onClick  = {send}>Send</button>
                </form>
                
            </div>

        </div>
    )
}

export default Friend;
