import React from 'react'
import Sidebar from './Sidebar'
import './Main.css';
import Channel from './Channel';
import { Route, Switch } from 'react-router-dom';
import slacklogo from '../src/images/icon_slack.svg';
import Friend from "./Friend";
function Main() {
    return (
        <div className = "main">
            <Sidebar/>
            <Switch>
                <Route path = "/channels/:channelId">
                   <Channel/>
                </Route>
                <Route path = "/friends/:friendId">
                     <Friend/>
                </Route>
                <Route path = "/">
                    <div className = "main__info">
                        <div>
                             <div className = "main__info__logo">
                                  <img src = {slacklogo} alt = "Slack-Logo"/>
                             </div>
                            
                        <p>This is a slack clone created using React js. The channels created here are common to all the users. You can create a new channel or start a new conversation. To create a new channel/start a new conversation select the respective icon from the sidebar. Or select the required channel/conversation.  </p>
                    
                        </div>
                       </div>
                </Route>
                
            </Switch>
            
        </div>
    )
}

export default Main
