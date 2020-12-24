import { getIpInfo } from '.';

it('returns correctly', async () => {
  expect.assertions(1);
  const ip = '213.94.28.46';

  expect(await getIpInfo({ ip, ipstackApiKey: process.env.IPSTACK_API_KEY ?? '' })).toMatchObject({
    ip,
    type: 'ipv4',
    regionCode: 'ES',
    regionName: 'Spain',
    innerRegionCode: expect.any(String),
    innerRegionName: expect.any(String),
    languages: [
      {
        code: 'es',
        name: 'Spanish',
        native: 'Español',
      },
      {
        code: 'eu',
        name: 'Basque',
        native: 'Euskara',
      },
      {
        code: 'ca',
        name: 'Catalan',
        native: 'Català',
      },
      {
        code: 'gl',
        name: 'Galician',
        native: 'Galego',
      },
      {
        code: 'oc',
        name: 'Occitan',
        native: 'Occitan',
      },
    ],
    regionFlag: 'http://assets.ipstack.com/flags/es.svg',
    regionFlagEmoji: '🇪🇸',
    regionFlagEmojiUnicode: 'U+1F1EA U+1F1F8',
    phoneCode: '34',
    isEuropeanUnion: true,
  });
});
