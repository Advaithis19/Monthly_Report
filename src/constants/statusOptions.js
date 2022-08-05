const statusOptions = [
  {
    full: "Accepted",
    short: "AC",
  },
  {
    full: "Rejected",
    short: "RE",
  },
  {
    full: "Ongoing",
    short: "ON",
  },
];

export const findStatusLabel = (value) => {
  return statusOptions.filter((option) => {
    return option.short === value;
  })[0].full;
};

export default statusOptions;
