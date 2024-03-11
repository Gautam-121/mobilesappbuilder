import { Autocomplete, Icon } from '@shopify/polaris';
import { SearchIcon } from '@shopify/polaris-icons';
import { useState, useCallback, useMemo } from 'react';

export default function CollectionSelector({ collections, onSelect }) {
  const deselectedOptions = useMemo(
    () =>
      collections?.map((collection) => ({
        value: collection.id,
        label: collection.title,
      })),
    [collections]
  );
  const [selectedOption, setSelectedOption] = useState([]);
  const [inputValue, setInputValue] = useState('');
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
    <div style={{ height: '225px' }}>
      <Autocomplete
        options={options}
        selected={selectedOption}
        onSelect={updateSelection}
        textField={textField}
      />
    </div>
  );
}
