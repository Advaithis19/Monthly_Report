export function getFilteredActivities(axiosInstance, start_date, end_date) {
  return axiosInstance.get(
    "activities/filter/date/" + start_date + "/" + end_date + "/"
  );
}

export function getActivities(axiosInstance) {
  return axiosInstance.get("activities/");
}

export function getActivityInstance(axiosInstance, id) {
  return axiosInstance.get("activities/" + id);
}
