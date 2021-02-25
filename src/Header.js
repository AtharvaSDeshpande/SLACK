import React, { useEffect } from 'react';
import ArrowForwardIcon from '@material-ui/icons/ArrowForward';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';

import HelpOutlineIcon from '@material-ui/icons/HelpOutline';
import './Header.css';
import { Avatar, Tooltip } from '@material-ui/core';
import { useStateValue } from './StateProvider';
import { choices } from './reducer';
import db from './firebase';
import { Link } from 'react-router-dom';
function Header() {
    const [{user},dispatch] = useStateValue();
    const logout = () => {
        dispatch ({
           type: choices.RESET_USER,
           user: null 
        })
    }
    useEffect(()=>{
        if (user?.email !== " ")
        {
            db.collection("users").doc(user.email).set({
                email: user.email,
                name: user.displayName,
                photoURL: user.photoURL
            })
        }
    },[])
    return (
        <div className="header">
            <div className="header__left">
                <Tooltip title="Back">
                    <ArrowBackIcon className="header__left__backIcon" />
                </Tooltip>
                <Tooltip title="Forward">
                    <ArrowForwardIcon className="header__left__frontIcon" />
                </Tooltip>
                

                
                

            </div>
            <div className = "header__search">
            <input type="text" placeholder="Search" className="header__search__input" />

            </div>

            <div className="header__right">
                <Tooltip title="Help">
                    <HelpOutlineIcon className="header__left__helpIcon" />
                </Tooltip>
                <div>
                <Link to = "/">
                <Tooltip title="logout">
                   <Avatar className="header__right__avatar" src = {user?.photoURL} onClick = {logout}/> 
                </Tooltip> 
                </Link>
                
                </div>
                
                
            </div>
        </div>
    )
}

export default Header
