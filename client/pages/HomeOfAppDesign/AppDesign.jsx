import React, { useEffect } from 'react';
import HomeTab from './AppDesign/HomeTab/HomeTab';
import { BiLogOut } from "react-icons/bi";
import { HiQrCode } from "react-icons/hi2";

import "./AppDesign.css";
import { useAppBridge } from '@shopify/app-bridge-react';
import { Fullscreen } from '@shopify/app-bridge/actions';
import { useNavigate } from '@shopify/app-bridge-react';
import { Button, ButtonGroup, Divider, Tooltip } from '@shopify/polaris';

import { SkeletonTabs, SkeletonThumbnail } from '@shopify/polaris';
import { useState, useCallback } from 'react';

import { useDispatch, useSelector } from "react-redux";
import { exitFullScreen } from '../../store/fullScreenSlice';
import { pageNotRefreshed, pageRefreshed } from '../../store/appDesignPageRefreshedSlice';


const AppDesign = (props) => {

  const dispatch = useDispatch();

  const isFullScreen = useSelector(state => state.fullScreenMode);


  const [internetStatus, setInternetStatus] = useState(false);




  useEffect(() => {
    // Check and set fullscreen mode from localStorage


    setInternetStatus(window.navigator.onLine);


  });



  useEffect(() => {

    const navigationType = window.performance.navigation.type;
    console.log("Navigation type:", navigationType);
    const isPageRefreshed = navigationType === 1; // 1 corresponds to TYPE_RELOAD
    console.log("Is page refreshed?", isPageRefreshed);

    // Dispatch the appDesignPageRefreshed action
    if (isPageRefreshed) {
      dispatch(pageRefreshed());
    }

  }, []);


  const navigate = useNavigate();

  const app = useAppBridge();

  const fullscreen = Fullscreen.create(app);

  const exit = () => {

    fullscreen.dispatch(Fullscreen.Action.EXIT);

    navigate("/app-design");

    dispatch(exitFullScreen());
    dispatch(pageNotRefreshed());

  }

  // make this or another main home component and add the tab components
  // and header and all


  const [selected, setSelected] = useState(0);

  const handleTabChange = useCallback(
    (selectedTabIndex) => setSelected(selectedTabIndex),
    [],
  );

  const tabs = [
    {
      id: 'all-customers-1',
      content: 'Home',
      accessibilityLabel: 'All customers',
      panelID: 'all-customers-content-1',
      contentBody: <HomeTab />,
    },
    {
      id: 'accepts-marketing-2',
      content: 'Product page',
      panelID: 'accepts-marketing-content-2',
      contentBody: <HomeTab />,
    },
    {
      id: 'repeat-customers-3',
      content: 'Search',
      panelID: 'repeat-customers-content-3',
      contentBody: <HomeTab />,
    },
    {
      id: 'prospects-4',
      content: 'Cart',
      panelID: 'prospects-content-4',
      contentBody: <HomeTab />,
    },
    {
      id: 'prospects-5',
      content: 'Account',
      panelID: 'prospects-content-5',
      contentBody: <HomeTab />,
    },
  ];


  const [activeIndex, setActiveIndex] = useState(0);

  const handleButtonClick = (index) => {
    setActiveIndex(index);
  };


  const [activeSideNavIndex, setActiveSideNavIndex] = useState(0);

  const handleSideNavButtonClick = (index) => {
    setActiveSideNavIndex(index);
  };


  return (
    <div className='appdesign-main-div'>
      <div className='appdesign-header'>

        <div className='appdesign-left-header-nav'>
          <Tooltip content="Exit" preferredPosition="mostSpace">
            <div>
              <BiLogOut onClick={() => { exit() }} className='appdesign-logout-btn' />
            </div>
          </Tooltip>
          <div className='appdesign-theme-name-text'><span>Theme Name</span></div>
          <div className='appdesign-live-text'>Live</div>

        </div>

        <div className='appdesign-right-header-buttons'>


          <div><Button variant='tertiary' textAlign='center' icon={<HiQrCode className='appdesign-qr' />}>Preview on mobile</Button></div>
          {/* <div className='appdesign-preview-btn'><HiQrCode className='appdesign-qr'/> Preview on mobile</div> */}
          <button className="appdesign-publish-btn">Publish changes</button>

        </div>

      </div>


      {/* <hr className='appdesign-hr-line' /> */}
      <div className='appdesign-hr-line' >
        <Divider />
      </div>


      <div className='appdesign-body-main-div'>

        {internetStatus && internetStatus ?

          <div className='appdesign-body-side-menu-icons'>
            <Tooltip content="App design" preferredPosition="mostSpace">

              <div className={`appdesign-icon-btn ${activeSideNavIndex === 0 ? 'active' : ''}`} onClick={() => handleSideNavButtonClick(0)}><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="-3 0 18 10" fill="none">
                <path d="M4.5 10C4.08579 10 3.75 10.3358 3.75 10.75C3.75 11.1642 4.08579 11.5 4.5 11.5H7.5C7.91421 11.5 8.25 11.1642 8.25 10.75C8.25 10.3358 7.91421 10 7.5 10H4.5Z" fill="#4A4A4A" />
                <path fill-rule="evenodd" clip-rule="evenodd" d="M2.75 0C1.23122 0 0 1.23122 0 2.75V11.25C0 12.7688 1.23122 14 2.75 14H9.25C10.7688 14 12 12.7688 12 11.25V2.75C12 1.23122 10.7688 0 9.25 0H2.75ZM1.5 2.75C1.5 2.05964 2.05964 1.5 2.75 1.5H9.25C9.94036 1.5 10.5 2.05964 10.5 2.75V11.25C10.5 11.9404 9.94036 12.5 9.25 12.5H2.75C2.05964 12.5 1.5 11.9404 1.5 11.25V2.75Z" fill="#4A4A4A" />
              </svg>
              </div>
            </Tooltip>

            <Tooltip content="Branding" preferredPosition="mostSpace">

              <div className={`appdesign-icon-btn ${activeSideNavIndex === 1 ? 'active' : ''}`} onClick={() => handleSideNavButtonClick(1)}><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="-2 0 18 10" fill="none">
                <path fill-rule="evenodd" clip-rule="evenodd" d="M4.25 0.5C2.17893 0.5 0.5 2.17893 0.5 4.25V9.75C0.5 11.8211 2.17893 13.5 4.25 13.5H5.25C5.66421 13.5 6 13.1642 6 12.75C6 12.3358 5.66421 12 5.25 12H4.25C3.00736 12 2 10.9926 2 9.75V6.5H7.5V9.25C7.5 9.66421 7.83579 10 8.25 10C8.66421 10 9 9.66421 9 9.25V2H9.75C10.9926 2 12 3.00736 12 4.25V5.25C12 5.66421 12.3358 6 12.75 6C13.1642 6 13.5 5.66421 13.5 5.25V4.25C13.5 2.17893 11.8211 0.5 9.75 0.5H4.25ZM7.5 2V5H2V4.25C2 3.00736 3.00736 2 4.25 2H7.5Z" fill="#4A4A4A" />
                <path d="M14.0298 9.37113C14.2251 9.17587 14.2251 8.85929 14.0298 8.66402L12.9691 7.60336C12.7739 7.4081 12.4573 7.4081 12.262 7.60336L11.3049 8.56048L13.0727 10.3282L14.0298 9.37113Z" fill="#4A4A4A" />
                <path d="M12.3656 11.0354L10.5978 9.26759L8.14885 11.7166C7.77548 12.0899 7.56491 12.5958 7.56307 13.1238L7.56065 13.8217C7.56017 13.9604 7.67277 14.073 7.81152 14.0725L8.50934 14.0701C9.03736 14.0683 9.54324 13.8577 9.91662 13.4843L12.3656 11.0354Z" fill="#4A4A4A" />
              </svg>
              </div>
            </Tooltip>

            <Tooltip content="Navigation" preferredPosition="mostSpace">

              <div className={`appdesign-icon-btn ${activeSideNavIndex === 2 ? 'active' : ''}`} onClick={() => handleSideNavButtonClick(2)}>
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 15" fill="none">
                  <path fill-rule="evenodd" clip-rule="evenodd" d="M3.5 5.25C3.5 4.2835 4.2835 3.5 5.25 3.5H14.75C15.7165 3.5 16.5 4.2835 16.5 5.25V6.75C16.5 7.7165 15.7165 8.5 14.75 8.5H5.25C4.2835 8.5 3.5 7.7165 3.5 6.75V5.25ZM5.25 5C5.11193 5 5 5.11193 5 5.25V6.75C5 6.88807 5.11193 7 5.25 7H14.75C14.8881 7 15 6.88807 15 6.75V5.25C15 5.11193 14.8881 5 14.75 5H5.25Z" fill="#4A4A4A" />
                  <path d="M3.5 11.25C3.5 10.2835 4.2835 9.5 5.25 9.5H5.75C6.16421 9.5 6.5 9.83579 6.5 10.25C6.5 10.6642 6.16421 11 5.75 11H5.25C5.11193 11 5 11.1119 5 11.25V11.75C5 12.1642 4.66421 12.5 4.25 12.5C3.83579 12.5 3.5 12.1642 3.5 11.75V11.25Z" fill="#4A4A4A" />
                  <path d="M3.5 14.75C3.5 15.7165 4.2835 16.5 5.25 16.5H5.75C6.16421 16.5 6.5 16.1642 6.5 15.75C6.5 15.3358 6.16421 15 5.75 15H5.25C5.11193 15 5 14.8881 5 14.75V14.25C5 13.8358 4.66421 13.5 4.25 13.5C3.83579 13.5 3.5 13.8358 3.5 14.25V14.75Z" fill="#4A4A4A" />
                  <path d="M14.75 9.5C15.7165 9.5 16.5 10.2835 16.5 11.25V11.75C16.5 12.1642 16.1642 12.5 15.75 12.5C15.3358 12.5 15 12.1642 15 11.75V11.25C15 11.1119 14.8881 11 14.75 11H14.25C13.8358 11 13.5 10.6642 13.5 10.25C13.5 9.83579 13.8358 9.5 14.25 9.5H14.75Z" fill="#4A4A4A" />
                  <path d="M14.75 16.5C15.7165 16.5 16.5 15.7165 16.5 14.75V14.25C16.5 13.8358 16.1642 13.5 15.75 13.5C15.3358 13.5 15 13.8358 15 14.25V14.75C15 14.8881 14.8881 15 14.75 15H14.25C13.8358 15 13.5 15.3358 13.5 15.75C13.5 16.1642 13.8358 16.5 14.25 16.5H14.75Z" fill="#4A4A4A" />
                  <path d="M11.75 10.25C11.75 10.6642 11.4142 11 11 11H9C8.58579 11 8.25 10.6642 8.25 10.25C8.25 9.83579 8.58579 9.5 9 9.5H11C11.4142 9.5 11.75 9.83579 11.75 10.25Z" fill="#4A4A4A" />
                  <path d="M11 16.5C11.4142 16.5 11.75 16.1642 11.75 15.75C11.75 15.3358 11.4142 15 11 15H9C8.58579 15 8.25 15.3358 8.25 15.75C8.25 16.1642 8.58579 16.5 9 16.5H11Z" fill="#4A4A4A" />
                </svg>
              </div>
            </Tooltip>
          </div>

          :

          <div className='appdesign-side-skeleton'>

            <SkeletonThumbnail size="small" />
            <SkeletonThumbnail size="small" />
            <SkeletonThumbnail size="small" />


          </div>



        }


        <div><hr className='appdesign-hr-line-left' /></div>

        {/* <div className='appdesign-tabs-div'> */}


        <div style={{ width: '100%' }}>
          {internetStatus ?


            <div className='appdesign-tab-menu'>
              <div className='appdesign-tabs-buttons-div'>

                <button className={`appdesign-tab-btn ${activeIndex === 0 ? 'active' : ''}`} onClick={() => handleButtonClick(0)}>Home</button>
                <button className={`appdesign-tab-btn ${activeIndex === 1 ? 'active' : ''}`} onClick={() => handleButtonClick(1)}>Product page</button>
                <button className={`appdesign-tab-btn ${activeIndex === 2 ? 'active' : ''}`} onClick={() => handleButtonClick(2)}>Search</button>
                <button className={`appdesign-tab-btn ${activeIndex === 3 ? 'active' : ''}`} onClick={() => handleButtonClick(3)}>Cart</button>
                <button className={`appdesign-tab-btn ${activeIndex === 4 ? 'active' : ''}`} onClick={() => handleButtonClick(4)}>Account</button>
              </div>

              <div>

                <ButtonGroup>
                  <Button>Cancel</Button>
                  <Button variant="primary">Save</Button>
                </ButtonGroup>

              </div>

            </div>






            // <Tabs
            //   tabs={tabs}
            //   selected={selected}
            //   onSelect={handleTabChange}
            //   disclosureText="More views"

            // >
            //   <LegacyCard.Section title={tabs[selected].content}>
            //     {tabs[selected].contentBody}
            //   </LegacyCard.Section>

            // </Tabs>



            :

            <div className='appdesign-tab-menu'>

              <SkeletonTabs count={4} />

            </div>
          }
          <div className='appdesign-hr-line'>
            <Divider />
          </div>

          <div>
            {activeIndex === 0 ? <HomeTab />

              : activeIndex === 1 ? 'Product page'

                : activeIndex === 2 ? 'Search'
                  : activeIndex === 3 ? 'Cart'
                    : activeIndex === 4 ? 'Account'
                      : ''
            }
          </div>


        </div>

        {/* <div className='appdesign-cancel-save-btns-div'>
            <ButtonGroup>
              <Button>Cancel</Button>
              <Button variant="primary">Save</Button>
            </ButtonGroup>
          </div> */}

        {/* </div> */}






      </div>

    </div>
  );
};

export default AppDesign;