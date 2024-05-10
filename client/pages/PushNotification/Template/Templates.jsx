import React, { useState } from "react";
import styles from "./Templates.module.css";
import { Page, Text, Tooltip } from "@shopify/polaris";
import { useSetRecoilState } from "recoil";
import { Link, useNavigate } from "raviger";
import { templateAtom } from "../../UpdatedCode/recoil/store";
import { templates } from "../../../utils/services";

export default function Templates() {
  const setTemplate = useSetRecoilState(templateAtom);
  const navigate = useNavigate();
  const helperTextBasic =
    "Engage users with targeted marketing messages using the 'Marketing Notification'. When clicked, this notification redirects users to an external URL of your choice. Explore exclusive offers and promotions to enhance customer experience and drive conversions.";
  const helperTextProduct =
    "Deliver targeted messages about specific products with the 'Product-Specific Notification'. When clicked, this notification takes users directly to the detailed page of the mentioned product within your app. Enhance engagement and encourage swift actions by providing personalized experiences for your customers."
 const helperTextCategory = "Deliver targeted messages about specific categories with the 'Category-Specific Notification'.When clicked, this notification takes users directly to the category page in your app. Enhance engagement and encourage swift actions with relevant content."
    const handleTemplateSelect = (temp) => {
    console.log(temp);
    // setTemplate(temp);
    navigate(`/push-notification/create-notification/${temp}`);
  };

  return (
    <div>
      <Page>
        <div className={styles.container}>
          <div className={styles.head}>
            <Text as="h1" variant="headingXl">
              Template
            </Text>
            <Text variant="headingMd" id="subHeading">
              Please select a template for your notification
            </Text>
          </div>
          <div className={styles.body}>
            {templates.map((type)=>(
       
                <Tooltip content={type.helperText} width="wide">
                <div
                  className={styles.cardBasic}
                  onClick={() => handleTemplateSelect(type.type)}
                >
                  <Text fontWeight="bold" as="h1" variant="headingXl">
                    {type.title}
                  </Text>
                </div>
              </Tooltip>
        
            ))}
          </div>
        </div>
      </Page>
    </div>
  );
}
