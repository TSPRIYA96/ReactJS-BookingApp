import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Box, 
  Typography, 
  Container, 
  Paper, 
  Tab, 
  Tabs, 
  Button,
  Card,
  CardContent,
  Grid,
  Divider,
  Chip,
} from '@mui/material';
import {
  DirectionsBus,
  Event,
  Schedule,
  ConfirmationNumber,
  Person,
  Payment,
  Cancel
} from '@mui/icons-material';
import { AuthContext } from '../context/AuthContext';


const MyBooking = () => {
  const navigate = useNavigate();
  const { user } = React.useContext(AuthContext);
  const [activeTab, setActiveTab] = useState(0);
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  // Mock data - replace with actual API calls
  useEffect(() => {
    if (user) {
      // Simulate API call
      setTimeout(() => {
        setBookings([
          {
            id: 'BKG123456',
            busName: 'Volvo AC Sleeper',
            from: 'Bangalore',
            to: 'Chennai',
            departure: '2023-06-15T22:00:00',
            arrival: '2023-06-16T06:00:00',
            seats: ['A1', 'A2'],
            fare: 2400,
            status: 'confirmed',
            bookingDate: '2023-06-10T14:30:00',
            boardingPoint: 'Majestic Bus Stand, Platform 3',
            dropPoint: 'Chennai Central',
            operator: 'SR Travels'
          },
          {
            id: 'BKG789012',
            busName: 'Non-AC Seater',
            from: 'Mumbai',
            to: 'Pune',
            departure: '2023-06-20T08:00:00',
            arrival: '2023-06-20T12:00:00',
            seats: ['B4'],
            fare: 800,
            status: 'cancelled',
            bookingDate: '2023-06-05T10:15:00',
            boardingPoint: 'Dadar Bus Stand',
            dropPoint: 'Pune Station',
            operator: 'MSRTC'
          },
          {
            id: 'BKG345678',
            busName: 'AC Multi-Axle',
            from: 'Delhi',
            to: 'Jaipur',
            departure: '2023-07-01T23:30:00',
            arrival: '2023-07-02T05:30:00',
            seats: ['C1', 'C2', 'C3'],
            fare: 2700,
            status: 'confirmed',
            bookingDate: '2023-06-25T18:45:00',
            boardingPoint: 'ISBT Kashmere Gate',
            dropPoint: 'Jaipur International Bus Stand',
            operator: 'Rajasthan Travels'
          }
        ]);
        setLoading(false);
      }, 1000);
    } else {
      navigate('/login');
    }
  }, [user, navigate]);

  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
  };

  const handleCancelBooking = (bookingId) => {
    // In a real app, this would call an API to cancel the booking
    setBookings(bookings.map(booking => 
      booking.id === bookingId ? { ...booking, status: 'cancelled' } : booking
    ));
  };

  const filteredBookings = bookings.filter(booking => {
    if (activeTab === 0) return booking.status === 'confirmed';
    if (activeTab === 1) return booking.status === 'cancelled';
    return true;
  });

  const formatDate = (dateString) => {
    const options = { day: 'numeric', month: 'short', year: 'numeric' };
    return new Date(dateString).toLocaleDateString('en-US', options);
  };

  const formatTime = (dateString) => {
    const options = { hour: '2-digit', minute: '2-digit' };
    return new Date(dateString).toLocaleTimeString('en-US', options);
  };

  const getDuration = (departure, arrival) => {
    const diff = new Date(arrival) - new Date(departure);
    const hours = Math.floor(diff / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    return `${hours}h ${minutes}m`;
  };

  if (!user) {
    return null; // Already redirected to login
  }

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Typography variant="h4" gutterBottom sx={{ fontWeight: 'bold', mb: 3 }}>
        My Bookings
      </Typography>
      
      <Paper elevation={3} sx={{ mb: 4 }}>
        <Tabs
          value={activeTab}
          onChange={handleTabChange}
          variant="fullWidth"
          indicatorColor="primary"
          textColor="primary"
        >
          <Tab label="Upcoming" icon={<Event />} />
          <Tab label="Cancelled" icon={<Cancel />} />
          <Tab label="All Bookings" icon={<ConfirmationNumber />} />
        </Tabs>
      </Paper>

      {loading ? (
        <Box sx={{ display: 'flex', justifyContent: 'center', py: 4 }}>
          <Typography variant="h6">Loading your bookings...</Typography>
        </Box>
      ) : filteredBookings.length === 0 ? (
        <Paper elevation={3} sx={{ p: 4, textAlign: 'center' }}>
          <Typography variant="h6" gutterBottom>
            No {activeTab === 0 ? 'upcoming' : activeTab === 1 ? 'cancelled' : ''} bookings found
          </Typography>
          <Button 
            variant="contained" 
            color="primary"
            sx={{ mt: 2 }}
            onClick={() => navigate('/')}
          >
            Book a Bus Now
          </Button>
        </Paper>
      ) : (
        <Grid container spacing={3}>
          {filteredBookings.map((booking) => (
            <Grid item xs={12} key={booking.id}>
              <Card sx={{ 
                borderLeft: `4px solid ${booking.status === 'confirmed' ? '#4caf50' : '#f44336'}`,
                '&:hover': { boxShadow: 3 }
              }}>
                <CardContent>
                  <Grid container spacing={2}>
                    <Grid item xs={12} md={8}>
                      <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                        <DirectionsBus color="primary" sx={{ mr: 1 }} />
                        <Typography variant="h6" component="div">
                          {booking.busName}
                        </Typography>
                        <Chip
                          label={booking.status.toUpperCase()}
                          color={booking.status === 'confirmed' ? 'success' : 'error'}
                          size="small"
                          sx={{ ml: 2 }}
                        />
                      </Box>

                      <Grid container spacing={2} sx={{ mb: 2 }}>
                        <Grid item xs={12} sm={6} md={4}>
                          <Typography variant="body2" color="text.secondary">
                            <Box sx={{ display: 'flex', alignItems: 'center', mb: 0.5 }}>
                              <Schedule fontSize="small" sx={{ mr: 1 }} />
                              {formatDate(booking.departure)}
                            </Box>
                          </Typography>
                          <Typography variant="body1">
                            {formatTime(booking.departure)} - {formatTime(booking.arrival)}
                          </Typography>
                          <Typography variant="body2">
                            {getDuration(booking.departure, booking.arrival)}
                          </Typography>
                        </Grid>

                        <Grid item xs={12} sm={6} md={4}>
                          <Typography variant="body2" color="text.secondary">
                            Route
                          </Typography>
                          <Typography variant="body1">
                            {booking.from} → {booking.to}
                          </Typography>
                          <Typography variant="body2">
                            {booking.operator}
                          </Typography>
                        </Grid>

                        <Grid item xs={12} sm={6} md={4}>
                          <Typography variant="body2" color="text.secondary">
                            Seats
                          </Typography>
                          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                            {booking.seats.map((seat) => (
                              <Chip 
                                key={seat} 
                                label={seat} 
                                size="small" 
                                variant="outlined" 
                              />
                            ))}
                          </Box>
                        </Grid>
                      </Grid>

                      <Divider sx={{ my: 2 }} />

                      <Grid container spacing={2}>
                        <Grid item xs={12} sm={6}>
                          <Typography variant="body2" color="text.secondary">
                            Boarding Point
                          </Typography>
                          <Typography variant="body1">
                            {booking.boardingPoint}
                          </Typography>
                          <Typography variant="body2">
                            Report 30 mins before departure
                          </Typography>
                        </Grid>

                        <Grid item xs={12} sm={6}>
                          <Typography variant="body2" color="text.secondary">
                            Drop Point
                          </Typography>
                          <Typography variant="body1">
                            {booking.dropPoint}
                          </Typography>
                        </Grid>
                      </Grid>
                    </Grid>

                    <Grid item xs={12} md={4}>
                      <Paper elevation={0} sx={{ 
                        p: 2, 
                        backgroundColor: 'green',
                        height: '100%',
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'space-between'
                      }}>
                        <Box>
                          <Typography variant="body2" color="text.secondary">
                            Booking ID
                          </Typography>
                          <Typography variant="body1" sx={{ mb: 2 }}>
                            {booking.id}
                          </Typography>

                          <Typography variant="body2" color="text.secondary">
                            Booked On
                          </Typography>
                          <Typography variant="body1" sx={{ mb: 2 }}>
                            {formatDate(booking.bookingDate)} at {formatTime(booking.bookingDate)}
                          </Typography>

                          <Typography variant="body2" color="text.secondary">
                            Fare
                          </Typography>
                          <Typography variant="h6" sx={{ mb: 2 }}>
                            ₹{booking.fare}
                          </Typography>
                        </Box>

                        <Box sx={{ display: 'flex', gap: 1, pt: 2 }}>
                          {booking.status === 'confirmed' && (
                            <Button
                              variant="contained"
                              color="error"
                              size="small"
                              startIcon={<Cancel />}
                              onClick={() => handleCancelBooking(booking.id)}
                              fullWidth
                            >
                              Cancel
                            </Button>
                          )}
                          <Button
                            variant="outlined"
                            size="small"
                            startIcon={<Payment />}
                            fullWidth
                          >
                            View Ticket
                          </Button>
                        </Box>
                      </Paper>
                    </Grid>
                  </Grid>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}
    </Container>
  );
};

export default MyBooking;