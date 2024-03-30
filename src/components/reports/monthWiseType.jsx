import React, { useState, useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';

function MonthWiseType() {
  const [allWasteTypesData, setAllWasteTypesData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:8080/api/summary-report/waste-sumamry');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const jsonData = await response.json();
        console.log(jsonData);
        setAllWasteTypesData(jsonData);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []); 
  // const allWasteTypesData = [
  //   {
  //     "month": "January",
  //     "year": "2024",
  //     "wasteType": "Landfill Waste",
  //     "wasteWeight": 15.0,
  //     "wastePercentage": 2.4350649350649354
  //   },
  //   {
  //     "month": "February",
  //     "year": "2024",
  //     "wasteType": "Landfill Waste",
  //     "wasteWeight": 15.0,
  //     "wastePercentage": 2.4350649350649354
  //   },
  //   {
  //     "month": "January",
  //     "year": "2024",
  //     "wasteType": "Compost",
  //     "wasteWeight": 18.0,
  //     "wastePercentage": 2.922077922077922
  //   },
  //   {
  //     "month": "February",
  //     "year": "2024",
  //     "wasteType": "Compost",
  //     "wasteWeight": 18.0,
  //     "wastePercentage": 2.922077922077922
  //   },
  //   {
  //     "month": "January",
  //     "year": "2024",
  //     "wasteType": "Recyclables",
  //     "wasteWeight": 290.0,
  //     "wastePercentage": 47.07792207792208
  //   },
  //   {
  //     "month": "February",
  //     "year": "2024",
  //     "wasteType": "Recyclables",
  //     "wasteWeight": 260.0,
  //     "wastePercentage": 42.2077922077922
  //   }
  // ];

  const [selectedMonth, setSelectedMonth] = useState('March');

  return (
    <div className="container mx-auto py-8">
      <h2>All Waste Types Summary Report</h2>
      <div className="flex justify-center mb-4">
        <select
          className="px-2 py-1 border border-gray-300 rounded-md mr-2"
          value={selectedMonth}
          onChange={(e) => setSelectedMonth(e.target.value)}
        >
          <option value="January">January</option>
          <option value="February">February</option>
          <option value="March">March</option>
          <option value="April">April</option>
          <option value="May">May</option>
          <option value="June">June</option>
          <option value="July">July</option>
          <option value="August">August</option>
          <option value="September">September</option>
          <option value="October">October</option>
          <option value="November">November</option>
          <option value="December">December</option>
          {/* Add more months here if needed */}
        </select>
      </div>
      <div className="card rounded-lg shadow-md p-4">
        <AllWasteTypesBarChart data={allWasteTypesData} selectedMonth={selectedMonth} />
      </div>
    </div>
  );
}

function AllWasteTypesBarChart({ data, selectedMonth }) {
  const chartContainer = useRef(null);
  const chartInstance = useRef(null);

  useEffect(() => {
    if (chartInstance.current) {
      chartInstance.current.destroy();
    }

    const ctx = chartContainer.current.getContext('2d');

    const filteredData = data.filter(entry => entry.month === selectedMonth);

    chartInstance.current = new Chart(ctx, {
      type: 'line',
      data: {
        labels: filteredData.map(entry => entry.wasteType),
        datasets: [{
          label: 'Waste Weight',
          data: filteredData.map(entry => entry.wasteWeight),
          backgroundColor: filteredData.map((entry, index) => `rgba(${index * 40}, ${index * 60}, ${index * 80}, 0.7)`), // Assign colors dynamically
          borderWidth: 1
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            display: false
          },
          title: {
            display: true,
            text: `Waste Weight for All Waste Types in ${selectedMonth}`,
          },
        },
        scales: {
          y: {
            beginAtZero: true,
            title: {
              display: true,
              text: 'Waste Weight'
            }
          },
          x: {
            title: {
              display: true,
              text: 'Waste Type'
            }
          }
        }
      }
    });

    return () => {
      if (chartInstance.current) {
        chartInstance.current.destroy();
      }
    };
  }, [data, selectedMonth]);

  return <canvas ref={chartContainer} />;
}

export default MonthWiseType;