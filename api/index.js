const express = require("express");
const axios = require("axios");
require('dotenv').config();

const app = express();

app.use(express.json());

app.get("/", async (req, res) => {
    const searchQuery = req.query.search;
    
    let Url = process.env.API_URL;

    if (searchQuery) {
        Url += `/?search=${searchQuery}`;
    } 

    try {
        const response = await axios.get(Url);
        res.json(response.data);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.get("/:id", async (req, res) => {
    const id = req.params.id;
    const Url = process.env.API_URL;
    const apiUrl = `${Url}/${id}`;
    
    try {
        const response = await axios.get(apiUrl);
        res.json(response.data);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => console.log(`Server ready on port ${PORT}.`));
