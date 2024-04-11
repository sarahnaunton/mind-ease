import { createContext, useEffect, useState } from "react";
import axios from "axios";

const ChartContext = createContext();

function ChartProvider(props) {
  const [chartData, setChartData] = useState(null);
  const [errorMessage, setErrorMessage] = useState(false);

  const getChartData = async () => {
    const authToken = localStorage.getItem("authToken");
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_API_BASE_URL}/scores`,
        {
          headers: {
            authorization: `Bearer ${authToken}`,
          },
        }
      );
      setChartData(data);
      setErrorMessage(false);
    } catch (error) {
      setErrorMessage(error.response.data.error);
    }
  };

  useEffect(() => {
    getChartData();
  }, []);

  return (
    <ChartContext.Provider value={{ chartData, errorMessage }}>
      {props.children}
    </ChartContext.Provider>
  );
}

export { ChartContext, ChartProvider };
