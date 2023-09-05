const { MongoClient } = require("mongodb");

// Connection URL
const url = "mongodb://localhost:27017"; // Default MongoDB URL

// Create a new MongoClient
const client = new MongoClient(url);

// Connect to the MongoDB server
async function connectToDB() {
    try {
        // Connect to the server
        await client.connect();

        console.log("Connected to MongoDB");

        // Access a database
        const db = client.db("");

        return db; // Return the database object for use in other parts of your application

    } catch (error) {
        console.error("Error connecting to MongoDB:", error);
    }
}

module.exports = connectToDB; // Export the connectToDB function
