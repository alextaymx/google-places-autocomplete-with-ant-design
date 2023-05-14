import { useDebouncedCallback } from 'use-debounce';

import autocompletionRequestBuilder from '@/helpers/autocompletionRequestBuilder';

import { AutocompletionRequest } from '@/types/places-autocomplete';

export type AutocompleteOption = {
  label: string;
  value: google.maps.places.AutocompletePrediction;
};

type CBType = (options: Array<AutocompleteOption>) => void;
type UseFetchSuggestionsArg = {
  autocompletionRequest: AutocompletionRequest;
  debounce: number;
  minLengthAutocomplete: number;
  placesService?: google.maps.places.AutocompleteService;
  sessionToken?: google.maps.places.AutocompleteSessionToken;
  withSessionToken: boolean;
};

const useFetchSuggestions = (
  arg: UseFetchSuggestionsArg
): ((value: string, cb: CBType) => void) => {
  const {
    autocompletionRequest,
    debounce,
    minLengthAutocomplete,
    placesService,
    sessionToken,
    withSessionToken,
  } = arg;

  const fetchSuggestions = useDebouncedCallback(
    (value: string, cb: CBType): void => {
      if (!placesService) return cb([]);
      if (value.length < minLengthAutocomplete) return cb([]);

      const autocompletionReq: AutocompletionRequest = {
        ...autocompletionRequest,
      };

      placesService.getPlacePredictions(
        autocompletionRequestBuilder(
          autocompletionReq,
          value,
          withSessionToken && sessionToken
        ),
        (suggestions) => {
          cb(
            (suggestions || []).map((suggestion) => ({
              label: suggestion.description,
              value: suggestion,
            }))
          );
        }
      );
    },
    debounce
  );

  return fetchSuggestions;
};

export default useFetchSuggestions;
