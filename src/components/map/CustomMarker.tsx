import { customMarkerStyle } from '@/components/map/customMarkerStyle';

type Props = {
  text: string;
  lat?: number;
  lng?: number;
};

export const CustomMarker = ({ text }: Props) => {
  return <div style={customMarkerStyle}>{text}</div>;
};
