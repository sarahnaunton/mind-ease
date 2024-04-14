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
              display: true,
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
              display: true,
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
          //Add color to line depending on value
          beforeRender: (chart) => {
            const dataset = chart.data.datasets[0];
            const yScale = chart.scales["y"];
            const yMin = 16;
            const yMax = 64;
            const gradientFill = chart.ctx.createLinearGradient(
              0,
              yScale.getPixelForValue(yMin),
              0,
              yScale.getPixelForValue(yMax)
            );
            const greenPosition = (16 - yMin) / (yMax - yMin);
            gradientFill.addColorStop(greenPosition, "rgb(0 , 255, 0)");
            const orangePosition = (30 - yMin) / (yMax - yMin);
            gradientFill.addColorStop(orangePosition, "rgb(255, 221, 0)");
            const redPosition = (45 - yMin) / (yMax - yMin);
            gradientFill.addColorStop(redPosition, "rgb(252, 48 , 12)");
            dataset.borderColor = gradientFill;
          },
        },
        {
          // Add hover add a vertical line
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
  );
}
