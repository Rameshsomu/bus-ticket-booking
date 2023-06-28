import React from 'react';
import { Link } from 'react-router-dom';

const Dashboard = ({ passengers, onEditPassenger, onDeletePassenger }) => {
  const renderPassengers = () => {
    if (!passengers) {
      return null; // Return early if passengers prop is undefined or null
    }

    return (
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Seat Number</th>
            <th>Date of Booking</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {passengers.map((passenger, index) => (
            <tr key={index}>
              <td>
                {passenger.firstName} {passenger.lastName}
              </td>
              <td>{passenger.email}</td>
              <td>{passenger.seatNumber}</td>
              <td>{passenger.date}</td>
              <td>
                <button>
                  <Link to={`/reservation/${index}`}>Edit</Link>
                </button>
                <button onClick={() => onDeletePassenger(index)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    );
  };

  return (
    <div>
      <h2>Dashboard</h2>
      <div className="passengers-container">{renderPassengers()}</div>
      <Link to="/reservation">Add Passenger</Link>
    </div>
  );
};

export default Dashboard;
