import { useState, useEffect } from 'react';
import Chart from 'chart.js/auto';

function YearLineChart() {
  const [recyclableData, setRecyclableData] = useState([]);
  const [selectedYear, setSelectedYear] = useState("2024"); // Initial selected year

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:8080/api/summary-report/recyclable-sumamry');
    
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const jsonData = await response.json();
        console.log(jsonData);
        setRecyclableData(jsonData);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []); 


//   const recyclableData = [
//     {
//         "month": "January",
//         "year": 2024,
//         "recyclableType": "Cardboard",
//         "totalWeight": 6.0,
//         "weightPercentage": 6.0,
//         "totalRevenue": 0.974025974025974,
//         "revenuePercentage": 1.0380622837370241
//     },
//     {
//         "month": "January",
//         "year": 2023,
//         "recyclableType": "Glass",
//         "totalWeight": 12.0,
//         "weightPercentage": 12.0,
//         "totalRevenue": 1.948051948051948,
//         "revenuePercentage": 2.0761245674740483
//     },
//     {
//         "month": "January",
//         "year": 2023,
//         "recyclableType": "Paper",
//         "totalWeight": 72.0,
//         "weightPercentage": 36.0,
//         "totalRevenue": 11.688311688311687,
//         "revenuePercentage": 6.228373702422145
//     },
//     {
//         "month": "January",
//         "year": 2024,
//         "recyclableType": "Metal",
//         "totalWeight": 110.0,
//         "weightPercentage": 220.0,
//         "totalRevenue": 17.857142857142858,
//         "revenuePercentage": 38.062283737024224
//     },
//     {
//         "month": "January",
//         "year": 2023,
//         "recyclableType": "Plastic",
//         "totalWeight": 90.0,
//         "weightPercentage": 45.0,
//         "totalRevenue": 14.61038961038961,
//         "revenuePercentage": 7.7854671280276815
//     },
//     {
//         "month": "February",
//         "year": 2023,
//         "recyclableType": "Cardboard",
//         "totalWeight": 6.0,
//         "weightPercentage": 6.0,
//         "totalRevenue": 0.974025974025974,
//         "revenuePercentage": 1.0380622837370241
//     },
//     {
//         "month": "February",
//         "year": 2023,
//         "recyclableType": "Glass",
//         "totalWeight": 12.0,
//         "weightPercentage": 12.0,
//         "totalRevenue": 1.948051948051948,
//         "revenuePercentage": 2.0761245674740483
//     },
//     {
//         "month": "February",
//         "year": 2024,
//         "recyclableType": "Paper",
//         "totalWeight": 72.0,
//         "weightPercentage": 36.0,
//         "totalRevenue": 11.688311688311687,
//         "revenuePercentage": 6.228373702422145
//     },
//     {
//         "month": "February",
//         "year": 2023,
//         "recyclableType": "Metal",
//         "totalWeight": 80.0,
//         "weightPercentage": 160.0,
//         "totalRevenue": 12.987012987012985,
//         "revenuePercentage": 27.68166089965398
//     },
//     {
//         "month": "February",
//         "year": 2024,
//         "recyclableType": "Plastic",
//         "totalWeight": 90.0,
//         "weightPercentage": 45.0,
//         "totalRevenue": 14.61038961038961,
//         "revenuePercentage": 7.7854671280276815
//     }
// ] 

useEffect(() => {
    renderLineChart();
  }, [recyclableData, selectedYear]); // Re-render line chart when data or selected year changes

  const renderLineChart = () => {
    const filteredData = recyclableData.filter(entry => entry.year === selectedYear);
    const chartData = {
      labels: filteredData.map(entry => entry.recyclableType),
      datasets: [{
        label: 'Total Weight (lbs)',
        data: filteredData.map(entry => entry.totalWeight),
        fill: false,
        borderColor: 'rgba(75, 192, 192, 1)',
        tension: 0.1
      }]
    };

    const canvas = document.getElementById('recyclableLineChart');
    if (canvas) {
      const ctx = canvas.getContext('2d');
      const existingChart = Chart.getChart(ctx);
      if (existingChart) {
        existingChart.destroy(); // Destroy existing chart
      }
      new Chart(ctx, {
        type: 'bar',
        data: chartData
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
      <div className="card rounded-lg shadow-md p-4">
        <h3>Recyclable Summary Line Chart</h3>
        <canvas id="recyclableLineChart" />
      </div>
    </div>
  );
}

export default YearLineChart;