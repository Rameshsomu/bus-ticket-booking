import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Dashboard from './Dashboard';
import Reservation from './Reservation';
import Navbar from './Navbar';

const App = () => {
  const [passengers, setPassengers] = useState([]);

  const handleAddPassenger = (passenger) => {
    setPassengers([...passengers, passenger]);
  };

  const handleEditPassenger = (index, updatedPassenger) => {
    const updatedPassengers = [...passengers];
    updatedPassengers[index] = updatedPassenger;
    setPassengers(updatedPassengers);
  };

  const handleDeletePassenger = (index) => {
    const updatedPassengers = passengers.filter(
      (_, passengerIndex) => passengerIndex !== index
    );
    setPassengers(updatedPassengers);
  };

  return (
    <Router>
      <div>
        <Navbar />
        <Routes>
          <Route
            path="/dashboard"
            element={
              <Dashboard
                passengers={passengers}
                onEditPassenger={handleEditPassenger}
                onDeletePassenger={handleDeletePassenger}
              />
            }
          />
          <Route
            path="/reservation"
            element={<Reservation onAddPassenger={handleAddPassenger} />}
          />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
