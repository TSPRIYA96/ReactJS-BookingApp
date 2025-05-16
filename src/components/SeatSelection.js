import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import {
  Box,
  Typography,
  Grid,
  Button,
  Paper,
  TextField,
  Divider,
} from '@mui/material';
import { FaChair } from 'react-icons/fa';
import { useAuth } from '../context/AuthContext'; 
import { useEffect } from 'react';
const SeatSelection = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const busDetails = location.state?.busDetails || {
    id: 1,
    name: 'Volvo AC Sleeper',
    from: 'Bangalore',
    to: 'Chennai',
    departure: '2023-06-15T22:00:00',
    arrival: '2023-06-16T06:00:00',
    price: 1200,
    boardingPoint: 'Majestic Bus Stand, Platform 3',
    dropPoint: 'Chennai Central',
    operator: 'SR Travels'
  };

  const [selectedSeats, setSelectedSeats] = useState([]);
  const [passengerDetails, setPassengerDetails] = useState({
    name: '',
    age: '',
    gender: 'male',
  });

  const seats = Array(40).fill(null);

  const toggleSeat = (seatNumber) => {
    if (selectedSeats.includes(seatNumber)) {
      setSelectedSeats(selectedSeats.filter((seat) => seat !== seatNumber));
    } else {
      if (selectedSeats.length < 5) {
        setSelectedSeats([...selectedSeats, seatNumber]);
      }
    }
  };

  const handlePassengerChange = (e) => {
    setPassengerDetails({
      ...passengerDetails,
      [e.target.name]: e.target.value,
    });
  };

  const handleProceedToPay = () => {
    const bookingDetails = {
      busId: busDetails.id,
      busName: busDetails.name,
      from: busDetails.from,
      to: busDetails.to,
      departure: busDetails.departure,
      arrival: busDetails.arrival,
      seats: selectedSeats,
      fare: selectedSeats.length * busDetails.price,
      passengerDetails: passengerDetails,
      boardingPoint: busDetails.boardingPoint,
      dropPoint: busDetails.dropPoint,
      operator: busDetails.operator,
      bookingDate: new Date().toISOString()
    };

    navigate('/payment', { state: { bookingDetails } });
  };

  return (
    <Box sx={{ padding: '20px' }}>
      <Typography variant="h4" gutterBottom>
        Select Your Seats - {busDetails.name}
      </Typography>
      <Typography variant="subtitle1" gutterBottom sx={{ mb: 3 }}>
        {busDetails.from} → {busDetails.to} | {new Date(busDetails.departure).toLocaleDateString()} | ₹{busDetails.price} per seat
      </Typography>
      
      <Grid container spacing={3}>
        <Grid item xs={12} md={8}>
          <Paper elevation={3} sx={{ padding: '20px' }}>
            <Typography variant="h6" gutterBottom>
              Bus Layout
            </Typography>
            <Box
              sx={{
                display: 'grid',
                gridTemplateColumns: 'repeat(4, 1fr)',
                gap: '10px',
              }}
            >
              {seats.map((_, index) => {
                const seatNumber = index + 1;
                const isSelected = selectedSeats.includes(seatNumber);
                const isBooked = Math.random() < 0.2; // 20% chance seat is booked
                
                return (
                  <Button
                    key={seatNumber}
                    variant={isSelected ? 'contained' : 'outlined'}
                    color={isBooked ? 'error' : isSelected ? 'primary' : 'inherit'}
                    onClick={() => !isBooked && toggleSeat(seatNumber)}
                    sx={{
                      minWidth: '60px',
                      backgroundColor: isBooked ? '#ffebee' : isSelected ? '#daa520' : 'inherit',
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      position: 'relative',
                      opacity: isBooked ? 0.7 : 1,
                      cursor: isBooked ? 'not-allowed' : 'pointer'
                    }}
                    disabled={isBooked}
                  >
                    <FaChair size={24} color={isBooked ? '#f44336' : isSelected ? '#fff' : '#555'} />
                    <Typography 
                      variant="caption" 
                      sx={{ 
                        marginTop: '4px',
                        color: isBooked ? '#f44336' : isSelected ? '#fff' : 'inherit'
                      }}
                    >
                      {seatNumber}
                    </Typography>
                    {isBooked && (
                      <Box sx={{
                        position: 'absolute',
                        top: '50%',
                        left: 0,
                        right: 0,
                        height: '2px',
                        backgroundColor: '#f44336',
                        transform: 'rotate(-45deg)'
                      }} />
                    )}
                  </Button>
                );
              })}
            </Box>
            
            <Box sx={{ 
              display: 'flex', 
              gap: 3, 
              mt: 4,
              justifyContent: 'center'
            }}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <FaChair color="#daa520" />
                <Typography variant="caption">Selected</Typography>
              </Box>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <FaChair color="#555" />
                <Typography variant="caption">Available</Typography>
              </Box>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <FaChair color="#f44336" />
                <Typography variant="caption">Booked</Typography>
              </Box>
            </Box>
          </Paper>
        </Grid>
        
        <Grid item xs={12} md={4}>
          <Paper elevation={3} sx={{ padding: '20px' }}>
            <Typography variant="h6" gutterBottom>
              Selected Seats: {selectedSeats.join(', ') || 'None'}
            </Typography>
            <Typography variant="body1" gutterBottom>
              Total Price: ₹{selectedSeats.length * busDetails.price}
            </Typography>
            <Divider sx={{ margin: '20px 0' }} />
            
            <Typography variant="h6" gutterBottom>
              Passenger Details
            </Typography>
            <TextField
              fullWidth
              label="Name"
              name="name"
              value={passengerDetails.name}
              onChange={handlePassengerChange}
              margin="normal"
              required
            />
            <TextField
              fullWidth
              label="Age"
              name="age"
              type="number"
              value={passengerDetails.age}
              onChange={handlePassengerChange}
              margin="normal"
              required
            />
            <TextField
              fullWidth
              select
              label="Gender"
              name="gender"
              value={passengerDetails.gender}
              onChange={handlePassengerChange}
              margin="normal"
              required
              SelectProps={{
                native: true,
              }}
            >
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
            </TextField>
            
            <Button
      variant="contained"
      fullWidth
      sx={{ marginTop: '20px', backgroundColor: '#d84e55' }}
      onClick={handleProceedToPay}
      disabled={selectedSeats.length === 0}
    >
              Proceed to Pay
            </Button>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default SeatSelection;