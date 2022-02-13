export function getFilteredPatents(axiosInstance, start_date, end_date) {
  return axiosInstance.get(
    "patents/filter/date/" + start_date + "/" + end_date + "/"
  );
}

export function getPatents(axiosInstance) {
  return axiosInstance.get("patents/");
}

export function getPatentInstance(axiosInstance, id) {
  return axiosInstance.get("patents/" + id);
}
