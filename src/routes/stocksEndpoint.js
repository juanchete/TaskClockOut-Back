// src/routes/endpoint1.js
const express = require('express');
const router = express.Router();
const axios = require('axios');

// Define the endpoint logic
router.get('/:nombre/:fecha', async (req, res) => {
    try {
      const { nombre, fecha } = req.params;
      const adjusted = req.query.adjusted || 'defaultAdjustedValue';
  
      if (!nombre || !fecha) {
        return res.status(400).json({ error: 'Invalid input parameters' });
      }

      // Construir la URL con los parámetros
      const apiUrl = `https://api.polygon.io/v1/open-close/${nombre}/${fecha}?adjusted=${adjusted}&apiKey=${process.env.API_KEY}`;
  
      // Hacer una llamada a la API externa
      const response = await axios.get(apiUrl);
  
      // Responder con los datos de la API externa
      res.status(200).json({
        message: 'Successs',
        params: { nombre, fecha, adjusted },
        externalData: response.data,
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });
router.get('/watchlist', async (req, res) => {
    try {
        const adjusted = req.query.adjusted || 'false';
        const date = req.query.date || 'false';
    
        // Validate input
    if (!adjusted || !date) {
      return res.status(400).json({ error: 'Invalid input parameters' });
    }

        const companies = [
          { shortName: 'SPOT', longName: 'Spotify', imageURL: 'https://play-lh.googleusercontent.com/cShys-AmJ93dB0SV8kE6Fl5eSaf4-qMMZdwEDKI5VEmKAXfzOqbiaeAsqqrEBCTdIEs' },
          { shortName: 'AAPL', longName: 'Apple', imageURL: "https://media.designrush.com/inspiration_images/134802/conversions/_1511456315_653_apple-mobile.jpg" },
          { shortName: 'ADBE', longName: 'Adobe', imageURL: "https://seeklogo.com/images/A/adobe-logo-EB46CA63ED-seeklogo.com.png" },
          { shortName: 'LYFT', longName: 'Lyft', imageURL: "https://play-lh.googleusercontent.com/ACQqLgO-aRSvB-t4TOPtJBjH-KdUA3BUpcrk1LQv5CPrxtL0JaQKeCL1AhygE4kHqg" },
        ];
    
        const data = await Promise.all(
          companies.map(async (stock) => {
            const apiUrl = `https://api.polygon.io/v1/open-close/${stock.shortName}/${date}?adjusted=${adjusted}&apiKey=${process.env.API_KEY}`;
            const response = await axios.get(apiUrl);
    
            return {
              shortName: stock.shortName,
              name: stock.longName,
              close: response.data.close.toFixed(2),
              difference: response.data.close - response.data.open,
              percentage: ((response.data.close - response.data.open) / response.data.open) * 100,
              imageURL: stock.imageURL,
            };
          })
        );
    
        // Responder con los datos de la API externa
        res.status(200).json({
          message: 'Watchlist Success',
          params: { date, adjusted },
          data: data,
        });
      } catch (error) {
        console.error( error);
        res.status(500).json({ error: 'Internal Server Error' });
      }
  });
// Export the router
module.exports = router;