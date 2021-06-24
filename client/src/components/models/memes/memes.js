/**
 * Object describing a meme
 */
class Meme {
  constructor(
    id,
    title,
    texttop,
    textcenter,
    textbottom,
    img,
    privat,
    user,
    copy,
    font,
    color
  ) {
    this.id = id;
    this.title = title;
    this.texttop = texttop;
    this.textcenter = textcenter;
    this.textbottom = textbottom;
    this.img = img;
    this.privat = privat;
    this.user = user;
    this.copy = copy;
    this.font = font;
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
    delete Object.assign(meme, json, { id: json.id }).id;
    return meme;
  }
}

export default Meme;
