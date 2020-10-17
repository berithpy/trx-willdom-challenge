import { getApiDate, getIsoString, addDays } from './utils';

test('getApiDate', async () => {
  const result = getApiDate('2020-05-29');
  expect(result).toBe('2020/05/29');
  const wrongresult = getApiDate('2020-05-02');
  expect(wrongresult).not.toBe('2020-05-02');
});

test('getIsoString', async () => {
  const result = getIsoString(new Date('2020-05-05T00:00:00Z'));
  expect(result).toBe('2020-05-05');
});

test('addDays', async () => {
  const testDate = new Date('2020-05-05');
  const sixresult = addDays(testDate, 1).getUTCDate();
  expect(sixresult).toBe(6);
  const sevenresult = addDays(testDate, 2).getUTCDate();
  expect(sevenresult).toBeGreaterThan(6);
});
