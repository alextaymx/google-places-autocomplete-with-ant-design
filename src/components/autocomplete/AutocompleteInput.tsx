import { AutoComplete, AutoCompleteProps } from 'antd';

import { AutocompleteOption } from '@/hooks/useFetchSuggestions';

type CustomAutoCompleteProps = {
  label: string;
  value: string;
  payload?: AutocompleteOption;
};

type Props = {
  options: CustomAutoCompleteProps[];
  autoCompleteProps?: Partial<AutoCompleteProps<any, CustomAutoCompleteProps>>;
};

function AutocompleteInput({ options, autoCompleteProps }: Props) {
  return (
    <div>
      <AutoComplete
        style={{ width: 400 }}
        placeholder='Type here...'
        filterOption={(inputValue, option) => {
          if (!option) {
            return false;
          }
          const optionValueUpperCase = option.value?.toString().toUpperCase();
          const inputValueUpperCase = inputValue.toUpperCase();
          return optionValueUpperCase?.indexOf(inputValueUpperCase) !== -1;
        }}
        options={options}
        {...autoCompleteProps}
      />
    </div>
  );
}

export default AutocompleteInput;
