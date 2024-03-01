import React from 'react';
import "./SelectedTheme.css";
import { HiQrCode } from "react-icons/hi2";
import image_placeholder from "../../../assets/images/image_placeholder.png";
import ImageChecker from '../../../components/image-checker/ImageChecker';

import { useAppBridge, useNavigate } from '@shopify/app-bridge-react';
import { Fullscreen } from '@shopify/app-bridge/actions';


import { config } from 'process';

import {useDispatch} from "react-redux";
import { goFullScreen } from '../../../store/fullScreenSlice';

const SelectedTheme = (props) => {

    const dispatch = useDispatch();

	const navigate = useNavigate();

    const theTheme = props?.selectedTheme;

    const app = useAppBridge();

    const fullscreen = Fullscreen.create(app);




    const customize = () => {

        navigate('/app-design/customize');

        fullscreen.dispatch(Fullscreen.Action.ENTER);

        dispatch(goFullScreen());
    }




    return (
        <div className='theme-main-div'>

            <div className='left-main-card-div'>
                <div className='theme-name-main-div'>

                    <div className='live-text-main-div'>
                        <div className='the-live-dot'></div>
                        <div>Live</div>
                    </div>

                    <div className='them-name-text'><span>{theTheme?.name}</span></div>
                    {/* <div><p>Last saved: {props.themeUpdatedAt}</p></div> */}
                    <div className='update-date'><span>Last saved: Feb 5, 2024 at 3:31 pm</span></div>

                </div>

                <div className='buttons-main-div'>

                    <button className='customize-button-div' onClick={() => { customize() }}>Customize</button>
                    <button className='preview-button-div'><HiQrCode /> Preview on mobile</button>

                </div>

            </div>

            <div className='side-image-div'>

                <ImageChecker src={theTheme} cardImageCss={'images'} />

            </div>

        </div>
    )
}

export default SelectedTheme