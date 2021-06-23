"use strict";
/* Data Access Object (DAO) module for accessing courses and exams */

const { db } = require("./db");

// get all memes
exports.listMemes = () => {
  return new Promise((resolve, reject) => {
    const sql = "SELECT * FROM memes";
    db.all(sql, [], (err, rows) => {
      if (err) {
        reject(err);
        return;
      }
      const memes = rows.map((e) => ({
        id: e.id,
        title: e.title,
        texttop: e.texttop,
        textcenter: e.textcenter,
        textbottom: e.textbottom,
        img: e.img,
        private: e.private,
        user: e.user,
        copy: e.copy,
        font: e.font,
        color: e.color,
      }));
      resolve(memes);
    });
  });
};

// get all public memes
exports.listPublicMemes = () => {
  return new Promise((resolve, reject) => {
    const sql = "SELECT * FROM memes WHERE private = 0";
    db.all(sql, [], (err, rows) => {
      if (err) {
        reject(err);
        return;
      }
      const memes = rows.map((e) => ({
        id: e.id,
        title: e.title,
        texttop: e.texttop,
        textcenter: e.textcenter,
        textbottom: e.textbottom,
        img: e.img,
        private: e.private,
        user: e.user,
        copy: e.copy,
        font: e.font,
        color: e.color,
      }));
      resolve(memes);
    });
  });
};

// get the image identified by {id}
exports.getImage = (id) => {
  return new Promise((resolve, reject) => {
    const sql = "SELECT path FROM images WHERE id = ?";
    db.get(sql, [id], (err, row) => {
      if (err) {
        reject(err);
        return;
      }
      if (row == undefined) {
        resolve({ error: "Image not found." });
      } else {
        const img = { path: row.path };
        resolve(img);
      }
    });
  });
};

// get the image info identified by {id}
exports.getImageInfo = (id) => {
  return new Promise((resolve, reject) => {
    const sql = "SELECT * FROM images WHERE id = ?";
    db.get(sql, [id], (err, row) => {
      if (err) {
        reject(err);
        return;
      }
      if (row == undefined) {
        resolve({ error: "Image not found." });
      } else {
        const img = {
          id: row.id,
          top: row.top,
          center: row.center,
          bottom: row.bottom,
        };
        resolve(img);
      }
    });
  });
};

// get the info of all image
exports.getImagesInfo = () => {
  return new Promise((resolve, reject) => {
    const sql = "SELECT * FROM images";
    db.all(sql, [], (err, rows) => {
      if (err) {
        reject(err);
        return;
      }
      const images = rows.map((e) => ({
        id: e.id,
        top: e.top,
        center: e.center,
        bottom: e.bottom,
      }));
      resolve(images);
    });
  });
};
