/********************************************************************************
* WEB322 – Assignment 03
*
* I declare that this assignment is my own work in accordance with Seneca's
* Academic Integrity Policy:
*
* https://www.senecacollege.ca/about/policies/academic-integrity-policy.html
*
* Name: Harleen Singh
* Student ID: 116871229
* Date: October 15th, 2024
* Published URL: [Your Vercel URL here]
********************************************************************************/

const express = require('express');
const path = require('path');
const countryData = require('./modules/country-service');

const app = express();
const PORT = process.env.PORT || 3000;

// Serve static assets from the public folder
app.use(express.static(path.join(__dirname, 'public')));

// Initialize the country data before starting the server
countryData.initialize()
  .then(() => {
    console.log('Data Initialized');

    // Route: Home
    app.get('/', (req, res) => {
      res.sendFile(path.join(__dirname, 'views', 'home.html'));
    });

    // Route: About
    app.get('/about', (req, res) => {
      res.sendFile(path.join(__dirname, 'views', 'about.html'));
    });

    // Route: Get all countries (support region/subRegion query parameters)
    app.get('/countries', (req, res) => {
      const { region, subRegion } = req.query;

      if (region) {
        // Filter by region
        countryData.getCountriesByRegion(region)
          .then(countries => res.json(countries))
          .catch(err => res.status(500).send(err));
      } else if (subRegion) {
        // Filter by subRegion
        countryData.getCountriesBySubRegion(subRegion)
          .then(countries => res.json(countries))
          .catch(err => res.status(500).send(err));
      } else {
        // Return all countries
        countryData.getAllCountries()
          .then(countries => res.json(countries))
          .catch(err => res.status(500).send(err));
      }
    });

    // Route: Get country by ID
    app.get('/countries/:id', (req, res) => {
      const countryId = req.params.id;
      countryData.getCountryById(countryId)
        .then(country => res.json(country))
        .catch(err => res.status(404).send('Country not found'));
    });

    // Custom 404 page
    app.use((req, res) => {
      res.status(404).sendFile(path.join(__dirname, 'views', '404.html'));
    });

    // Start the server
    app.listen(PORT, () => {
      console.log(`Server running on http://localhost:${PORT}`);
    });
  })
  .catch(err => {
    console.error('Failed to initialize data:', err);
  });
