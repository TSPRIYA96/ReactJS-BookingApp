import React, { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { 
  AppBar, 
  Toolbar, 
  Typography, 
  Button, 
  Box, 
  Avatar, 
  Menu, 
  MenuItem, 
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Divider
} from '@mui/material';
import { DirectionsBus, AccountCircle, Close } from '@mui/icons-material';

const Navbar = () => {
  const { user, login, logout } = useContext(AuthContext);
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = useState(null);
  const [openAuthDialog, setOpenAuthDialog] = useState(false);
  const [isLogin, setIsLogin] = useState(true);
  const [authForm, setAuthForm] = useState({
    email: '',
    password: '',
    name: ''
  });

  // User menu handlers
  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    handleMenuClose();
    logout();
    navigate('/');
  };

  // Auth dialog handlers
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
      login(authForm.email, authForm.password);
    } else {
      // Handle signup (you'll need to implement this in your AuthContext)
      // For now, we'll just log in after "signup"
      login(authForm.email, authForm.password);
    }
    handleAuthDialogClose();
  };

  return (
    <>
      <AppBar 
        position="sticky" 
        sx={{ 
          backgroundColor: '#008080',
          boxShadow: '0 2px 10px rgba(0,0,0,0.1)'
        }}
      >
        <Toolbar 
          sx={{ 
            maxWidth: '1200px', 
            width: '100%', 
            margin: '0 auto',
            padding: { xs: '0 10px', sm: '0 20px' }
          }}
        >
          {/* Logo Section */}
          <Box 
            component={Link} 
            to="/"
            sx={{ 
              display: 'flex', 
              alignItems: 'center', 
              mr: 4,
              textDecoration: 'none'
            }}
          >
            <DirectionsBus sx={{ mr: 1, fontSize: '2rem', color: 'white' }} />
            <Typography 
              variant="h6" 
              sx={{ 
                fontWeight: 'bold',
                color: 'white',
                '&:hover': {
                  opacity: 0.9
                }
              }}
            >
              Online Bus Ticket Booking
            </Typography>
          </Box>

          {/* Navigation Links */}
          <Box sx={{ 
            display: { xs: 'none', md: 'flex' }, 
            flexGrow: 1,
            gap: 1
          }}>
            <Button 
              component={Link} 
              to="/" 
              color="inherit"
              sx={{ 
                fontWeight: 600,
                '&:hover': {
                  backgroundColor: 'rgba(255,255,255,0.1)'
                }
              }}
            >
              Home
            </Button>
            <Button 
              component={Link} 
              to="/booking" 
              color="inherit"
              sx={{ 
                fontWeight: 600,
                '&:hover': {
                  backgroundColor: 'rgba(255,255,255,0.1)'
                }
              }}
            >
              Book Now
            </Button>
            <Button 
              component={Link} 
              to="/my-bookings" 
              color="inherit"
              sx={{ 
                fontWeight: 600,
                '&:hover': {
                  backgroundColor: 'rgba(255,255,255,0.1)'
                }
              }}
            > 
              MyBooking
            </Button>
            <Button 
              component={Link} 
              to="/contact" 
              color="inherit"
              sx={{ 
                fontWeight: 600,
                '&:hover': {
                  backgroundColor: 'rgba(255,255,255,0.1)'
                }
              }}
            >
              Contact
            </Button>
            </Box>

          {/* User Section */}
          <Box sx={{ display: 'flex', alignItems: 'center', ml: 'auto' }}>
            {user ? (
              <>
                <IconButton
                  size="large"
                  edge="end"
                  onClick={handleMenuOpen}
                  color="inherit"
                  sx={{ ml: 2 }}
                > 
                <Button 
              component={Link} 
              to="/profile" 
              color="inherit"
              sx={{ 
                fontWeight: 600,
                '&:hover': {
                  backgroundColor: 'rgba(255,255,255,0.1)'
                }
              }}
            >
              User
            </Button>
                  {user.avatar ? (
                    <Avatar 
                      src={user.avatar} 
                      alt={user.name} 
                      sx={{ width: 32, height: 32 }} 
                    />
                  ) : (
                    <AccountCircle sx={{ fontSize: '32px' }} />
                    )}
                </IconButton>
                <Menu
                  anchorEl={anchorEl}
                  open={Boolean(anchorEl)}
                  onClose={handleMenuClose}
                  PaperProps={{
                    elevation: 0,
                    sx: {
                      mt: 1,
                      minWidth: 180,
                      boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
                      '& .MuiMenuItem-root': {
                        px: 2,
                        py: 1.5,
                      },
                    },
                  }}
                >
                  <MenuItem disabled>{user.email}</MenuItem>
                  <MenuItem 
                    component={Link} 
                    to="/profile" 
                    onClick={handleMenuClose}
                  >
                    My Profile
                  </MenuItem>
                  <MenuItem 
                    component={Link} 
                    to="/my-bookings" 
                    onClick={handleMenuClose}
                  >
                    MyBooking
                  </MenuItem>
                  <MenuItem onClick={handleLogout}>Logout</MenuItem>
                </Menu>
              </>
            ) : (
              <>
                <Button 
                  variant="outlined"
                  color="inherit"
                  sx={{ 
                    mr: 1,
                    '&:hover': {
                      backgroundColor: 'rgba(255,255,255,0.1)',
                    }
                  }}
                  onClick={() => handleAuthDialogOpen(true)}
                >
                  Login
                </Button>
                <Button 
                  variant="contained"
                  color="secondary"
                  sx={{ 
                    backgroundColor: 'white',
                    color: 'primary.main',
                    '&:hover': {
                      backgroundColor: '#f5f5f5'
                    }
                  }}
                  onClick={() => handleAuthDialogOpen(false)}
                >
                  Sign Up
                </Button>
              </>
            )}
          </Box>
        </Toolbar>
      </AppBar>

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
    </>
  );
};

export default Navbar;