import React, { useState, useEffect } from 'react';
import Chart from 'chart.js/auto';
import Flatpickr from 'react-flatpickr';
import 'flatpickr/dist/themes/material_blue.css';

const RecyclableWeightsPie = () => {
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [data, setData] = useState([]);

  useEffect(() => {
    fetchData();
  }, [startDate, endDate]);

  const formatDate = (date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    console.log(`${year}-${month}-${day}`)
    return `${year}-${month}-${day}`;
  };

//   const data = [
//     {
//         "recyclableType": "Cardboard",
//         "totalWeight": 12.0,
//         "weightPercentage": 1.948051948051948
//     },
//     {
//         "recyclableType": "Glass",
//         "totalWeight": 24.0,
//         "weightPercentage": 3.896103896103896
//     },
//     {
//         "recyclableType": "Paper",
//         "totalWeight": 144.0,
//         "weightPercentage": 23.376623376623375
//     },
//     {
//         "recyclableType": "Metal",
//         "totalWeight": 190.0,
//         "weightPercentage": 30.844155844155846
//     },
//     {
//         "recyclableType": "Plastic",
//         "totalWeight": 180.0,
//         "weightPercentage": 29.22077922077922
//     }
// ]

  const fetchData = async () => {
    const startDateFormatted = formatDate(startDate);
    const endDateFormatted = formatDate(endDate);
    const apiUrl = `http://localhost:8080/api/summary-report/recyclable-weight?startDate=${startDateFormatted}&endDate=${endDateFormatted}`;
    try {
      const response = await fetch(apiUrl);
      const jsonData = await response.json();
      console.log(jsonData);
      setData(jsonData);
      updateChart(jsonData);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const updateChart = (data) => {
    const labels = data.map(item => item.recyclableType);
    const values = data.map(item => item.weightPercentage);
    console.log(data);
    console.log(labels, values);
    const ctx = document.getElementById('pieChartt').getContext('2d');
    const existingChart = Chart.getChart(ctx);
        if (existingChart) {
          existingChart.destroy(); // Destroy existing chart
        }
    new Chart(ctx, {
      type: 'pie',
      data: {
        labels: labels,
        datasets: [{
          data: values,
          backgroundColor: [
            'rgba(255, 99, 132, 0.7)',
            'rgba(54, 162, 235, 0.7)',
            'rgba(255, 206, 86, 0.7)',
            'rgba(75, 192, 192, 0.7)',
            'rgba(153, 102, 255, 0.7)'
          ]
        }]
      },
      options: {
        responsive: true,
        legend: {
          position: 'right'
        }
      }
    });
  };

  return (
    <div>
      <h2>Recyclable Weight Report</h2>
      <label htmlFor="startDate">Start Date:</label>
      <Flatpickr
        id="startDate"
        value={startDate}
        onChange={date => setStartDate(date[0])}
        options={{ dateFormat: 'Y-m-d' }}
      />
      <label htmlFor="endDate">End Date:</label>
      <Flatpickr
        id="endDate"
        value={endDate}
        onChange={date => setEndDate(date[0])}
        options={{ dateFormat: 'Y-m-d' }}
      />
       <div className="card rounded-lg shadow-md p-4 d-flex flex-column align-items-center">
       <canvas id="pieChartt" className='small' width="400" height="400"></canvas>
       </div>
      
    </div>
  );
};

export default RecyclableWeightsPie;