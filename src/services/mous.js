export function getFilteredMous(axiosInstance, start_date, end_date) {
  return axiosInstance.get(
    "mous/filter/date/" + start_date + "/" + end_date + "/"
  );
}

export function getMous(axiosInstance) {
  return axiosInstance.get("mous/");
}

export function getMouInstance(axiosInstance, id) {
  return axiosInstance.get("mous/" + id);
}
