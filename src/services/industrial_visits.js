export function getFilteredIndustrial_visits(
  axiosInstance,
  start_date,
  end_date
) {
  return axiosInstance.get(
    "industrial_visits/filter/date/" + start_date + "/" + end_date + "/"
  );
}

export function getIndustrial_visits(axiosInstance) {
  return axiosInstance.get("industrial_visits/");
}

export function getIndustrial_visitInstance(axiosInstance, id) {
  return axiosInstance.get("industrial_visits/" + id);
}
