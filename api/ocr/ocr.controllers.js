const Tesseract = require('tesseract.js');

exports.ocrCreate = async (req, res, next) => {
  try {
    if (req.file) {
      req.body.image = `http://${req.get('host')}/media/${req.file.filename}`;
    }
    let text;
    try {
      text = await Tesseract.recognize(req.body.image, 'eng');
    } catch (error) {
      console.log(error);
    }
    res.status(201).json(text.data.text);
  } catch (error) {
    next(error);
  }
};
