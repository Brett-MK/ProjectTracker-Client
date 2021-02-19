import { useRef, useEffect, useState } from "react";
import Chart from "chart.js";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChartArea } from "@fortawesome/free-solid-svg-icons";
import { Project } from "../../api/projectsApi";

interface Props {
  project: Project;
}

const AreaChart = ({ project }: Props) => {
  const [chart, setChart] = useState<Chart>();
  const chartRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const getChartData = () => {
      var result = [];
      for (var i = 7; i >= 0; i -= 1) {
        var d = new Date();
        d.setDate(d.getDate() - i);

        let count = 0;
        for (let index = 0; index < project.tasks.length; index++) {
          if (
            new Date(parseInt(project.tasks[index].created)) <= d &&
            project.tasks[index].status !== "Closed"
          ) {
            count++;
          }
        }

        result.push({ label: d.toLocaleDateString(), count: count });
      }

      return result;
    };

    if (null === chartRef.current || project === null) return;
    const dateLabels = getChartData();

    if (chart != null && chart.data.datasets != null) {
      chart.data.labels = dateLabels.map((t) => t.label);
      chart.data.datasets[0].data = dateLabels.map((t) => t.count);
      chart.update();
      setChart(chart);
      return;
    }

    const maxCount = Math.max.apply(
      Math,
      dateLabels.map((t) => t.count)
    );

    const newChart = new Chart(chartRef.current, {
      type: "line",
      data: {
        labels: dateLabels.map((t) => t.label),
        datasets: [
          {
            label: "Tasks",
            lineTension: 0.3,
            backgroundColor: "rgba(2,117,216,0.2)",
            borderColor: "rgba(2,117,216,1)",
            pointRadius: 5,
            pointBackgroundColor: "rgba(2,117,216,1)",
            pointBorderColor: "rgba(255,255,255,0.8)",
            pointHoverRadius: 5,
            pointHoverBackgroundColor: "rgba(2,117,216,1)",
            pointHitRadius: 50,
            pointBorderWidth: 2,
            data: dateLabels.map((t) => t.count),
          },
        ],
      },
      options: {
        scales: {
          xAxes: [
            {
              time: {
                unit: "day",
              },
              gridLines: {
                display: false,
              },
              ticks: {
                maxTicksLimit: 7,
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
                color: "rgba(0, 0, 0, .125)",
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
          <FontAwesomeIcon className="mr-1" icon={faChartArea} />
          Task Progress
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

export default AreaChart;
