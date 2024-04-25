import React, { useState } from 'react';
import "./ChatSupport.css";

const ChatSupport = () => {
    const colors = ['red', 'blue', 'green', 'yellow', 'orange', 'purple', 'cyan', 'magenta'];
    const [clickedIndex, setClickedIndex] = useState(null);

    const handleCardClick = (index) => {
        setClickedIndex(index);
    };

    const getTextColor = (backgroundColor) => {
        // Convert the background color to RGB format
        const rgbColor = backgroundColor.match(/\d+/g);
        if (!rgbColor) return 'black';
    
        // Calculate the relative luminance of the color
        const luminance = (0.299 * rgbColor[0] + 0.587 * rgbColor[1] + 0.114 * rgbColor[2]) / 255;
    
        // Set the text color based on the luminance and adjust brightness for better contrast
        return luminance > 0.5 ? 'rgba(0, 0, 0, 0.8)' : 'rgba(255, 255, 255, 0.8)';
    };
    

    return (
        <div className="chat-main-div">
            <div className="columns-padding">
                <h4 className="card-title">Chats</h4>
                <div className='user-cards-container'>
                    {colors.map((color, index) => {
                        const cardStyle = {
                            backgroundColor: clickedIndex === index ? color : 'white',
                            filter: clickedIndex === index ? 'brightness(50%)' : 'brightness(100%)',
                            color: getTextColor(clickedIndex === index ? color : 'white'),
                        };

                        return (
                            <div
                                key={index}
                                className={`user-card ${clickedIndex === index ? 'active' : ''}`}
                                onClick={() => handleCardClick(index)}
                                style={cardStyle}
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
                        );
                    })}
                </div>
            </div>
        </div>
    );
};

export default ChatSupport;
