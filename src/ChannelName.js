import React from 'react'
import './ChannelName.css'
import { Link } from 'react-router-dom';
function ChannelName({id,name}) {
    return (
        <div className = "channelName">
            <Link className="channelName__link" to={`/channels/${id}`}>
                <p># &nbsp;&nbsp; {name}</p>
            </Link>
        </div>
   )
}

export default ChannelName
