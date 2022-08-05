export function getFilteredPublications(axiosInstance, start_year, end_year) {
  return axiosInstance.get(
    "http://shivampjt.pythonanywhere.com/publication/" +
      start_year +
      "/" +
      end_year +
      "/"
  );
}
