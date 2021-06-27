/**
 * Object describing a img
 */
 class Img {
    constructor(
      id,
      img,
      top,
      center,
      bottom,
    ) {
      this.id = id;
      this.code = id;
      this.img = img;
      this.top = top;
      this.center = center;
      this.bottom = bottom;
    }
  
    /**
     * Creates a new Img from plain (JSON) objects
     * @param {*} json a plain object (coming form JSON deserialization)
     * with the right properties
     * @return {Img} the newly created object
     */
    static from(json) {
      const img = new Img();
      delete Object.assign(img, json, { code: json.id }).code;
      return img;
    }
  }
  
  export default Img;
  