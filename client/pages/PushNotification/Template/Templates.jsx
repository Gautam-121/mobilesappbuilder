import React from "react";
import styles from "./Templates.module.css";
import { Page, Text, Tooltip } from "@shopify/polaris";
import { useNavigate } from "raviger";
import { templates } from "../../../utils/services";

export default function Templates() {
  const navigate = useNavigate()

    const handleTemplateSelect = (temp) => {
    navigate(`/push-notification/create-notification/${temp}`);
  };

  return (
    <div>
      <Page
      
      backAction={{content: 'Templates', url: '/push-notification'}}
      title="Templates"
      subtitle="Please select a template for your notification">
        <div className={styles.container}>
          {/* <div className={styles.head}>
            <Text as="h1" variant="headingXl">
              Template
            </Text>
            <Text variant="headingMd" id="subHeading">
              Please select a template for your notification
            </Text>
          </div> */}
          <div className={styles.body}>
            {templates.map((type)=>(
       
                <Tooltip content={type.helperText} width="wide">
                <div
                  className={styles.cardBasic}
                  onClick={() => handleTemplateSelect(type.type)}
                >
                  <span >
                    {type.title}
                  </span>
                </div>
              </Tooltip>
        
            ))}
          </div>
        </div>
      </Page>
    </div>
  );
}
