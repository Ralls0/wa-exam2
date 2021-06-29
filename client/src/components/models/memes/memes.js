/**
 * Object describing a meme
 */
class Meme {
  constructor(
    id,
    title,
    text1,
    text2,
    text3,
    img,
    privat,
    userID,
    user,
    copy,
    font,
    size,
    color
  ) {
    this.id = id;
    this.code = id;
    this.title = title;
    this.text1 = text1;
    this.text2 = text2;
    this.text3 = text3;
    this.img = img;
    this.privat = privat;
    this.userID = userID;
    this.user = user;
    this.copy = copy;
    this.font = font;
    this.size = size;
    this.color = color;
  }

  /**
   * Creates a new Meme from plain (JSON) objects
   * @param {*} json a plain object (coming form JSON deserialization)
   * with the right properties
   * @return {Meme} the newly created object
   */
  static from(json) {
    const meme = new Meme();
    delete Object.assign(meme, json, { code: json.id }).code;
    return meme;
  }
}

export default Meme;
