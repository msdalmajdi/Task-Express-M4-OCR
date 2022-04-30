# OCR API 🤖

## Instructions

- Fork and clone [this repository](https://github.com/JoinCODED/Task-Express-M4-OCR/) to your `Development` folder.

In this task, you will create a cool api that takes an image and returns the text inside. Aka OCR, Image to Text.

![test](https://user-images.githubusercontent.com/84308096/166109225-c92c0ef5-cda1-42d7-9814-b860b148f2bb.png)

Use this image for testing

### Setup Media Folder

Create a route for the media files.

1. Create a folder called `media` for your images.
2. In `app.js`, create a route with the path `/media`.
3. Join `media` to the directory path `__dirname` using `join` and pass it to `express.static`.
4. Test your route by putting any image in the `media` folder, then in your browser go to `localhost:8000/media/<image_name>`.
5. Add `media` to your `.gitignore` file.

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

6. Specify that `single` images are uploaded only and the field name is `image`.

### Uploading Images

1. In `ocrCreate` controller method, check if an image was uploaded by checking if `req.file` exists.
2. If a file is uploaded, save the path in the body of the URL.
3. The path must include the request's protocol `http` and the host `req.get("host")` followed by `media` and the file's name.

### OCR!

1. Use the following (package)[https://www.npmjs.com/package/tesseract.js/v/2.1.1]
2. The rest is a challenge!

### 🍋 Multer Size Limit

In `multer.js` specify a size limit of 1 megabyte for the files uploaded.

### 🤼‍♂️ Multer File Filter

In `multer.js` specify a the file types which are allowed to upload, we need to only upload images!

### 🌶 Back To React

Create a front end page for your ocr api!
