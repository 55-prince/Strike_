// backend/scripts/migrateTags.js
require('dotenv').config();
const mongoose = require('mongoose');
const Problem = require('./models/problem'); // adjust path to your actual model file
 // if you store your Mongo URI in .env


async function migrateTags() {
    try {
        await mongoose.connect(process.env.DB_CONNECT_STRING); // or your actual connection string
        console.log('Connected to DB');

        const result = await Problem.updateMany(
            { tags: { $type: 'string' } },
            [{ $set: { tags: ['$tags'] } }]
        );

        console.log(`Matched: ${result.matchedCount}, Modified: ${result.modifiedCount}`);
    } catch (err) {
        console.error('Migration failed:', err);
    } finally {
        await mongoose.disconnect();
        console.log('Disconnected');
    }
}

migrateTags();