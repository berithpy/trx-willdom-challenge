import React from 'react';
import './App.css';
import InputGroup from './components/inputGroup';
import WeatherGroup from './components/weatherGroup';
import { useLocationSearch, getDates } from './service/fetcher';
import { dateLocation } from './common/types';
import { addDays } from './common/utils';

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
      setDatesLocation([[]]);
      setLoadingDates(true);
      setDatesLocation(await getDates(selectedLocation, selectedDate));
      setLoadingDates(false);
    },
    [setDatesLocation]
  );
  React.useEffect(() => {
    getDatesCallback(selectedLocation, selectedDate);
  }, [selectedLocation, selectedDate, getDatesCallback]);
  const maxDate = addDays(today, 4).toISOString().split('T')[0];
  return (
    <div className="App">
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
