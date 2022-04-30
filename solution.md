### Setup Media Folder

Create a route for the media files.

1. Create a folder called `media` for your images.
2. In `app.js`, create a route with the path `/media`.

```js
app.use('/media');
```

3. Join `media` to the directory path `__dirname` using `join` and pass it to `express.static`.

```js
app.use('/media', express.static(path.join(__dirname, 'media')));
```

4. Test your route by putting any image in the `media` folder, then in your browser go to `localhost:8000/media/<image_name>`.
5. Add `media` to your `.gitignore` file.

```js
node_modules;
media;
```

### Setup Upload Middleware

Set up the upload middleware using multer.

1. Install multer

```shell
$ npm install multer
```

2. In your `middleware` folder (create one if you don't have it), create a file called `multer.js`.

3. In this file `multer.js`, copy paste the following code:

```js
const multer = require('multer');

const storage = multer.diskStorage({
  destination: './media',
  filename: (req, file, cb) => {
    cb(null, `${+new Date()}${file.originalname}`);
  },
});

const upload = multer({
  storage,
});

module.exports = upload;
```

4. In `ocr/ocr.routes.js`, require `upload`.

```js
const upload = require('../../middleware/multer');
```

5. Call `upload` middleware before the `ocrCreate` controller.

```js
router.post('/', upload, ocrCreate);
```

6. Specify that `single` images are uploaded only and the field name is `image`.

```js
router.post('/', upload.single('image'), ocrCreate);
```

### Uploading Images

1. In `ocrCreate` controller method, check if an image was uploaded by checking if `req.file` exists.

```js
if (req.file) {
}
```

2. If a file is uploaded, save the path in the body of the URL.

```js
if (req.file) {
  req.body.image = `http://${req.get('host')}/media/${req.file.filename}`;
}
```

3. The path must include the request's protocol `http` and the host `req.get("host")` followed by `media` and the file's name.

### OCR!

1. Use the following (package)[https://www.npmjs.com/package/tesseract.js/v/2.1.1]

```shell
npm install tesseract.js
```

2. Import the package in the controller file

```js
const Tesseract = require('tesseract.js');
```

3. After reading the docs, we need to pass the image path to the `recognize` method with the language:

```js
Tesseract.recognize(req.body.image, 'eng');
```

4. This method is asynchronous, so let's wrap it with `try-catch` block:

```js
try {
  Tesseract.recognize(req.body.image, 'eng');
} catch (error) {
  console.log(error);
}
```

5. Let's add `await` and store the result in a variable called `result`:

```js
let result;
try {
  result = await Tesseract.recognize(req.body.image, 'eng');
} catch (error) {
  console.log(error);
}
```

6. Now let's send the result as a response:

```js
exports.ocrCreate = async (req, res, next) => {
  try {
    if (req.file) {
      req.body.image = `http://${req.get('host')}/media/${req.file.filename}`;
    }
    let result;
    try {
      result = await Tesseract.recognize(req.body.image, 'eng');
    } catch (error) {
      console.log(error);
    }
    res.status(201).json(result.data.text);
  } catch (error) {
    next(error);
  }
};
```

### 🍋 Multer Size Limit

In `multer.js` specify a size limit of 1 megabyte for the files uploaded.

1. In your upload export:

```js
const upload = multer({
  storage,
  limits: { fileSize: 1000000 },
});
```

1000000 bytes is equal to 1 mb.

### 🤼‍♂️ Multer File Filter

In `multer.js` specify a the file types which are allowed to upload, we need to only upload images!

1. We will create a function that checks the file types:

```js
const path = require('path');

const checkFileType = (file, cb) => {
  // Allowed ext
  const filetypes = /jpeg|jpg|png|gif/;
  // Check ext
  const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
  // Check mime
  const mimetype = filetypes.test(file.mimetype);

  if (mimetype && extname) {
    return cb(null, true);
  } else {
    cb('Error: Images Only!');
  }
};
```

2. Them we will use it in our export:

```js
const upload = multer({
  storage,
  limits: { fileSize: 1000000 },
  fileFilter: function (_req, file, cb) {
    checkFileType(file, cb);
  },
});
```

### 🌶 Back To React

Create a front end page for your ocr api!
