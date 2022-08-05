export function getFilteredWorkshops(axiosInstance, start_date, end_date) {
  return axiosInstance.get(
    "workshops/filter/date/" + start_date + "/" + end_date + "/"
  );
}

export function getWorkshops(axiosInstance) {
  return axiosInstance.get("workshops/");
}

export function getWorkshopInstance(axiosInstance, id) {
  return axiosInstance.get("workshops/" + id);
}
