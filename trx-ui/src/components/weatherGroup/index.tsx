import React, { ReactElement } from 'react';
import { faSnowflake } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import WeatherBox from '../weatherbox';
import { WeatherGroupProps } from '../../common/types';

function WeatherGroup({ loadingDates, datesLocation }: WeatherGroupProps): ReactElement {
  return (
    <div className="DateLocations">
      <div hidden={!loadingDates} className="Spinner">
        <FontAwesomeIcon spin icon={faSnowflake} size="3x" />
      </div>
      {datesLocation &&
        datesLocation.map((dl, index) => {
          const key = `weatherBox${index}`;
          if (dl.length > 0) {
            // each dl is a day
            // that has multiple measurements
            return (
              <WeatherBox
                key={key}
                id={index}
                weather_state_abbr={dl[0].weather_state_abbr}
                weather_state_name={dl[0].weather_state_name}
                min_temp={dl[0].min_temp}
                max_temp={dl[0].max_temp}
                the_temp={dl[0].the_temp}
                humidity={dl[0].humidity}
                predictability={dl[0].predictability}
                applicable_date={dl[0].applicable_date}
              />
            );
          }
          return <React.Fragment key={key} />;
        })}
    </div>
  );
}

export default WeatherGroup;
