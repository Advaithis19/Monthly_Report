const natIntOptions = [
  {
    full: "National",
    short: "NAT",
  },
  {
    full: "International",
    short: "INT",
  },
];

export const findNatIntLabel = (value) => {
  return natIntOptions.filter((option) => {
    return option.short === value;
  })[0].full;
};

export default natIntOptions;
