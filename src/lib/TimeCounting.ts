import timeCounting from 'time-counting';

const parseTime = (time: Date | string): string => {
  return timeCounting(time, { lang: 'ko' });
};

export default parseTime