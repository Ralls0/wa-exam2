"use strict";
/* Data Access Object (DAO) module for accessing courses and exams */

const { db } = require("./db");

// get all memes
exports.listMemes = () => {
  return new Promise((resolve, reject) => {
    const sql =
      "SELECT m.id, m.title, m.texttop, m.textcenter, m.textbottom, m.img, m.private, u.name AS user, m.copy, f.family AS font, m.color FROM memes m, users u, fonts f WHERE m.user = u.id AND m.font = f.id";
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
        privat: e.private,
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
    const sql =
      "SELECT m.id, m.title, m.texttop, m.textcenter, m.textbottom, m.img, m.private, u.name AS user, m.copy, f.family AS font, m.color FROM memes m, users u, fonts f WHERE m.user = u.id AND m.font = f.id AND m.private = 0";
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

// get all fonts
exports.getFonts = () => {
  return new Promise((resolve, reject) => {
    const sql = "SELECT * FROM fonts";
    db.all(sql, [], (err, rows) => {
      if (err) {
        reject(err);
        return;
      }
      const fonts = rows.map((e) => ({
        id: e.id,
        font: e.family,
      }));
      resolve(fonts);
    });
  });
};

// add a new meme
exports.createMeme = (meme) => {
  return new Promise((resolve, reject) => {
    const sql =
      "INSERT INTO memes(title, texttop, textcenter, textbottom, img, private, user, copy, font, color) VALUES(?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";
    db.run(
      sql,
      [
        meme.title,
        meme.texttop,
        meme.textcenter,
        meme.textbottom,
        meme.img,
        meme.privat,
        meme.user,
        meme.copy,
        meme.font,
        meme.color,
      ],
      function (err) {
        if (err) {
          reject(err);
          return;
        }
        resolve(this.lastID);
      }
    );
  });
};

// update an existing meme
exports.updateMeme = (meme) => {
  return new Promise((resolve, reject) => {
    const sql =
      "UPDATE exam SET title=?, texttop=?, textcenter=?, textbottom=?, private=?, font=?, color WHERE id = ?";
    db.run(
      sql,
      [
        meme.title,
        meme.texttop,
        meme.textcenter,
        meme.textbottom,
        meme.privat,
        meme.font,
        meme.color,
        meme.id,
      ],
      function (err) {
        if (err) {
          reject(err);
          return;
        }
        resolve(this.lastID);
      }
    );
  });
};
