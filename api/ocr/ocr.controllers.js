exports.ocrCreate = async (req, res, next) => {
  try {
    res.status(201).json('text');
  } catch (error) {
    next(error);
  }
};
