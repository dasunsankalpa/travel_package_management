const Package = require('../models/Package');

const createPackage = async (req, res) => {
  try {
    const publicBaseUrl = `${req.protocol}://${req.get('host')}`
    const BasicInformation = JSON.parse(req.body.BasicInformation)
    const LocationAndHighlights = JSON.parse(req.body.LocationAndHighlights)
    const DayByDayItinerary = JSON.parse(req.body.DayByDayItinerary)
    const AgencyContactInformation = JSON.parse(req.body.AgencyContactInformation)
    const status = req.body.status || 'draft'

    const images = req.files ? req.files.map(file => `${publicBaseUrl}/uploads/${file.filename}`) : []

    const payload = {
      BasicInformation,
      LocationAndHighlights: {
        ...LocationAndHighlights,
        highlights: Array.isArray(LocationAndHighlights.highlights)
          ? LocationAndHighlights.highlights
          : LocationAndHighlights.highlights?.split('\n').filter(Boolean) ?? [],
        images,
      },
      DayByDayItinerary,
      AgencyContactInformation,
      status,
    }

    const package_ = new Package(payload)
    await package_.save()
    res.status(201).json({ message: `Package ${status === 'publish' ? 'published' : 'saved as draft'} successfully`, data: package_ })
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
}

const getPackage = async (req, res) => {
  try {
    const package_ = await Package.findById(req.params.id)
    if (!package_) return res.status(404).json({ error: 'Package not found' })
    res.json({ data: package_ })
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
}

const searchPackages = async (req, res) => {
  try {
    const title = (req.query.title || '').trim()

    if (!title) {
      return res.json({ data: [] })
    }

    const packages = await Package.find({
      'BasicInformation.title': { $regex: `^${title}`, $options: 'i' },
    })
      .sort({ createdAt: -1 })
      .limit(8)

    res.json({
      data: packages.map(package_ => ({
        _id: package_._id,
        title: package_?.BasicInformation?.title || '',
        duration: package_?.BasicInformation?.duration || '',
        price: package_?.BasicInformation?.price ?? '',
        groupSize: package_?.BasicInformation?.groupSize || '',
        image: package_?.LocationAndHighlights?.images?.[0] || '',
        createdAt: package_.createdAt,
      })),
    })
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
}

const updatePackage = async (req, res) => {
  try {
    const publicBaseUrl = `${req.protocol}://${req.get('host')}`
    const BasicInformation = JSON.parse(req.body.BasicInformation)
    const LocationAndHighlights = JSON.parse(req.body.LocationAndHighlights)
    const DayByDayItinerary = JSON.parse(req.body.DayByDayItinerary)
    const AgencyContactInformation = JSON.parse(req.body.AgencyContactInformation)
    const status = req.body.status || 'draft'

    const existingImages = req.body.existingImages
      ? JSON.parse(req.body.existingImages)
      : []
    const newImages = req.files ? req.files.map(file => `${publicBaseUrl}/uploads/${file.filename}`) : []
    const images = [...existingImages, ...newImages]

    const payload = {
      BasicInformation,
      LocationAndHighlights: {
        ...LocationAndHighlights,
        highlights: Array.isArray(LocationAndHighlights.highlights)
          ? LocationAndHighlights.highlights
          : LocationAndHighlights.highlights?.split('\n').filter(Boolean) ?? [],
        images,
      },
      DayByDayItinerary,
      AgencyContactInformation,
      status,
    }

    const package_ = await Package.findByIdAndUpdate(req.params.id, { $set: payload }, { new: true })
    if (!package_) return res.status(404).json({ error: 'Package not found' })
    res.json({ message: `Package ${status === 'publish' ? 'published' : 'saved as draft'} successfully`, data: package_ })
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
}

module.exports = { createPackage, getPackage, updatePackage, searchPackages };
