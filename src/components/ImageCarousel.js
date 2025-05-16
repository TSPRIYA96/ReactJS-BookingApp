import React from 'react';
import { Carousel } from 'react-responsive-carousel';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Box } from '@mui/material';

const images = [
  { id: 1, url: 'https://via.placeholder.com/1200x400?text=Bus+Image+1', alt: 'Bus 1' },
  { id: 2, url: 'https://via.placeholder.com/1200x400?text=Bus+Image+2', alt: 'Bus 2' },
  { id: 3, url: 'https://via.placeholder.com/1200x400?text=Bus+Image+3', alt: 'Bus 3' },
];

const ImageCarousel = () => {
  return (
    <Box sx={{ maxWidth: '100%', mx: 'auto' }}>
      <Carousel 
        autoPlay 
        infiniteLoop 
        showThumbs={false} 
        showStatus={false}
        interval={3000}
      >
        {images.map((image) => (
          <div key={image.id}>
            <img 
              src={image.url} 
              alt={image.alt} 
              style={{ 
                width: '100%', 
                height: '400px', 
                objectFit: 'cover' 
              }} 
            />
          </div>
        ))}
      </Carousel>
    </Box>
  );
};

export default ImageCarousel;