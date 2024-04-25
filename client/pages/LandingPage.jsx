import React, { useState } from "react";
import useFetch from "../hooks/useFetch";

const AppForm = () => {
  const [formData, setFormData] = useState({
    app_name: "",
    app_icon: null,
    launch_screen_image: null,
    launch_screen_color: "#FFFFFF",
    hf_bg_color: "#FFFFFF",
    hf_icon_color: "#202223",
    pb_bg_color: "#323470",
    pb_text_color: "#FFFFFF",
  });

  const handleInputChange = (event, field) => {
    const value =
      event.target.type === "file" ? event.target.files[0] : event.target.value;
    setFormData({
      ...formData,
      [field]: value,
    });
  };
  const postData = {
    app_name: formData.app_name,
    app_icon_url: formData.app_icon
      ? URL.createObjectURL(formData.app_icon)
      : null,
    launch_screen_image: formData.launch_screen_image
      ? URL.createObjectURL(formData.launch_screen_image)
      : null,
    launch_screen_bg_colour: formData.launch_screen_color,
    hf_bg_color: formData.hf_bg_color,
    hf_icon_color: formData.hf_icon_color,
    pb_bg_color: formData.pb_bg_color,
    pb_text_color: formData.pb_text_color,
  };
  const postOptions = {
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    method: "POST",
    body: JSON.stringify(postData),
  };

  const useDataFetcher = (initialState, url, options) => {
    const [data, setData] = useState(initialState);
    const fetch = useFetch();

    const fetchData = async () => {
      setData("");
      const result = await (await fetch(url, options)).json();
      console.log(result);
      if ("serverKey" in result) setData(result.serverKey);
      else if ("message" in result) setData(result.message);
    };
    return [data, fetchData];
  };
  const handleSubmit = () => {
    // Format formData into the required object format
    postAppDetails();
    console.log("Sending data:", postData);
  };
  const [appdetailsPost, postAppDetails] = useDataFetcher(
    "",
    "/apps/api/createBrandingPage",
    postOptions
  );

  return (
    <div>
      <div>
        <label htmlFor="app_name">App Name</label>
        <input
          type="text"
          id="app_name"
          value={formData.app_name}
          onChange={(e) => handleInputChange(e, "app_name")}
        />
        <br />
        <label htmlFor="app_icon">App Icon</label>
        <input
          type="file"
          id="app_icon"
          onChange={(e) => handleInputChange(e, "app_icon")}
        />
        <br />
        <label htmlFor="launch_screen_image">Launch Screen Image</label>
        <input
          type="file"
          id="launch_screen_image"
          onChange={(e) => handleInputChange(e, "launch_screen_image")}
        />
        <br />
        <label htmlFor="launch_screen_color">Launch Screen Color</label>
        <input
          type="color"
          id="launch_screen_color"
          value={formData.launch_screen_color}
          onChange={(e) => handleInputChange(e, "launch_screen_color")}
        />
        <br />
        <label htmlFor="hf_bg_color">Header/Footer Color</label>
        <input
          type="color"
          id="hf_bg_color"
          value={formData.hf_bg_color}
          onChange={(e) => handleInputChange(e, "hf_bg_color")}
        />
        <br />
        <label htmlFor="hf_icon_color">Header/Footer Icons Color</label>
        <input
          type="color"
          id="hf_icon_color"
          value={formData.hf_icon_color}
          onChange={(e) => handleInputChange(e, "hf_icon_color")}
        />
        <br />
        <label htmlFor="pb_bg_color">Primary Color</label>
        <input
          type="color"
          id="pb_bg_color"
          value={formData.pb_bg_color}
          onChange={(e) => handleInputChange(e, "pb_bg_color")}
        />
        <br />
        <label htmlFor="pb_text_color">Primary Text Color</label>
        <input
          type="color"
          id="pb_text_color"
          value={formData.pb_text_color}
          onChange={(e) => handleInputChange(e, "pb_text_color")}
        />
        <br />
      </div>

      <button onClick={handleSubmit}>Submit</button>
    </div>
  );
};

export default AppForm;
