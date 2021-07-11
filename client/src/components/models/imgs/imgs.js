/**
 * Object describing a img
 */
 class Img {
    constructor(
      id,
      img,
      tl,
      tc,
      tr,
      ml,
      mc,
      mr,
      bl,
      bc,
      br,
    ) {
      this.id = id;
      this.img = img;
      this.tl = tl;
      this.tc = tc;
      this.tr = tr;
      this.ml = ml;
      this.mc = mc;
      this.mr = mr;
      this.bl =bl;
      this.bc =bc;
      this.br =br;
    }
  
    /**
     * Creates a new Img from plain (JSON) objects
     * @param {*} json a plain object (coming form JSON deserialization)
     * with the right properties
     * @return {Img} the newly created object
     */
    static from(json) {
      const img = new Img();
      Object.assign(img, json);
      return img;
    }
  }
  
  export default Img;
  