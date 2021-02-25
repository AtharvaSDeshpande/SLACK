import React from 'react'
import  { auth, provider } from './firebase'
import './Login.css'
import { choices } from './reducer';
import { useStateValue } from './StateProvider'
import slacklogo from '../src/images/icon_slack.svg';
function Login() {
    const [{user},dispatch] = useStateValue();
    const signin = async () => {
        await auth.signInWithPopup(provider).then((result) => {
            dispatch({
                type: choices.SET_USER,
                user: result.user,
            })
            
        }).catch((error) => alert(error.message));
        
    }
    return (
        <div className = "login">
            <div className = "login__box">
                <img src = {slacklogo} alt = "Slack-logo"/>
                <h1>Sign in to Slack</h1>
                <p>Continue with Google account.</p>
                <input type = "button" value = "Continue with Google" onClick = {signin}/>
            </div>
        </div>
    )
}

export default Login
