import { createContext, useContext } from 'react';
import { propertyType, subPropertyType, cities} from '../data/dummyData';
import { samplePropertyListings } from '../data/Propertydata';

const PropertyContext = createContext();

const properties = samplePropertyListings;

const featuredProperties = properties.slice(0,6);

export const usePropertyContext = () => {
  const context = useContext(PropertyContext);
  
  if (!context) {
    throw new Error('usePropertyContext must be used within a PropertyProvider');
  }
  return context;
};

export const PropertyProvider = ({ children }) => {
  
  // Simulated API functions
  const getAllProperties = () => properties;
  const getFeaturedProperties = () => featuredProperties;
  const getPropertyById = (id) => properties.find(prop => prop.id === id);
  const getAllCities = () => cities;
  // const getAllStates = () => states;
  const getAllPropertyTypes = () => propertyType;
  const getAllSubPropertyTypes = () => subPropertyType;
  // const getPropertiesByState = (state) => properties.filter(prop => prop.state === state);
  const getPropertiesByCity = (city) => properties.filter(prop => prop.city === city);
  
  
  const value = {
    getAllProperties,
    getAllPropertyTypes,
    getAllSubPropertyTypes,
    getFeaturedProperties,
    getPropertyById,
    getPropertiesByCity,
    getAllCities
    // getAllStates,
    // getPropertiesByState,
  };

  return (
    <PropertyContext.Provider value={value}>
      {children}
    </PropertyContext.Provider>
  );
};