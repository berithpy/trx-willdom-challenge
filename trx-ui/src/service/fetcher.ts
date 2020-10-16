import useSWR from 'swr';

import fetch from './fetch';
import { BASE_URL } from '../common/constants';
import { addDays, getIsoString, getApiDate } from '../common/utils';
import { dateLocation } from '../common/types';

export function useLocationSearch(searchText: string) {
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

export function useLocation(woeid: string, date: string = '') {
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
export async function getDates(woeid: string, date: string) {
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
