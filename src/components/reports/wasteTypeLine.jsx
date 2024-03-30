import React, { useState, useEffect } from 'react';
import Chart from 'chart.js/auto';
import Flatpickr from 'react-flatpickr';
import 'flatpickr/dist/themes/material_blue.css';

const WasteTypeLine = () => {
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

  const fetchData = async () => {
    const startDateFormatted = formatDate(startDate);
    const endDateFormatted = formatDate(endDate);
    const apiUrl = `http://localhost:8080/api/summary-report/waste-weight?startDate=${startDateFormatted}&endDate=${endDateFormatted}`;
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
    const weights = data.map(item => item.totalWeight);

    const ctx = document.getElementById('lineChart').getContext('2d');
    const existingChart = Chart.getChart(ctx);
      if (existingChart) {
        existingChart.destroy(); // Destroy existing chart
      }
    new Chart(ctx, {
      type: 'line',
      data: {
        labels: labels,
        datasets: [{
          label: 'Total Weight',
          data: weights,
          borderColor: 'rgba(75, 192, 192, 1)',
          backgroundColor: 'rgba(75, 192, 192, 0.2)',
          tension: 0.4,
          fill: true
        }]
      },
      options: {
        responsive: true,
        scales: {
          y: {
            beginAtZero: true,
            title: {
              display: true,
              text: 'Total Weight'
            }
          },
          x: {
            title: {
              display: true,
              text: 'Recyclable Type'
            }
          }
        }
      }
    });
  };

  return (
    <div>
      <h2>Recyclable Waste Weight Report</h2>
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
      <canvas id="lineChart" className='small' width="400" height="400"></canvas>
      </div>
      
    </div>
  );
};

export default WasteTypeLine;