import React, { useRef, useEffect } from 'react';
import * as d3 from 'd3';

const ComponentChart = ({ data }) => {
  const chartRef = useRef(null);

  useEffect(() => {
    if (data && chartRef.current) {
      // Clear the existing chart
      d3.select(chartRef.current).html('');

      // Set up the chart dimensions
      const margin = { top: 20, right: 30, bottom: 30, left: 50 };
      const width = 800 - margin.left - margin.right;
      const height = 400 - margin.top - margin.bottom;

      // Create the scales
      const xScale = d3.scaleLinear().domain([0, data.length - 1]).range([0, width]);
      const yScale = d3.scaleLinear().domain([0, d3.max(data)]).range([height, 0]);

      // Create the line generator
      const line = d3
        .line()
        .x((d, i) => xScale(i))
        .y(d => yScale(d));

      // Create the SVG element
      const svg = d3
        .select(chartRef.current)
        .append('svg')
        .attr('width', width + margin.left + margin.right)
        .attr('height', height + margin.top + margin.bottom)
        .append('g')
        .attr('transform', `translate(${margin.left},${margin.top})`);

      // Draw the line
      svg
        .append('path')
        .datum(data)
        .attr('class', 'line')
        .attr('d', line)
        .attr('fill', 'none')
        .attr('stroke', 'steelblue')
        .attr('stroke-width', 2);

      // Add axes
      const xAxis = d3.axisBottom(xScale);
      const yAxis = d3.axisLeft(yScale);
      svg.append('g').attr('transform', `translate(0,${height})`).call(xAxis);
      svg.append('g').call(yAxis);
    }
  }, [data]);

  return <div ref={chartRef} />;
};

export default ComponentChart
