export const  abbreviateNumber=(number:any)=> {
  if (number < 1000) {
    return number.toFixed(3);
  }

  let suffix = '';
  let magnitude = 0;

  while (number >= 1000) {
    magnitude++;
    number = number / 1000;
  }

  switch (magnitude) {
    case 1:
      suffix = 'K';
      break;
    case 2:
      suffix = 'M';
      break;
    case 3:
      suffix = 'B';
      break;
    case 4:
      suffix = 'T';
      break;
    case 5:
      suffix = 'P';
      break;
    case 6:
      suffix = 'E';
      break;
    default:
      suffix = 'K';
      break;
  }

  return number?.toFixed(3) + suffix;
}
