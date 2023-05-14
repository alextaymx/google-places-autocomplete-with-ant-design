import React from 'react';

import styles from './AppBody.module.css';

import GooglePlacesAutocomplete from '@/components/autocomplete/google-places-autocomplete/GooglePlacesAutocomplete';
import GoogleMapContainer from '@/components/map/GoogleMapContainer';
import SearchHistoryTimeline from '@/components/timeline/SearchHistoryTimeline';

type Props = {
  any?: any;
};

function AppBody({ any }: Props) {
  return (
    <div>
      <GooglePlacesAutocomplete
        apiKey={process.env.NEXT_PUBLIC_GOOGLE_PLACES_API_KEY}
      />
      <div className={styles['map-history-container']}>
        <div style={{ width: '60%' }}>
          <GoogleMapContainer />
        </div>
        <div style={{ width: '40%' }}>
          <SearchHistoryTimeline />
        </div>
      </div>
    </div>
  );
}

export default AppBody;
