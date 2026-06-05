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

module.exports = { createPackage, getPackage, updatePackage };
