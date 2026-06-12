const Advertisement = require('../models/Advertisement');
const Package = require('../models/Package');

const createAdvertisement = async (req, res) => {
  try {
    console.log('Creating advertisement with data:', req.body);
    console.log('File uploaded:', req.file);
    
    const {
      title,
      description,
      type,
      budget,
      startDate,
      endDate,
      packageId
    } = req.body;

    // Validate required fields
    if (!title || !description || !budget || !startDate || !endDate || !packageId) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    // Handle image upload if provided
    const publicBaseUrl = `${req.protocol}://${req.get('host')}`;
    const image = req.file ? `${publicBaseUrl}/uploads/${req.file.filename}` : '';

    // Step 1: Create the advertisement
    const advertisement = new Advertisement({
      title,
      description,
      type,
      budget: Number(budget),
      startDate: new Date(startDate),
      endDate: new Date(endDate),
      image,
      clicks: 0,
      impressions: 0,
      CTR: 0,
      packageId
    });

    await advertisement.save();
    console.log('Advertisement saved successfully:', {
      _id: advertisement._id,
      title: advertisement.title,
      description: advertisement.description,
      type: advertisement.type,
      budget: advertisement.budget,
      startDate: advertisement.startDate,
      endDate: advertisement.endDate,
      image: advertisement.image,
      clicks: advertisement.clicks,
      impressions: advertisement.impressions,
      CTR: advertisement.CTR,
      packageId: advertisement.packageId
    });

    // Verify the saved document
    const savedAd = await Advertisement.findById(advertisement._id);
    console.log('Verified saved advertisement from DB:', savedAd);

    // Step 2: Update the package with promotionPrice and promotionExpiryDate
    const updatedPackage = await Package.findByIdAndUpdate(
      packageId,
      {
        $set: {
          'BasicInformation.promotionPrice': Number(budget),
          'BasicInformation.promotionExpiryDate': new Date(endDate)
        }
      },
      { new: true }
    );

    if (!updatedPackage) {
      return res.status(404).json({ error: 'Package not found' });
    }
    
    console.log('Package updated:', updatedPackage._id);

    res.status(201).json({ 
      message: 'Advertisement created and package updated successfully',
      data: {
        advertisement,
        updatedPackage
      }
    });
  } catch (err) {
    console.error('Error creating advertisement:', err);
    res.status(500).json({ error: err.message });
  }
};

const getAllAdvertisements = async (req, res) => {
  try {
    const advertisements = await Advertisement.find().populate('packageId');
    res.status(200).json({ 
      count: advertisements.length,
      data: advertisements 
    });
  } catch (err) {
    console.error('Error fetching advertisements:', err);
    res.status(500).json({ error: err.message });
  }
};

module.exports = { createAdvertisement, getAllAdvertisements };