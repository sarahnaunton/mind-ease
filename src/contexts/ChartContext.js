import { createContext, useEffect, useState, useCallback } from "react";
import axios from "axios";

const ChartContext = createContext();

function ChartProvider(props) {
  const [chartData, setChartData] = useState(null);
  const [errorMessage, setErrorMessage] = useState(false);

  const getChartData = useCallback(async () => {
    const authToken = localStorage.getItem("authToken");

    if (authToken) {
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
    }
  },[]);

  useEffect(() => {
    getChartData();
  }, [getChartData]);

  return (
    <ChartContext.Provider value={{ chartData, getChartData, errorMessage }}>
      {props.children}
    </ChartContext.Provider>
  );
}

export { ChartContext, ChartProvider };
