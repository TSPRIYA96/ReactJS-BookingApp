import React, { useState } from 'react';
import { 
  Container, 
  Typography, 
  Button, 
  Box, 
  Grid, 
  TextField,
  Card,
  CardContent,
  Divider,
  Link
} from '@mui/material';
import { Email, Phone, LocationOn } from '@mui/icons-material';
import Header from '../components/Header';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // In a real app, this would send the form data to your backend
    alert('Thank you for your message! We will get back to you soon.');
    setFormData({
      name: '',
      email: '',
      phone: '',
      message: ''
    });
  };

  return (
    <div>
      <Header />
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Typography variant="h3" align="center" gutterBottom sx={{ fontWeight: 'bold', mb: 4 }}>
          Contact Us
        </Typography>
        
        <Grid container spacing={4}>
          {/* Contact Form */}
          <Grid item xs={12} md={6}>
            <Card sx={{ boxShadow: 3 }}>
              <CardContent sx={{ p: 4 }}>
                <Typography variant="h5" gutterBottom sx={{ fontWeight: 'bold' }}>
                  Send us a message
                </Typography>
                <form onSubmit={handleSubmit}>
                  <Grid container spacing={2}>
                    <Grid item xs={12}>
                      <TextField
                        fullWidth
                        label="Your Name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <TextField
                        fullWidth
                        label="Email Address"
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <TextField
                        fullWidth
                        label="Phone Number"
                        name="phone"
                        type="tel"
                        value={formData.phone}
                        onChange={handleChange}
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <TextField
                        fullWidth
                        label="Your Message"
                        name="message"
                        multiline
                        rows={4}
                        value={formData.message}
                        onChange={handleChange}
                        required
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <Button 
                        type="submit" 
                        variant="contained" 
                        color="primary"
                        size="large"
                        fullWidth
                      >
                        Send Message
                      </Button>
                    </Grid>
                  </Grid>
                </form>
              </CardContent>
            </Card>
          </Grid>

          {/* Contact Information */}
          <Grid item xs={12} md={6}>
            <Card sx={{ boxShadow: 3, height: '100%' }}>
              <CardContent sx={{ p: 4 }}>
                <Typography variant="h5" gutterBottom sx={{ fontWeight: 'bold' }}>
                  Contact Information
                </Typography>
                <Typography variant="body1" paragraph>
                  Have questions or need assistance? We're here to help! Reach out to us through any of the following channels.
                </Typography>
                
                <Box sx={{ my: 3 }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                    <Email color="primary" sx={{ mr: 2 }} />
                    <Typography variant="body1">
                      <Link href="mailto:support@busticketbooking.com" underline="hover">
                        support@busticketbooking.com
                      </Link>
                    </Typography>
                  </Box>
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                    <Phone color="primary" sx={{ mr: 2 }} />
                    <Typography variant="body1">
                      <Link href="tel:+18005551234" underline="hover">
                        +1 (800) 555-1234
                      </Link>
                    </Typography>
                  </Box>
                  <Box sx={{ display: 'flex', alignItems: 'flex-start', mb: 2 }}>
                    <LocationOn color="primary" sx={{ mr: 2, mt: 0.5 }} />
                    <Typography variant="body1">
                      123 Bus Terminal Road<br />
                      Cityville, State 12345<br />
                      Country
                    </Typography>
                  </Box>
                </Box>

                <Divider sx={{ my: 3 }} />

                <Typography variant="h6" gutterBottom sx={{ fontWeight: 'bold' }}>
                  Customer Support Hours
                </Typography>
                <Typography variant="body1" paragraph>
                  Monday - Friday: 8:00 AM - 8:00 PM<br />
                  Saturday - Sunday: 9:00 AM - 6:00 PM
                </Typography>

                <Typography variant="h6" gutterBottom sx={{ fontWeight: 'bold', mt: 3 }}>
                  Follow Us
                </Typography>
                <Box sx={{ display: 'flex', gap: 2 }}>
                  <Button variant="outlined" color="primary">
                    Facebook
                  </Button>
                  <Button variant="outlined" color="primary">
                    Twitter
                  </Button>
                  <Button variant="outlined" color="primary">
                    Instagram
                  </Button>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        </Grid>

        {/* FAQ Section */}
        <Box sx={{ mt: 6 }}>
          <Typography variant="h4" align="center" gutterBottom sx={{ fontWeight: 'bold', mb: 3 }}>
            Frequently Asked Questions
          </Typography>
          <Grid container spacing={3}>
            {[
              {
                question: "How do I book a bus ticket?",
                answer: "You can book tickets through our website or mobile app by selecting your route, date, and preferred bus."
              },
              {
                question: "What payment methods do you accept?",
                answer: "We accept credit/debit cards, net banking, UPI, and various digital wallets."
              },
              {
                question: "Can I cancel my ticket?",
                answer: "Yes, tickets can be cancelled through your account dashboard. Cancellation charges may apply."
              },
              {
                question: "How do I track my bus?",
                answer: "After booking, you'll receive real-time tracking information via SMS and in your account."
              },
              {
                question: "What if I miss my bus?",
                answer: "Please contact our customer support immediately for assistance with alternative options."
              },
              {
                question: "Are there discounts for senior citizens?",
                answer: "Yes, we offer special discounts for senior citizens. Please select the appropriate option when booking."
              }
            ].map((faq, index) => (
              <Grid item xs={12} sm={6} key={index}>
                <Card sx={{ boxShadow: 2 }}>
                  <CardContent>
                    <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 1 }}>
                      {faq.question}
                    </Typography>
                    <Typography variant="body1">
                      {faq.answer}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Box>
      </Container>
    </div>
  );
};

export default Contact;