import react, { useContext, useEffect, useMemo, useRef } from "react";
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
  const calcFrequncies = () => {
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

  const technologies = useMemo(() => calcFrequncies(), [projects]);
  useEffect(() => {
    let chart = new Chart("stats", {
      type: "pie",
      data: {
        labels: Object.keys(technologies),
        datasets: [
          {
            data: Object.values(technologies),
            // Generate random rgb color for pie chart
            backgroundColor: Object.keys(technologies).map(
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
      <header className="shadow mx-auto ground title text-2xl py-4 text-center lg:w-2/4 rounded dark:border-gray-50">
        Total number of projects : {projects?.length || 0}{" "}
      </header>
      {Object.keys(technologies).length != 0 ? (
        <section className="p-4 dark:border-gray-50 ground shadow rounded-lg mx-auto mt-2 lg:w-4/6">
          <h1 className="text-center py-2">
            Check what technologies your are using the most.
          </h1>
          <canvas
            className="m-auto"
            id="stats"
            ref={stats}
            width={400}
            height={400}
          ></canvas>
        </section>
      ) : (
        <section className="p-4 border-l-2 border-gray-800 dark:border-gray-50 ground shadow rounded-lg mx-auto mt-2 lg:w-4/6">
          <h1 className="text-center">
            It seems you did not specify any technology on your project
          </h1>
        </section>
      )}
    </section>
  );
};

export default Stats;
