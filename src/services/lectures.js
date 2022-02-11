export function getFilteredLectures(axiosInstance, start_date, end_date) {
  return axiosInstance.get(
    "lectures/filter/date/" + start_date + "/" + end_date + "/"
  );
}

export function getLectures(axiosInstance) {
  return axiosInstance.get("lectures/");
}

export function getLectureInstance(axiosInstance, id) {
  return axiosInstance.get("lectures/" + id);
}
