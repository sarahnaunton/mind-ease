import { useEffect, useState } from "react";
import axios from "axios";
import Chart from "chart.js/auto";

export default function MoodGraph() {
  const [scores, setScores] = useState(null);
  const [chartInstance, setChartInstance] = useState(null);

  const getScores = async () => {
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
      setScores(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getScores();
  }, []);

  useEffect(() => {
    if (!scores || !Chart) {
      return;
    }

    if (chartInstance) {
      chartInstance.destroy();
    }

    const ctx = document.getElementById("myChart");
    const canvasBackgroundColor = {
      id: "canvasBackgroundColor",
      beforeDraw(chart) {
        const {
          ctx,
          chartArea: { left, right, width },
          scales: { y },
        } = chart;
        ctx.fillStyle = "rgba(231, 43, 43, 0.2)";
        ctx.fillRect(
          left,
          y.getPixelForValue(64),
          width,
          y.getPixelForValue(45) - y.getPixelForValue(64)
        );
        ctx.fillStyle = "rgba(246, 114, 66, 0.2)";
        ctx.fillRect(
          left,
          y.getPixelForValue(45),
          width,
          y.getPixelForValue(30) - y.getPixelForValue(45)
        );
        ctx.fillStyle = "rgba(85, 176, 109, 0.2)";
        ctx.fillRect(
          left,
          y.getPixelForValue(30),
          width,
          y.getPixelForValue(16) - y.getPixelForValue(30)
        );
      },
    };

    if (ctx) {
      const newChartInstance = new Chart(ctx, {
        type: "line",
        data: {
          labels: scores.map((row) =>
            new Date(row.created_at).toLocaleDateString("en-GB", {day: "numeric", month: "numeric", year: "2-digit"})
          ),
          datasets: [
            {
              label: "Mental Heath Score",
              data: scores.map((row) => row.score),
              borderColor: "rgba(56, 56, 56, 0.7)",
            },
          ],
        },
        options: {
          scales: {
            x: {
              title: {
                display: true,
                text: "Date",
                font: {
                    size: 14,
                    weight: "bold",

                },
                },
                grid: {
                    display: false,
              },
            },
            y: {
              title: {
                display: true,
                text: "Score",
                font: {
                    size: 14,
                    weight: "bold",
                }
              },
              min: 16,
              max: 64,
            },
          },
          plugins: {
            legend: {
              display: false,
            },
          },
        },
        plugins: [canvasBackgroundColor],
      });
      setChartInstance(newChartInstance);
    }
  }, [scores]);

  return (
    <section>
      <div>
        <canvas id="myChart"></canvas>
      </div>
    </section>
  );
}
