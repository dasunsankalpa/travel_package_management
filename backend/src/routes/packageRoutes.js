const express = require('express');
const multer = require('multer');
const { createPackage, getPackage, updatePackage, searchPackages, getAllPackages, getPackagesCount, deletePackage } = require('../controllers/packageController');

const router = express.Router();
const upload = multer({ dest: 'uploads/' });

router.post('/', upload.array('images', 5), createPackage);
router.get('/search', searchPackages);
router.get('/count', getPackagesCount);
router.get('/:id', getPackage);
router.put('/:id', upload.array('images', 5), updatePackage);
router.delete('/:id', deletePackage);

// This must be AFTER /:id to avoid conflicts
router.get('/', getAllPackages);

module.exports = router;
