const countryData = require('../data/countryData');
const subRegionData = require('../data/subRegionData');

let countries = [];

// Initialize the countries array with subRegion data
function initialize() {
  return new Promise((resolve, reject) => {
    try {
      countryData.forEach(country => {
        const subRegionObj = subRegionData.find(sub => sub.id === country.subRegionId);
        countries.push({
          ...country,
          subRegionObj
        });
      });
      resolve();
    } catch (err) {
      reject('Error initializing countries');
    }
  });
}

// Return all countries
function getAllCountries() {
  return new Promise((resolve, reject) => {
    if (countries.length > 0) {
      resolve(countries);
    } else {
      reject('No countries found');
    }
  });
}

// Return country by ID
function getCountryById(id) {
  return new Promise((resolve, reject) => {
    const country = countries.find(c => c.id === id);
    if (country) {
      resolve(country);
    } else {
      reject('Country not found');
    }
  });
}

// Return countries by subRegion
function getCountriesBySubRegion(subRegion) {
  return new Promise((resolve, reject) => {
    const filteredCountries = countries.filter(c => 
      c.subRegionObj.subRegion.toLowerCase().includes(subRegion.toLowerCase())
    );
    if (filteredCountries.length > 0) {
      resolve(filteredCountries);
    } else {
      reject('No countries found for the sub-region');
    }
  });
}

// Return countries by region
function getCountriesByRegion(region) {
  return new Promise((resolve, reject) => {
    const filteredCountries = countries.filter(c => 
      c.subRegionObj.region.toLowerCase().includes(region.toLowerCase())
    );
    if (filteredCountries.length > 0) {
      resolve(filteredCountries);
    } else {
      reject('No countries found for the region');
    }
  });
}

module.exports = { initialize, getAllCountries, getCountryById, getCountriesBySubRegion, getCountriesByRegion };
