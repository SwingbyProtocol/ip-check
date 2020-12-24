import { shouldBlockRegion } from '.';

it.each([
  { ipInfo: { regionCode: 'UA' }, expected: false },
  { ipInfo: { regionCode: 'ES' }, expected: false },
  { ipInfo: { regionCode: 'US' }, expected: true },
  { ipInfo: { regionCode: 'UA', innerRegionCode: '40' }, expected: true },
])('returns correctly for %O', ({ ipInfo, expected }) => {
  expect(shouldBlockRegion(ipInfo)).toBe(expected);
});
