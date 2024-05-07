import React, { Suspense, useCallback, useState } from 'react';
import "./ChatSupport.css";
import { Icon, Spinner, TextField } from '@shopify/polaris';
import {
    SendIcon
} from '@shopify/polaris-icons';

const ChatSupport = () => {



    const users = [
        { username: 'User 1', message: 'Hello there!', timeStamp: '03: 15 pm' },
        { username: 'User 2', message: 'How are you?', timeStamp: '05: 15 am' },
        // Add more users as needed
    ];

    const colors = ['lightgray', 'magenta', 'cyan', 'green', 'yellow', 'blue', 'red', 'purple'];

    const [clickedCard, setclickedCard] = useState(null);
    const [selectedCardColor, setselectedCardColor] = useState(null);



    const [clickedIndex, setClickedIndex] = useState(null);

    const handleCardClick = (index, cardDetails, theColor) => {
        setClickedIndex(index);
        setclickedCard(cardDetails);
        setselectedCardColor(theColor);
    };

    const getTextColor = (backgroundColor) => {
        // Convert the background color to RGB format
        const rgbColor = backgroundColor.match(/\d+/g);
        if (!rgbColor) return 'black';

        // Calculate the relative luminance of the color
        const luminance = (0.299 * rgbColor[0] + 0.587 * rgbColor[1] + 0.114 * rgbColor[2]) / 255;

        // Set the text color based on the luminance for better contrast
        return luminance > 0.5 ? 'rgba(0, 0, 0, 0.8)' : 'rgba(255, 255, 255, 0.8)';
    };




    const [AdminMessage, setAdminMessageHandle] = useState('');
    const [errorAdminMessageMessage, setErrorAdminMessageMessage] = useState('');

    const handleAdminMessageTextFieldChange = useCallback(
        (value) => {


            setAdminMessageHandle(value);


            if (!isValidAdminMessageHandle(value)) {
                setErrorAdminMessageMessage("Invalid text input");
            } else {
                setErrorAdminMessageMessage("");
            }
        },
        [],
    );




    function isValidAdminMessageHandle(input) {
        if (!input) {
            return false;
        }

        if (!/\D/.test(input)) {
            return false;
        }

        const regex = /^[a-zA-Z0-9 !@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]*$/;
        if (!regex.test(input)) {
            return false;
        }

        const words = input.trim().split(/\s+/);
        if (words.length > 500) {
            return false;
        }

        return true;
    }





    return (
        <Suspense fallback={<div style={{ textAlign: 'center' }}><Spinner size="large" color="teal" /></div>}>

            <div className="chat-main-div">
                <div className="columns-padding">
                    <h1 className="card-title">Chats</h1>
                    <div className='user-cards-container'>
                        {users.map((user, index) => {
                            const cardStyle = {
                                backgroundColor: clickedIndex === index ? '#f1f1f1' : 'white',
                                color: getTextColor(clickedIndex === index ? colors[index % colors.length] : 'white'),
                            };

                            const usernameStyle = {
                                color: 'black',

                            };

                            const messageStyle = {
                                color: 'grey',
                            };


                            const UsernameLetterStyle = {
                                color: 'black',
                                border: clickedIndex === index ? `1px solid ${colors[index % colors.length]}` : '1px solid grey',
                                backgroundColor: clickedIndex === index ? colors[index % colors.length] : 'white',
                            };

                            return (
                                <div
                                    key={index}
                                    className={`user-card ${clickedIndex === index ? 'active' : ''}`}
                                    onClick={() => handleCardClick(index, user, colors[index % colors.length])}
                                    style={cardStyle}
                                >
                                    <div
                                        className="user-letter-text"
                                        style={UsernameLetterStyle}

                                    >
                                        <p>{user.username[0].toUpperCase()}</p>
                                    </div>
                                    <div className='user-name-user-message' >
                                        <div className='user-name' style={usernameStyle}>{user.username}</div>
                                        <div className='user-message' style={messageStyle}>{user.message}</div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>




                <div className="vertical-line"></div>


                {
                    clickedCard ?

                        <div className='message-body-main-div'>

                            <div className='user-selected-card-main-div'>

                                <div className="user-letter-text" style={{ color: 'black', backgroundColor: selectedCardColor }}>
                                    <p>{clickedCard && clickedCard?.username[0].toUpperCase()}</p>
                                </div>

                                <div className='user-name' >{clickedCard?.username}</div>

                            </div>


                            <div className="horizontal-line"></div>


                            <div>
                                <label style={{marginLeft:'10px'}}>{clickedCard?.username}</label>
                                <div className='clicked-user-message'>

                                    <p>{clickedCard?.message}</p>
                                    <p style={{ textAlign: 'right' }}>{clickedCard?.timeStamp}</p>

                                </div>

                            </div>


                            <div className='admin-message-container-div'>
                                <div className='support-executive-label'><label >Support executive</label></div>
                                <div className='admin-messages'>
                                    <p>{clickedCard?.message}</p>
                                    <p style={{ textAlign: 'right' }}>{clickedCard?.timeStamp}</p>


                                </div>

                            </div>

                            <div className='message-box-container'>

                                <div className='message-box'>

                                    <textarea
                                        rows={1}
                                        cols={50}
                                        value={AdminMessage}
                                        onChange={(e) => handleAdminMessageTextFieldChange(e.target.value)}
                                        placeholder='Reply to the customer here...'
                                    />

                                    <div className='send-btn'>
                                        <Icon
                                            source={SendIcon}
                                            tone="info"
                                        />
                                    </div>

                                </div>
                            </div>




                        </div>

                        :

                        <div style={{ textAlign: 'center' }}><label>Select a user query to respond</label></div>
                }

            </div>
        </Suspense>
    );
};

export default ChatSupport;
