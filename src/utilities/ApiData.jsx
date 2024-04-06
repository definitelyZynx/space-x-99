import axios from "axios";

const API_URL = "https://api.spacexdata.com/v4/launches/";

const fetchData = async () => {
  const data = await axios.get(API_URL).then(response => response.data).catch(error => {
    console.error("Error fetching data:", error);
  });
  return data;
}

export { fetchData };