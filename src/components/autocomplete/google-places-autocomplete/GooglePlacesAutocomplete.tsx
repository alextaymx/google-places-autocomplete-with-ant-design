import React, { forwardRef, useEffect, useImperativeHandle } from 'react';

import styles from './GooglePlacesAutocomplete.module.css';

import { replaceSuggestions } from '@/lib/redux/slices/searchSlice';
import useFetchSuggestions, {
  AutocompleteOption,
} from '@/hooks/useFetchSuggestions';
import usePlacesService from '@/hooks/usePlacesService';
import { useSearchSlice } from '@/hooks/useSearchSlice';

import AutocompleteInput from '@/components/autocomplete/AutocompleteInput';

import GooglePlacesAutocompleteProps, {
  GooglePlacesAutocompleteHandle,
} from '../../../types/places-autocomplete';

const GooglePlacesAutocomplete: React.ForwardRefRenderFunction<
  GooglePlacesAutocompleteHandle,
  GooglePlacesAutocompleteProps
> = (props: GooglePlacesAutocompleteProps, ref): React.ReactElement => {
  const { placesService, sessionToken, setSessionToken } = usePlacesService({
    apiKey: props.apiKey ?? '',
    apiOptions: props.apiOptions ?? {},
    // eslint-disable-next-line no-console
    onLoadFailed: props.onLoadFailed ?? console.error,
  });

  const fetchSuggestions = useFetchSuggestions({
    autocompletionRequest: props.autocompletionRequest ?? {},
    debounce: props.debounce ?? 1000,
    minLengthAutocomplete: props.minLengthAutocomplete ?? 0,
    placesService,
    sessionToken,
    withSessionToken: props.withSessionToken ?? false,
  });

  useImperativeHandle(
    ref,
    () => ({
      getSessionToken: () => {
        return sessionToken;
      },
      refreshSessionToken: () => {
        setSessionToken(new google.maps.places.AutocompleteSessionToken());
      },
    }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [sessionToken]
  );

  // const handleClick = () => {
  //   fetchSuggestions('Selangor', (options) => {
  //     console.log('options', options);
  //   });
  // };

  const {
    addToSearchHistory,
    inputValue,
    removeAllSearchHistory,
    setInputValue,
    setSuggestions,
    suggestions,
    setGeocodeByPlaceId,
  } = useSearchSlice();

  useEffect(() => {
    if (inputValue) {
      fetchSuggestions(inputValue, (options) => {
        const newSuggestions = options.map((option) => ({
          label: option.label,
          value: option.value,
        }));
        setSuggestions(newSuggestions);
      });
    }
  }, [inputValue]);

  const selectOptions = suggestions.map((option: AutocompleteOption) => ({
    label: option.label,
    value: option.value.description,
    payload: option,
  }));

  const onSelect = (payload: AutocompleteOption) => {
    addToSearchHistory(payload);
    setGeocodeByPlaceId(payload.value.place_id);
  };

  return (
    <div className={styles['input-container']}>
      <div className={styles.input}>
        {/* <button onClick={handleClick}>hi</button> */}
        <AutocompleteInput
          options={selectOptions}
          autoCompleteProps={{
            value: inputValue,
            onChange: (value, option) => {
              // ignore if option is an array
              if (Array.isArray(option)) return;
              if (!value) {
                replaceSuggestions([]);
                setInputValue('');
                return;
              }
              if (option.value) {
                if (option.payload) onSelect(option.payload);
                setInputValue(option.value);
                return;
              }
              setInputValue(value);
            },

            filterOption: (inputValue, option) => {
              // filtering job done by the API, no need to do in frontend
              return true;
            },
          }}
        />
      </div>
    </div>
  );
};

export default forwardRef(GooglePlacesAutocomplete);
