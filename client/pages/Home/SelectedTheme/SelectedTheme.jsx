import React from 'react';
import "./SelectedTheme.css";
import { HiQrCode } from "react-icons/hi2";
import image_placeholder from "../../../assets/images/image_placeholder.png";
import ImageChecker from '../../../components/image-checker/ImageChecker';

const SelectedTheme = (props) => {

    const theTheme = props?.selectedTheme;

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

                    <button className='customize-button-div'>Customize</button>
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