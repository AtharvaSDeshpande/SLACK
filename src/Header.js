import React from 'react';
import ArrowForwardIcon from '@material-ui/icons/ArrowForward';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';

import HelpOutlineIcon from '@material-ui/icons/HelpOutline';
import './Header.css';
import { Avatar, Tooltip } from '@material-ui/core';
import { useStateValue } from './StateProvider';
import { choices } from './reducer';
function Header() {
    const [{user},dispatch] = useStateValue();
    const logout = () => {
        dispatch ({
           type: choices.RESET_USER,
           user: null 
        })
    } 
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
                   <Tooltip title="logout">
                   <Avatar className="header__right__avatar" src = {user?.photoURL} onClick = {logout}/> 
                </Tooltip> 
                </div>
                
                
            </div>
        </div>
    )
}

export default Header
