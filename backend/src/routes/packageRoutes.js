const express = require('express');
const multer = require('multer');
const { createPackage, getPackage, updatePackage } = require('../controllers/packageController');

const router = express.Router();
const upload = multer({ dest: 'uploads/' });

router.post('/', upload.array('images', 5), createPackage);
router.get('/:id', getPackage);
router.put('/:id', upload.array('images', 5), updatePackage);

module.exports = router;
