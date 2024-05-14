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
    npm: true
  });

  const handleFilterChange = (event) => {
    const { name, checked } = event.target;
    setFilters(prevFilters => ({
      ...prevFilters,
      [name]: checked
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

  return (
    <div className="App">
      <h1>WhaTap Monitoring</h1>
      <div>
        <button onClick={handleCheckAll}>모두 체크</button>
        <button onClick={handleUncheckAll}>모두 해제</button>
        {Object.keys(filters).map(key => (
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
      </div>
      <Graph filters={filters} />
    </div>
  );
};

export default App;
