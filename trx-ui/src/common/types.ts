export interface Location {
  latt_long: string;
  location_type: string;
  title: string;
  woeid: string;
}
export interface DateLocation {
  id?: number;
  weather_state_name: string;
  weather_state_abbr: string;
  wind_direction_compass?: string;
  created?: string;
  applicable_date: string;
  min_temp?: number | null;
  max_temp?: number | null;
  the_temp?: number | null;
  wind_speed?: number | null;
  wind_direction?: number | null;
  air_pressure?: number | null;
  humidity?: number | null;
  visibility?: number | null;
  predictability?: number | null;
}
export interface WeatherIconProps {
  wabbr: string;
}

export interface WeatherGroupProps {
  loadingDates: boolean;
  datesLocation: DateLocation[][] | undefined;
}
