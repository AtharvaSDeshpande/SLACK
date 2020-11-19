import React from 'react'
import { auth, provider } from './firebase'
import './Login.css'
import { choices } from './reducer';
import { useStateValue } from './StateProvider'
function Login() {
    const [{user},dispatch] = useStateValue();
    const signin = async () => {
        await auth.signInWithPopup(provider).then((result) => {
            dispatch({
                type: choices.SET_USER,
                user: result.user,
            })
        }).catch((error) => alert(error.message));;
    }
    return (
        <div className = "login">
            <div className = "login__box">
                <img src = "https://a.slack-edge.com/bv1-8/slack_logo-ebd02d1.svg"/>
                <h1>Sign in to Slack</h1>
                <p>Continue with Google account.</p>
                <input type = "button" value = "Continue with Google" onClick = {signin}/>
            </div>
        </div>
    )
}

export default Login
