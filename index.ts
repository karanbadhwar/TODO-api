// const express = require('express');
import express, { Express } from 'express';
import dotenv from 'dotenv';
import { DataSource } from 'typeorm';
import cors from 'cors';
import bodyParser from 'body-parser';
import { Task } from './src/tasks/tasks.entity';
import { tasksRouter } from './src/tasks/tasks.router';

// Instantiate express app
const app: Express = express();
dotenv.config();

//Parsing incoming request
app.use(bodyParser.json());

//Use CORS install types as well
app.use(cors());

// Create Databse Connection
export const AppDataSource = new DataSource({
  type: 'postgres',
  host: 'dpg-cfemfuen6mpu0ue5268g-a',
  port: 5432,
  username: process.env.PG_RENDER_USER,
  password: process.env.PG_RENDER_PASSWORD,
  database: process.env.PG_RENDER_DB,
  entities: [Task],
  synchronize: true,
  logging: true,
});

//Define Server Port
const port = process.env.PORT;

AppDataSource.initialize()
  .then(() => {
    // Start listening Request on defined port
    app.listen(port);
    console.log('Data Source has been initialized');
  })
  .catch((err) => console.log(err));

//create a Route
app.use('/', tasksRouter);
