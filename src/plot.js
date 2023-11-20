import { useState, useEffect } from "react";
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";
import * as Utils from "./Utils.js";

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
);

export default function BasicLineChart() {
    const initLabels = [];
    const initData = {
        initLabels,
        datasets: [],
    };
    const [data, setData] = useState(initData);

    const options = {
        type: "line",
        data: data,
        options: {
            responsive: true,
            plugins: {
                legend: {
                    position: "top",
                },
            },
        },
        aspectRatio: 1
    };

    const getYler = (plot_data) => {
        let yNames = Object.keys(plot_data);
        yNames.splice(yNames.indexOf("Date"), 1);

        let dataset = [];
        let xIndex = 0;
        let labels = Object.values(plot_data.Date);

        for (let yName of yNames) {
            let currentSet = {
                label: yName,
                data: Object.values(plot_data[yName]),
                borderColor: Utils.namedColor(xIndex),
                backgroundColor: Utils.namedColor(xIndex),
            };
            xIndex++;

            dataset.push(currentSet);
        }

        let formattedDate = {
            labels,
            datasets: dataset,
        };

        setData(formattedDate);
    };

    useEffect(() => {
        const fetchData = () => {
            // Make an API request to your backend here and update the state with the fetched data
            fetch("https://35.197.207.152:5000/get_plot_data")
                .then((response) => response.json())
                .then((plot_data) => {
                    getYler(plot_data);
                })
                .catch((error) => console.error("Error fetching data:", error));
        };

        // Fetch data initially when the component mounts
        fetchData();

        // Set up an interval to fetch data every 5 seconds (for example)
        const intervalId = setInterval(fetchData, 10000);

        // Clean up the interval when the component unmounts
        return () => clearInterval(intervalId);
    }, []);

    return <Line options={options} data={data} />;
}
