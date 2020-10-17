import useSWR from 'swr';

import fetch from './fetch';
import { BASE_URL } from '../common/constants';
import { addDays, getIsoString, getApiDate } from '../common/utils';
import { DateLocation, Location } from '../common/types';

interface UseLocationSearchFetcher {
  data: Location[];
  isLoading: boolean;
  error: string;
}
interface UseLocationFetcher {
  data: DateLocation[];
  isLoading: boolean;
  error: string;
}

export function useLocationSearch(searchText: string): UseLocationSearchFetcher {
  const { data = [], error } = useSWR<Location[]>(
    searchText ? `${BASE_URL}search/?query=${searchText}` : null,
    fetch,
    { shouldRetryOnError: false, errorRetryCount: 0 }
  );
  return {
    data,
    isLoading: !error && !data,
    error,
  };
}

export function useLocation(woeid: string, date = ''): UseLocationFetcher {
  let fetchUrl = woeid ? `${BASE_URL}${woeid}/` : null;
  if (date) fetchUrl = `${fetchUrl}${date}`;
  const { data = [], error } = useSWR<DateLocation[]>(fetchUrl, fetch, {
    shouldRetryOnError: false,
    errorRetryCount: 0,
  });
  return {
    data,
    isLoading: !error && !data,
    error,
  };
}

export async function getDates(woeid: string, date: string, count = 10): Promise<DateLocation[][]> {
  const promises: Promise<DateLocation[]>[] = [];

  for (let index = 0; index < count; index += 1) {
    if (!woeid || !date) {
      break;
    }
    const currentDate = getApiDate(getIsoString(addDays(new Date(date), index)));
    const currentURL = `${BASE_URL}${woeid}/${currentDate}`;
    promises.push(fetch(currentURL));
  }
  return Promise.all(promises);
}
