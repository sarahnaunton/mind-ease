import { Line } from "react-chartjs-2";

export default function MoodGraph({ chartData }) {
  chartData.labels = chartData.map((data) =>
    new Date(data.created_at).toLocaleDateString("en-GB", {
      day: "numeric",
      month: "numeric",
      year: "2-digit",
    })
  );
  chartData.datasets = [
    {
      label: "OBI Score",
      data: chartData.map((data) => data.score),
      borderColor: "rgba(56, 56, 56, 0.7)",
    },
  ];

  return (
    <section>
      <div>
        <Line
          data={chartData}
          options={{
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
                ticks: {
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
                  },
                },
                grid: {
                  display: false,
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
          }}
          plugins={[
            {
              //Add background color to chart
              beforeDraw(chart) {
                const {
                  ctx,
                  chartArea: { left, width },
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
            },
            {
              // On hover add a vertical line
              afterDraw: (chart) => {
                if (chart.tooltip?._active?.length) {
                  let x = chart.tooltip._active[0].element.x;
                  let yAxis = chart.scales.y;
                  let ctx = chart.ctx;
                  ctx.save();
                  ctx.beginPath();
                  ctx.setLineDash([5, 5]);
                  ctx.moveTo(x, yAxis.top);
                  ctx.lineTo(x, yAxis.bottom);
                  ctx.lineWidth = 1;
                  ctx.strokeStyle = "rgba(0, 0, 255, 0.4)";
                  ctx.stroke();
                  ctx.restore();
                }
              },
            },
          ]}
        />
      </div>
    </section>
  );
}
