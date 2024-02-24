// Schemas

// Admin Schema
const adminSchema = {
    admin_id: { type: String, required: true },
    password: { type: String, required: true },
  };
  
  // User Schema
  const userSchema = {
    user_email: { type: String, required: true },
    user_id: { type: String, default: () => Math.random().toString(36).substring(2), required: true },
    user_location: String,
    user_info: { type: Object }, // Adjust the type based on your needs
    password: { type: String, required: true },
    vehicle_info: { type: Array }, // Assuming list_of_id is an array of some type
  };
  
  // Dealership Schema
  const dealershipSchema = {
    dealership_email: { type: String, required: true },
    dealership_id: { type: String, default: () => Math.random().toString(36).substring(2), required: true },
    dealership_name: String,
    dealership_location: String,
    password: { type: String, required: true },
    dealership_info: { type: Object }, // Adjust the type based on your needs
    cars: { type: Array },
    deals: { type: Array },
    sold_vehicles: { type: Array },
  };
  
  // Deal Schema
  const dealSchema = {
    deal_id: { type: String, default: () => Math.random().toString(36).substring(2), required: true },
    car_id: { type: String, required: true },
    deal_info: { type: Object }, // Adjust the type based on your needs
  };
  
  // Cars Schema
  const carsSchema = {
    car_id: { type: String, default: () => Math.random().toString(36).substring(2), required: true },
    type: String,
    name: String,
    model: String,
    car_info: { type: Object }, // Adjust the type based on your needs
  };
  
  // Sold Vehicles Schema
  const soldVehiclesSchema = {
    vehicle_id: { type: String, default: () => Math.random().toString(36).substring(2), required: true },
    car_id: { type: String, required: true },
    vehicle_info: { type: Object }, // Adjust the type based on your needs
  };

  module.exports = { adminSchema, userSchema, dealershipSchema, dealSchema, carsSchema, soldVehiclesSchema };