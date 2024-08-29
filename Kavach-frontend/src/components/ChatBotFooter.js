import React from 'react';
import IndiaLogo from '../assets/india.svg'

const ChatBotFooter = ({ name }) => {
    return (
        <div>
            <img style={{ height: "20px", width: "20px", display: "inline" }} className='IndiaLogo' src={IndiaLogo} alt='Indialogo' /> Made for <b>{name}</b>
        </div>
    )
}

export default ChatBotFooter