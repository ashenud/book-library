import Library from '../models/Library.js';

// Define each library with fixed coordinates
const libraries = [
  // Within 1 km
  { name: 'City Library', latitude: 6.8865, longitude: 79.9545 },
  { name: 'Neighborhood Library', latitude: 6.8845, longitude: 79.953 },

  // Within 1–10 km
  { name: 'Town Library', latitude: 6.935, longitude: 79.99 },
  { name: 'Village Library', latitude: 6.945, longitude: 80.01 },

  // Within 10–20 km
  { name: 'Central Library', latitude: 7.02, longitude: 80.06 },
  { name: 'District Library', latitude: 7.05, longitude: 80.08 },

  // Within 20–50 km
  { name: 'Local Library', latitude: 6.8, longitude: 80.2 },
  { name: 'Remote Library', latitude: 6.75, longitude: 80.15 },
  { name: 'Far Town Library', latitude: 6.7, longitude: 80.25 },
  { name: 'Far Village Library', latitude: 6.65, longitude: 80.3 },
];

export const seedLibrary = async () => {
  await Library.bulkCreate(libraries);

  console.log(`${libraries.length} libraries inserted successfully`);
};
