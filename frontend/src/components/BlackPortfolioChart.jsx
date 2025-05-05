import React, { useEffect, useRef, useState } from 'react';
import { useTheme } from '../context/ThemeContext';

const BlackPortfolioChart = ({ data = [], kasPrice = 0, mini = false }) => {
  const chartRef = useRef(null);
  const tooltipRef = useRef(null);
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const { isDark } = useTheme();

  // Generate chart once data is available
  useEffect(() => {
    if (!data || data.length === 0 || !chartRef.current) return;

    const canvas = chartRef.current;
    const ctx = canvas.getContext('2d');
    const width = canvas.width;
    const height = canvas.height;

    // Clear canvas
    ctx.clearRect(0, 0, width, height);

    // Extract y values (portfolio value) for scaling
    const values = data.map(item => item.value);
    const min = Math.min(...values) * 0.9; // 90% of min for padding
    const max = Math.max(...values) * 1.1; // 110% of max for padding
    const range = max - min;

    // Calculate scales
    const scaleY = (value) => height - ((value - min) / range * height * 0.8) - height * 0.1;

    // Draw gradient background
    const grd = ctx.createLinearGradient(0, height, 0, 0);
    grd.addColorStop(0, 'rgba(106, 66, 244, 0.05)'); // Primary very transparent
    grd.addColorStop(1, 'rgba(75, 180, 222, 0.02)'); // Secondary extremely transparent
    ctx.fillStyle = grd;
    ctx.fillRect(0, 0, width, height);

    // Draw grid lines if not mini chart
    if (!mini) {
      ctx.strokeStyle = 'rgba(106, 66, 244, 0.1)'; // Very light grid lines
      ctx.lineWidth = 0.5;
      ctx.beginPath();

      // Horizontal grid lines (5 lines)
      for (let i = 0; i <= 5; i++) {
        const y = height * 0.1 + (height * 0.8 / 5) * i;
        ctx.moveTo(0, y);
        ctx.lineTo(width, y);
      }

      // Vertical grid lines (based on data density)
      const step = Math.max(1, Math.floor(data.length / 7)); // At most 7 lines
      for (let i = 0; i < data.length; i += step) {
        const x = (width / (data.length - 1)) * i;
        ctx.moveTo(x, 0);
        ctx.lineTo(x, height);
      }
      ctx.stroke();
    }

    // Draw chart area fill
    ctx.beginPath();
    ctx.moveTo(0, height);

    data.forEach((item, index) => {
      const x = (width / (data.length - 1)) * index;
      const y = scaleY(item.value);

      if (index === 0) {
        ctx.moveTo(x, y);
      } else {
        ctx.lineTo(x, y);
      }
    });

    // Complete the path to create a filled area
    ctx.lineTo(width, height);
    ctx.lineTo(0, height);
    ctx.closePath();

    // Create a gradient fill for the area
    const areaGradient = ctx.createLinearGradient(0, 0, 0, height);
    areaGradient.addColorStop(0, 'rgba(106, 66, 244, 0.3)'); // Primary color with alpha
    areaGradient.addColorStop(0.7, 'rgba(75, 180, 222, 0.05)'); // Secondary color very transparent
    areaGradient.addColorStop(1, 'rgba(75, 180, 222, 0)'); // Transparent at bottom
    ctx.fillStyle = areaGradient;
    ctx.fill();

    // Draw line on top
    ctx.beginPath();
    data.forEach((item, index) => {
      const x = (width / (data.length - 1)) * index;
      const y = scaleY(item.value);

      if (index === 0) {
        ctx.moveTo(x, y);
      } else {
        ctx.lineTo(x, y);
      }
    });

    // Create a gradient for the line
    const lineGradient = ctx.createLinearGradient(0, 0, width, 0);
    lineGradient.addColorStop(0, 'rgba(106, 66, 244, 1)'); // Primary color
    lineGradient.addColorStop(1, 'rgba(75, 180, 222, 1)'); // Secondary color

    ctx.strokeStyle = lineGradient;
    ctx.lineWidth = mini ? 1.5 : 2;
    ctx.stroke();

    // Draw data points if not mini chart or if hovering
    if (!mini) {
      data.forEach((item, index) => {
        const x = (width / (data.length - 1)) * index;
        const y = scaleY(item.value);

        // Draw point
        ctx.beginPath();
        ctx.arc(x, y, index === hoveredIndex ? 4 : 2, 0, Math.PI * 2);
        ctx.fillStyle = index === hoveredIndex ? '#ffffff' : 'rgba(75, 180, 222, 1)';
        ctx.strokeStyle = 'rgba(106, 66, 244, 1)';
        ctx.lineWidth = 1;
        ctx.fill();
        ctx.stroke();
      });
    }

    // Draw legend and values if not mini
    if (!mini) {
      // Calculate % change
      const firstValue = data[0]?.value || 0;
      const lastValue = data[data.length - 1]?.value || 0;
      const percentChange = firstValue > 0 ? ((lastValue - firstValue) / firstValue) * 100 : 0;

      ctx.font = '10px Arial';
      ctx.fillStyle = percentChange >= 0 ? 'rgba(52, 211, 153, 1)' : 'rgba(239, 68, 68, 1)'; // Green or red
      ctx.textAlign = 'right';
      ctx.fillText(`${percentChange >= 0 ? '+' : ''}${percentChange.toFixed(2)}%`, width - 5, 15);

      // Date range
      if (data.length >= 2) {
        try {
          const firstDate = new Date(data[0].date);
          const lastDate = new Date(data[data.length - 1].date);

          ctx.fillStyle = 'rgba(156, 163, 175, 1)'; // Gray
          ctx.textAlign = 'left';
          ctx.fillText(
            `${firstDate.toLocaleDateString()} - ${lastDate.toLocaleDateString()}`,
            5,
            15
          );
        } catch (e) {
          // Handle date parsing errors gracefully
        }
      }
    }

  }, [data, hoveredIndex, mini]);

  // Handle mouse interactions
  const handleMouseMove = (e) => {
    if (!data || data.length === 0 || !chartRef.current || mini) return;

    const canvas = chartRef.current;
    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const width = canvas.width;

    // Find closest data point
    const index = Math.round((x / width) * (data.length - 1));
    if (index >= 0 && index < data.length) {
      setHoveredIndex(index);

      // Update tooltip
      if (tooltipRef.current) {
        const item = data[index];
        tooltipRef.current.style.opacity = '1';
        tooltipRef.current.style.left = `${x}px`;

        // Format date and value for tooltip
        let dateStr = '';
        try {
          const date = new Date(item.date);
          dateStr = date.toLocaleDateString();
        } catch (e) {
          dateStr = 'Unknown date';
        }

        const valueStr = item.value.toLocaleString(undefined, {
          minimumFractionDigits: 2,
          maximumFractionDigits: 2
        });

        const usdStr = item.usdValue ? `$${item.usdValue.toLocaleString(undefined, {
          minimumFractionDigits: 2,
          maximumFractionDigits: 2
        })}` : '';

        tooltipRef.current.innerHTML = `
          <div style="font-size: 10px; color: var(--ks-text-secondary);">${dateStr}</div>
          <div style="font-size: 12px; font-weight: bold; color: var(--ks-text-primary);">${valueStr} KAS</div>
          ${usdStr ? `<div style="font-size: 11px; color: var(--ks-secondary);">${usdStr}</div>` : ''}
        `;
      }
    }
  };

  const handleMouseLeave = () => {
    setHoveredIndex(null);
    if (tooltipRef.current) {
      tooltipRef.current.style.opacity = '0';
    }
  };

  return (
    <div
      className={`relative ${mini ? 'h-16' : 'h-40'} w-full overflow-hidden rounded-md`}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      <canvas
        ref={chartRef}
        className="w-full h-full"
        width={500}
        height={mini ? 80 : 200}
      />
      {!mini && (
        <div
          ref={tooltipRef}
          className="absolute top-0 transform -translate-x-1/2 bg-opacity-90 rounded px-2 py-1 text-xs transition-opacity duration-150 opacity-0 pointer-events-none"
          style={{
            backgroundColor: 'var(--ks-surface)',
            borderLeft: '2px solid var(--ks-primary)',
            boxShadow: '0 2px 5px rgba(0,0,0,0.2)'
          }}
        />
      )}
    </div>
  );
};

export default BlackPortfolioChart;
