import Meme from "./components/models/memes/memes";

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

async function getImg(id) {
  // call: GET /api/img/:id
  const response = await fetch(BASEURL + `/img/${id}`);
  const imgJson = await response.json();
  if (response.ok) {
    return imgJson;
  } else {
    throw imgJson; // an object with the error coming from the server
  }
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
  getPublicMemes,
  getImg,
  logIn,
  logOut,
  getUserInfo,
};

export default API;
