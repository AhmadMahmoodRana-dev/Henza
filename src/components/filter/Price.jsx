import React, { useState } from "react";

const Price = () => {
  const min = 0;
  const max = 1419000;

  const [minValue, setMinValue] = useState(min);
  const [maxValue, setMaxValue] = useState(max);

  const getPercent = (value) => ((value - min) / (max - min)) * 100;

  const handleMinChange = (e) => {
    const value = Math.min(Number(e.target.value), maxValue - 1000);
    setMinValue(value);
  };

  const handleMaxChange = (e) => {
    const value = Math.max(Number(e.target.value), minValue + 1000);
    setMaxValue(value);
  };

  return (
    <div className="w-full max-w-md mx-auto px-4 py-4">
      <h2 className="font-semibold mb-4 text-lg">Price Range</h2>
      <div className="flex justify-between mb-6">
        <div className="flex-1 mr-2">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Min
          </label>
          <div className="relative">
            <span className="absolute left-3 top-2 text-gray-400">$</span>
            <input
              type="text"
              readOnly
              className="w-full pl-7 pr-3 py-2 border border-gray-300 rounded-md bg-white text-gray-700"
              value={minValue.toLocaleString()}
            />
          </div>
        </div>
        <div className="flex-1 ml-2">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Max
          </label>
          <div className="relative">
            <span className="absolute left-3 top-2 text-gray-400">$</span>
            <input
              type="text"
              readOnly
              className="w-full pl-7 pr-3 py-2 border border-gray-300 rounded-md bg-white text-gray-700"
              value={maxValue.toLocaleString()}
            />
          </div>
        </div>
      </div>

      <div className="relative h-4 mb-8">
        {/* Track */}
        <div className="absolute top-1/2 -translate-y-1/2 w-full h-1 bg-gray-200 rounded-full"></div>

        {/* Active range */}
        <div
          className="absolute top-1/2 -translate-y-1/2 h-1 bg-blue-500 rounded-full"
          style={{
            left: `${getPercent(minValue)}%`,
            width: `${getPercent(maxValue) - getPercent(minValue)}%`,
            transition: "all 0.3s ease",
          }}
        ></div>

        {/* Thumb container */}
        <div className="relative">
          <input
            type="range"
            min={min}
            max={max}
            step={1000}
            value={minValue}
            onChange={handleMinChange}
            className="absolute w-full h-4 appearance-none bg-transparent z-20"
          />
          <input
            type="range"
            min={min}
            max={max}
            step={1000}
            value={maxValue}
            onChange={handleMaxChange}
            className="absolute w-full h-4 appearance-none bg-transparent z-30"
          />
        </div>

        {/* Custom Thumbs */}
        <div
          className="absolute w-full"
          style={{
            left: `${getPercent(minValue)}%`,
            right: `${100 - getPercent(maxValue)}%`,
          }}
        >
          <div
            className="absolute -top-1 -ml-2 w-4 h-4 bg-blue-500 rounded-full shadow cursor-pointer hover:scale-125 transition-transform"
            style={{ left: `${getPercent(minValue)}%` }}
          />
          <div
            className="absolute -top-1 -ml-2 w-4 h-4 bg-blue-500 rounded-full shadow cursor-pointer hover:scale-125 transition-transform"
            style={{ left: `${getPercent(maxValue)}%` }}
          />
        </div>
      </div>
    </div>
  );
};

export default Price;
