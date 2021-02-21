import { useRef, useEffect, useState } from "react";
import Chart from "chart.js";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChartBar } from "@fortawesome/free-solid-svg-icons";
import { Project } from "../../api/projectsApi";

interface Props {
  project: Project;
}

export const BarChart = ({ project }: Props) => {
  const [chart, setChart] = useState<Chart>();
  const chartRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const getChartData = () => {
      let results = [0, 0, 0];

      project.tasks.forEach((task) => {
        if (task.type === "Bug" && task.status !== "Closed") {
          results[0]++;
        } else if (
          task.type === "Feature Request" &&
          task.status !== "Closed"
        ) {
          results[1]++;
        } else if (task.type === "Documentation" && task.status !== "Closed") {
          results[2]++;
        }
      });

      return results;
    };

    if (null === chartRef.current) return;

    const chartData = getChartData();

    if (chart != null && chart.data.datasets != null) {
      chart.data.datasets[0].data = chartData;
      chart.update();
      setChart(chart);
      return;
    }

    const maxCount = Math.max.apply(Math, chartData);

    const newChart = new Chart(chartRef.current, {
      type: "bar",
      data: {
        labels: ["Issue", "Feature Request", "Documentation"],
        datasets: [
          {
            label: "Tasks",
            backgroundColor: ["#dc3545", "#28a745", "#007bff"],
            borderColor: "rgba(2,117,216,1)",
            data: chartData,
          },
        ],
      },
      options: {
        scales: {
          xAxes: [
            {
              time: {
                unit: "month",
              },
              gridLines: {
                display: false,
              },
              ticks: {
                maxTicksLimit: 6,
              },
            },
          ],
          yAxes: [
            {
              ticks: {
                min: 0,
                max: maxCount === 0 ? 10 : maxCount * 1.5,
                maxTicksLimit: 5,
              },
              gridLines: {
                display: true,
              },
            },
          ],
        },
        legend: {
          display: false,
        },
      },
    });

    setChart(newChart);
  }, [project, chart]);

  return (
    <div className="col-xl-6">
      <div className="card mb-4">
        <div className="card-header">
          <FontAwesomeIcon className="mr-1" icon={faChartBar} />
          Task Types
        </div>
        <div className="card-body">
          <canvas
            id="myAreaChart"
            width="100%"
            height="40"
            ref={chartRef}
          ></canvas>
        </div>
      </div>
    </div>
  );
};
