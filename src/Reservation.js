import React, { useState, useEffect } from 'react';
import './Reservation.css';

const Reservation = ({ passenger, onAddPassenger, onSave }) => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [seatNumber, setSeatNumber] = useState('');
  const [date, setDate] = useState('');
  const [bookedSeats, setBookedSeats] = useState({});

  useEffect(() => {
    if (passenger) {
      setFirstName(passenger.firstName);
      setLastName(passenger.lastName);
      setEmail(passenger.email);
      setDate(passenger.date);
      setSeatNumber(passenger.seatNumber || '');
    }
  }, [passenger]);

  useEffect(() => {
    const bookedSeatsData = {}; // Example of booked seats
    setBookedSeats(bookedSeatsData);
  }, []);

  const handleFirstNameChange = (event) => {
    setFirstName(event.target.value);
  };

  const handleLastNameChange = (event) => {
    setLastName(event.target.value);
  };

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handleSeatSelection = (seat) => {
    if (isSeatBooked(seat)) {
      alert('This seat is already booked for the selected date. Please choose another seat.');
    } else {
      setSeatNumber(seat);
    }
  };

  const handleDateChange = (event) => {
    setDate(event.target.value);
  };

  const handleFormSubmit = (event) => {
    event.preventDefault();
    if (firstName && lastName && email && date) {
      const updatedPassenger = {
        firstName,
        lastName,
        email,
        date,
        seatNumber,
      };

      if (passenger) {
        onSave(updatedPassenger);
      } else {
        if (seatNumber) {
          if (isSeatBooked(seatNumber)) {
            alert('This seat is already booked for the selected date. Please choose another seat.');
          } else {
            const updatedBookedSeats = {
              ...bookedSeats,
              [date]: [...(bookedSeats[date] || []), seatNumber],
            };
            setBookedSeats(updatedBookedSeats);
            onAddPassenger(updatedPassenger);
            setFirstName('');
            setLastName('');
            setEmail('');
            setSeatNumber('');
            setDate('');
          }
        } else {
          alert('Please select a seat.');
        }
      }
    }
  };

  const isSeatBooked = (seat) => {
    return bookedSeats[date] && bookedSeats[date].includes(seat);
  };

  const seatOptions = Array.from({ length: 40 }, (_, index) => index + 1);

  const seatsPerRow = 4;
  const numberOfRows = Math.ceil(seatOptions.length / seatsPerRow);
  const rows = Array.from({ length: numberOfRows }, (_, rowIndex) =>
    seatOptions.slice(rowIndex * seatsPerRow, (rowIndex + 1) * seatsPerRow)
  );

  return (
    <div className="container">
      <div className="reservation-form">
        <h2>Reservation</h2>
        <form onSubmit={handleFormSubmit}>
          <input
            type="text"
            placeholder="Enter your first name"
            value={firstName}
            onChange={handleFirstNameChange}
          />
          <input
            type="text"
            placeholder="Enter your last name"
            value={lastName}
            onChange={handleLastNameChange}
          />
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={handleEmailChange}
          />
          
          <input type="date" value={date} onChange={handleDateChange} />
          <div className="seat-selection">
            {rows.map((row, rowIndex) => (
              <div key={rowIndex} className="seat-row">
                {row.map((seat) => (
                  <div
                    key={seat}
                    className={`seat ${isSeatBooked(seat) ? 'seat-booked' : ''} ${
                      seatNumber === seat ? 'seat-selected' : ''
                    }`}
                    onClick={() => handleSeatSelection(seat)}
                  >
                    {seat}
                  </div>
                ))}
              </div>
            ))}
          </div>
          <button type="submit">{passenger ? 'Save' : 'Book Ticket'}</button>
        </form>
      </div>
    </div>
  );
};

export default Reservation;
