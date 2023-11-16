const express = require('express');
const cors = require('cors');

const { User } = require('./api');

module.exports = async(app) => {
    app.use(cors());
    app.use(express.json());

    User(app)
}