import dotenv from 'dotenv';
dotenv.config();

import { db } from './db/index.mjs';

import express from 'express';
//const morgan = require("morgan");
const app = express();
app.use(express.json())

//Get all restaurants
app.get("/api/v1/restaurants", async (req, res) => {
    const result = await db.query("SELECT * FROM restaurants")
    console.log(result)
    res.status(200).json({
        status: "success",
        data: {
            restaurant: ["M", "Wendys"]
        },
    });
});

//Get individual restaurant
app.get("/api/v1/restaurants/:id", (req,res) => {
    console.log(req.params);

    res.status(200).json({
        status: "success",
        data: {
            restaurant: "MC"
        }
    });
});

//Create a restaurant
app.post("/api/v1/restaurants", (req, res) => {
    console.log(req.body);

    res.status(201).json({
        status: "success",
        data: {
            restaurant: "MC"
        }
    });
})

//Update a restaurant
app.put("/api/v1/restaurants/:id", (req, res) => {
    console.log(req.body);
    console.log(req.params);
    res.status(200).json({
        status: "success",
        data: {
            restaurant: "MC"
        }
    });
})

//Delete a restaurant
app.delete("/api/v1/restaurants/:id", (req, res,) => {
    res.status(204).json({
        status: "success"
    });
});


const port = process.env.PORT || 3001;
app.listen(port, () => {
    console.log(`Server is up and listening on port ${port}`);
});




