require('dotenv').config();

const { Router } = require('express');
const jwt = require('jsonwebtoken');
const db = require('../db');
const router = Router();
const rq = require('request')
const { authenticateToken } = require('../midelwer');