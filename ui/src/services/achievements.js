export function getFilteredAchievements(axiosInstance, start_date, end_date) {
  return axiosInstance.get(
    "achievements/filter/date/" + start_date + "/" + end_date + "/"
  );
}

export function getAchievements(axiosInstance) {
  return axiosInstance.get("achievements/");
}

export function getAchievementInstance(axiosInstance, id) {
  return axiosInstance.get("achievements/" + id);
}
