import Meme from "./components/models/memes/memes";
import Img from "./components/models/imgs/imgs";

const BASEURL = "/api";

async function getAllMemes() {
  // call: GET /api/memes
  const response = await fetch(BASEURL + "/memes");
  const memesJson = await response.json();
  if (response.ok) {
    return memesJson.map((meme) => Meme.from(meme));
  } else {
    throw memesJson; // an object with the error coming from the server
  }
}

async function getFonts() {
  // call: GET /api/fonts
  const response = await fetch(BASEURL + "/fonts");
  const fontsJson = await response.json();
  if (response.ok) {
    return fontsJson;
  } else {
    throw fontsJson; // an object with the error coming from the server
  }
}

async function getPublicMemes() {
  // call: GET /api/memes/public
  const response = await fetch(BASEURL + "/memes/public");
  const memesJson = await response.json();
  if (response.ok) {
    return memesJson.map((meme) => Meme.from(meme));
  } else {
    throw memesJson; // an object with the error coming from the server
  }
}

async function getInfoImages() {
  // call: GET /api/info/imgs/
  const response = await fetch(BASEURL + "/info/imgs/");
  const imgsJson = await response.json();
  if (response.ok) {
    for (let img of imgsJson) {
      img["img"] = await getImage(img.id).catch((err) => {
        throw err;
      });
    }

    return imgsJson.map((img) => Img.from(img));
  } else {
    throw imgsJson; // an object with the error coming from the server
  }
}

async function getImage(id) {
  // call: GET /api/img/:id
  const response = await fetch(BASEURL + `/imgs/${id}`);
  const imgJson = await response.blob();
  if (response.ok) {
    return URL.createObjectURL(imgJson);
  } else {
    throw imgJson; // an object with the error coming from the server
  }
}

function addMeme(meme) {
  // call: POST /api/memes
  return new Promise((resolve, reject) => {
    fetch(BASEURL + "/memes", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title: meme.title,
        texttop: meme.texttop,
        textcenter: meme.textcenter,
        textbottom: meme.textbottom,
        img: meme.img,
        privat: meme.privat,
        user: meme.user,
        copy: meme.copy,
        font: meme.font,
        color: meme.color,
      }),
    })
      .then((response) => {
        if (response.ok) {
          resolve(null);
        } else {
          // analyze the cause of error
          response
            .json()
            .then((message) => {
              reject(message);
            }) // error message in the response body
            .catch(() => {
              reject({ error: "Cannot parse server response." });
            });
        }
      })
      .catch(() => {
        reject({ error: "Cannot communicate with the server." });
      }); // connection errors
  });
}

function updateMeme(meme) {
  // call: PUT /api/memes/:id
  return new Promise((resolve, reject) => {
    fetch(BASEURL + "/memes/" + meme.id, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id: meme.id,
        title: meme.title,
        texttop: meme.texttop,
        textcenter: meme.textcenter,
        textbottom: meme.textbottom,
        privat: meme.privat,
        font: meme.font,
        color: meme.color,
      }),
    })
      .then((response) => {
        if (response.ok) {
          resolve(null);
        } else {
          response
            .json()
            .then((obj) => {
              reject(obj);
            })
            .catch(() => {
              reject({ error: "Cannot parse server response." });
            });
        }
      })
      .catch(() => {
        reject({ error: "Cannot communicate with the server." });
      }); // connection errors
  });
}

async function logIn(credentials) {
  let response = await fetch("/api/sessions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(credentials),
  });
  if (response.ok) {
    const user = await response.json();
    return user.name;
  } else {
    try {
      const errDetail = await response.json();
      throw errDetail.message;
    } catch (err) {
      throw err;
    }
  }
}

async function logOut() {
  await fetch("/api/sessions/current", { method: "DELETE" });
}

async function getUserInfo() {
  const response = await fetch("/api/sessions/current");
  const userInfo = await response.json();
  if (response.ok) {
    return userInfo;
  } else {
    throw userInfo; // an object with the error coming from the server
  }
}

const API = {
  getAllMemes,
  getFonts,
  getPublicMemes,
  getInfoImages,
  getImage,
  addMeme,
  updateMeme,
  logIn,
  logOut,
  getUserInfo,
};

export default API;
