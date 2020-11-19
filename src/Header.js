import React from 'react';
import ArrowForwardIcon from '@material-ui/icons/ArrowForward';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import HistoryIcon from '@material-ui/icons/History';
import HelpOutlineIcon from '@material-ui/icons/HelpOutline';
import './Header.css';
import { Avatar, Tooltip } from '@material-ui/core';
import { useStateValue } from './StateProvider';
function Header() {
    const [{user},dispatch] = useStateValue()
    return (
        <div className="header">
            <div className="header__left">
                <Tooltip title="Back">
                    <ArrowBackIcon className="header__left__backIcon" />
                </Tooltip>
                <Tooltip title="Forward">
                    <ArrowForwardIcon className="header__left__frontIcon" />
                </Tooltip>
                <Tooltip title="History">
                    <HistoryIcon className="header__left__historyIcon" />
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
                   <Avatar className="header__right__avatar" src = {user?.photoURL}/> 
                </Tooltip> 
                </div>
                
                
            </div>
        </div>
    )
}

export default Header
