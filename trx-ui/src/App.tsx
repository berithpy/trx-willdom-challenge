import React from 'react';
import './App.css';
import useSWR from 'swr';
import fetch from './service/fetch';
import Select from 'react-select';
import WeatherBox from './components/weatherbox';
import { ValueType } from 'react-select';
interface Location {
  latt_long: string;
  location_type: string;
  title: string;
  woeid: string;
}
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
function addDays(date: Date, days: number) {
  const copy = new Date(Number(date));
  copy.setDate(date.getDate() + days);
  return copy;
}

function getIsoString(date: Date) {
  return date.toISOString().split('T')[0];
}
function getApiDate(date: string) {
  return date.replace(/-/g, '/');
}
const today = new Date();
// const CORS_HELPER = 'https://cors-anywhere.herokuapp.com/';
const CORS_HELPER = '';
const BASE_URL = `${CORS_HELPER}https://www.metaweather.com/api/location/`;
function useLocationSearch(searchText: string) {
  const { data = [], error } = useSWR(
    searchText ? `${BASE_URL}search/?query=${searchText}` : null,
    fetch,
    { shouldRetryOnError: false, errorRetryCount: 0 }
  );
  return {
    data: data,
    isLoading: !error && !data,
    error: error,
  };
}

function useLocation(woeid: string, date: string = '') {
  let fetchUrl = woeid ? `${BASE_URL}${woeid}/` : null;
  if (date) fetchUrl = `${fetchUrl}${date}`;
  const { data = [], error } = useSWR(fetchUrl, fetch, {
    shouldRetryOnError: false,
    errorRetryCount: 0,
  });
  return {
    data: data,
    isLoading: !error && !data,
    error: error,
  };
}
async function getDates(woeid: string, date: string) {
  let promises: Promise<dateLocation[]>[] = [];

  for (let index = 0; index < 10; index++) {
    if (!woeid || !date) {
      console.log(!woeid || !date);
      break;
    }
    let currentDate = getApiDate(getIsoString(addDays(new Date(date), index)));
    let currentURL = `${BASE_URL}${woeid}/${currentDate}`;
    promises.push(fetch(currentURL));
  }
  return await Promise.all(promises);
}
function App() {
  const [searchText, setSearchText] = React.useState('');
  const [selectedLocation, setSelectedLocation] = React.useState<string>('');
  const [selectedDate, setSelectedDate] = React.useState<string>('2020-10-16');
  const [datesLocation, setDatesLocation] = React.useState<dateLocation[][]>();
  const { data: searchData, isLoading, error } = useLocationSearch(searchText);
  // Use basic fetch for the 10 dates
  // do it in a service file
  // check promise all
  const getDatesCallback = React.useCallback(
    async (selectedLocation, selectedDate) => {
      setDatesLocation(await getDates(selectedLocation, selectedDate));
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
            })}
        </div>
      </div>
    </div>
  );
}

export default App;
