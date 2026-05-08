export const getPositionSuffixOfNumber = (number: number) => {
  if (number % 10 == 1) {
    return "st";
  } else if (number % 10 == 2) {
    return "nd";
  } else if (number % 10 == 3) {
    return "rd";
  } else {
    return "th";
  }
};
