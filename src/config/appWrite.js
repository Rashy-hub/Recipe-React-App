// src/appwrite/config.js

import { Client, Account, Databases, Storage } from 'appwrite'

// Initialize the Appwrite client
const client = new Client()
    .setEndpoint('https://cloud.appwrite.io/v1') // Appwrite endpoint
    .setProject('66bffcf800039d0c6f23') // Your Appwrite project ID

// Initialize Appwrite services
export const account = new Account(client)
export const databases = new Databases(client)
export const storage = new Storage(client)
// Optionally, you can export more services like storage, functions, etc.
// export const storage = new Storage(client);
// export const functions = new Functions(client);
