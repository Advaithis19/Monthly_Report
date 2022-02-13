const semesterOptions = [
  {
    full: "First",
    short: "1",
  },
  {
    full: "Second",
    short: "2",
  },
  {
    full: "Third",
    short: "3",
  },
  {
    full: "Fourth",
    short: "4",
  },
  {
    full: "Fifth",
    short: "5",
  },
  {
    full: "Sixth",
    short: "6",
  },
  {
    full: "Seventh",
    short: "7",
  },
  {
    full: "Eighth",
    short: "8",
  },
];

export const findSemesterLabel = (value) => {
  return semesterOptions.filter((option) => {
    return option.short == value;
  })[0].full;
};

export default semesterOptions;
