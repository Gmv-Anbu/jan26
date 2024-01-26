/* eslint-disable-next-line */
interface AbbreviateNumberProps {
  num: number,
}

export function AbbreviateNumber(props: AbbreviateNumberProps) {
  const {num} = props;
  let SI_SYMBOL = ['', 'k', 'M', 'G', 'T', 'P', 'E'];
  // what tier? (determines SI symbol)
  var tier = (Math.log10(Math.abs(num)) / 3) | 0;

  // if zero, we don't need a suffix
  if (tier == 0) return num;

  // get suffix and determine scale
  var suffix = SI_SYMBOL[tier];
  var scale = Math.pow(10, tier * 3);

  // scale the number
  var scaled = num / scale;

  // format number and add suffix
  return scaled.toFixed(1) + suffix;
}

export default AbbreviateNumber;