import { getIpInfo } from '.';

it('returns correctly', async () => {
  expect.assertions(1);
  const ip = '213.94.28.46';

  expect(await getIpInfo({ ip, ipApiKey: process.env.IPAPI_API_KEY ?? '' })).toMatchObject({
    ip,
    regionCode: 'ES',
    regionName: 'Spain',
    innerRegionCode: expect.any(String),
    innerRegionName: expect.any(String),
    languages: ['es-ES', 'ca', 'gl', 'eu', 'oc'],
    phoneCode: '+34',
    isEuropeanUnion: true,
  });
});
