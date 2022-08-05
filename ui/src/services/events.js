export function getFilteredEvents(axiosInstance, start_date, end_date) {
  return axiosInstance.get(
    "events/filter/date/" + start_date + "/" + end_date + "/"
  );
}

export function getEvents(axiosInstance) {
  return axiosInstance.get("events/");
}

export function getEventInstance(axiosInstance, id) {
  return axiosInstance.get("events/" + id);
}
