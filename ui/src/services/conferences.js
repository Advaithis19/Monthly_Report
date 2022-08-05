export function getFilteredConferences(axiosInstance, start_date, end_date) {
  return axiosInstance.get(
    "conferences/filter/date/" + start_date + "/" + end_date + "/"
  );
}

export function getConferences(axiosInstance) {
  return axiosInstance.get("conferences/");
}

export function getConferenceInstance(axiosInstance, id) {
  return axiosInstance.get("conferences/" + id);
}
