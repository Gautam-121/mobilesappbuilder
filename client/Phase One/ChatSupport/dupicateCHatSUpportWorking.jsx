import React, { useState } from 'react';
import "./ChatSupport.css";

const ChatSupport = () => {
    const colors = ['red', 'blue', 'green', 'yellow', 'orange', 'purple', 'cyan', 'magenta'];
    const [clickedIndex, setClickedIndex] = useState(null);

    const handleCardClick = (index) => {
        setClickedIndex(index);
    };

    const getRandomColor = () => {
        const randomIndex = Math.floor(Math.random() * colors.length);
        return colors[randomIndex];
    };

    return (
        <div className="chat-main-div">
            <div className="columns-padding">
                <h4 className="card-title">Chats</h4>
                <div className='user-cards-container'>
                    {colors.map((color, index) => (
                        <div
                            key={index}
                            className={`user-card ${clickedIndex === index ? 'active' : ''}`}
                            onClick={() => handleCardClick(index)}
                            style={{ backgroundColor: clickedIndex === index ? color : 'white' }}
                        >
                            <div
                                className="user-letter-text"
                                style={{ backgroundColor: clickedIndex === index ? color : 'white' }}
                            >
                                <p>{color[0].toUpperCase()}</p>
                            </div>
                            <div className='user-name-user-message'>
                                <div className='user-name'>Username</div>
                                <div className='user-message'>Hello there. This is Username. Having an issue...</div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default ChatSupport;
