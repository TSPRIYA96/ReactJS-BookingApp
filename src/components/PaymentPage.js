import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Container, Typography,Box, Stepper,  Step,  StepLabel,  Paper,  Grid,  TextField,
  FormControl,  FormLabel,  RadioGroup,  FormControlLabel,  Radio,  Button,  Divider,
  Card,  CardContent,  Avatar,  IconButton} from '@mui/material';
import {
  CreditCard,
  AccountBalance,
  Payment,
  LocalAtm,
  ArrowBack,
  CheckCircle
} from '@mui/icons-material';
import Chip from '@mui/material/Chip';

const steps = ['Booking Details', 'Payment', 'Confirmation'];

const PaymentPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [activeStep, setActiveStep] = useState(0);
  const [paymentMethod, setPaymentMethod] = useState('creditCard');
  const [cardDetails, setCardDetails] = useState({
    number: '',
    name: '',
    expiry: '',
    cvv: ''
  });
  const [upiId, setUpiId] = useState('');
  const [walletSelected, setWalletSelected] = useState('paytm');
  const [isProcessing, setIsProcessing] = useState(false);

  // Get booking details from navigation state
  const bookingDetails = location.state?.bookingDetails || {
    busName: 'Volvo AC Sleeper',
    from: 'Bangalore',
    to: 'Chennai',
    departure: '2023-06-15T22:00:00',
    seats: ['A1', 'A2'],
    fare: 2400,
    boardingPoint: 'Majestic Bus Stand, Platform 3'
  };

  const handlePaymentMethodChange = (event) => {
    setPaymentMethod(event.target.value);
  };

  const handleCardChange = (e) => {
    const { name, value } = e.target;
    setCardDetails({ ...cardDetails, [name]: value });
  };

  const handleNext = () => {
    if (activeStep === steps.length - 1) {
      navigate('/my-bookings');
    } else {
      setActiveStep((prevActiveStep) => prevActiveStep + 1);
    }
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handlePaymentSubmit = () => {
    setIsProcessing(true);
    // Simulate payment processing
    setTimeout(() => {
      setIsProcessing(false);
      handleNext();
    }, 2000);
  };

  const formatDate = (dateString) => {
    const options = { day: 'numeric', month: 'short', year: 'numeric' };
    return new Date(dateString).toLocaleDateString('en-US', options);
  };

  const formatTime = (dateString) => {
    const options = { hour: '2-digit', minute: '2-digit' };
    return new Date(dateString).toLocaleTimeString('en-US', options);
  };

  const renderPaymentForm = () => {
    switch (paymentMethod) {
      case 'creditCard':
        return (
          <Box sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Card Number"
                  name="number"
                  value={cardDetails.number}
                  onChange={handleCardChange}
                  placeholder="1234 5678 9012 3456"
                  required
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Cardholder Name"
                  name="name"
                  value={cardDetails.name}
                  onChange={handleCardChange}
                  required
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  fullWidth
                  label="Expiry Date"
                  name="expiry"
                  value={cardDetails.expiry}
                  onChange={handleCardChange}
                  placeholder="MM/YY"
                  required
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  fullWidth
                  label="CVV"
                  name="cvv"
                  value={cardDetails.cvv}
                  onChange={handleCardChange}
                  type="password"
                  required
                />
              </Grid>
            </Grid>
          </Box>
        );
      case 'upi':
        return (
          <Box sx={{ mt: 3 }}>
            <TextField
              fullWidth
              label="UPI ID"
              value={upiId}
              onChange={(e) => setUpiId(e.target.value)}
              placeholder="username@upi"
              required
            />
            <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
              You'll be redirected to your UPI app for payment
            </Typography>
          </Box>
        );
      case 'netBanking':
        return (
          <Box sx={{ mt: 3 }}>
            <FormControl component="fieldset">
              <RadioGroup
                aria-label="bank"
                name="bank"
                value={walletSelected}
                onChange={(e) => setWalletSelected(e.target.value)}
              >
                <FormControlLabel
                  value="hdfc"
                  control={<Radio />}
                  label={
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                      <Avatar
                        src="/images/hdfc.png"
                        sx={{ width: 24, height: 24, mr: 1 }}
                      />
                      HDFC Bank
                    </Box>
                  }
                />
                <FormControlLabel
                  value="sbi"
                  control={<Radio />}
                  label={
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                      <Avatar
                        src="/images/sbi.png"
                        sx={{ width: 24, height: 24, mr: 1 }}
                      />
                      State Bank of India
                    </Box>
                  }
                />
                <FormControlLabel
                  value="icici"
                  control={<Radio />}
                  label={
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                      <Avatar
                        src="/images/icici.png"
                        sx={{ width: 24, height: 24, mr: 1 }}
                      />
                      ICICI Bank
                    </Box>
                  }
                />
              </RadioGroup>
            </FormControl>
          </Box>
        );
      case 'wallet':
        return (
          <Box sx={{ mt: 3 }}>
            <FormControl component="fieldset">
              <RadioGroup
                aria-label="wallet"
                name="wallet"
                value={walletSelected}
                onChange={(e) => setWalletSelected(e.target.value)}
              >
                <FormControlLabel
                  value="paytm"
                  control={<Radio />}
                  label={
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                      <Avatar
                        src="/images/paytm.png"
                        sx={{ width: 24, height: 24, mr: 1 }}
                      />
                      Paytm
                    </Box>
                  }
                />
                <FormControlLabel
                  value="phonepe"
                  control={<Radio />}
                  label={
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                      <Avatar
                        src="/images/phonepe.png"
                        sx={{ width: 24, height: 24, mr: 1 }}
                      />
                      PhonePe
                    </Box>
                  }
                />
                <FormControlLabel
                  value="amazonpay"
                  control={<Radio />}
                  label={
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                      <Avatar
                        src="/images/amazonpay.png"
                        sx={{ width: 24, height: 24, mr: 1 }}
                      />
                      Amazon Pay
                    </Box>
                  }
                />
              </RadioGroup>
            </FormControl>
          </Box>
        );
      default:
        return null;
    }
  };

  const renderStepContent = (step) => {
    switch (step) {
      case 0:
        return (
          <Box sx={{ mt: 3 }}>
            <Card variant="outlined" sx={{ mb: 3 }}>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  Booking Summary
                </Typography>
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={6}>
                    <Typography variant="body2" color="text.secondary">
                      Bus Name
                    </Typography>
                    <Typography variant="body1">{bookingDetails.busName}</Typography>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <Typography variant="body2" color="text.secondary">
                      Route
                    </Typography>
                    <Typography variant="body1">
                      {bookingDetails.from} → {bookingDetails.to}
                    </Typography>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <Typography variant="body2" color="text.secondary">
                      Departure
                    </Typography>
                    <Typography variant="body1">
                      {formatDate(bookingDetails.departure)} at{' '}
                      {formatTime(bookingDetails.departure)}
                    </Typography>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <Typography variant="body2" color="text.secondary">
                      Seats
                    </Typography>
                    <Box sx={{ display: 'flex', gap: 1 }}>
                      {bookingDetails.seats.map((seat) => (
                        <Chip key={seat} label={seat} size="small" />
                      ))}
                    </Box>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <Typography variant="body2" color="text.secondary">
                      Boarding Point
                    </Typography>
                    <Typography variant="body1">
                      {bookingDetails.boardingPoint}
                    </Typography>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <Typography variant="body2" color="text.secondary">
                      Total Fare
                    </Typography>
                    <Typography variant="h6">₹{bookingDetails.fare}</Typography>
                  </Grid>
                </Grid>
              </CardContent>
            </Card>
          </Box>
        );
      case 1:
        return (
          <Box sx={{ mt: 3 }}>
            <FormControl component="fieldset" fullWidth>
              <FormLabel component="legend">Select Payment Method</FormLabel>
              <RadioGroup
                aria-label="payment-method"
                name="payment-method"
                value={paymentMethod}
                onChange={handlePaymentMethodChange}
              >
                <Paper elevation={1} sx={{ p: 2, mb: 2, mt: 1 }}>
                  <FormControlLabel
                    value="creditCard"
                    control={<Radio />}
                    label={
                      <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <CreditCard sx={{ mr: 1 }} />
                        Credit/Debit Card
                      </Box>
                    }
                  />
                </Paper>
                <Paper elevation={1} sx={{ p: 2, mb: 2 }}>
                  <FormControlLabel
                    value="upi"
                    control={<Radio />}
                    label={
                      <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <Payment sx={{ mr: 1 }} />
                        UPI Payment
                      </Box>
                    }
                  />
                </Paper>
                <Paper elevation={1} sx={{ p: 2, mb: 2 }}>
                  <FormControlLabel
                    value="netBanking"
                    control={<Radio />}
                    label={
                      <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <AccountBalance sx={{ mr: 1 }} />
                        Net Banking
                      </Box>
                    }
                  />
                </Paper>
                <Paper elevation={1} sx={{ p: 2 }}>
                  <FormControlLabel
                    value="wallet"
                    control={<Radio />}
                    label={
                      <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <LocalAtm sx={{ mr: 1 }} />
                        Wallets
                      </Box>
                    }
                  />
                </Paper>
              </RadioGroup>
            </FormControl>

            {renderPaymentForm()}

            <Box sx={{ mt: 3, p: 2, backgroundColor: '#fffde7', borderRadius: 1 }}>
              <Typography variant="body2">
                <strong>Note:</strong> Your tickets will be issued only after successful payment.
              </Typography>
            </Box>
          </Box>
        );
      case 2:
        return (
          <Box sx={{ mt: 3, textAlign: 'center' }}>
            <CheckCircle sx={{ fontSize: 80, color: '#4caf50', mb: 2 }} />
            <Typography variant="h5" gutterBottom>
              Payment Successful!
            </Typography>
            <Typography variant="body1" gutterBottom>
              Your booking is confirmed. Booking ID: <strong>BKG{Math.floor(Math.random() * 1000000)}</strong>
            </Typography>
            <Typography variant="body1" sx={{ mb: 3 }}>
              Tickets have been sent to your registered email and mobile number.
            </Typography>
            <Button
              variant="contained"
              onClick={() => navigate('/my-bookings')}
              sx={{ mr: 2 }}
            >
              View Bookings
            </Button>
            <Button
              variant="outlined"
              onClick={() => navigate('/')}
            >
              Back to Home
            </Button>
          </Box>
        );
      default:
        return null;
    }
  };

  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
        <IconButton onClick={() => navigate(-1)} sx={{ mr: 2 }}>
          <ArrowBack />
        </IconButton>
        <Typography variant="h4" component="h1">
          Complete Your Payment
        </Typography>
      </Box>

      <Stepper activeStep={activeStep} alternativeLabel sx={{ mb: 4 }}>
        {steps.map((label) => (
          <Step key={label}>
            <StepLabel>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>

      <Paper elevation={3} sx={{ p: 3 }}>
        {renderStepContent(activeStep)}

        <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 4 }}>
          <Button
            disabled={activeStep === 0}
            onClick={handleBack}
            variant="outlined"
          >
            Back
          </Button>
          {activeStep === steps.length - 1 ? null : (
            <Button
              variant="contained"
              onClick={activeStep === 1 ? handlePaymentSubmit : handleNext}
              disabled={
                (activeStep === 1 && paymentMethod === 'creditCard' && 
                (!cardDetails.number || !cardDetails.name || !cardDetails.expiry || !cardDetails.cvv)) ||
                (activeStep === 1 && paymentMethod === 'upi' && !upiId) ||
                isProcessing
              }
              sx={{ backgroundColor: '#d84e55', '&:hover': { backgroundColor: '#c23a40' } }}
            >
              {isProcessing ? 'Processing...' : activeStep === 1 ? 'Pay Now' : 'Continue'}
            </Button>
          )}
        </Box>
      </Paper>

      {activeStep === 1 && (
        <Box sx={{ mt: 3, p: 2, backgroundColor: '#f5f5f5', borderRadius: 1 }}>
          <Typography variant="body2">
            <strong>Secure Payment:</strong> Your payment information is encrypted and secure.
          </Typography>
        </Box>
      )}
    </Container>
  );
};

export default PaymentPage;