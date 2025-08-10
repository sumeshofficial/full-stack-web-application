import MongoStore from 'connect-mongo';
import dotenv from 'dotenv';
dotenv.config();

export const userSessionStore = MongoStore.create({
  mongoUrl: process.env.MONGODB_URI,
  collectionName: 'userSessions'
});

export const adminSessionStore = MongoStore.create({
  mongoUrl: process.env.MONGODB_URI,
  collectionName: 'adminSessions'
});