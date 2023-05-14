import { useDispatch } from 'react-redux';

import { AppDispatch } from '@/lib/redux/store';

// Use throughout app instead of plain `useDispatch` and `useSelector`
export const useAppDispatch = () => useDispatch<AppDispatch>();
