import React, { ReactElement } from 'react';

import WeatherIcon from '../weatherIcon';
import { DateLocation } from '../../common/types';

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

function WeatherBox({
  weather_state_name,
  weather_state_abbr,
  applicable_date,
  min_temp,
  max_temp,
  humidity,
  predictability,
  id,
}: DateLocation): ReactElement {
  const dotw = days[new Date(applicable_date).getUTCDay()];
  return (
    <div key={id} className="Paper">
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
