import { TypedUseSelectorHook, useSelector } from 'react-redux';

import { AppState } from '@/lib/redux/store';

export const useAppSelector: TypedUseSelectorHook<AppState> = useSelector;
