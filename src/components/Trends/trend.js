import { useEffect, useState } from "react";
import { Line, Bar, Pie } from 'react-chartjs-2';
import { Link } from "react-router-dom";
import "./trend.css"
import 'chartjs-adapter-date-fns';
import Chart from 'chart.js/auto';
// import { Chart } from 'chart.js';

import 'react-toastify/dist/ReactToastify.css';
Chart.defaults.scale.linear = { type: 'linear', min: 0, max: 0, ticks: { stepSize: 1 } };

import axios from "axios";
const Trends = () => {
    const [chartData, setChartData] = useState({});
    const token = localStorage.getItem("jwtToken");
    console.log("token", token);
    useEffect(() => {
        axios
            .get("http://localhost:1337/reviews/make-chart", {
                headers: { Authorization: `Bearer ${token}` },
            })
            .then((response) => {
                console.log("response", response);
                const chartData = response?.data;
                if (!chartData || !chartData.length) {
                    return null;
                }
                const chartLabels = chartData?.map((item) => item.category);

                const chartDataSets = chartData?.map((item) => {
                    const productCounts = item.products?.map((product) => product.count);
                    console.log('productCounts', productCounts)
                    console.log('item', item)
                    return {
                        label: item.category,
                        data: productCounts,
                        fill: false,
                        backgroundColor: [
                            "rgba(75,192,192,1)",
                            "#ecf0f1",
                            "#f0331a",
                            "#f3ba2f",
                            "#2a71d0"
                        ],
                        borderColor: "black",
                        borderWidth: 2,
                        // tension: 0.1,
                    };
                });
                console.log('chartDataSets', chartDataSets)
                console.log('chartLabels', chartLabels)
                console.log('chartData', chartData)
                setChartData({
                    labels: chartLabels,
                    datasets: chartDataSets,
                });
            })
            .catch((error) => {
                console.error("There was an error!", error);
            });
    }, [])
    const chartOptions = {
        maintainAspectRatio: false,

        responsive: true,
        maintainAspectRatio: false,
        scales: {
            y: {
                beginAtZero: true,
            },
        },
    };
    const getRandomColor = () => {
        const red = Math.floor(Math.random() * 256);
        const green = Math.floor(Math.random() * 256);
        const blue = Math.floor(Math.random() * 256);
        const alpha = 0.5;
        return `rgba(${red}, ${green}, ${blue}, ${alpha})`;
    };

    const buttonStyles = {
        backgroundColor: '#0bc096',
        color: '#fff',
        borderColor: '#0bc096',
        borderRadius: '25px'

    };
    return (
        <>
            <div class="container pt-3">
                <Link className="logOutLink" to="/">
                    <button
                        type="button"
                        class="btn btn-dark roundedButton ml-2"
                        data-mdb-ripple-color="dark"
                    >
                        <i class="bi bi-arrow-right"></i>
                        Back
                    </button>
                </Link>
            </div>
            <div className="chart-container container pt-5">
               
                


                {chartData.datasets && (
                    <>
                        <div className="row"
                            style={{
                                display: 'flex',
                                // flexDirection: 'column',
                                alignItems: 'center',
                                justifyContent: 'center',
                                // height: '300px',

                            }}
                        >
                            {/* <h1 className="d-flex justify-content-center">Bar chart</h1> */}
                                <div className="pb-4">
                                <button
                                    type="button"
                                    style={buttonStyles}
                                    class="btn btn-dark col-md-12"
                                    data-mdb-ripple-color="dark"
                                >
                                    Bar Chart
                                </button>
                                </div>
                            <p>
                            This chart is to visually represent products in each category 
                            Each product is shown in seperate portion using rectangular bars. 
                            This trend is used in data visualization to compare and display 
                            data values across different categories.
                            On X-axis products are shown and on Y-axis number of bids on each products.
                            </p>
                            <div className="col-12 card-shadow"
                                style={{
                                    border: '1px solid black',
                                    borderRadius: "10px",
                                    margin: '10px',
                                    padding: '10px',
                                    height: '400px'
                                }}
                            >

                                <Bar data={chartData} options={chartOptions} />
                            </div>

                            {/* <h1 className="d-flex justify-content-center">Line chart</h1> */}

                            <div className="pb-4 pt-5">
                                <button
                                    type="button"
                                    style={buttonStyles}
                                    class="btn btn-dark col-md-12"
                                    data-mdb-ripple-color="dark"
                                >
                                    Line Chart
                                </button>
                                </div>
                            <p>
                            This chart is to visually represent products in each category 
                            Each product is shown in seperate portion using line. 
                            This trend is used in data visualization to compare and display 
                            data values across different categories.
                            On X-axis products are shown and on Y-axis number of bids on each products.
                            </p>

                            <div className="col-12 card-shadow"
                                style={{
                                    borderRadius: "10px",
                                    border: '1px solid black',
                                    margin: '10px',
                                    padding: '10px',
                                    height: '400px'
                                }}
                            >
                                <Line data={chartData} options={chartOptions} />
                            </div>
                            {/* <h1 className="d-flex justify-content-center">Pie chart</h1> */}
                            <div className="pb-4 pt-5">
                                <button
                                    type="button"
                                    style={buttonStyles}
                                    class="btn btn-dark col-md-12"
                                    data-mdb-ripple-color="dark"
                                >
                                    Pie Chart
                                </button>
                                </div>
                            <p>
                            This chart is to visually represent products in each category 
                            Each product is shown in seperate portion using lines. 
                            This trend is used in data visualization to compare and display 
                            data values across different categories.
                            On X-axis products are shown and on Y-axis number of bids on each products
                            </p>
                            <div className="col-12 card-shadow"
                                style={{
                                    borderRadius: "10px",
                                    border: '1px solid black',
                                    margin: '10px',
                                    padding: '10px',
                                    height: '400px'
                                }}
                            >
                                <Pie data={chartData} options={chartOptions} />
                            </div>

                        </div>
                        <br></br>
                        <br></br>
                        <br></br>

                    </>

                )}
            </div>
        </>
    )
}
export default Trends;