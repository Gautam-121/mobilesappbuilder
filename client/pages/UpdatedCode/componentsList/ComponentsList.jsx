import "./componentList.css";
import AnnouncementBar from '../components/announcementBar/AnnouncementBar'
import HorizontalCollectionGrid from "../components/announcementBar/HorizontalCollectionGrid";
// import CollectionSlider from './components/announcementBar/Collectionslider'
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import { componentListArrayAtom } from "../recoil/store";
import { uid } from "uid";
import "./componentList.css";
import { data } from "../data/data";
import VerticalCollectionGrid from "../components/announcementBar/VerticalCollectiongrid";

export default function ComponentsList() {
  const [componentListArray, setComponentListArray] = useRecoilState(
    componentListArrayAtom
  );
  // const componentList = useRecoilValue(componentListArrayAtom)
  // const setComponentList = useSetRecoilState(componentListArrayAtom)

  function addComponents(data) {
    let newData = {...data}
    newData.id=uid()
    console.log(newData);
    const newArray = [...componentListArray];
    newArray.push(newData);
    setComponentListArray(newArray);
  }
  return (
    <div>
      <div className="ComponentListContainer">
        {data.map((ele) => {
          switch (ele.featureType) {
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
                  draggable={true}
                    addComponents={() => addComponents(ele)}
                    key={ele.id}
                    gridItems={ele}
                  />
                );
              else
                return (
                  <HorizontalCollectionGrid
                  draggable={true}
                    addComponents={() => addComponents(ele)}
                    key={ele.id}
                    gridItems={ele}
                  />
                );

            default:
              return null; // If featureType doesn't match any case, render nothing
          }
        })}
      </div>
    </div>
  );
}
