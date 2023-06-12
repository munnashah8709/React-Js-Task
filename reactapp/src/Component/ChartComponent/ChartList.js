import React, { useState } from 'react';
import Chart from '../ChartComponent/ComponentChart';

const ChartList = () => {
  const [data, setData] = useState([5, 10, 15, 12, 8, 3, 6, 9, 10]);

  const handleDataUpdate = () => {
    // Simulating dynamic data updates
    const newData = data.map(value => value + Math.floor(Math.random() * 5));
    setData(newData);
  };

  return (
    <div>
      <h1>Interactive Chart</h1>
      <Chart data={data} />
      <button onClick={handleDataUpdate}>Update Data</button>
    </div>
  );
};

export default ChartList
