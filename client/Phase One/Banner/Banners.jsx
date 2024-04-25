import React from 'react';
import {
    BlockStack, RadioButton, Button
    , DropZone,
    LegacyStack,
    Thumbnail,
    Banner,
    List,
    Text,
    Icon,
} from '@shopify/polaris';
import { useState, useCallback } from 'react';

import "./Banners.css";
import { DeleteIcon } from '@shopify/polaris-icons';

const Banners = () => {

    const options = ['Category', 'Product'];
    const [selectedOption, setSelectedOption] = useState(options[0]);

    const handleOptionChange = (option) => {
        setSelectedOption(option);
    };

    console.log("selected radio: ", selectedOption);


    //for category selection
    const categories = ['New Arrivals', 'Men', 'Women'];
    const [selectedCategory, setSelectedCategory] = useState(options[0]);

    
    //for product selection
    const products = ['Product 1', 'Product 2', 'Product 3'];

    const handleDropdownChange = (event) => {
        setSelectedCategory(event.target.value);
    };


    //file upload
    const [files, setFiles] = useState([]);
    const [rejectedFiles, setRejectedFiles] = useState([]);
    const hasError = rejectedFiles.length > 0;

    const handleDrop = useCallback(
        (droppedFiles, acceptedFiles, rejectedFiles) => {
            setFiles((files) => [...files, ...acceptedFiles]);
            setRejectedFiles(rejectedFiles);
        },
        [],
    );



    const handleDelete = (event, index) => {

        event.preventDefault(); // Prevent default action
        event.stopPropagation(); // Prevent event bubbling
        setFiles((prevFiles) => {
            const newFiles = [...prevFiles];
            newFiles.splice(index, 1);
            return newFiles;
        });
    };



    //to display a differnet delete icon when hovered
    const [hoveredIndex, setHoveredIndex] = useState(null);

    const handleMouseEnter = (index) => {
        setHoveredIndex(index);
    };

    const handleMouseLeave = () => {
        setHoveredIndex(null);
    };




    const fileUpload = !files.length && <DropZone.FileUpload actionHint="Accepts .jpeg, .jpg, and .png" />;

    const uploadedFiles = files.length > 0 && (
        <LegacyStack vertical distribution="fill">
            {files.map((file, index) => (
                <LegacyStack alignment="center" key={index}>
                    <div className="uploaded-image-container">
                        <img
                            src={window.URL.createObjectURL(file)}
                            alt={file.name}
                            style={{ width: '100%', height: '100%', objectFit: 'contain' }}
                        />
                        <div
                            className="delete-button-div"
                            onClick={(event) => handleDelete(event, index)}
                            onMouseEnter={() => handleMouseEnter(index)}
                            onMouseLeave={() => handleMouseLeave()}
                        >
                            <Icon
                                source={DeleteIcon}
                                tone="critical"
                                // tone={hoveredIndex === index ? "critical" : "subdued"}
                                className="delete-btn"
                            />
                        </div>
                    </div>

                </LegacyStack>
            ))}
        </LegacyStack>
    );

    const errorMessage = hasError && (
        <Banner title="The following images couldn’t be uploaded:" tone="critical">
            <List type="bullet">
                {rejectedFiles.map((file, index) => (
                    <List.Item key={index}>
                        {`"${file.name}" is not supported. File type must be .gif, .jpg, .png or .svg.`}
                    </List.Item>
                ))}
            </List>
        </Banner>
    );



    return (
        <div className='banners-main-div'>

            <h1>Create A Banner</h1>

            <div className='banners-catgory-product-image-main-div'>

                <div className='banners-catgory-product-div'>

                    <div className='banners-radio-btns'>
                        {options.map((option) => (
                            <label key={option}>
                                <input
                                    type="radio"
                                    value={option}
                                    checked={selectedOption === option}
                                    onChange={() => handleOptionChange(option)}
                                />
                                {option}
                            </label>
                        ))}
                    </div>

                    <div className='banners-category-dropdown-main-div'>
                        <h6>
                            Select {selectedOption === 'Category' ? 'Category' : 'Product'}
                        </h6>
                        {

                            selectedOption === 'Category' ? <select className='banners-category-dropdown' value={selectedCategory} onChange={handleDropdownChange}>
                                {categories.map((option) => (
                                    <option key={option} value={option}>
                                        {option}
                                    </option>
                                ))}
                            </select>


                                :
<select className='banners-category-dropdown' value={selectedCategory} onChange={handleDropdownChange}>
                                {products.map((option) => (
                                    <option key={option} value={option}>
                                        {option}
                                    </option>
                                ))}
                                </select>
                                
                        }
                    </div>

                </div>

                <LegacyStack vertical>
                    {errorMessage}
                    {uploadedFiles ?
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '5px' }}>
                            <h6>Upload image</h6>
                            {uploadedFiles}
                        </div> : (
                            <DropZone
                                className="custom-dropzone"
                                allowMultiple={false}
                                variableHeight
                                label="Upload image"
                                accept=".jpg, .jpeg, .png"
                                type="image"
                                onDrop={handleDrop}
                            >
                                {fileUpload}
                            </DropZone>
                        )}
                </LegacyStack>



            </div>

            <div>
                <button className='banners-save-btn'>Add banner</button>
            </div>

        </div>
    )
}

export default Banners