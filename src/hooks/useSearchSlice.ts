import {
  clearSearchHistory,
  getGeocodeByPlaceId,
  prependSearchHistory,
  replaceInputValue,
  replaceSuggestions,
  selectGeocode,
  selectInputValue,
  selectSearchHistory,
  selectSuggestions,
} from '@/lib/redux/slices/searchSlice';
import { useAppDispatch } from '@/hooks/useAppDispatch';
import { useAppSelector } from '@/hooks/useAppSelector';
import { AutocompleteOption } from '@/hooks/useFetchSuggestions';

export const useSearchSlice = () => {
  const inputValue = useAppSelector(selectInputValue);
  const suggestions = useAppSelector(selectSuggestions);
  const searchHistory = useAppSelector(selectSearchHistory);
  const currentGeocode = useAppSelector(selectGeocode);

  const dispatch = useAppDispatch();

  const setInputValue = (value: string) => {
    dispatch(replaceInputValue(value));
  };

  const setSuggestions = (options: AutocompleteOption[]) => {
    dispatch(replaceSuggestions(options));
  };

  const addToSearchHistory = (option: AutocompleteOption) => {
    dispatch(prependSearchHistory(option));
  };
  const removeAllSearchHistory = () => {
    dispatch(clearSearchHistory());
  };
  const setGeocodeByPlaceId = async (placeId: string) => {
    dispatch(getGeocodeByPlaceId(placeId));
  };

  return {
    inputValue,
    setInputValue,
    suggestions,
    setSuggestions,
    searchHistory,
    addToSearchHistory,
    removeAllSearchHistory,
    currentGeocode,
    setGeocodeByPlaceId,
  };
};
