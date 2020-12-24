import fetch from 'isomorphic-unfetch';

export const getIpInfo = async ({ ip, ipstackApiKey }: { ip: string; ipstackApiKey: string }) => {
  const result = await fetch(`http://api.ipstack.com/${ip}?access_key=${ipstackApiKey}`);
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
      const error = new Error(`Could not parse ipstack’s response: ${e.message}`);
      error.stack = e.stack;
      throw error;
    }
  })();

  return {
    ip: data.ip as string,
    type: data.type as string,
    regionCode: data.country_code as string,
    regionName: data.country_name as string,
    innerRegionCode: data.region_code as string,
    innerRegionName: data.region_name as string,
    languages: (data.location?.languages ?? []).map((it: any) => ({
      code: it.code as string,
      name: it.name as string,
      native: it.native as string,
    })),
    regionFlag: (data.location?.country_flag || null) as string | null,
    regionFlagEmoji: (data.location?.country_flag_emoji || null) as string | null,
    regionFlagEmojiUnicode: (data.location?.country_flag_emoji_unicode || null) as string | null,
    phoneCode: (data.location?.calling_code || null) as string | null,
    isEuropeanUnion: (data.location?.is_eu ?? null) as boolean | null,
  };
};
