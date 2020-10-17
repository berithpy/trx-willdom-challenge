import fetch from './fetch';
import { getDates } from './fetcher';

const WOEID = '44418';
const DATE = '2020-10-16';
interface DateJson {
  date: string;
  milliseconds_since_epoch: string;
  time: string;
}
test('Fetch Data', async () => {
  const response = await fetch<DateJson>('http://date.jsontest.com');
  expect(response.date).toBeDefined();
  expect(response.milliseconds_since_epoch).toBeDefined();
  expect(response.time).toBeDefined();
});

test('Get dates', async () => {
  // make it deterministic
  // maybe look into mocking fetch
  const response = await getDates(WOEID, DATE, 1);
  const firstDL = response[0][0];
  expect(firstDL.the_temp).toBeDefined();
  expect(firstDL.weather_state_abbr).toBeDefined();
  expect(firstDL.weather_state_name).toBeDefined();
  expect(firstDL.min_temp).toBeDefined();
  expect(firstDL.max_temp).toBeDefined();
  expect(firstDL.the_temp).toBeDefined();
  expect(firstDL.humidity).toBeDefined();
  expect(firstDL.predictability).toBeDefined();
  expect(firstDL.applicable_date).toBeDefined();
});
