const BLOCKED: Array<{ regionCode: string; innerRegionCode?: string }> = [
  { regionCode: 'DZ' },
  { regionCode: 'BD' },
  { regionCode: 'BO' },
  { regionCode: 'BY' },
  { regionCode: 'BI' },
  { regionCode: 'MM' },
  { regionCode: 'CI' },
  { regionCode: 'CU' },
  { regionCode: 'CD' },
  { regionCode: 'EC' },
  { regionCode: 'IR' },
  { regionCode: 'IQ' },
  { regionCode: 'LY' },
  { regionCode: 'ML' },
  { regionCode: 'MA' },
  { regionCode: 'LR' },
  { regionCode: 'KP' },
  { regionCode: 'NP' },
  { regionCode: 'SO' },
  { regionCode: 'SY' },
  { regionCode: 'VE' },
  { regionCode: 'ZW' },
  { regionCode: 'US' },
  { regionCode: 'SD' },
  { regionCode: 'UA', innerRegionCode: '40' },
  { regionCode: 'UA', innerRegionCode: '43' },
];

export const shouldBlockRegion = ({
  regionCode,
  innerRegionCode,
}: {
  regionCode: string;
  innerRegionCode?: string;
}) =>
  !!BLOCKED.find((it) => {
    if (!it.innerRegionCode) {
      return it.regionCode === regionCode.toUpperCase();
    }

    return (
      it.regionCode === regionCode.toUpperCase() &&
      innerRegionCode &&
      it.innerRegionCode === innerRegionCode.toUpperCase()
    );
  });
