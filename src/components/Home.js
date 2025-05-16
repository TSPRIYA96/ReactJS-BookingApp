import React, { useState, useEffect, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { 
  Container, 
  Typography, 
  Button, 
  Box, 
  TextField,
  Grid,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Divider
} from '@mui/material';
import { ArrowForward, ArrowBack, Close } from '@mui/icons-material';
import Header from './Header';

const Home = () => {
  const navigate = useNavigate();
  const { user, login } = useContext(AuthContext);
  const [searchParams, setSearchParams] = useState({
    from: '',
    to: '',
    date: ''
  });

  // Login/Signup Dialog State
  const [openAuthDialog, setOpenAuthDialog] = useState(false);
  const [isLogin, setIsLogin] = useState(true);
  const [authForm, setAuthForm] = useState({
    email: '',
    password: '',
    name: ''
  });

  // Slider images and configuration
  const slides = [
    {
      id: 1,
      image: '/images/bus-banner1.jpg',
      title: 'Comfortable Travel Experience',
      subtitle: 'Book your seat now and enjoy the journey'
    },
    {
      id: 2,
      image: '/images/bus-banner2.jpg',
      title: 'Affordable Prices',
      subtitle: 'Get the best deals on bus tickets'
    },
    {
      id: 3,
      image: '/images/bus-banner3.jpg',
      title: 'Wide Network',
      subtitle: 'Connecting cities across the country'
    }
  ];

  const [currentSlide, setCurrentSlide] = useState(0);

  // Auto slide change every 5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [slides.length]);

  const handleSearchChange = (e) => {
    const { name, value } = e.target;
    setSearchParams({ ...searchParams, [name]: value });
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    navigate('/booking', { state: { searchParams } });
  };

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  // Auth Dialog Handlers
  const handleAuthDialogOpen = (loginForm = true) => {
    setIsLogin(loginForm);
    setOpenAuthDialog(true);
  };

  const handleAuthDialogClose = () => {
    setOpenAuthDialog(false);
    setAuthForm({ email: '', password: '', name: '' });
  };

  const handleAuthFormChange = (e) => {
    const { name, value } = e.target;
    setAuthForm({ ...authForm, [name]: value });
  };

  const handleAuthSubmit = (e) => {
    e.preventDefault();
    if (isLogin) {
      // Handle login
      login(authForm.email, authForm.password);
    } else {
      // Handle signup (you'll need to implement this in your AuthContext)
      // For now, we'll just log in after "signup"
      login(authForm.email, authForm.password);
    }
    handleAuthDialogClose();
  };

  return (
    <div style={{ overflowX: 'hidden' }}>
      <Header />
      
      {/* Image Slider */}
      <Box sx={{ position: 'relative', height: '500px', width: '100%' }}>     
        {slides.map((slide, index) => (
          <Box
            key={slide.id}
            sx={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
              backgroundImage: `url(${slide.image})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              opacity: index === currentSlide ? 1 : 0,
              transition: 'opacity 1s ease-in-out',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'white',
              textAlign: 'center',
              '&::before': {
                content: '""',
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                backgroundColor: 'rgba(0,0,0,0.4)',
              },
            }}
          >
            <Box sx={{ position: 'relative', zIndex: 1, maxWidth: '800px', px: 2 }}>
              <Typography variant="h2" gutterBottom sx={{ fontWeight: 'bold' }}>
                {slide.title}
              </Typography>
              <Typography variant="h5" gutterBottom>
                {slide.subtitle}
              </Typography>
              {user ? (
                <Button
                  variant="contained"
                  size="large"
                  sx={{ 
                    mt: 3,
                    backgroundColor: 'green',
                    '&:hover': { backgroundColor: '#c23a40' }
                  }}
                  onClick={() => navigate('/booking')}
                >
                  Book Now
                </Button>
              ) : (
                <Box sx={{ display: 'flex', gap: 2, justifyContent: 'center' }}>
                  <Button
                    variant="contained"
                    size="large"
                    sx={{ 
                      mt: 3,
                      backgroundColor: 'green',
                      '&:hover': { backgroundColor: '#90ee90' }
                    }}
                    onClick={() => handleAuthDialogOpen(true)}
                  >
                    Book Now
                  </Button>
                   </Box>
              )}
            </Box>
          </Box>
        ))}
        
          {/* Slider Controls */}
        <IconButton
          onClick={prevSlide}
          sx={{
            position: 'absolute',
            left: '20px',
            top: '50%',
            transform: 'translateY(-50%)',
            backgroundColor: 'rgba(0,0,0,0.5)',
            color: 'white',
            zIndex: 2,
            '&:hover': { backgroundColor: 'rgba(0,0,0,0.7)' }
          }}
        >
          <ArrowBack />
        </IconButton>
        <IconButton
          onClick={nextSlide}
          sx={{
            position: 'absolute',
            right: '20px',
            top: '50%',
            transform: 'translateY(-50%)',
            backgroundColor: 'rgba(0,0,0,0.5)',
            color: 'white',
            zIndex: 2,
            '&:hover': { backgroundColor: 'rgba(0,0,0,0.7)' }
          }}
        >
          <ArrowForward />
        </IconButton>
        
        {/* Slider Indicators */}
        <Box sx={{
          position: 'absolute',
          bottom: '20px',
          left: '50%',
          transform: 'translateX(-50%)',
          display: 'none',
          gap: '10px',
          zIndex: 2
        }}>
          {slides.map((_, index) => (
            <Box
              key={index}
              onClick={() => setCurrentSlide(index)}
              sx={{
                width: '12px',
                height: '12px',
                borderRadius: '50%',
                backgroundColor: index === currentSlide ? '#d84e55' : 'rgba(255,255,255,0.5)',
                cursor: 'pointer',
                transition: 'background-color 0.3s'
              }}
            />
          ))}
        </Box>
      </Box>

      {/* Search Form */}
      <Container maxWidth="md" sx={{ mt: -5, position: 'relative', zIndex: 1 }}>
        <Box
          component="form"
          onSubmit={handleSearchSubmit}
          sx={{
            backgroundColor: 'white',
            borderRadius: '8px',
            boxShadow: '0 5px 15px rgba(0,0,0,0.2)',
            p: 4,
          }}
        >
          <Typography variant="h5" align="center" gutterBottom sx={{ mb: 3 }}>
            Search Buses
          </Typography>
          <Grid container spacing={3}>
            <Grid item xs={12} md={4}>
              <TextField
                fullWidth
                label="From"
                name="from"
                value={searchParams.from}
                onChange={handleSearchChange}
                required
              />
            </Grid>
            <Grid item xs={12} md={4}>
              <TextField
                fullWidth
                label="To"
                name="to"
                value={searchParams.to}
                onChange={handleSearchChange}
                required
              />
            </Grid>
            <Grid item xs={12} md={4}>
              <TextField
                fullWidth
                label="Date of Journey"
                type="date"
                name="date"
                value={searchParams.date}
                onChange={handleSearchChange}
                required
                InputLabelProps={{ shrink: true }}
              />
            </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            size="large"
            sx={{ 
              mt: 3,
              backgroundColor: '#a0522d',
              '&:hover': { backgroundColor: '#d2b48c' }
            }}
          >
            Search Buses
          </Button>
        </Box>
      </Container>

      {/* Features Section */}
      <Container maxWidth="lg" sx={{ py: 8 }}>
        <Typography variant="h3" align="center" gutterBottom sx={{ mb: 6 }}>
          Why to Choose Online Booking?
        </Typography>
        <Grid container spacing={4}>
          {[
            {
              icon: '🚌',
              title: '10,000+ Buses',
              description: 'Largest network of buses across the country'
            },
            {
              icon: '💰',
              title: 'Best Prices',
              description: 'We guarantee the lowest prices for your journey'
            },
            {
              icon: '🛡️',
              title: 'Safe Travel',
              description: 'Verified operators and safety measures'
            },
            {
              icon: '🎫',
              title: 'Easy Booking',
              description: 'Simple and fast booking process'
            },
            {
              icon: '📱',
              title: 'Mobile Friendly',
              description: 'Book tickets on the go with our mobile app'
            },
            {
              icon: '🔄',
              title: 'Flexible Cancellation',
              description: 'Easy cancellation and refund options'
            }
          ].map((feature, index) => (
            <Grid item xs={12} sm={6} md={4} key={index}>
              <Box sx={{ 
                textAlign: 'center',
                p: 3,
                height: '100%',
                '&:hover': {
                  transform: 'translateY(-5px)',
                  transition: 'transform 0.3s'
                }
              }}>
                <Typography variant="h2" sx={{ mb: 2 }}>{feature.icon}</Typography>
                <Typography variant="h5" gutterBottom>{feature.title}</Typography>
                <Typography variant="body1">{feature.description}</Typography>
              </Box>
            </Grid>
          ))}
        </Grid>
      </Container>

      {/* Auth Dialog */}
      <Dialog open={openAuthDialog} onClose={handleAuthDialogClose} maxWidth="xs" fullWidth>
        <DialogTitle sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          {isLogin ? 'Login' : 'Sign Up'}
          <IconButton onClick={handleAuthDialogClose}>
            <Close />
          </IconButton>
        </DialogTitle>
        <Divider />
        <Box component="form" onSubmit={handleAuthSubmit}>
          <DialogContent sx={{ pt: 2 }}>
            {!isLogin && (
              <TextField
                autoFocus
                margin="dense"
                name="name"
                label="Full Name"
                type="text"
                fullWidth
                variant="outlined"
                value={authForm.name}
                onChange={handleAuthFormChange}
                sx={{ mb: 2 }}
              />
            )}
            <TextField
              margin="dense"
              name="email"
              label="Email Address"
              type="email"
              fullWidth
              variant="outlined"
              value={authForm.email}
              onChange={handleAuthFormChange}
              sx={{ mb: 2 }}
            />
            <TextField
              margin="dense"
              name="password"
              label="Password"
              type="password"
              fullWidth
              variant="outlined"
              value={authForm.password}
              onChange={handleAuthFormChange}
            />
          </DialogContent>
          <DialogActions sx={{ px: 3, pb: 3 }}>
            <Button 
              onClick={() => setIsLogin(!isLogin)} 
              color="primary"
              sx={{ mr: 'auto' }}
            >
              {isLogin ? 'Need an account? Sign Up' : 'Already have an account? Login'}
            </Button>
            <Button 
              type="submit" 
              variant="contained" 
              color="primary"
            >
              {isLogin ? 'Login' : 'Sign Up'}
            </Button>
          </DialogActions>
        </Box>
      </Dialog>
    </div>
  );
};

export default Home;