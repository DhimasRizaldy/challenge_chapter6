const multer = require('multer');

function generateFilter(props) {
  let { allowedMimeTypes } = props
  return multer({
    fileFilter: (req, file, callback) => {
      if (!allowedMimeTypes.includes(file.mimetype)) {
        const err = new Error(`Only ${allowedMimeTypes.join(', ')} allowed to upload!`)
        return callback(err, false)
      }
      callback(null, true)
    },
    onError: (err, next) => {
      next(err)
    }
  })
}

module.exports = {
  image: generateFilter({
    allowedMimeTypes: ['image/png', 'image/jpeg']
  })
};