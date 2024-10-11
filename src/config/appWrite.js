// src/appwrite/config.js

import { Client, Account, Databases, Storage } from 'appwrite'

const client = new Client()
    .setEndpoint('https://cloud.appwrite.io/v1')
    .setProject('66bffcf800039d0c6f23')

export const account = new Account(client)
export const databases = new Databases(client)
export const storage = new Storage(client)
