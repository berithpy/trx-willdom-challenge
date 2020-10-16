import React from 'react';
import './App.css';
import Select from 'react-select';
import WeatherBox from './components/weatherbox';
import { ValueType } from 'react-select';
import { Location, dateLocation } from './common/types';
import { addDays } from './common/utils';
import { useLocationSearch, getDates } from './service/fetcher';
import { faSnowflake } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
const today = new Date();

function App() {
  const [searchText, setSearchText] = React.useState('');
  const [selectedLocation, setSelectedLocation] = React.useState<string>('');
  const [selectedDate, setSelectedDate] = React.useState<string>('2020-10-16');
  const [datesLocation, setDatesLocation] = React.useState<dateLocation[][]>();
  const [loadingDates, setLoadingDates] = React.useState<boolean>(false);
  const { data: searchData, isLoading, error } = useLocationSearch(searchText);
  const getDatesCallback = React.useCallback(
    async (selectedLocation, selectedDate) => {
      setLoadingDates(true);
      setDatesLocation(await getDates(selectedLocation, selectedDate));
      setLoadingDates(false);
    },
    [setDatesLocation]
  );
  React.useEffect(() => {
    getDatesCallback(selectedLocation, selectedDate);
  }, [selectedLocation, selectedDate, getDatesCallback]);

  return (
    <div className="App">
      <div className="Main">
        <div className="InputGroup">
          <Select
            className="SearchSelect"
            onChange={(opt: ValueType<Location>) => {
              if (opt) {
                setSelectedLocation((opt as Location).woeid);
              }
            }}
            getOptionLabel={(location: Location) => location.title}
            getOptionValue={(location: Location) => location.woeid}
            options={searchData}
            onInputChange={(newValue) => {
              setSearchText(newValue);
            }}
            placeholder={'Choose location...'}
            isLoading={isLoading}
          />
          <input
            className="DateInput"
            type="date"
            id="start"
            name="trip-start"
            value={selectedDate}
            // Min and max date were inferred from the api page
            min="2013-10-16"
            max={addDays(today, 4).toISOString().split('T')[0]}
            onChange={(e) => {
              setSelectedDate(e.target.value);
            }}
          ></input>
        </div>

        <div className="DateLocations">
          <div hidden={!loadingDates} className="Spinner">
            <FontAwesomeIcon spin icon={faSnowflake} size="3x" />
          </div>
          {datesLocation &&
            datesLocation.map((dl) => {
              if (dl.length > 0) {
                // each dl is a day
                // that has multiple measurements
                return (
                  <WeatherBox
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
              return <></>;
            })}
        </div>
      </div>
    </div>
  );
}

export default App;
