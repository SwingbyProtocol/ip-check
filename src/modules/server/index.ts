import { getIpInfo } from '../ip';
import { shouldBlockRegion } from '../region-block';

type Req = {
  headers: { [k: string]: undefined | string | string[] };
  connection: { remoteAddress?: string };
};

type ThenArg<T> = T extends PromiseLike<infer U> ? U : T;
export type IpInfoFromRequest = {
  info: ThenArg<ReturnType<typeof getIpInfo>> | null;
  ip: string | null;
  shouldBlockRegion: boolean;
};

export const getIpInfoFromRequest = async ({
  req,
  ipApiKey,
}: {
  req: Req;
  ipApiKey?: string;
}): Promise<IpInfoFromRequest> => {
  const ip =
    (typeof req.headers['x-real-ip'] === 'string' ? req.headers['x-real-ip'] : null) ??
    req.connection.remoteAddress ??
    null;

  const info = await (async () => {
    try {
      if (!ip || !process.env.IPAPI_API_KEY) return null;
      return await getIpInfo({ ip: ip, ipApiKey });
    } catch (e) {
      return null;
    }
  })();

  const blockRegion = (() => {
    try {
      if (!info) return false;
      return shouldBlockRegion(info);
    } catch (e) {
      return false;
    }
  })();

  return { info, ip, shouldBlockRegion: blockRegion };
};
