const express = require('express');
const { MercadoPagoConfig, Preference } = require('mercadopago');
const RCON = require('rcon');
const crypto = require('crypto');
const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./transacoes.db');
const ejs = require('ejs');
const path = require('path');

// Configura Express
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.set('views', path.join(__dirname, '../../../src/views'));
app.set('view engine', 'ejs');

// ... (todo o restante do código do server.js anterior)

// Netlify Function Handler
const handler = app;

module.exports.handler = async (event, context) => {
  const response = await new Promise((resolve) => {
    const req = {
      method: event.httpMethod,
      path: event.path,
      headers: event.headers,
      body: event.body
    };
    
    const res = {
      status: (code) => ({ 
        send: (body) => resolve({ statusCode: code, body }),
        json: (body) => resolve({ statusCode: code, body: JSON.stringify(body) })
      })
    };

    handler(req, res);
  });

  return response;
};