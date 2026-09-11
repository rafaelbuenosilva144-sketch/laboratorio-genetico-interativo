import { Doughnut } from "react-chartjs-2";

export const ProbabilityChart = ({
  brown,
  blue
}: {
  brown: number;
  blue: number;
}) => {
  return (
    <Doughnut
      data={{
        labels: ["Castanho", "Azul"],
        datasets: [
          {
            data: [brown, blue],
            backgroundColor: ["rgba(245, 158, 11, .85)", "rgba(96, 165, 250, .85)"],
            borderColor: ["rgba(255,255,255,.15)", "rgba(255,255,255,.15)"],
            borderWidth: 1
          }
        ]
      }}
      options={{
        plugins: {
          legend: {
            labels: {
              color: "#E5F4FF"
            }
          }
        }
      }}
    />
  );
};
