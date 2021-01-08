Small util to check a user's country by IP and whether access to our product should be restricted.

## Getting started

1. Install with `yarn add @swingby-protocol/ip-check`.
2. Get an API key for [ipapi.co](https://ipapi.co). (Optional)

```ts
import { getIpInfo, shouldBlockRegion } from '@swingby-protocol/ip-check';

const ipInfo = await getIpInfo({ ip: '…', ipstackApiKey: '…' });
const yesOrNo = shouldBlockRegion(ipInfo);
```
