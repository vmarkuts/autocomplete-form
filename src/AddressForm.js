import React, { useState } from 'react';
import PlacesAutocomplete, { geocodeByAddress, getLatLng } from 'react-places-autocomplete';

function AddressForm() {
  const [address, setAddress] = useState('');
  const [state, setState] = useState('');
  const [city, setCity] = useState('');
  const [zip, setZip] = useState('');

  const handleSelect = async (selectedAddress) => {
    try {
      const results = await geocodeByAddress(selectedAddress);
      const addressComponents = results[0].address_components;

      let newState = '';
      let newCity = '';
      let newZip = '';

      for (let i = 0; i < addressComponents.length; i++) {
        const component = addressComponents[i];
        const types = component.types;

        if (types.includes('administrative_area_level_1')) {
          newState = component.long_name;
        } else if (types.includes('locality')) {
          newCity = component.long_name;
        } else if (types.includes('postal_code')) {
          newZip = component.long_name;
        }
      }

      setAddress(selectedAddress);
      setState(newState);
      setCity(newCity);
      setZip(newZip);
    } catch (error) {
      console.error('Error selecting address:', error);
    }
  };

  return (
    <div>
      <PlacesAutocomplete
        value={address}
        onChange={setAddress}
        onSelect={handleSelect}
        searchOptions={{
        types: ['(regions)'],
        componentRestrictions: { country: 'us' },
        language: 'en',
  }}
      >
        {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
          <div>
            <input
              {...getInputProps({
                placeholder: 'Enter your address...',
              })}
            />
            <div>
              {loading ? <div>Loading...</div> : null}
              {suggestions.map((suggestion) => {
                const style = {
                  backgroundColor: suggestion.active ? '#41b6e6' : '#fff',
                };
                return (
                  <div
                    {...getSuggestionItemProps(suggestion, { style })}
                    key={suggestion.description}
                  >
                    {suggestion.description}
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </PlacesAutocomplete>

      <div>
        <label>State:</label>
        <input type="text" value={state} readOnly />
      </div>
      <div>
        <label>City:</label>
        <input type="text" value={city} readOnly />
      </div>
      <div>
        <label>Zip:</label>
        <input type="text" value={zip} readOnly />
      </div>
    </div>
  );
}

export default AddressForm;
