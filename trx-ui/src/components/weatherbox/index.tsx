import React from 'react';

import WeatherIcon from '../weatherIcon';
const days = [
  'Sunday',
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thursday',
  'Friday',
  'Saturday',
  'Sunday',
];

interface dateLocation {
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

function WeatherBox({
  weather_state_name,
  weather_state_abbr,
  applicable_date,
  min_temp,
  max_temp,
  humidity,
  predictability,
}: dateLocation) {
  let dotw = days[new Date(applicable_date).getUTCDay()];
  return (
    <div className="Paper">
      <p>{dotw}</p>
      <WeatherIcon wabbr={weather_state_abbr} />
      <p>{weather_state_name}</p>
      <div className="Temperature">
        <div className="MinMax">
          <div className="TempGroup">
            <p>Min</p>
            <p>{(min_temp as number).toFixed(2)}°C</p>
          </div>
          <div className="TempGroup">
            <p>Max</p>
            <p>{(max_temp as number).toFixed(2)}°C</p>
          </div>
        </div>
      </div>
      <div className="Extra">
        <p>Humidity: {humidity}%</p>
        <p>Predicability: {predictability}</p>
      </div>
      <p className="Date">{applicable_date}</p>
    </div>
  );
}
export default WeatherBox;
