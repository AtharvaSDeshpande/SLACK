import React, { useEffect, useState } from 'react'
import './Channel.css'
import InfoIcon from '@material-ui/icons/Info';
import PersonAddIcon from '@material-ui/icons/PersonAdd';
import Messages from './Messages';
import { useStateValue } from './StateProvider';
import { useParams } from 'react-router-dom';
import db, { timeStamp } from './firebase';
function Channel() {
    const {channelId} = useParams();
    const [channelName,setChannelName] = useState();
    const [sendPlaceholder,setSendPlaceholder] = useState('');
    const [{user},dispatch] = useStateValue();
    const [input,setInput] = useState('');
    const [messages,setMessages] = useState([]);
    const getMessages = async ()=> {
            await db.collection("channels").doc(channelId).onSnapshot(snapshot=>(setChannelName(snapshot.data().name)));
            await db.collection("channels").doc(channelId).collection("messages").orderBy('timestamp',"asc").onSnapshot((snapshot)=>{
               setMessages(snapshot.docs.map(doc=>doc.data()))
           })
    }
    const send = (e) => {
        e.preventDefault();
        if (input!='')
        {
            db.collection("channels").doc(channelId).collection("messages").add(
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
        if (channelId)
        {
            getMessages();
            setSendPlaceholder("Send a message to #" + channelName);
        }
    },[channelId,channelName])
    return (
        <div className = "channel">
            <div className = "channel__header">
                {channelName?(<h1>{channelName}</h1>):( <h1>Channel Name</h1>)}
                <div>
                    <PersonAddIcon/>
                    <InfoIcon/>

                </div>
            </div>
            <div className = "channel__messages">
                
                {messages.map(message=>(
                    <Messages sendersName = {user.displayName} message = {message.message} photoURL = {message.photoURL} email = {message.email} timestamp = {message.timestamp}/>
                ))}
                {/* <Messages sendersName = "Anonymous" message = "Lorem ipsum dolor sit amet consectetur adipisicing elit. Repellat aut perspiciatis, laudantium officia aliquam voluptatum cupiditate dolore quasi consectetur quo magnam distinctio numquam dicta iste rerum nihil veritatis praesentium obcaecati."/>
                <Messages sendersName = "Atharva Deshpande" message = "Whats Up"/> */}

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

export default Channel
