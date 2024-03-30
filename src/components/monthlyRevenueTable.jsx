import React, { useState, useEffect } from 'react';

const MonthlyRevenueTable = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:8080/api/summary-report/financial-year');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const jsonData = await response.json();
        setData(jsonData);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  // Create an object to store recyclable revenue totals for each month
  const revenueTotals = {};

  // Create a set to store unique waste types
  const wasteTypesSet = new Set();

  // Iterate through the data to calculate the total recyclable revenue for each month
  data.forEach(item => {
    if (item.recycledRevenue !== null) {
      if (!revenueTotals[item.month]) {
        revenueTotals[item.month] = item.recycledRevenue;
      } else {
        revenueTotals[item.month] += item.recycledRevenue;
      }
    }
    // Add waste type to the set
    wasteTypesSet.add(item.wasteType);
  });

  // Convert the set to an array
  const wasteTypes = Array.from(wasteTypesSet);

  return (
    <table className="w-full table-auto shadow-md rounded-lg">
      <thead>
        <tr className="bg-gray-100 text-sm font-medium">
          <th className="px-4 py-2">Waste Type</th>
          {/* Generate columns for each month */}
          {Object.keys(revenueTotals).map(month => (
            <th key={month} className="px-4 py-2">{month}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {/* Iterate through each waste type */}
        {wasteTypes.map(wasteType => (
          <tr key={wasteType}>
            <td className="px-4 py-2">{wasteType}</td>
            {/* Iterate through each month to display recyclable revenue */}
            {Object.keys(revenueTotals).map(month => {
              // Filter data for the current waste type and month
              const filteredData = data.filter(item => item.month === month && item.wasteType === wasteType);
              // Calculate waste weightage by summing up the wasteWeight for the filtered data
              const wasteWeightage = filteredData.reduce((total, currentItem) => {
                // Check if waste type is "Landfill Waste" or "Compost", then add wasteWeight
                if (currentItem.wasteType === "Landfill Waste" || currentItem.wasteType === "Compost") {
                  return total + currentItem.wasteWeight;
                }
                // For other waste types, directly add waste weightage
                return total + currentItem.wasteWeight;
              }, 0);
              return (
                <td key={`${wasteType}-${month}`} className="px-4 py-2">
                  {wasteWeightage || 'N/A'}
                </td>
              );
            })}
          </tr>
        ))}
        {/* Total row */}
        <tr className="font-bold">
          <td className="px-4 py-2">Total Recyclable Revenue</td>
          {/* Iterate through each month to display total recyclable revenue */}
          {Object.keys(revenueTotals).map(month => (
            <td key={`total-${month}`} className="px-4 py-2">
              {revenueTotals[month]}
            </td>
          ))}
        </tr>
      </tbody>
    </table>
  );
};

export default MonthlyRevenueTable;