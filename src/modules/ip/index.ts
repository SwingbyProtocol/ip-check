import fetch from 'isomorphic-unfetch';
import { stringifyUrl } from 'query-string';

export const getIpInfo = async ({ ip, ipApiKey }: { ip: string; ipApiKey?: string }) => {
  const result = await fetch(
    stringifyUrl({ url: `https://ipapi.co/${ip}/json/`, query: { key: ipApiKey } }),
  );

  if (!result.ok) {
    const message = await (async () => {
      try {
        return await result.text();
      } catch (e) {
        return result.statusText;
      }
    })();

    throw new Error(`${result.status}: ${message}`);
  }

  const data = await (async () => {
    try {
      return await result.json();
    } catch (e) {
      const error = new Error(`Could not parse ipapi.co’s response: ${e.message}`);
      error.stack = e.stack;
      throw error;
    }
  })();

  return {
    ip: data.ip as string,
    regionCode: data.country_code as string,
    regionName: data.country_name as string,
    innerRegionCode: data.region_code as string,
    innerRegionName: data.region as string,
    languages: (typeof data.languages === 'string' ? data.languages.split(',') : []) as string[],
    phoneCode: (data.location?.country_calling_code || null) as string | null,
    isEuropeanUnion: (data.location?.in_eu ?? null) as boolean | null,
  };
};
