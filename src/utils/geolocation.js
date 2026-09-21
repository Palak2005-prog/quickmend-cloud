import { statesAndCities } from '../data/indiaLocations';

/**
 * Automatically detect user location using browser GPS Geolocation API
 * with reverse geocoding to match Indian State and City.
 */
export const detectUserLocation = async () => {
  if (!navigator.geolocation) {
    throw new Error('Geolocation is not supported by your browser');
  }

  return new Promise((resolve, reject) => {
    navigator.geolocation.getCurrentPosition(
      async (position) => {
        try {
          const { latitude, longitude } = position.coords;
          
          // Reverse geocode via OpenStreetMap Nominatim
          const response = await fetch(
            `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}&addressdetails=1`,
            {
              headers: {
                'Accept-Language': 'en-US,en;q=0.9'
              }
            }
          );

          if (!response.ok) {
            throw new Error('Failed to fetch location details');
          }

          const data = await response.json();
          const addr = data.address || {};

          // Extract candidate city and state names
          const detectedCity = addr.city || addr.town || addr.municipality || addr.district || addr.county || addr.suburb || addr.state_district || '';
          const detectedState = addr.state || '';
          const postcode = addr.postcode || '';
          const road = [addr.house_number, addr.road, addr.neighbourhood, addr.suburb].filter(Boolean).join(', ');

          // Match with our internal statesAndCities list
          let matchedState = null;
          let matchedCity = null;

          if (detectedState) {
            matchedState = statesAndCities.find(
              s => s.state.toLowerCase() === detectedState.toLowerCase() ||
                   detectedState.toLowerCase().includes(s.state.toLowerCase()) ||
                   s.state.toLowerCase().includes(detectedState.toLowerCase())
            );
          }

          if (matchedState && detectedCity) {
            matchedCity = matchedState.cities.find(
              c => c.toLowerCase() === detectedCity.toLowerCase() ||
                   detectedCity.toLowerCase().includes(c.toLowerCase()) ||
                   c.toLowerCase().includes(detectedCity.toLowerCase())
            );
          }

          // If city didn't match within state, try searching globally
          if (!matchedCity && detectedCity) {
            for (const s of statesAndCities) {
              const foundC = s.cities.find(
                c => c.toLowerCase() === detectedCity.toLowerCase() ||
                     detectedCity.toLowerCase().includes(c.toLowerCase()) ||
                     c.toLowerCase().includes(detectedCity.toLowerCase())
              );
              if (foundC) {
                matchedCity = foundC;
                if (!matchedState) matchedState = s;
                break;
              }
            }
          }

          const finalState = matchedState ? matchedState.state : (statesAndCities[0].state);
          const availableCities = matchedState ? matchedState.cities : statesAndCities[0].cities;
          const finalCity = matchedCity || availableCities[0];

          resolve({
            success: true,
            state: finalState,
            city: finalCity,
            citiesList: availableCities,
            pincode: postcode,
            road: road,
            rawLocationName: `${detectedCity || finalCity}, ${detectedState || finalState}`,
            latitude,
            longitude,
            formattedAddress: data.display_name || `${finalCity}, ${finalState}`
          });
        } catch (err) {
          console.warn('Reverse geocode error, falling back', err);
          // Return default state if reverse geocoding network fails
          resolve({
            success: true,
            state: statesAndCities[0].state,
            city: statesAndCities[0].cities[0],
            citiesList: statesAndCities[0].cities,
            rawLocationName: `${statesAndCities[0].cities[0]}, ${statesAndCities[0].state}`,
            latitude: position.coords.latitude,
            longitude: position.coords.longitude
          });
        }
      },
      (error) => {
        let msg = 'Unable to retrieve location';
        if (error.code === 1) msg = 'Location permission was denied. Please select your state and city manually.';
        else if (error.code === 2) msg = 'Location position unavailable. Please select your city manually.';
        else if (error.code === 3) msg = 'Location request timed out. Please try again.';
        reject(new Error(msg));
      },
      {
        timeout: 10000,
        enableHighAccuracy: true,
        maximumAge: 60000
      }
    );
  });
};
