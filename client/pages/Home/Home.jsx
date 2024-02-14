import React, { useEffect, useState } from 'react';
import "./Home.css";
import "./SelectedTheme/SelectedTheme.css"
import { FaWandMagicSparkles } from "react-icons/fa6";
import SelectedTheme from './SelectedTheme/SelectedTheme';
// import "./Home.scss";
import appImage from "../../assets/images/ascend.jpg"
import useFetch from "../../hooks/useFetch";
import image_placeholder from "../../assets/images/image_placeholder.png"
import ImageChecker from '../../components/image-checker/ImageChecker';
import blueSTImage from "../../assets/images/blue.jpg"


import onemobile_img from "../../assets/images/onemobile_img.png"


const Home = () => {

    const fetch = useFetch();

    const [themeData, setThemeData] = useState();
    const [selectedTheme, setSelectedTheme] = useState();

    useEffect(() => {

        async function fetchData() {
            const res = await fetch("/api/getAllTheme"); //fetch instance of useFetch()
            const data = await res.json();
            setThemeData(data?.data);
            setSelectedTheme(data?.data[0]);
        }

        fetchData();


    }, []);



    const cards = [{ image: { appImage }, themeName: 'Ascend', category: 'General', desc: 'A sense of growth and advancement, elevating businesses in various industries.' },
    { image: { appImage }, themeName: 'Ascend', category: 'General', desc: 'A sense of growth and advancement, elevating businesses in various industries.' },
    { image: { appImage }, themeName: 'Butterfly', category: 'General', desc: 'A sense of growth and advancement, elevating businesses in various industries.' },
    { image: { appImage }, themeName: 'RiseUp', category: 'Free', desc: 'A sense of growth and advancement, elevating businesses in various industries.' },
    { image: { appImage }, themeName: 'Growth', category: 'General', desc: 'A sense of growth and advancement, elevating businesses in various industries.' },
    { image: { appImage }, themeName: 'Home', category: 'Free', desc: 'A sense of growth and advancement, elevating businesses in various industries.' }]


    return (
        <div className='main-div'>

            <div className='header-main-div'>

                <div className='heading-div'>
                    <div className='solid-heading'><span>App Design</span></div>
                    <div><p>Customize layouts, colors and navigation to create a seamless shopping expereince.</p></div>
                </div>


                <button className='submission-btn'>
                    <FaWandMagicSparkles /> App Submission
                </button>

            </div>


            <div className='selected-theme-main-div'>

                <SelectedTheme selectedTheme={selectedTheme} />

            </div>


            <div className='themes-main-container-div'>

                <div className='the-texts-main-div'>

                    <div className='theme-text'>
                        <span>Themes</span>
                    </div>

                    <div className='theme-text-sub-heading'>
                        <span>Explore our popular themes. Choose a suitable one for your business and kickstart your ecommerce journey on the apps.</span>
                    </div>

                </div>


                <div className='theme-card-container'>
                    {
                        themeData?.map((res, index) => {

                            return (
                                <>
                                    <div className='theme-card' key={index}>
                                        <div style={{ position: 'relative' }}>
                                            {res?.type === 'payment' && (
                                                <div className="star"></div>
                                            )}
                                        </div>


                                        <div className='the-card-image-div'>
                                            <ImageChecker src={res} cardImageCss={'card-images'} cardImageDivCss={'the-card-image-div'} />
                                        </div>
                                        <div className='name-category-div'>
                                            <div className='name-and-desc'>
                                                <span className='theme-name'>{res?.name}</span>
                                                <span className='category-name'>{res?.plan}</span>
                                            </div>


                                            <span>{res?.description.split(' ').slice(0, 10).join(' ') + ".."}</span>
                                        </div>

                                        {res?.type.toLocaleLowerCase() === 'free' ?
                                            <div className='buttons-price-div'>
                                                <div className='buttons-div'>

                                                    <button className='card-buttons' onClick={() => setSelectedTheme(res)}>Publish</button>
                                                    <button className='card-buttons'>Customize</button>

                                                </div>


                                                <span>{res?.price ? <span style={{ color: 'green' }}>Rs.{res?.price}</span> : <span style={{ color: 'grey' }}>{res?.type}</span>}</span>


                                            </div>
                                            : <div className='buttons-div'>
                                                <button className='card-buttons'>Upgrade</button> <button className='card-buttons'>Try for free</button>
                                            </div>}
                                    </div>

                                </>
                            )
                        })
                    }

                </div>

            </div>


            <div className='contactus-main-div'>
                <div className='contactus-side-main-div'>
                    <div className='contactus-unique'><span>Need a unique theme?</span></div>
                    <div><span>Let's talk more about a custom-designed theme for your own business.</span></div>
                    <button className='card-buttons'>contact now!</button>

                </div>

                <div className='contactus-side-image'>
                    <img src={onemobile_img} alt="contactus-image" className='contactus-image'/>
                </div>
            </div>


        </div>
    )
}

export default Home