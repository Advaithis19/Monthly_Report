export default function getChartData(axiosInstance) {
  return axiosInstance.get("aggregate/");
}
