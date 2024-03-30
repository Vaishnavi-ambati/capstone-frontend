import React, { useState, useEffect } from 'react';
import { Chart } from 'chart.js/auto';
import axios from 'axios'; // Import axios library for making HTTP requests

function YearPieChart() {
    const [data, setData] = useState([]);
    const [selectedYear, setSelectedYear] = useState("2024"); // Initial selected year
  
    useEffect(() => {
      const fetchData = async () => {
        try {
          const response = await axios.get('http://localhost:8080/api/summary-report/financial-year');
          console.log(response.data);
          setData(response.data);

        } catch (error) {
          console.error('Error fetching data:', error);
        }
      };
      fetchData();
    }, []);
  
    useEffect(() => {
      renderPieChart();
    }, [data, selectedYear]); // Re-render chart when yearlyData or selectedYear changes


    // useEffect(() => {
    //   // Mock API call (replace with your actual API call)
    //   // Assume data is fetched from the provided API endpoint
    //   const fetchData = () => {
    //     // Your API call to fetch data
    //     const apiData = [
    //       {
    //           "month": "Jan",
    //           "wasteType": "Landfill Waste",
    //           "wasteWeight": 15.0,
    //           "recycledRevenue": null,
    //           "landfillFee": 30.0,
    //           "year": 2023
    //       },
    //       {
    //           "month": "Jan",
    //           "wasteType": "Compost",
    //           "wasteWeight": 18.0,
    //           "recycledRevenue": null,
    //           "landfillFee": 0.0,
    //           "year": 2023
    //       },
    //       {
    //           "month": "Jan",
    //           "wasteType": "Cardboard",
    //           "wasteWeight": 6.0,
    //           "recycledRevenue": 6.0,
    //           "landfillFee": null,
    //           "year": 2024
    //       },
    //       {
    //           "month": "Jan",
    //           "wasteType": "Glass",
    //           "wasteWeight": 12.0,
    //           "recycledRevenue": 12.0,
    //           "landfillFee": null,
    //           "year": 2024
    //       },
    //       {
    //           "month": "Jan",
    //           "wasteType": "Paper",
    //           "wasteWeight": 72.0,
    //           "recycledRevenue": 36.0,
    //           "landfillFee": null,
    //           "year": 2023
    //       },
    //       {
    //           "month": "Jan",
    //           "wasteType": "Metal",
    //           "wasteWeight": 110.0,
    //           "recycledRevenue": 220.0,
    //           "landfillFee": null,
    //           "year": 2024
    //       },
    //       {
    //           "month": "Jan",
    //           "wasteType": "Plastic",
    //           "wasteWeight": 90.0,
    //           "recycledRevenue": 45.0,
    //           "landfillFee": null,
    //           "year": 2023
    //       },
    //       {
    //           "month": "Feb",
    //           "wasteType": "Landfill Waste",
    //           "wasteWeight": 15.0,
    //           "recycledRevenue": null,
    //           "landfillFee": 30.0,
    //           "year": 2024
    //       },
    //       {
    //           "month": "Feb",
    //           "wasteType": "Compost",
    //           "wasteWeight": 18.0,
    //           "recycledRevenue": null,
    //           "landfillFee": 0.0,
    //           "year": 2023
    //       },
    //       {
    //           "month": "Feb",
    //           "wasteType": "Cardboard",
    //           "wasteWeight": 6.0,
    //           "recycledRevenue": 6.0,
    //           "landfillFee": null,
    //           "year": 2024
    //       },
    //       {
    //           "month": "Feb",
    //           "wasteType": "Glass",
    //           "wasteWeight": 12.0,
    //           "recycledRevenue": 12.0,
    //           "landfillFee": null,
    //           "year": 2023
    //       },
    //       {
    //           "month": "Feb",
    //           "wasteType": "Paper",
    //           "wasteWeight": 72.0,
    //           "recycledRevenue": 36.0,
    //           "landfillFee": null,
    //           "year": 2023
    //       },
    //       {
    //           "month": "Feb",
    //           "wasteType": "Metal",
    //           "wasteWeight": 80.0,
    //           "recycledRevenue": 160.0,
    //           "landfillFee": null,
    //           "year": 2024
    //       },
    //       {
    //           "month": "Feb",
    //           "wasteType": "Plastic",
    //           "wasteWeight": 90.0,
    //           "recycledRevenue": 45.0,
    //           "landfillFee": null,
    //           "year": 2024
    //       }
    //   ] 
    //     setData(apiData);
    //   };
  
    //   fetchData();
    // }, []); // Fetch data only on initial render
  
    // useEffect(() => {
    //   renderPieChart();
    // }, [data, selectedYear]); // Re-render pie chart when data or selected year changes
  
    const renderPieChart = () => {
      const filteredData = data.filter(entry => entry.year === selectedYear);
      const chartData = {
        labels: filteredData.map(entry => entry.wasteType),
        datasets: [{
          label: 'Waste Weightage',
          data: filteredData.map(entry => entry.wasteWeight),
          backgroundColor: [
            'rgba(255, 99, 132, 0.2)',
            'rgba(54, 162, 235, 0.2)',
            'rgba(255, 206, 86, 0.2)',
            'rgba(75, 192, 192, 0.2)',
            'rgba(153, 102, 255, 0.2)',
            'rgba(255, 159, 64, 0.2)',
          ],
          borderColor: [
            'rgba(255, 99, 132, 1)',
            'rgba(54, 162, 235, 1)',
            'rgba(255, 206, 86, 1)',
            'rgba(75, 192, 192, 1)',
            'rgba(153, 102, 255, 1)',
            'rgba(255, 159, 64, 1)',
          ],
        }],
      };
  
      const canvas = document.getElementById('yearlyWasteChart');
      if (canvas) {
        const ctx = canvas.getContext('2d');
        const existingChart = Chart.getChart(ctx);
        if (existingChart) {
          existingChart.destroy(); // Destroy existing chart
        }
        new Chart(ctx, {
          type: 'pie',
          data: chartData,
        });
      }
    };
  
    return (
      <div className="container mx-auto py-8">
        <div className="flex justify-end mb-4">
          <select
            className="px-2 py-1 border border-gray-300 rounded-md"
            value={selectedYear}
            onChange={(e) => setSelectedYear(parseInt(e.target.value))}
          >
            <option value={"2023"}>2023</option>
            <option value={"2024"}>2024</option>
            {/* Add more years if needed */}
          </select>
        </div>
        <div className="card rounded-lg shadow-md p-4 d-flex flex-column align-items-center">
          <h3>Yearly Waste Weightage</h3>
          <canvas id="yearlyWasteChart" className='small' style={{ width: '50px', height: '50px' }} />
        </div>
      </div>
    );
  }

export default YearPieChart;