import React from 'react';
import "./PopupEditPlaceholder.css";


const PopupEditPlaceholder = (props) => {
    return (
      <div className='editPopupContainer' >
          <div class="dnd-column dnd-column3">
           
                <div className='placeholder-icon'>
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="50"
                        height="50"
                        viewBox="0 0 14 14"
                        fill="none"
                    >
                        <path
                            fill-rule="evenodd"
                            clip-rule="evenodd"
                            d="M4.25 0.5C2.17893 0.5 0.5 2.17893 0.5 4.25V9.75C0.5 11.8211 2.17893 13.5 4.25 13.5H9.75C11.8211 13.5 13.5 11.8211 13.5 9.75V4.25C13.5 2.17893 11.8211 0.5 9.75 0.5H4.25ZM2 4.25C2 3.00736 3.00736 2 4.25 2H7.5V5H2V4.25ZM9 2H9.75C10.9926 2 12 3.00736 12 4.25V8H9V2ZM9 9.5V12H9.75C10.9926 12 12 10.9926 12 9.75V9.5H9ZM7.5 6.5V12H4.25C3.00736 12 2 10.9926 2 9.75V6.5H7.5Z"
                            fill="#4A4A4A"
                        />
                    </svg>
                    <p >Click on a block to customize it here.</p>
                </div>
         
        </div>
      </div>
    )
}

export default PopupEditPlaceholder