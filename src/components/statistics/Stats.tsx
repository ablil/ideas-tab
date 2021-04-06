import react, { useContext, useEffect, useRef } from "react";
import { ProjectsContext } from "../../providers/ProjectsProvider";
import { Chart, registerables } from "chart.js";

Chart.register(...registerables);

const Stats = () => {
  const { projects } = useContext(ProjectsContext);
  const stats = useRef<any>(null);

  /**
   * Calcualte frequency of technologies
   * @returns object {tech: freq}
   */
  const filterData = () => {
    const technologies: any = {};

    projects?.forEach((p) => {
      p.technologies
        .map((tech) => tech.toLowerCase())
        .forEach((tech) => {
          if (technologies.hasOwnProperty(tech)) {
            technologies[tech]++;
          } else {
            technologies[tech] = 1;
          }
        });
    });
    return technologies;
  };

  useEffect(() => {
    const chartData = filterData();

    let chart = new Chart("stats", {
      type: "pie",
      data: {
        labels: Object.keys(chartData),
        datasets: [
          {
            data: Object.values(chartData),
            // Generate random rgb color for pie chart
            backgroundColor: Object.keys(chartData).map(
              (d) =>
                `rgb(${Math.round(Math.random() * 255)},${Math.round(
                  Math.random() * 255
                )},${Math.round(Math.random() * 255)})`
            ),
            borderWidth: 0,
          },
        ],
      },
      options: {
        // if set to true, canvas dimension will not work
        responsive: false,
      },
    });

    return () => {
      chart.destroy();
    };
  }, []);

  return (
    <section className="w-full h-full md:p-4">
      <header className="transparent mx-auto text-blue-400 text-2xl py-4 text-center lg:w-2/4 rounded border-l-4 border-blue-400">
        Total number of projects : {projects?.length || 0}{" "}
      </header>
      <section className="transparent text-white p-4 border-l-2 border-blue-400 mx-auto mt-2 lg:w-4/6">
        <h1 className="text-center py-2">
          Check what technoloies you use the most
        </h1>
        <canvas
          className="m-auto"
          id="stats"
          ref={stats}
          width={400}
          height={400}
        ></canvas>
      </section>
    </section>
  );
};

export default Stats;
