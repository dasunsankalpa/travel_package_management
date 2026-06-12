const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const { createAdvertisement, getAllAdvertisements } = require('../controllers/advertisementController');

// Configure multer for image upload
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, '../../uploads/'));
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  }
});

const upload = multer({
  storage: storage,
  limits: { fileSize: 10 * 1024 * 1024 }, // 10MB limit
  fileFilter: (req, file, cb) => {
    const allowedTypes = /jpeg|jpg|png|gif|pdf/;
    const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = allowedTypes.test(file.mimetype);

    if (mimetype && extname) {
      return cb(null, true);
    } else {
      cb(new Error('Only images and PDF files are allowed'));
    }
  }
});

// GET /api/advertisements - Get all advertisements
router.get('/', getAllAdvertisements);

// POST /api/advertisements - Create new advertisement
router.post('/', upload.single('image'), createAdvertisement);

module.exports = router;
