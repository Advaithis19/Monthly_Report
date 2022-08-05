export function getFilteredTalks(axiosInstance, start_date, end_date) {
  return axiosInstance.get(
    "talks/filter/date/" + start_date + "/" + end_date + "/"
  );
}

export function getTalks(axiosInstance) {
  return axiosInstance.get("talks/");
}

export function getTalkInstance(axiosInstance, id) {
  return axiosInstance.get("talks/" + id);
}
