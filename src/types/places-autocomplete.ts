import { LoaderOptions } from '@googlemaps/js-api-loader';
import { AutoCompleteProps } from 'antd';

import { AutocompleteOption } from '@/hooks/useFetchSuggestions';

export type GooglePlacesAutocompleteHandle = {
  getSessionToken: () =>
    | google.maps.places.AutocompleteSessionToken
    | undefined;
  refreshSessionToken: () => void;
};

export interface LatLng {
  lat: number;
  lng: number;
}

export interface AutocompletionRequest {
  bounds?: [LatLng, LatLng];
  componentRestrictions?: { country: string | string[] };
  location?: LatLng;
  offset?: number;
  radius?: number;
  types?: string[];
}

export default interface GooglePlacesAutocompleteProps {
  apiKey?: string;
  apiOptions?: Partial<LoaderOptions>;
  autocompletionRequest?: AutocompletionRequest;
  debounce?: number;
  minLengthAutocomplete?: number;
  onLoadFailed?: (error: Error) => void;
  autoCompleteProps?: Partial<AutoCompleteProps>;
  // selectProps?: AsyncProps<Option, false, GroupBase<Option>>;
  withSessionToken?: boolean;
  onSelect?: (option: AutocompleteOption) => void;
}
