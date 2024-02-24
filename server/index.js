const express = require("express");
const bodyParser = require('body-parser');
const { MongoClient } = require('mongodb');
const { faker } = require('@faker-js/faker');

// Initialize Express app
const app = express();
const port = process.env.PORT || 5000;

// Middleware
app.use(bodyParser.json());

const mongoUrl = 'mongodb+srv://20bcs106:UWYDO49L5k0wJt1i@cluster0.ukszr9q.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0';
const dbName = 'carstore';

// MongoDB client
const client = new MongoClient(mongoUrl, { useNewUrlParser: true, useUnifiedTopology: true });

// Connect to MongoDB
client.connect()
  .then(() => {
    console.log('Connected to MongoDB');

    // Routes
    // ... (Define your routes here)

    // Start the server
    app.listen(port, () => {
      console.log(`Server is running on port http://localhost:${port}`);
    });

  })
  .catch((err) => {
    console.error('Error connecting to MongoDB', err);
  });

  function generateRandomListOfIds() {
    const numberOfIds = faker.number.int({ min: 1, max: 5 });
    return Array.from({ length: numberOfIds }, () => faker.string.uuid());
  }

 function createRandomUser() {
  const randomData = {
    // Admin data
    admin_id: faker.string.uuid(),
    password: faker.internet.password(),

    // User data
    user_email: faker.internet.email(),
    user_id: faker.string.uuid(),
    user_location: faker.location.buildingNumber(),
    user_info: {
      // You can customize user_info fields based on your requirements
      bio: faker.lorem.sentence(),
      age: faker.number.int({ min: 18, max: 80 }) ,
    },
    password_hash: faker.internet.password(),
    vehicle_info: "none",

    // Dealership data
    dealership_email: faker.internet.email(),
    dealership_id: faker.string.uuid(),
    dealership_name: faker.commerce.department() ,
    dealership_location: faker.location.buildingNumber(),
    dealership_info: {
      // You can customize dealership_info fields based on your requirements
      established_year: faker.date.past().getFullYear(),
      rating: faker.number.int({ min: 0, max: 10 }),
    },
    cars: generateRandomListOfIds(),
    deals: generateRandomListOfIds(),
    sold_vehicles: generateRandomListOfIds(),

    // Deal data
    deal_id: faker.string.uuid(),
    car_id: faker.string.uuid(),
    deal_info: {
      // You can customize deal_info fields based on your requirements
      price: faker.number.int({ min: 100000, max: 1000000 }),
      date: faker.date.past(),
    },

    // Car data
    car_id: faker.string.uuid(),
    type: faker.word.words(),
    name: faker.vehicle.vehicle(),
    model: faker.vehicle.model(),
    car_info: {
      // You can customize car_info fields based on your requirements
      color: faker.color.cmyk(),
      year: faker.date.past().getFullYear(),
    },

    // Sold Vehicles data
    vehicle_id: faker.string.uuid(),
    sold_vehicle_info: {
      // You can customize sold_vehicle_info fields based on your requirements
      // buyer_name: faker.name.findName(),
      sale_date: faker.date.past(),
    },
  };
    return randomData;
  }

  const USERS = faker.helpers.multiple(createRandomUser, {
    count: 1,
  });


// Example route for generating dummy data with Faker.js
app.get('/generateDummyData', async (req, res) => {
  try {
    const db = client.db(dbName);
    
  

    // Generate dummy data and insert into the database
    // ... (Use Faker.js to generate data and MongoDB to insert it)

    res.status(200).json({ message: 'Dummy data generated successfully' });
  } catch (error) {
    console.error('Error generating dummy data', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Close MongoDB connection on process exit
process.on('exit', () => {
  client.close();
  console.log('MongoDB connection closed');
});
