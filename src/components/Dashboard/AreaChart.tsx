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

        let bugCount = 0;
        let featureCount = 0;
        let docCount = 0;
        for (let index = 0; index < project.tasks.length; index++) {
          if (
            new Date(parseInt(project.tasks[index].created)) <= d &&
            project.tasks[index].status !== "Closed"
          ) {
            if (project.tasks[index].type === "Bug") {
              bugCount++;
            }
            if (project.tasks[index].type === "Feature Request") {
              featureCount++;
            }
            if (project.tasks[index].type === "Documentation") {
              docCount++;
            }
          }
        }

        result.push({
          label: d.toLocaleDateString(),
          bugCount,
          featureCount,
          docCount,
        });
      }

      return result;
    };

    if (null === chartRef.current || project === null) return;
    const dateLabels = getChartData();

    if (chart != null && chart.data.datasets != null) {
      chart.data.labels = dateLabels.map((t) => t.label);
      chart.data.datasets[0].data = dateLabels.map((t) => t.bugCount);
      chart.data.datasets[1].data = dateLabels.map((t) => t.featureCount);
      chart.data.datasets[2].data = dateLabels.map((t) => t.docCount);
      chart.update();
      setChart(chart);
      return;
    }

    // const maxCount = Math.max.apply(
    //   Math,
    //   dateLabels.map((t) => t.count)
    // );

    const newChart = new Chart(chartRef.current, {
      type: "line",
      data: {
        labels: dateLabels.map((t) => t.label),
        datasets: [
          {
            label: "Documentation",
            lineTension: 0.3,
            backgroundColor: "rgba(0, 123, 255, 0.2)",
            borderColor: "#007bff",
            pointRadius: 5,
            pointBackgroundColor: "#007bff",
            pointBorderColor: "rgba(255,255,255,0.8)",
            pointHoverRadius: 5,
            pointHoverBackgroundColor: "#007bff",
            pointHitRadius: 50,
            pointBorderWidth: 2,
            data: dateLabels.map((t) => t.docCount),
          },
          {
            label: "Issue",
            lineTension: 0.3,
            backgroundColor: "rgba(0, 123, 255, 0.2)",
            borderColor: "#dc3545",
            pointRadius: 5,
            pointBackgroundColor: "#dc3545",
            pointBorderColor: "rgba(255,255,255,0.8)",
            pointHoverRadius: 5,
            pointHoverBackgroundColor: "#dc3545",
            pointHitRadius: 50,
            pointBorderWidth: 2,
            data: dateLabels.map((t) => t.bugCount),
          },
          {
            label: "Feature Request",
            lineTension: 0.3,
            backgroundColor: "rgba(2,117,216,0.2)",
            borderColor: "#28a745",
            pointRadius: 5,
            pointBackgroundColor: "#28a745",
            pointBorderColor: "rgba(255,255,255,0.8)",
            pointHoverRadius: 5,
            pointHoverBackgroundColor: "#28a745",
            pointHitRadius: 50,
            pointBorderWidth: 2,
            data: dateLabels.map((t) => t.featureCount),
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
                max: 10,
                // max: maxCount === 0 ? 10 : maxCount * 1.5,
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
