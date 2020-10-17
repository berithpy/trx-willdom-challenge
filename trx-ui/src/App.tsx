import React, { ReactElement } from 'react';
import './App.css';
import InputGroup from './components/inputGroup';
import WeatherGroup from './components/weatherGroup';
import WeatherIcon from './components/weatherIcon';
import { useLocationSearch, getDates } from './service/fetcher';
import { DateLocation } from './common/types';
import { addDays } from './common/utils';
import { WEATHER_ICONS } from './common/constants';

const today = new Date();

function App(): ReactElement {
  const [searchText, setSearchText] = React.useState<string>('');
  const [selectedLocation, setSelectedLocation] = React.useState<string>('');
  const [selectedDate, setSelectedDate] = React.useState<string>('2020-10-16');
  const [datesLocation, setDatesLocation] = React.useState<DateLocation[][]>();
  const [loadingDates, setLoadingDates] = React.useState<boolean>(false);
  const [randomIcon, setRandomIcon] = React.useState<number>(0);
  const { data: searchData, isLoading, error } = useLocationSearch(searchText);

  const getDatesCallback = React.useCallback(
    async (gselectedLocation, gselectedDate) => {
      setDatesLocation([[]]);
      setLoadingDates(true);
      setDatesLocation(await getDates(gselectedLocation, gselectedDate));
      setLoadingDates(false);
    },
    [setDatesLocation]
  );

  React.useEffect(() => {
    getDatesCallback(selectedLocation, selectedDate);
  }, [selectedLocation, selectedDate, getDatesCallback]);

  React.useEffect(() => {
    setRandomIcon(Math.floor(Math.random() * WEATHER_ICONS.length));
  }, [setRandomIcon]);

  const maxDate = addDays(today, 4).toISOString().split('T')[0];
  return (
    <div className="App">
      <WeatherIcon wabbr={WEATHER_ICONS[randomIcon]} />
      <h1>Weather Report</h1>
      <InputGroup
        setSelectedLocation={setSelectedLocation}
        searchData={searchData}
        setSearchText={setSearchText}
        isLoading={isLoading}
        selectedDate={selectedDate}
        setSelectedDate={setSelectedDate}
        maxDate={maxDate}
        error={error}
      />
      <WeatherGroup loadingDates={loadingDates} datesLocation={datesLocation} />
    </div>
  );
}

export default App;
