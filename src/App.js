import React, { useState } from 'react';
import Graph from './Graph';

const App = () => {
  const [filters, setFilters] = useState({
    apm: true,
    server: true,
    k8s: true,
    db: true,
    url: true,
    browser: true,
    cloud: true,
    npm: true,
  });
  const [sortMethod, setSortMethod] = useState('directed'); // Add state for sortMethod

  const [direction, setDirection] = useState('UD'); // Add state for sortMethod

  const handleFilterChange = (event) => {
    const { name, checked } = event.target;
    setFilters((prevFilters) => ({
      ...prevFilters,
      [name]: checked,
    }));
  };

  const handleCheckAll = () => {
    const allChecked = Object.keys(filters).reduce((acc, key) => {
      acc[key] = true;
      return acc;
    }, {});
    setFilters(allChecked);
  };

  const handleUncheckAll = () => {
    const allUnchecked = Object.keys(filters).reduce((acc, key) => {
      acc[key] = false;
      return acc;
    }, {});
    setFilters(allUnchecked);
  };

  const handleSortMethodChange = (event) => {
    setSortMethod(event.target.value);
  };

  const handlesetDirection = (event) => {
    setDirection(event.target.value);
  };

  return (
    <div className="App">
      <h1>WhaTap Monitoring</h1>
      <p><a href="https://github.com/whatap/menu-tree-app.git" target="_blank" rel="noreferrer">whatap/menu-tree-app</a></p>
      <div>
        <button onClick={handleCheckAll}>모두 체크</button>
        <button onClick={handleUncheckAll}>모두 해제</button>
        {Object.keys(filters).map((key) => (
          <label key={key}>
            <input
              type="checkbox"
              name={key}
              checked={filters[key]}
              onChange={handleFilterChange}
            />
            {key}
          </label>
        ))}
        <select value={sortMethod} onChange={handleSortMethodChange}>
          <option value="directed">Directed</option>
          <option value="hubsize">Hubsize</option>
        </select>
        <select value={direction} onChange={handlesetDirection}>
          <option value="UD">Up to Down</option>
          <option value="LR">Left to Right</option>
        </select>
      </div>
      <Graph filters={filters} sortMethod={sortMethod} direction={direction} /> {/* Pass sortMethod as a prop */}
    </div>
  );
};

export default App;
