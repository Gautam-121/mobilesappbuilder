import { Autocomplete, Icon } from '@shopify/polaris';
import { SearchIcon } from '@shopify/polaris-icons';
import { useState, useCallback, useMemo, useEffect } from 'react';

export default function CollectionSelector({ collections, onSelect, value }) {
  const [inputValue, setInputValue] = useState("");
  let valueForSelect = ""
  useEffect(()=>{
   let selectedIndex = collections.findIndex((ele)=>ele.id===value)
  if(selectedIndex>=0){
    valueForSelect = collections[selectedIndex].title
    setInputValue(valueForSelect)
  }
   console.log("value", valueForSelect)

  },[value])
  console.log(collections)
  const deselectedOptions = useMemo(
    () =>
      collections?.map((collection) => ({
        value: collection.id,
        label: collection.title,
      })),
    [collections]
  );
  const [selectedOption, setSelectedOption] = useState([]);
  
  const [options, setOptions] = useState(deselectedOptions);

  const updateText = useCallback(
    (value) => {
      setInputValue(value);
      if (value === '') {
        setOptions(deselectedOptions);
        return;
      }

      const filterRegex = new RegExp(value, 'i');
      const resultOptions = deselectedOptions.filter((option) =>
        option.label.match(filterRegex)
      );
      setOptions(resultOptions);
    },
    [deselectedOptions]
  );

  const updateSelection = useCallback(
    (selected) => {
      const selectedValue = selected?.map((selectedItem) => {
        const matchedOption = options.find((option) => {
          return option.value === selectedItem;
        });
        return matchedOption && matchedOption.label;
      });

      setSelectedOption(selected);
      setInputValue(selectedValue[0] || '');
      onSelect(selected[0] || null); // Pass the selected id to the parent component
    },
    [onSelect, options]
  );

  const textField = (
    <Autocomplete.TextField
      onChange={updateText}
      label="Tags"
      value={inputValue}
      prefix={<Icon source={SearchIcon} tone="base" />}
      placeholder="Search"
      autoComplete="off"
    />
  );

  return (
    <div style={{  }}>
      <Autocomplete
        options={options}
        selected={selectedOption}
        onSelect={updateSelection}
        textField={textField}
      />
    </div>
  );
}
