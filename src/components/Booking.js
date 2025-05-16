import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Box,
  Typography,
  Card,
  CardContent,
  Button,
  Grid,
  TextField,
} from '@mui/material';

const Booking = () => {
  const [buses] = useState([
    {
      id: 1,
      name: 'Volvo AC Sleeper',
      departure: '10:00 PM',
      arrival: '6:00 AM',
      duration: '8h',
      price: '₹1200',
      seats: 32,
    },
    {
      id: 2,
      name: 'Non-AC Seater',
      departure: '11:00 PM',
      arrival: '7:00 AM',
      duration: '8h',
      price: '₹800',
      seats: 40,
    },
    {
      id: 3,
      name: 'AC Seater',
      departure: '9:00 PM',
      arrival: '5:00 AM',
      duration: '8h',
      price: '₹1000',
      seats: 36,
    },
    {
        id: 4,
      name: 'Volvo Non-AC Sleeper',
      departure: '04:00 PM',
      arrival: '03:30 AM',
      duration: '8h',
      price: '₹600',
      seats: 10,
    },
    {
      id: 5,
      name: 'Luxury AC Sleeper',
      departure: '05:00 PM',
      arrival: '02:30 AM',
      duration: '8h',
      price: '₹1500',
      seats: 20,
    },
    {
      id: 6,
      name: 'Semi-Sleeper Non-AC',
      departure: '06:00 PM',
      arrival: '03:30 AM',
      duration: '8h',
      price: '₹700',
      seats: 15,
    },
    {
      id: 7,
      name: 'Luxury Non-AC Sleeper',
      departure: '07:00 PM',
      arrival: '04:30 AM',
      duration: '8h',
      price: '₹900',
      seats: 25,
    },
    {
      id: 8,
      name: 'Deluxe AC Seater',
      departure: '08:00 PM',
      arrival: '05:30 AM',
      duration: '8h',
      price: '₹1100',
      seats: 30,
    },
    {
      id: 9,
      name: 'Standard Non-AC Seater',
      departure: '09:00 PM',
      arrival: '06:30 AM',
      duration: '8h',
      price: '₹500',
      seats: 40,
    },
    {
      id: 10,
      name: 'ORANGE AC Seater',
      departure: '10:00 PM',
      arrival: '07:30 AM',
      duration: '8h',
      price: '₹1300',
      seats: 28,
    },
    {
      id: 11,
      name: 'VPN Non-AC Seater',
      departure: '11:00 PM',
      arrival: '08:30 AM',
      duration: '8h',
      price: '₹900',
      seats: 35,
    },
    {
      id: 12,
      name: 'Deluxe Non-AC Sleeper',
      departure: '12:00 PM',
      arrival: '09:30 AM',
      duration: '8h',
      price: '₹800',
      seats: 20,
    },
 
  ]);

  return (
    <Box sx={{ padding: '20px' }}>
      <Typography variant="h4" gutterBottom>
        Available Buses
      </Typography>
      <Grid container spacing={3}>
        {buses.map((bus) => (
          <Grid item xs={12} key={bus.id}>
            <Card>
              <CardContent>
                <Typography variant="h6">{bus.name}</Typography>
                <Typography variant="body1">
                  Departure: {bus.departure} | Arrival: {bus.arrival} | Duration:{' '}
                  {bus.duration}
                </Typography>
                <Typography variant="body1">Price: {bus.price}</Typography>
                <Typography variant="body1">
                  Available Seats: {bus.seats}
                </Typography>
                <Button
                  variant="contained"
                  component={Link}
                  to="/seats"
                  sx={{ marginTop: '10px', backgroundColor: 'green' }}
                >
                  View Seats
                </Button>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default Booking;