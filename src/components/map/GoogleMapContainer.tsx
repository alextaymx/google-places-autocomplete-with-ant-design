import GoogleMapReact from 'google-maps-react-markers';
import { useRef, useState } from 'react';

import { useSearchSlice } from '@/hooks/useSearchSlice';

import { CustomMarker } from '@/components/map/CustomMarker';

type Props = {};

const defaultMapProps = {
  center: {
    lat: 3.140853,
    lng: 101.693207,
  },
  zoom: 11,
};

function GoogleMapContainer(props: Props) {
  const { currentGeocode } = useSearchSlice();
  const mapRef = useRef(null);
  const [mapReady, setMapReady] = useState(false);

  const onGoogleApiLoaded = ({ map, maps }: any) => {
    mapRef.current = map;
    setMapReady(true);
  };

  const { lat, lng } = currentGeocode;

  return (
    <div style={{ height: '100vh', width: '100%' }}>
      <GoogleMapReact
        key={`${lat}-${lng}`}
        libraries={['places']}
        apiKey={process.env.NEXT_PUBLIC_GOOGLE_PLACES_API_KEY}
        defaultCenter={{
          lat: lat ?? defaultMapProps.center.lat,
          lng: lng ?? defaultMapProps.center.lng,
        }}
        defaultZoom={defaultMapProps.zoom}
        center={{
          lat: lat,
          lng: lng,
        }}
        yesIWantToUseGoogleMapApiInternals
        onGoogleApiLoaded={onGoogleApiLoaded}
      >
        {lat && lng ? <CustomMarker lat={lat} lng={lng} text='📍' /> : null}
      </GoogleMapReact>
    </div>
  );
}

export default GoogleMapContainer;
