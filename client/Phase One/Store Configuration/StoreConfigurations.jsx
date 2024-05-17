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

    const [successMessageVisible, setSuccessMessageVisible] = useState(false);
    const [errorMessageVisible, setErrorMessageVisible] = useState(false);


    const useDataFetcher = (initialState, url, options) => {

        const [data, setData] = useState(initialState);

        const fetch = useFetch();

        const fetchData = async () => {

            setData("");

            try {
                const result = await (await fetch(url, options)).json();
                console.log("result after updating the social media: ", result);
                if (!result.success)
                    window.alert(result.message);

                setData(result);
                setIsLoading(false);


                setTimeout(() => {
                    setSuccessMessageVisible(false);
                }, 3000);
                //window.alert("successfully updated")


            } catch (error) {

                setErrorMessageVisible(true);
                setTimeout(() => {
                    setErrorMessageVisible(false);
                }, 5000);

                console.error("Error while updating data: ", error.message);
                // Handle error here, such as setting an error state or displaying a message to the user
            }
        };

        return [data, fetchData];
    };



    const [socialMedia, setSocialMedia] = useState([
        { title: 'instagram', profileUrl: '' },
        { title: 'facebook', profileUrl: '' },
        { title: 'twitter', profileUrl: '' },
        { title: 'youTube', profileUrl: '' },

    ]);



    const postOptions = {
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
        },
        method: "PUT",
        body: socialMedia && JSON.stringify({ socialMedia }),
    };


    const [responseFromServer, publishChanges] = useDataFetcher(
        "",
        "/apps/api/store/social-media",
        postOptions
    );





    const [errorMessages, setErrorMessages] = useState(Array(socialMedia.length).fill(''));


    function validateHandle(title, handle) {
        let regex;
        // Define title-specific regular expressions
        switch (title.toLowerCase()) {
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


    const handleSocialMediaChange = useCallback((index, value, title) => {
        setSocialMedia(prevSocialMedia => {
            const updatedSocialMedia = [...prevSocialMedia];
            updatedSocialMedia[index].profileUrl = value;
            return updatedSocialMedia;
        });

        setErrorMessages(prevErrorMessages => {
            const updatedErrorMessages = [...prevErrorMessages];
            updatedErrorMessages[index] = validateHandle(title, value) ? '' : 'Invalid handle format';
            return updatedErrorMessages;
        });
    }, [validateHandle]);

    const [isLoading, setIsLoading] = useState(false);


    const handleSaveButtonClick = async () => {

        setIsLoading(true);
        setSuccessMessageVisible(true);


        // Check if there are any validation errors before sending the request
        if (errorMessages.some(msg => msg)) {
            console.log('Validation errors:', errorMessages);
            return;
        }

        try {
            // const response = await axios.put('apps/api/store/social-media', { socialMedia });
            publishChanges();

            console.log('Social media updated successfully:', responseFromServer);
            //setIsLoading(false);


        } catch (error) {
            console.error('Error updating social media:', error);
            // Handle errors
        }
    };





    //store policy section


    const [policies, setPolicies] = useState({
        shopPolicies: [
            { type: 'PRIVACY_POLICY', body: '' },
            { type: 'REFUND_POLICY', body: '' },
            { type: 'TERMS_OF_SERVICE', body: '' },
            { type: 'SHIPPING_POLICY', body: '' },
            { type: 'CONTACT_INFORMATION', body: '' },
        ]
    });

    //PRIVACY_POLICY , CONTACT_INFORMATION ,REFUND_POLICY ,TERMS_OF_SERVICE ,SHIPPING_POLICY

    const [errors, setErrors] = useState(Array(policies.shopPolicies.length).fill(''));

    const handleTextFieldChange = useCallback((index, value) => {
        setPolicies(prevPolicies => {
            const updatedPolicies = { ...prevPolicies };
            updatedPolicies.shopPolicies[index].body = value;
            return updatedPolicies;
        });
        setErrors(prevErrors => {
            const updatedErrors = [...prevErrors];
            updatedErrors[index] = validatePolicy(value) ? '' : 'Invalid text input';
            return updatedErrors;
        });
    }, []);



    const validatePolicy = (input) => {
        if (!input) {
            return false;
        }
        // Your validation logic here
        return true;
    };


    const policyUpdateOptions = {
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
        },
        method: "PUT",
        body: socialMedia && JSON.stringify({ policies }),
    };


    const [policyResponseFromServer, publishPolicyChanges] = useDataFetcher(
        "",
        "apps/api/shopify/update-shop-policies",
        policyUpdateOptions
    );



    const handlePolicySaveButtonClick = async () => {
        const isValid = policies?.shopPolicies.every(policy => validatePolicy(policy.body));
        if (!isValid) {
            console.log('Validation errors:', errors);
            return;
        }

        try {
            // Perform PUT request with policies
            publishPolicyChanges();

            console.log('Policies:', policyResponseFromServer);
        } catch (error) {
            console.error('Error updating policies:', error);
            window.alert("Error updating policies");
            // Handle errors
        }
    };





    const [selectedTab, setSelectedTab] = useState('social');

    const handleTabClick = (tab) => {
        setSelectedTab(tab);
    };

    function capitalizeFirstLetter(word) {
        console.log(word.charAt(0).toUpperCase() + word.slice(1));
        return word.charAt(0).toUpperCase() + word.slice(1);
    }




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
                                        {media.title === 'instagram' && <Icon source={LogoInstagramIcon} tone="critical" />}
                                        {media.title === 'facebook' && <Icon source={LogoFacebookIcon} tone="info" />}
                                        {media.title === 'twitter' && <Icon source={LogoXIcon} tone="primary" />}
                                        {media.title === 'youTube' && <Icon source={LogoYoutubeIcon} tone="critical" />}
                                    </div>
                                    <div>{capitalizeFirstLetter(media.title)}</div>
                                    <div className='text-inputs'>
                                        <TextField
                                            className="social-textfields"
                                            clearButton
                                            autoSize
                                            value={media.profileUrl}
                                            onChange={(value) => handleSocialMediaChange(index, value, media.title)}
                                            error={errorMessages[index]}
                                            placeholder={`Add your ${media.title} handle here`}
                                        />



                                    </div>
                                </div>
                            ))}
                            <div className='button-and-success-message'>
                                {successMessageVisible && (
                                    <div style={{ backgroundColor: 'green', color: 'white', padding: '4px', width: 'auto' }}>
                                        Social media updated successfully!
                                    </div>
                                )}

                                {errorMessageVisible && (
                                    <div style={{ backgroundColor: 'red', color: 'white', padding: '4px', width: 'auto' }}>
                                        Error updating social media. Please try again later.
                                    </div>
                                )}

                                <div className='save-btn-div'>
                                    <Button className='save-btn' size='large' onClick={handleSaveButtonClick}>{isLoading ? 'Saving...' : 'Save'}</Button>
                                </div>



                            </div>
                        </div>
                    </div>

                    :

                    (<div className='store-policies-main-div'>
                        {policies.shopPolicies.map((policy, index) => (
                            <div className='policy-main-div' key={index}>
                                <h2>{policy.type.split("_").join(" ")}</h2>
                                <div className='text-inputs'>
                                    <TextField
                                        multiline={4}
                                        clearButton
                                        autoSize
                                        value={policy.body}
                                        onChange={(newValue) => handleTextFieldChange(index, newValue)}
                                        error={errors[index]}
                                        autoComplete="off"
                                        placeholder={`Add your ${policy.type.split("_").join(" ").toLowerCase()} here`}
                                    />
                                </div>
                            </div>
                        ))}

                        <div className='policy-save-btn-div'>
                            <button className='policy-save-btn' size='small' onClick={handlePolicySaveButtonClick}>Save</button>
                        </div>
                    </div>)

            }
        </div>
    );
}

export default StoreConfigurations;