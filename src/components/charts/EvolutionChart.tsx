import { Line } from "react-chartjs-2";
import { EvolutionPoint } from "../../types/genetics";

export const EvolutionChart = ({ data }: { data: EvolutionPoint[] }) => {
  return (
    <Line
      data={{
        labels: data.map((point) => `G${point.generation}`),
        datasets: [
          {
            label: "Resistentes",
            data: data.map((point) => point.resistant),
            borderColor: "rgba(0,229,255,.95)",
            backgroundColor: "rgba(0,229,255,.15)",
            tension: 0.35
          },
          {
            label: "Sensíveis",
            data: data.map((point) => point.sensitive),
            borderColor: "rgba(168,85,247,.95)",
            backgroundColor: "rgba(168,85,247,.15)",
            tension: 0.35
          }
        ]
      }}
      options={{
        responsive: true,
        plugins: {
          legend: {
            labels: { color: "#E5F4FF" }
          }
        },
        scales: {
          x: {
            ticks: { color: "rgba(255,255,255,.75)" },
            grid: { color: "rgba(255,255,255,.08)" }
          },
          y: {
            ticks: { color: "rgba(255,255,255,.75)" },
            grid: { color: "rgba(255,255,255,.08)" }
          }
        }
      }}
    />
  );
};
