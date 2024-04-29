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
    const [socialMedia, setSocialMedia] = useState([
        { platform: 'Instagram', profileUrl: '' },
        { platform: 'Facebook', profileUrl: '' },
        { platform: 'Twitter', profileUrl: '' },
        { platform: 'YouTube', profileUrl: '' }
    ]);

    const [errorMessages, setErrorMessages] = useState(Array(socialMedia.length).fill(''));


    function validateHandle(platform, handle) {
        let regex;
        // Define platform-specific regular expressions
        switch(platform.toLowerCase()) {
            case 'instagram':
                regex = /^(https?:\/\/)?(www\.)?instagram\.com\/[a-zA-Z0-9._]{1,30}$/;
                break;
            case 'facebook':
                regex = /^(https?:\/\/)?(www\.)?facebook\.com\/[a-zA-Z0-9._]{1,30}$/;
                break;
            case 'twitter':
                regex = /^(https?:\/\/)?(www\.)?twitter\.com\/[a-zA-Z0-9._]{1,30}$/;
                break;
            case 'youtube':
                regex = /^(https?:\/\/)?(www\.)?youtube\.com\/[a-zA-Z0-9._]{1,30}$/;
                break;
            default:
                return false;
        }
    
        // Check if the handle matches the pattern
        return regex.test(handle);
    }
    

    const handleSocialMediaChange = useCallback((index, value, platform) => {
        setSocialMedia(prevSocialMedia => {
            const updatedSocialMedia = [...prevSocialMedia];
            updatedSocialMedia[index].profileUrl = value;
            return updatedSocialMedia;
        });

        setErrorMessages(prevErrorMessages => {
            const updatedErrorMessages = [...prevErrorMessages];
            updatedErrorMessages[index] = validateHandle(platform, value) ? '' : 'Invalid handle format';
            return updatedErrorMessages;
        });
    }, [validateHandle]);

    const handleSaveButtonClick = async () => {
        // Check if there are any validation errors before sending the request
        if (errorMessages.some(msg => msg)) {
            console.log('Validation errors:', errorMessages);
            return;
        }

        try {
            const response = await axios.put('apps/api/store/social-media', { socialMedia });
            console.log('Social media updated successfully:', response.data);
        } catch (error) {
            console.error('Error updating social media:', error);
            window.alert("Error updating social media");
            // Handle errors
        }
    };





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
                            {socialMedia.map((media, index) => (
                                <div className='storeconfig-social-media-main-div' key={index}>
                                    <div className='storeconfig-social-icons'>
                                        {media.platform === 'Instagram' && <Icon source={LogoInstagramIcon} tone="critical" />}
                                        {media.platform === 'Facebook' && <Icon source={LogoFacebookIcon} tone="info" />}
                                        {media.platform === 'Twitter' && <Icon source={LogoXIcon} tone="primary" />}
                                        {media.platform === 'YouTube' && <Icon source={LogoYoutubeIcon} tone="critical" />}
                                    </div>
                                    <div>{media.platform}</div>
                                    <div className='text-inputs'>
                                        <TextField
                                            className="social-textfields"
                                            clearButton
                                            autoSize
                                            value={media.profileUrl}
                                            onChange={(value) => handleSocialMediaChange(index, value, media.platform)}
                                            error={errorMessages[index]}
                                            placeholder={`Add your ${media.platform} handle here`}
                                        />



                                    </div>
                                </div>
                            ))}
                            <div className='save-btn-div'>
                                <Button className='save-btn' size='large' onClick={handleSaveButtonClick}>Save</Button>
                            </div>
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
    );
}

export default StoreConfigurations;