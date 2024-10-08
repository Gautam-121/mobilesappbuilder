import "./componentList.css";
import { useEffect } from 'react'
import AnnouncementBar from '../components/announcementBar/AnnouncementBar'
import HorizontalCollectionGrid from "../components/announcementBar/HorizontalCollectionGrid";
import Horizontalproductgrid from "../components/announcementBar/Horizontalproductgrid";
import Verticalproductgrid from "../components/announcementBar/Verticalproductgrid";
// import CollectionSlider from './components/announcementBar/Collectionslider'
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import { collectionsAtom, componentListArrayAtom } from "../recoil/store";
import { uid } from "uid";
import "./componentList.css";
import { data } from "../data/data";
import VerticalCollectionGrid from "../components/announcementBar/VerticalCollectiongrid";
import Textparagraph from "../components/announcementBar/Textparagraph";
import Video from "../components/announcementBar/Video"
import Banner from "../components/announcementBar/Banner";
import { Divider, Text } from "@shopify/polaris";
import ImageElement from "../components/announcementBar/ImageElement";

export default function ComponentsList() {
  const [componentListArray, setComponentListArray] = useRecoilState(
    componentListArrayAtom
  );
  const collections = useRecoilValue(collectionsAtom)
  useEffect(() => {
    console.log("Collections Atom", collections)


  }, [collections])


  function addComponents(data) {
    let newData = { ...data }
    newData.id = uid();
    newData.isNew = true
    console.log(newData);
    const newArray = [...componentListArray];
    newArray.push(newData);
    setComponentListArray(newArray);
  }




  const horizontalCollectionGridStyle = {
    //padding: "15px",
   
    display: "grid",
    gridTemplateColumns: 'repeat(2, 1fr)',
    gap: "1px",
   
}



  return (
    <div>
      <div className="ComponentListContainer">
        <Text variant="headingLg" as="h5" >Design Blocks</Text>
        <Text variant="headingMd" as="h6" >Drag, drop max 20 blocks per design</Text>
        <Divider borderColor="border" />

        {data.map((ele) => {
          switch (ele.featureType) {

            case "banner":
              return (
                <Banner
                  draggable={true}
                  text="Banner"
                  element={ele}
                  addComponents={() => addComponents(ele)}
                  key={ele.id}

                />
              );

            case "announcement":
              return (
                <AnnouncementBar
                  key={ele.id}
                  addComponents={() => addComponents(ele)}
                  draggable={true}
                  text="Announcement Bar"
                  element={ele}
                />
              );



            case "categories":
              if (ele.layoutType === "vertical_grid")
                return (
                  <VerticalCollectionGrid
                    text="Vertical Collection Grid"
                    draggable={true}
                    addComponents={() => addComponents(ele)}
                    key={ele.id}
                    gridItems={ele}

                  // text= "Vertical Collection Grid"
                  />
                );
              else
                return (
                  <HorizontalCollectionGrid
                    draggable={true}
                    text="Horzontal Collection Grid"
                    addComponents={() => addComponents(ele)}
                    key={ele.id}
                    gridItems={ele}
                    style={horizontalCollectionGridStyle}
                  // text= "Horizontal Collection Grid"
                  />
                );

            case "productGroup":
              if (ele.layoutType === "vertical_grid")
                return (
                  <Verticalproductgrid
                    draggable={true}
                    gridItems={ele}
                    text="Vertical product Grid"
                    addComponents={() => addComponents(ele)}
                    key={ele.id}

                  />
                );
              else
                return (

                  <Horizontalproductgrid
                    draggable={true}
                    gridItems={ele}
                    text="Horizontal product Grid"
                    addComponents={() => addComponents(ele)}
                    key={ele.id}

                  />
                );

            case "text_paragraph":
              return (
                <Textparagraph
                  gridItems={ele}
                  draggable={true}
                  text="Text Paragraph"
                  element={ele}
                  addComponents={() => addComponents(ele)}
                  key={ele.id}

                />
              );

            case "video":
              return (
                <Video
                  key={ele.id}
                  draggable={true}
                  text="Video"
                  element={ele}
                />
              );


              case "image":
                return (
                  <ImageElement
                    key={ele.id}
                    draggable={true}
                    text="Image"
                    elementUrl={ele}
                  />
                );


            default:
              return null; // If featureType doesn't match any case, render nothing
          }
        })}

        <div>
              
        </div>
      </div>
    </div>
  );
}
