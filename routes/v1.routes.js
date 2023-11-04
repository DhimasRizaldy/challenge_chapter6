const router = require('express').Router();
const { createGalery, getAllGalery, getDetailGalery, updateGalery, deleteGalery, deleteImage } = require('../controllers/galery.controllers');
const { image } = require('../libs/multer');

// router main url
router.get('/', (req, res) => {
  res.status(200).json({
    status: true,
    message: "Welcome to Apis - Challenge Chapter 6",
    data: null,
  });
});

// 
router.post('/galery/', image.single('image'), createGalery);
router.get('/galery/', getAllGalery);
router.get('/galery/:id', getDetailGalery);
router.put('/galery/:id', image.single('image'), updateGalery);
router.delete('/galery/:id', deleteGalery);
router.put('/deleteImage/:id', deleteImage);



module.exports = router;