import React, { useState } from 'react';
import axios from 'axios';

const categories = [
  "food", "travel", "clothing", "entertainment",
  "groceries", "electronics", "household",
  "stationery", "medical", "personalCare"
];

const SetBudget = () => {
  const [budget, setBudget] = useState({
    food: '',
    travel: '',
    clothing: '',
    entertainment: '',
    groceries: '',
    electronics: '',
    household: '',
    stationery: '',
    medical: '',
    personalCare: ''
  });

  const handleChange = (e) => {
    setBudget({ ...budget, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    try {
      const token = localStorage.getItem('accessToken'); // Assuming JWT stored in localStorage
      const response = await axios.post('http://localhost:8000/api/set-budget/', budget, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      alert("Budget saved successfully!");
    } catch (error) {
      console.error(error);
      alert("Error saving budget");
    }
  };

  return (
    <div className="p-6 max-w-2xl mx-auto bg-white shadow rounded">
      <h2 className="text-xl font-bold mb-4">Set Monthly Budget</h2>
      <div className="grid grid-cols-2 gap-4">
        {categories.map(cat => (
          <div key={cat}>
            <label className="block text-sm font-medium capitalize">{cat}</label>
            <input
              type="number"
              name={cat}
              value={budget[cat]}
              onChange={handleChange}
              // onWheel={(e) => e.target.blur()}
              className="mt-1 block w-full border border-gray-300 rounded p-2"
              placeholder={`₹ for ${cat}`}
            />
          </div>
        ))}
      </div>
      <button
        onClick={handleSubmit}
        className="mt-4 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
      >
        Save Budget
      </button>
    </div>
  );
};

export default SetBudget;
