'use strict';

const sqlite = require('sqlite3').verbose();

// open the database
const db = new sqlite.Database('meme.db', (err) => {
  if (err) throw err;
});

module.exports = { db } ;
