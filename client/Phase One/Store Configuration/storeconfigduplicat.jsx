import React, { useEffect } from 'react';
import { Button, Divider, TextField } from '@shopify/polaris';
import { useState, useCallback } from 'react';
import "./StoreConfigurations.css";
import { Icon } from '@shopify/polaris';
import {
    LogoFacebookIcon,
    LogoInstagramIcon,
    LogoXIcon,
    LogoYoutubeIcon
} from '@shopify/polaris-icons';

import axios from "axios";
import useFetch from '../../hooks/useFetch';


const StoreConfigurations = () => {



    //start of instagram handle
    const [instagramHandle, setInstagramHandle] = useState('');
    const [InstagramerrorMessage, setInstagramErrorMessage] = useState('');

    const handleInstagramTextFieldChange = useCallback(
        (value) => {
            setInstagramHandle(value);
            // Check if the handle is not valid and set error message accordingly
            if (!isValidInstagramHandle(value)) {
                setInstagramErrorMessage("Not a valid Instagram handle");
            } else {
                setInstagramErrorMessage(""); // Clear error message if handle is valid
            }
        },
        [],
    );


    const handleInstagramClearButtonClick = useCallback(() => setInstagramHandle(''), []);






    function isValidInstagramHandle(handle) {
        // Regular expression pattern to match Instagram handle
        const regex = /^(https:\/\/)?(www\.)?instagram\.com\/[a-zA-Z0-9._]{1,30}$/;

        // Check if the handle matches the pattern
        return regex.test(handle);
    }


    //end of instagram handle







    //start of facebook handle
    const [FacebookHandle, setFacebookHandle] = useState('');
    const [FacebookerrorMessage, setFacebookErrorMessage] = useState('');

    const handleFacebookTextFieldChange = useCallback(
        (value) => {
            setFacebookHandle(value);
            // Check if the handle is not valid and set error message accordingly
            if (!isValidFacebookHandle(value)) {
                setFacebookErrorMessage("Not a valid Facebook handle");
            } else {
                setFacebookErrorMessage(""); // Clear error message if handle is valid
            }
        },
        [],
    );


    const handleFacebookClearButtonClick = useCallback(() => setFacebookHandle(''), []);




    function isValidFacebookHandle(handle) {
        // Regular expression pattern to match Instagram handle
        const regex = /^(https:\/\/)?(www\.)?facebook\.com\/[a-zA-Z0-9._]{1,30}$/;

        // Check if the handle matches the pattern
        return regex.test(handle);
    }


    //end of facebook handle




    //start of twitter handle
    const [TwitterHandle, setTwitterHandle] = useState('');
    const [TwittererrorMessage, setTwitterErrorMessage] = useState('');

    const handleTwitterTextFieldChange = useCallback(
        (value) => {
            setTwitterHandle(value);
            // Check if the handle is not valid and set error message accordingly
            if (!isValidTwitterHandle(value)) {
                setTwitterErrorMessage("Not a valid Twitter handle");
            } else {
                setTwitterErrorMessage(""); // Clear error message if handle is valid
            }
        },
        [],
    );


    const handleTwitterClearButtonClick = useCallback(() => setTwitterHandle(''), []);




    function isValidTwitterHandle(handle) {
        // Regular expression pattern to match Instagram handle
        const regex = /^(https:\/\/)?(www\.)?twitter\.com\/[a-zA-Z0-9._]{1,30}$/;

        // Check if the handle matches the pattern
        return regex.test(handle);
    }


    //end of twitter handle





    //start of youtube handle
    const [youtubeHandle, setyoutubeHandle] = useState('');
    const [erroryoutubeMessage, setErroryoutubeMessage] = useState('');

    const handleyoutubeTextFieldChange = useCallback(
        (value) => {
            setyoutubeHandle(value);
            if (!isValidyoutubeHandle(value)) {
                setErroryoutubeMessage("Not a valid YouTube handle");
            } else {
                setErroryoutubeMessage("");
            }
        },
        [],
    );


    const handleyoutubeClearButtonClick = useCallback(() => setyoutubeHandle(''), []);




    function isValidyoutubeHandle(handle) {
        // Regular expression pattern to match Instagram handle
        const regex = /^(https:\/\/)?(www\.)?youtube\.com\/[a-zA-Z0-9._]{1,30}$/;

        // Check if the handle matches the pattern
        return regex.test(handle);
    }


    //end of youtube handle




    //store policy section


    //PrivacyPolicy
    const [PrivacyPolicy, setPrivacyPolicyHandle] = useState('');
    const [errorPrivacyPolicyMessage, setErrorPrivacyPolicyMessage] = useState('');

    const handlePrivacyPolicyTextFieldChange = useCallback(
        (value) => {
            setPrivacyPolicyHandle(value);
            if (!isValidPrivacyPolicyHandle(value)) {
                setErrorPrivacyPolicyMessage("Invalid text input");
            } else {
                setErrorPrivacyPolicyMessage("");
            }
        },
        [],
    );


    const handlePrivacyPolicyClearButtonClick = useCallback(() => setPrivacyPolicyHandle(''), []);


    function isValidPrivacyPolicyHandle(input) {
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







    //TermsConditions
    const [TermsConditions, setTermsConditionsHandle] = useState('');
    const [errorTermsConditionsMessage, setErrorTermsConditionsMessage] = useState('');

    const handleTermsConditionsTextFieldChange = useCallback(
        (value) => {
            setTermsConditionsHandle(value);
            if (!isValidTermsConditionsHandle(value)) {
                setErrorTermsConditionsMessage("Invalid text input");
            } else {
                setErrorTermsConditionsMessage("");
            }
        },
        [],
    );


    const handleTermsConditionsClearButtonClick = useCallback(() => setTermsConditionsHandle(''), []);


    function isValidTermsConditionsHandle(input) {
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





    //ReturnPolicy
    const [ReturnPolicy, setReturnPolicyHandle] = useState('');
    const [errorReturnPolicyMessage, setErrorReturnPolicyMessage] = useState('');

    const handleReturnPolicyTextFieldChange = useCallback(
        (value) => {
            setReturnPolicyHandle(value);
            if (!isValidReturnPolicyHandle(value)) {
                setErrorReturnPolicyMessage("Invalid text input");
            } else {
                setErrorReturnPolicyMessage("");
            }
        },
        [],
    );


    const handleReturnPolicyClearButtonClick = useCallback(() => setReturnPolicyHandle(''), []);


    function isValidReturnPolicyHandle(input) {
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







    //Shipping Policy
    const [ShippingPolicy, setShippingPolicyHandle] = useState('');
    const [errorShippingPolicyMessage, setErrorShippingPolicyMessage] = useState('');

    const handleShippingPolicyTextFieldChange = useCallback(
        (value) => {
            setShippingPolicyHandle(value);
            if (!isValidShippingPolicyHandle(value)) {
                setErrorShippingPolicyMessage("Invalid text input");
            } else {
                setErrorShippingPolicyMessage("");
            }
        },
        [],
    );


    const handleShippingPolicyClearButtonClick = useCallback(() => setShippingPolicyHandle(''), []);


    function isValidShippingPolicyHandle(input) {
        // Check if input is null or empty
        if (!input) {
            return false;
        }

        // Check if input contains at least one non-numeric character
        if (!/\D/.test(input)) {
            return false;
        }

        // Check if input contains only alphanumeric characters and symbols
        const regex = /^[a-zA-Z0-9 !@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]*$/;
        if (!regex.test(input)) {
            return false;
        }

        // Split the input into words and count the number of words
        const words = input.trim().split(/\s+/);
        if (words.length > 500) {
            return false;
        }

        return true;
    }












    const [selectedTab, setSelectedTab] = useState('social');

    const handleTabClick = (tab) => {
        setSelectedTab(tab);
    };




    return (
        <div className='storeconfig-main-div'>


            <div className='storeconfig-header-div'>
                <div className='storeconfig-header-tabs-main-div'>
                    <button className={`storeconfig-social-tab-btn ${selectedTab === 'social' ? 'active' : ''}`} onClick={() => handleTabClick('social')}>Social Media Accounts</button>
                    <button className={`storeconfig-store-policy-tab-btn ${selectedTab === 'policy' ? 'active' : ''}`} onClick={() => handleTabClick('policy')}>Store Policies</button>

                </div>

                <Divider borderColor="border" />
            </div>
            {

                selectedTab === 'social' ?
                    <div className='storeconfig-social-media-section-container'>
                        <div className='storeconfig-social-media-section-main-div'>

                            <div className='storeconfig-instagram-main-div'>

                                <div className='storeconfig-social-icons'><Icon source={LogoInstagramIcon} tone="critical" /></div>

                                <div>Instagram</div>
                                <div className='text-inputs'>

                                    <TextField
                                        className="social-textfields"
                                        clearButton
                                        autoSize
                                        value={instagramHandle}
                                        onChange={handleInstagramTextFieldChange}
                                        onClearButtonClick={handleInstagramClearButtonClick}
                                        error={InstagramerrorMessage} autoComplete="off"
                                        placeholder='Add your Instagram handle here'
                                    />



                                    <TextField
                                        clearButton
                                        autoSize

                                        value={youtubeHandle}
                                        onChange={handleyoutubeTextFieldChange}
                                        onClearButtonClick={handleyoutubeClearButtonClick}
                                        error={erroryoutubeMessage}
                                        autoComplete="off"
                                        placeholder='Add your YouTube handle here'
                                    />

                                </div>

                            </div>


                            <div className='storeconfig-instagram-main-div'>

                                <div className='storeconfig-social-icons'><Icon source={LogoFacebookIcon} tone="info" /></div>
                                <div>Facebook</div>
                                <div className='text-inputs'>

                                    <TextField
                                        clearButton
                                        autoSize
                                        value={FacebookHandle}
                                        onChange={handleFacebookTextFieldChange}
                                        onClearButtonClick={handleFacebookClearButtonClick}
                                        error={FacebookerrorMessage} autoComplete="off"
                                        placeholder='Add your Facebook handle here'
                                    />


                                </div>

                            </div>

                            <div className='storeconfig-instagram-main-div'>

                                <div className='storeconfig-social-icons'><Icon source={LogoXIcon} tone="primary" /></div>
                                <div>X (Twitter)</div>
                                <div className='text-inputs'>

                                    <TextField
                                        clearButton
                                        autoSize
                                        value={TwitterHandle}
                                        onChange={handleTwitterTextFieldChange}
                                        onClearButtonClick={handleTwitterClearButtonClick}

                                        error={TwittererrorMessage} autoComplete="off"
                                        placeholder='Add your X (witter) handle here'
                                    />


                                </div>

                            </div>

                            <div className='storeconfig-instagram-main-div'>

                                <div className='storeconfig-social-icons'><Icon source={LogoYoutubeIcon} tone="critical" /></div>
                                <div>YouTube</div>
                                <div className='text-inputs'>

                                    <TextField
                                        clearButton
                                        autoSize

                                        value={youtubeHandle}
                                        onChange={handleyoutubeTextFieldChange}
                                        onClearButtonClick={handleyoutubeClearButtonClick}
                                        error={erroryoutubeMessage}
                                        autoComplete="off"
                                        placeholder='Add your YouTube handle here'
                                    />


                                </div>



                            </div>

                            <div className='save-btn-div'><button className='save-btn' size='large'>save</button></div>


                        </div>

                    </div>


                    :

                    (<div className='store-policies-main-div'>
                        <div className='policy-main-div'>


                            <h2>Privacy Policy</h2>
                            <div className='text-inputs'>

                                <TextField
                                    multiline={4}
                                    loading
                                    clearButton
                                    autoSize
                                    value={PrivacyPolicy}
                                    onChange={handlePrivacyPolicyTextFieldChange}
                                    onClearButtonClick={handlePrivacyPolicyClearButtonClick}

                                    error={errorPrivacyPolicyMessage} autoComplete="off"
                                    placeholder='Add your privacy policy here'
                                />


                            </div>
                            <div className='policy-save-btn-div'>
                                <button className='policy-save-btn' size='small'>save</button>
                            </div>
                        </div>



                        <div className='policy-main-div'>


                            <h2>Terms and Conditions</h2>
                            <div className='text-inputs'>

                                <TextField
                                    multiline={4}
                                    loading
                                    clearButton
                                    autoSize
                                    value={TermsConditions}
                                    onChange={handleTermsConditionsTextFieldChange}
                                    onClearButtonClick={handleTermsConditionsClearButtonClick}

                                    error={errorTermsConditionsMessage} autoComplete="off"
                                    placeholder='Add your Terms and Conditions here'
                                />


                            </div>
                            <div className='policy-save-btn-div'>
                                <button className='policy-save-btn' size='small'>save</button>
                            </div>
                        </div>



                        <div className='policy-main-div'>


                            <h2>Return Policy</h2>
                            <div className='text-inputs'>

                                <TextField
                                    multiline={4}
                                    loading
                                    clearButton
                                    autoSize
                                    value={ReturnPolicy}
                                    onChange={handleReturnPolicyTextFieldChange}
                                    onClearButtonClick={handleReturnPolicyClearButtonClick}

                                    error={errorReturnPolicyMessage} autoComplete="off"
                                    placeholder='Add your return policy here'
                                />


                            </div>
                            <div className='policy-save-btn-div'>
                                <button className='policy-save-btn' size='small'>save</button>
                            </div>
                        </div>



                        <div className='policy-main-div'>


                            <h2>Shipping Policy</h2>
                            <div className='text-inputs'>

                                <TextField
                                    multiline={4}
                                    loading
                                    clearButton
                                    autoSize
                                    value={ShippingPolicy}
                                    onChange={handleShippingPolicyTextFieldChange}
                                    onClearButtonClick={handleShippingPolicyClearButtonClick}

                                    error={errorShippingPolicyMessage} autoComplete="off"
                                    placeholder='Add your shipping policy here'
                                />


                            </div>
                            <div className='policy-save-btn-div'>
                                <button className='policy-save-btn' size='small'>save</button>
                            </div>
                        </div>


                    </div>)

            }


        </div>


    )
}

export default StoreConfigurations