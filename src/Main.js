import React from 'react'
import Messages from './Messages'
import Sidebar from './Sidebar'
import './Main.css';
import Channel from './Channel';
import { Route, Switch } from 'react-router-dom';
import slacklogo from '../src/images/icon_slack.svg';
function Main() {
    return (
        <div className = "main">
            <Sidebar/>
            <Switch>
                <Route path = "/channels/:channelId">
                    <Channel/>
                </Route>
                <Route path = "/">
                    <div className = "main__info">
                        <img src = {slacklogo}/>
                        
                        <p>This is a slack clone created using React js. To create a new channel click on New Channel (+) Icon or select the required channel. </p>
                    </div>
                </Route>
                
            </Switch>
            
        </div>
    )
}

export default Main
