"use strict";
/* Data Access Object (DAO) module for accessing courses and exams */

const { db } = require("./db");

// get all memes
exports.listMemes = () => {
  return new Promise((resolve, reject) => {
    const sql =
      "SELECT m.id, m.title, m.text1, m.text2, m.text3, m.img, m.private, m.user AS userID, u.name AS user, m.copy, f.family AS font, f.size, m.color FROM memes m, users u, fonts f WHERE m.user = u.id AND m.font = f.id";
    db.all(sql, [], (err, rows) => {
      if (err) {
        reject(err);
        return;
      }
      const memes = rows.map((e) => ({
        id: e.id,
        title: e.title,
        text1: e.text1,
        text2: e.text2,
        text3: e.text3,
        img: e.img,
        privat: e.private,
        userID: e.userID,
        user: e.user,
        copy: e.copy,
        font: e.font,
        size: e.size,
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
      "SELECT m.id, m.title, m.text1, m.text2, m.text3, m.img, m.private, m.user AS userID, u.name AS user, m.copy, f.family AS font, f.size, m.color FROM memes m, users u, fonts f WHERE m.user = u.id AND m.font = f.id AND m.private = 0";
    db.all(sql, [], (err, rows) => {
      if (err) {
        reject(err);
        return;
      }
      const memes = rows.map((e) => ({
        id: e.id,
        title: e.title,
        text1: e.text1,
        text2: e.text2,
        text3: e.text3,
        img: e.img,
        privat: e.private,
        userID: e.userID,
        user: e.user,
        copy: e.copy,
        font: e.font,
        size: e.size,
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
          id: e.id,
          tl: e.tl,
          tc: e.tc,
          tr: e.tr,
          ml: e.ml,
          mc: e.mc,
          mr: e.mr,
          bl: e.bl,
          bc: e.bc,
          br: e.br,
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
        tl: e.tl,
        tc: e.tc,
        tr: e.tr,
        ml: e.ml,
        mc: e.mc,
        mr: e.mr,
        bl: e.bl,
        bc: e.bc,
        br: e.br,
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
        size: e.size,
      }));
      resolve(fonts);
    });
  });
};

// add a new meme
exports.createMeme = (meme) => {
  return new Promise((resolve, reject) => {
    const sql =
      "INSERT INTO memes(title, text1, text2, text3, img, private, user, copy, font, color) VALUES(?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";
    db.run(
      sql,
      [
        meme.title,
        meme.text1,
        meme.text2,
        meme.text3,
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

// delete an existing meme
exports.deleteMeme = (memeId, userId) => {
  return new Promise((resolve, reject) => {
    const sql = 'DELETE FROM memes WHERE id = ? AND user = ?';
    db.run(sql, [memeId, userId], (err) => {
      if (err) {
        reject(err);
        return;
      } else
        resolve(null);
    });
  });
}
