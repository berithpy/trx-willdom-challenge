import React from 'react';
import Select from 'react-select';
import { ValueType } from 'react-select';
import { Location } from '../../common/types';

interface InputGroupProps {
  setSelectedLocation: Function;
  searchData: Location[];
  setSearchText: Function;
  isLoading: boolean;
  selectedDate: string;
  setSelectedDate: Function;
  maxDate: string;
  error: string;
}
function InputGroup({
  setSelectedLocation,
  searchData,
  setSearchText,
  isLoading,
  selectedDate,
  setSelectedDate,
  maxDate,
}: InputGroupProps) {
  return (
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
        max={maxDate}
        onChange={(e) => {
          setSelectedDate(e.target.value);
        }}
      ></input>
    </div>
  );
}

export default InputGroup;
