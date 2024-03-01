import React from "react";

import image_placeholder from "../../../../../assets/images/image_placeholder.png"

import "../DragAndDrop.css";

const Elements = 

[
    {
        id: 1,

        title: "Announcement bar",
        _order: 1,
        isVisible: false,
        displayOrder: 1,
        featureType: "announcement",
        layoutType: "horizontal",
        data: {
            id: 1,
            message: "Up to 50% off New Arrivals",
            textColor: "#000000",
            backgroundColor: "#FFFFFF",
            animationType: "Left To Right",
            updatedAt: "2024-02-21T07:42:55.041Z",
            createdAt: "2024-02-21T07:42:55.041Z"
        },
        style: {
            color: "#000000",
            backgroundColor: "#FFFFFF",
            border: "1px solid red",
            padding: '50px'
        },

        element: <div className='dnd-design-block-element-parent-div'>
        <div className='dnd-element-skeleton-div'>
            <div className='dnd-element-skeleton'></div>
            <div className='dnd-element-skeleton'></div>
            <div className='dnd-element-skeleton'></div>
        </div>
        
        </div>,
    },
    {
        id: 2,
        title: "Image banner slider",
        isVisible: true,
        _order: 2,
        displayOrder: 2,
        featureType: "banner",
        layoutType: "horizontal",
        data: {
            id: 2,

            images: [],
            backgroundColor: "#FE6100",
            updatedAt: "2024-02-21T07:42:55.041Z",
            createdAt: "2024-02-21T07:42:55.041Z"
        },
        element: <div className='dnd-design-block-element-parent-div'>
            <div className='dnd-banner-slider-skeleton-main-div'>
                <div className='dnd-banner-slider-skeleton'><img src={image_placeholder} className='banner-placeholder-image-placeholders' alt="banner-placeholder-iamge" /></div>
                <div className='dnd-banner-slider-skeleton'><img src={image_placeholder} className='banner-placeholder-image-placeholders' alt="banner-placeholder-iamge" /></div>
                <div className='dnd-banner-slider-skeleton'><img src={image_placeholder} className='banner-placeholder-image-placeholders' alt="banner-placeholder-iamge" /></div>
            </div>
            <div className="slider-dots">
                <div className="slider-dot"></div>
                <div className="slider-dot"></div>
                <div className="slider-dot"></div>

            </div>
        </div>

    },
    {
        id: 3,
        title: "Image banner",
        isVisible: true,
        _order: 3,
        displayOrder: 3,
        featureType: "banner",
        layoutType: "vertical",
        data: {
            id: 3,

            images: [],
            backgroundColor: "#FE6100",
            updatedAt: "2024-02-21T07:42:55.041Z",
            createdAt: "2024-02-21T07:42:55.041Z"
        },
        element: <div className='dnd-design-block-element-parent-div'>
            <div className='dnd-element-skeleton-div'>
                <div className='dnd-banner-image-skeleton'><img src={image_placeholder} className='banner-image-placeholders' alt="banner-placeholder-iamge" /></div>

            </div>
        </div>,
    },
    {
        id: 4,
        title: "Collection card slider",
        isVisible: true,
        _order: 4,
        displayOrder: 4,
        featureType: "collection",
        layoutType: "horizontal",
        data: {
            id: 4,

            collection: [],//fetch and store any one of the collections in a slider by default and use in the below element
            backgroundColor: "#FE6100",
            updatedAt: "2024-02-21T07:42:55.041Z",
            createdAt: "2024-02-21T07:42:55.041Z"
        },
        element: <div className='dnd-design-block-element-parent-div'>
            <div className='dnd-collection-card-grid-slider-skeleton-main-div'>
                <div className='dnd-collection-card-grid-slider-skeleton'><span>MEN</span></div>
                <div className='dnd-collection-card-grid-slider-skeleton'><span>KIDS</span></div>
                <div className='dnd-collection-card-grid-slider-skeleton'><span>NEW</span></div>
                <div className='dnd-collection-card-grid-slider-skeleton'><span>KIDS</span></div>


            </div>
            <div className="slider-dots">
                <div className="slider-dot"></div>
                <div className="slider-dot"></div>
                <div className="slider-dot"></div>

            </div>

        </div>,
    },

    {
        id: 5,
        title: "Collection grid",
        isVisible: true,
        _order: 5,
        displayOrder: 5,
        featureType: "collection",
        layoutType: "horizontal",
        data: {
            id: 5,

            collection: [],//fetch and store any one of the collection data by default and use in the below element
            backgroundColor: "#FE6100",
            updatedAt: "2024-02-21T07:42:55.041Z",
            createdAt: "2024-02-21T07:42:55.041Z"
        },
        element: <div className='dnd-design-block-element-parent-div'>
            <div className='dnd-element-skeleton-div'>
                <div className='dnd-element-skeleton'></div>
                <div className='dnd-element-skeleton'></div>
                <div className='dnd-element-skeleton'></div>
            </div>

        </div>,
    },
    {
        id: 6,
        title: "Products grid",
        isVisible: true,

        _order: 6,
        displayOrder: 6,
        featureType: "product",
        layoutType: "horizontal",
        data: {
            id: 6,

            collection: [],//fetch and store any one of the collection product data by default and use in the below element
            backgroundColor: "#FE6100",
            updatedAt: "2024-02-21T07:42:55.041Z",
            createdAt: "2024-02-21T07:42:55.041Z"
        },
        element: <div className='dnd-design-block-element-parent-div'>
            <div className='dnd-element-skeleton-div'>
                <div className='dnd-element-skeleton'></div>
                <div className='dnd-element-skeleton'></div>
                <div className='dnd-element-skeleton'></div>
            </div>

        </div>,
    },
    {
        id: 7,
        title: "Products slider",
        isVisible: true,
        _order: 7,
        displayOrder: 7,
        featureType: "product",
        layoutType: "horizontal",
        data: {
            id: 7,

            collection: [],//fetch and store any one of the collection data by default and use in the below element
            backgroundColor: "#FE6100",
            updatedAt: "2024-02-21T07:42:55.041Z",
            createdAt: "2024-02-21T07:42:55.041Z"
        },
        element: <div className='dnd-design-block-element-parent-div'>
            <div className='dnd-element-skeleton-div'>
                <div className='dnd-element-skeleton'></div>
                <div className='dnd-element-skeleton'></div>
                <div className='dnd-element-skeleton'></div>
            </div>

        </div>,
    },
    {
        id: 8,
        title: "Square image grid",
        isVisible: true,
        _order: 8,
        displayOrder: 8,
        featureType: "image",
        layoutType: "horizontal",
        data: {
            id: 8,
            images: [],//fetch and store any one of the collection data by default and use in the below element
            backgroundColor: "#FE6100",
            updatedAt: "2024-02-21T07:42:55.041Z",
            createdAt: "2024-02-21T07:42:55.041Z"
        },
        element: <div className='dnd-design-block-element-parent-div'>
            <div className='dnd-element-skeleton-div'>
                <div className='dnd-element-skeleton'></div>
                <div className='dnd-element-skeleton'></div>
                <div className='dnd-element-skeleton'></div>
            </div>

        </div>,
    },
    {
        id: 19,
        title: "Full-width image",
        isVisible: true,
        _order: 9,
        displayOrder: 9,
        featureType: "images",
        layoutType: "horizontal",
        data: {
            id: 9,

            image: [],//fetch and store any one of the collection data by default and use in the below element
            backgroundColor: "#FE6100",
            updatedAt: "2024-02-21T07:42:55.041Z",
            createdAt: "2024-02-21T07:42:55.041Z"
        },
        element: <div className='dnd-design-block-element-parent-div'>
            <div className='dnd-element-skeleton-div'>
                <div className='dnd-element-skeleton'></div>
                <div className='dnd-element-skeleton'></div>
                <div className='dnd-element-skeleton'></div>
            </div>

        </div>,
    },

];

export default Elements;