import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import Header from '../components/Header.jsx'
import Footer from '../components/Footer.jsx'
import tagIcon from '../assets/tag.png'
import trashIcon from '../assets/trash.png'
import updateIcon from '../assets/update.png'
import locationIcon from '../assets/location.png'

const categoryOptions = [
  { label: 'Adventure Tours', value: 'adventure' },
  { label: 'Cultural Heritage', value: 'cultural' },
  { label: 'Relaxation', value: 'relaxation' },
  { label: 'Food & Dining', value: 'food' },
  { label: 'Nature & Eco', value: 'nature' },
  { label: 'Nightlife', value: 'nightlife' },
  { label: 'Shopping', value: 'shopping' },
  { label: 'Photography', value: 'photography' },
  { label: 'Historical Sites', value: 'historical' },
  { label: 'Beach Holidays', value: 'beach' },
]



function IconSearch() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="11" cy="11" r="6.5" stroke="#C7CDD7" strokeWidth="1.8" />
      <path d="M16 16L20.5 20.5" stroke="#C7CDD7" strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  )
}

function IconFilter() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M4 7H20" stroke="#6B7280" strokeWidth="1.8" strokeLinecap="round" />
      <path d="M4 11H16" stroke="#6B7280" strokeWidth="1.8" strokeLinecap="round" />
      <path d="M4 15H12" stroke="#6B7280" strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  )
}

function IconPriceTag() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M5 11.5L11.5 5H19V12.5L12.5 19L5 11.5Z" stroke="#6B7280" strokeWidth="1.8" strokeLinejoin="round" />
      <circle cx="15.25" cy="8.75" r="1.25" fill="#6B7280" />
    </svg>
  )
}

function IconChevron() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M6 9L12 15L18 9" stroke="#C1C7D0" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

function IconPlus() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="12" cy="12" r="10" fill="white" opacity="0.22" />
      <path d="M12 7V17" stroke="white" strokeWidth="1.8" strokeLinecap="round" />
      <path d="M7 12H17" stroke="white" strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  )
}

function IconBtn({ icon, alt, tooltip, onClick, btnStyle }) {
  const [show, setShow] = React.useState(false)
  return (
    <div
      style={{ position: 'relative', display: 'inline-flex' }}
      onMouseEnter={() => setShow(true)}
      onMouseLeave={() => setShow(false)}
    >
      <button type="button" onClick={onClick} style={btnStyle}>
        <img src={icon} alt={alt} style={{ width: '20px', height: '20px' }} />
      </button>
      {show && (
        <div style={{
          position: 'absolute',
          bottom: 'calc(100% + 8px)',
          left: '50%',
          transform: 'translateX(-50%)',
          background: 'linear-gradient(180deg, #2563EB 0%, #1D4ED8 100%)',
          color: '#FFFFFF',
          fontSize: '12px',
          fontWeight: 600,
          padding: '5px 10px',
          borderRadius: '6px',
          whiteSpace: 'nowrap',
          pointerEvents: 'none',
          zIndex: 10,
          letterSpacing: '0.3px',
        }}>
          {tooltip}
        </div>
      )}
    </div>
  )
}

export default function AdminPackages({ embedLayout = false }) {
  const [isCategoryOpen, setIsCategoryOpen] = React.useState(false)
  const [favorites, setFavorites] = React.useState({})
  const [packages, setPackages] = useState([])
  const [filteredPackages, setFilteredPackages] = useState([])
  const [selectedCategory, setSelectedCategory] = useState('All Categories')
  const [searchQuery, setSearchQuery] = useState('')
  const [searchSuggestions, setSearchSuggestions] = useState([])
  const [isSearchOpen, setIsSearchOpen] = useState(false)
  const [isPriceOpen, setIsPriceOpen] = useState(false)
  const [minPrice, setMinPrice] = useState('')
  const [maxPrice, setMaxPrice] = useState('')
  const categoryDropdownRef = React.useRef(null)
  const searchDropdownRef = React.useRef(null)
  const priceDropdownRef = React.useRef(null)
  const navigate = useNavigate()

  useEffect(() => {
    fetch('http://localhost:5000/api/packages')
      .then(res => res.json())
      .then(response => {
        const publishedPackages = (response.data || []).filter(pkg => pkg.status === 'publish');
        setPackages(publishedPackages);
        setFilteredPackages(publishedPackages);
      })
      .catch(err => console.error('Error fetching packages:', err))
  }, [])

  const handleCategorySelect = (categoryValue, categoryLabel) => {
    setSelectedCategory(categoryLabel)
    setIsCategoryOpen(false)
    
    let basePackages = packages
    
    if (categoryLabel !== 'All Categories') {
      basePackages = packages.filter(pkg => 
        pkg.BasicInformation?.categories?.includes(categoryValue)
      )
    }
    
    applyFilters(basePackages, searchQuery)
  }

  const applyFilters = (packagesToFilter, search) => {
    let result = packagesToFilter
    
    if (search) {
      result = result.filter(pkg => {
        const title = pkg.BasicInformation?.title?.toLowerCase() || ''
        const destination = pkg.LocationAndHighlights?.destination?.toLowerCase() || ''
        const searchLower = search.toLowerCase()
        return title.includes(searchLower) || destination.includes(searchLower)
      })
    }
    
    // Apply price range filter
    if (minPrice || maxPrice) {
      result = result.filter(pkg => {
        const price = pkg.BasicInformation?.promotionPrice ?? pkg.BasicInformation?.price
        if (price === undefined || price === null) return false
        
        const min = minPrice ? parseFloat(minPrice) : 0
        const max = maxPrice ? parseFloat(maxPrice) : Infinity
        
        return price >= min && price <= max
      })
    }
    
    setFilteredPackages(result)
  }

  const handleSearchChange = (e) => {
    const value = e.target.value
    setSearchQuery(value)
    
    if (value.trim()) {
      const searchLower = value.toLowerCase()
      const suggestions = []
      const seen = new Set()
      
      packages.forEach(pkg => {
        const title = pkg.BasicInformation?.title || ''
        const destination = pkg.LocationAndHighlights?.destination || ''
        
        // Add title if it matches and hasn't been added
        if (title && title.toLowerCase().includes(searchLower)) {
          const key = `title:${title.toLowerCase()}`
          if (!seen.has(key)) {
            seen.add(key)
            suggestions.push({
              value: title,
              type: 'title',
              id: pkg._id + '-title'
            })
          }
        }
        
        // Add destination if it matches and hasn't been added
        if (destination && destination.toLowerCase().includes(searchLower)) {
          const key = `destination:${destination.toLowerCase()}`
          if (!seen.has(key)) {
            seen.add(key)
            suggestions.push({
              value: destination,
              type: 'destination',
              id: pkg._id + '-destination'
            })
          }
        }
      })
      
      setSearchSuggestions(suggestions)
      setIsSearchOpen(suggestions.length > 0)
    } else {
      setSearchSuggestions([])
      setIsSearchOpen(false)
      const basePackages = selectedCategory === 'All Categories' ? packages : packages.filter(pkg => {
        const categoryValue = categoryOptions.find(cat => cat.label === selectedCategory)?.value
        return pkg.BasicInformation?.categories?.includes(categoryValue)
      })
      setFilteredPackages(basePackages)
    }
  }

  const handleSuggestionSelect = (suggestion) => {
    const searchValue = suggestion.value
    setSearchQuery(searchValue)
    setIsSearchOpen(false)
    setSearchSuggestions([])
    
    const basePackages = selectedCategory === 'All Categories' ? packages : packages.filter(pkg => {
      const categoryValue = categoryOptions.find(cat => cat.label === selectedCategory)?.value
      return pkg.BasicInformation?.categories?.includes(categoryValue)
    })
    
    applyFilters(basePackages, searchValue)
  }

  const handlePriceApply = () => {
    setIsPriceOpen(false)
    
    let basePackages = packages
    
    if (selectedCategory !== 'All Categories') {
      const categoryValue = categoryOptions.find(cat => cat.label === selectedCategory)?.value
      basePackages = packages.filter(pkg => 
        pkg.BasicInformation?.categories?.includes(categoryValue)
      )
    }
    
    applyFilters(basePackages, searchQuery)
  }

  const handlePriceClear = () => {
    setMinPrice('')
    setMaxPrice('')
    setIsPriceOpen(false)
    
    let basePackages = packages
    
    if (selectedCategory !== 'All Categories') {
      const categoryValue = categoryOptions.find(cat => cat.label === selectedCategory)?.value
      basePackages = packages.filter(pkg => 
        pkg.BasicInformation?.categories?.includes(categoryValue)
      )
    }
    
    applyFilters(basePackages, searchQuery)
  }

  const handleDelete = (id) => {
    // Validate MongoDB ObjectId format (24 hex characters)
    if (!/^[a-f0-9]{24}$/i.test(id)) {
      console.error('Invalid package ID format')
      return
    }

    const confirmed = window.confirm('Are you sure you want to permanently delete this package?')
    if (!confirmed) return

    fetch(`http://localhost:5000/api/packages/${id}`, { method: 'DELETE' })
      .then(res => {
        if (!res.ok) throw new Error('Delete failed')
        setPackages(prev => prev.filter(p => p._id !== id))
        setFilteredPackages(prev => prev.filter(p => p._id !== id))
      })
      .catch(err => console.error('Error deleting package:', err))
  }

  const toggleFavorite = (pkgId) => {
    setFavorites(prev => ({ ...prev, [pkgId]: !prev[pkgId] }))
  }

  React.useEffect(() => {
    const handleOutsideClick = event => {
      if (isCategoryOpen && categoryDropdownRef.current && !categoryDropdownRef.current.contains(event.target)) {
        setIsCategoryOpen(false)
      }
      if (isSearchOpen && searchDropdownRef.current && !searchDropdownRef.current.contains(event.target)) {
        setIsSearchOpen(false)
      }
      if (isPriceOpen && priceDropdownRef.current && !priceDropdownRef.current.contains(event.target)) {
        setIsPriceOpen(false)
      }
    }
    document.addEventListener('mousedown', handleOutsideClick)
    return () => document.removeEventListener('mousedown', handleOutsideClick)
  }, [isCategoryOpen, isSearchOpen, isPriceOpen])

  const mainContent = (
    <main
      style={{
        flex: 1,
        minHeight: '100vh',
        background: 'linear-gradient(180deg, #FFFFFF 0%, #A0DBFF 100%)',
        paddingTop: '118px',
        paddingBottom: '64px',
      }}
    >
      <section
        style={{
          maxWidth: '1500px',
          margin: '0 auto',
          padding: '16px 24px',
          fontFamily: "'Inter', sans-serif",
        }}
      >
        <div style={{ paddingLeft: '10px' }}>
          <h1 style={{ margin: 0, fontSize: '35px', lineHeight: 1.1, fontWeight: 700, color: '#111827' }}>Travel Packages</h1>
          <p style={{ margin: '12px 0 0', fontSize: '15px', color: '#6B7280' }}>Discover amazing destinations at unbeatable prices</p>
        </div>

        {/* Search & Filter Bar */}
        <div
          style={{
            marginTop: '24px',
            background: '#FFFFFF',
            borderRadius: '12px',
            boxShadow: '0 10px 22px rgba(15, 23, 42, 0.16)',
            border: '1px solid rgba(209, 213, 219, 0.55)',
            padding: '48px 20px 46px',
            minHeight: '138px',
          }}
        >
          <div style={{ display: 'grid', gridTemplateColumns: '1.45fr 0.8fr 0.7fr', gap: '22px', alignItems: 'start' }}>
            <div ref={searchDropdownRef} style={{ position: 'relative', width: '100%' }}>
              <label
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '12px',
                  height: '38px',
                  padding: '0 14px',
                  border: '1px solid #D8DEE8',
                  borderRadius: '6px',
                  background: '#FFFFFF',
                  boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.65)',
                }}
              >
                <IconSearch />
                <input
                  type="text"
                  placeholder="Search Destinations Or Packages......"
                  aria-label="Search destinations or packages"
                  value={searchQuery}
                  onChange={handleSearchChange}
                  style={{
                    border: 0,
                    outline: 'none',
                    width: '100%',
                    fontSize: '13px',
                    color: '#111827',
                    background: 'transparent',
                  }}
                />
              </label>
              {isSearchOpen && searchSuggestions.length > 0 && (
                <div
                  style={{
                    position: 'absolute',
                    top: '44px',
                    left: 0,
                    right: 0,
                    background: '#FFFFFF',
                    border: '1px solid #D8DEE8',
                    borderRadius: '8px',
                    boxShadow: '0 12px 24px rgba(15, 23, 42, 0.12)',
                    maxHeight: '300px',
                    overflowY: 'auto',
                    zIndex: 30,
                  }}
                >
                  {searchSuggestions.map((suggestion, idx) => (
                    <div
                      key={suggestion.id}
                      onClick={() => handleSuggestionSelect(suggestion)}
                      style={{
                        padding: '10px 14px',
                        cursor: 'pointer',
                        borderBottom: idx < searchSuggestions.length - 1 ? '1px solid #F3F4F6' : 'none',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '8px',
                      }}
                      onMouseEnter={(e) => e.currentTarget.style.background = '#F9FAFB'}
                      onMouseLeave={(e) => e.currentTarget.style.background = '#FFFFFF'}
                    >
                      {suggestion.type === 'destination' && (
                        <img src={locationIcon} alt="destination" style={{ width: '16px', height: '16px' }} />
                      )}
                      {suggestion.type === 'title' && (
                        <img src={tagIcon} alt="package" style={{ width: '16px', height: '16px' }} />
                      )}
                      <div style={{ fontSize: '14px', color: '#111827' }}>
                        {suggestion.value}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div ref={categoryDropdownRef} style={{ position: 'relative', width: '100%' }}>
              <button
                type="button"
                onClick={() => setIsCategoryOpen(prev => !prev)}
                aria-expanded={isCategoryOpen}
                aria-haspopup="listbox"
                style={{
                  height: '38px',
                  padding: '0 16px',
                  border: '1px solid #D8DEE8',
                  borderRadius: '6px',
                  background: '#FFFFFF',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  gap: '12px',
                  fontSize: '13px',
                  color: '#111827',
                  boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.65)',
                  cursor: 'pointer',
                  width: '100%',
                }}
              >
                <span style={{ display: 'inline-flex', alignItems: 'center', gap: '10px' }}>
                  <IconFilter />
                  {selectedCategory}
                </span>
                <IconChevron />
              </button>
              {isCategoryOpen && (
                <div
                  style={{
                    position: 'absolute',
                    top: '44px',
                    left: 0,
                    right: 0,
                    background: '#FFFFFF',
                    border: '1px solid #D8DEE8',
                    borderRadius: '8px',
                    boxShadow: '0 12px 24px rgba(15, 23, 42, 0.12)',
                    padding: '10px 0',
                    zIndex: 20,
                  }}
                >
                  <div
                    onClick={() => handleCategorySelect('all', 'All Categories')}
                    style={{
                      padding: '10px 14px',
                      fontSize: '13px',
                      color: selectedCategory === 'All Categories' ? '#2563EB' : '#334155',
                      fontWeight: selectedCategory === 'All Categories' ? 600 : 400,
                      lineHeight: 1.2,
                      cursor: 'pointer',
                      borderBottom: '1px solid #E5E7EB',
                    }}
                  >
                    Clear Filter
                  </div>
                  {categoryOptions.map(category => (
                    <div
                      key={category.value}
                      onClick={() => handleCategorySelect(category.value, category.label)}
                      style={{
                        padding: '10px 14px',
                        fontSize: '13px',
                        color: selectedCategory === category.label ? '#2563EB' : '#334155',
                        fontWeight: selectedCategory === category.label ? 600 : 400,
                        lineHeight: 1.2,
                        cursor: 'pointer',
                      }}
                    >
                      {category.label}
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div ref={priceDropdownRef} style={{ position: 'relative', width: '100%' }}>
              <button
                type="button"
                onClick={() => setIsPriceOpen(prev => !prev)}
                aria-expanded={isPriceOpen}
                aria-haspopup="true"
                style={{
                  height: '38px',
                  padding: '0 16px',
                  border: '1px solid #D8DEE8',
                  borderRadius: '6px',
                  background: '#FFFFFF',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  gap: '12px',
                  fontSize: '13px',
                  color: '#111827',
                  boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.65)',
                  cursor: 'pointer',
                  width: '100%',
                }}
              >
                <span style={{ display: 'inline-flex', alignItems: 'center', gap: '10px' }}>
                  <IconPriceTag />
                  {minPrice || maxPrice ? `$${minPrice || '0'} - $${maxPrice || '∞'}` : 'All Prices'}
                </span>
                <IconChevron />
              </button>
              {isPriceOpen && (
                <div
                  style={{
                    position: 'absolute',
                    top: '44px',
                    left: 0,
                    right: 0,
                    background: '#FFFFFF',
                    border: '1px solid #D8DEE8',
                    borderRadius: '8px',
                    boxShadow: '0 12px 24px rgba(15, 23, 42, 0.12)',
                    padding: '8px',
                    zIndex: 20,
                  }}
                >
                  <div style={{ marginBottom: '12px' }}>
                    <label style={{ display: 'block', fontSize: '12px', color: '#6B7280', marginBottom: '6px', fontWeight: 500 }}>
                      Min Price ($)
                    </label>
                    <input
                      type="number"
                      placeholder="0"
                      value={minPrice}
                      onChange={(e) => setMinPrice(e.target.value)}
                      style={{
                        width: '100%',
                        padding: '8px 12px',
                        border: '1px solid #D8DEE8',
                        borderRadius: '6px',
                        fontSize: '13px',
                        outline: 'none',
                      }}
                    />
                  </div>
                  <div style={{ marginBottom: '12px' }}>
                    <label style={{ display: 'block', fontSize: '12px', color: '#6B7280', marginBottom: '6px', fontWeight: 500 }}>
                      Max Price ($)
                    </label>
                    <input
                      type="number"
                      placeholder="No limit"
                      value={maxPrice}
                      onChange={(e) => setMaxPrice(e.target.value)}
                      style={{
                        width: '100%',
                        padding: '8px 12px',
                        border: '1px solid #D8DEE8',
                        borderRadius: '6px',
                        fontSize: '13px',
                        outline: 'none',
                      }}
                    />
                  </div>
                  <div style={{ display: 'flex', gap: '8px' }}>
                    <button
                      type="button"
                      onClick={handlePriceClear}
                      style={{
                        flex: 1,
                        padding: '8px',
                        border: '1px solid #D8DEE8',
                        borderRadius: '6px',
                        background: '#FFFFFF',
                        fontSize: '13px',
                        fontWeight: 500,
                        color: '#6B7280',
                        cursor: 'pointer',
                      }}
                    >
                      Clear
                    </button>
                    <button
                      type="button"
                      onClick={handlePriceApply}
                      style={{
                        flex: 1,
                        padding: '8px',
                        border: 'none',
                        borderRadius: '6px',
                        background: 'linear-gradient(180deg, #2563EB 0%, #1D4ED8 100%)',
                        fontSize: '13px',
                        fontWeight: 600,
                        color: '#FFFFFF',
                        cursor: 'pointer',
                      }}
                    >
                      Apply
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Results Count & Add Button */}
        <div
          style={{
            marginTop: '44px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '16px',
            padding: '0 12px',
          }}
        >
          <p style={{ margin: 0, fontSize: '14px', color: '#6B7280' }}>
            Showing <span style={{ fontWeight: 700, color: '#111827' }}>{filteredPackages.length} {filteredPackages.length === 1 ? 'Package' : 'Packages'}</span>
          </p>
          <button
            type="button"
            onClick={() => navigate('/packages/new')}
            style={{
              height: '45px',
              padding: '0 70px',
              border: '0',
              borderRadius: '8px',
              background: 'linear-gradient(180deg, #2563EB 0%, #1D4ED8 100%)',
              color: '#FFFFFF',
              fontSize: '16px',
              fontWeight: 600,
              display: 'inline-flex',
              alignItems: 'center',
              gap: '10px',
              boxShadow: '0 10px 18px rgba(11, 114, 232, 0.28)',
              cursor: 'pointer',
            }}
          >
            <IconPlus />
            Add new Package
          </button>
        </div>

        {/* Package Cards Grid - HORIZONTAL LAYOUT */}
        <div
          style={{
            marginTop: '32px',
            display: 'flex',
            flexDirection: 'column',
            gap: '24px',
            padding: '0 12px',
          }}
        >
          {filteredPackages.map((pkg) => (
            <div
              key={pkg._id}
              style={{
                        background: '#FFFFFF',
						borderRadius: '16px',
						overflow: 'hidden',
						boxShadow: '0 8px 20px rgba(15, 23, 42, 0.12)',
						border: '1px solid #E5E7EB',
						transition: 'transform 0.2s ease, box-shadow 0.2s ease',
						display: 'flex',
						flexDirection: 'row',
						minHeight: '100px',  
            maxHeight: '360px', 
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-4px)'
                e.currentTarget.style.boxShadow = '0 16px 32px rgba(15, 23, 42, 0.18)'
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)'
                e.currentTarget.style.boxShadow = '0 8px 24px rgba(15, 23, 42, 0.12)'
              }}
            >
              {/* Image Section - 35% width */}
              <div style={{ position: 'relative', width: '35%', minHeight: '450px', overflow: 'hidden', flexShrink: 0 }}>
                <img
                  src={pkg.LocationAndHighlights?.images?.[0] }
                  alt={pkg.BasicInformation?.title}
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
              </div>

              {/* Card Content - 65% width */}
              <div style={{ flex: 1, padding: '30px', display: 'flex', flexDirection: 'column', position: 'relative' }}>
                {/* Rating Badge - Top Right */}
                <div
                  style={{
                    position: 'absolute',
                    top: '10px',
                    right: '24px',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '6px',
                    padding: '6px 12px',
                  }}
                >
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12 17.27L18.18 21L16.54 13.97L22 9.24L14.81 8.63L12 2L9.19 8.63L2 9.24L7.46 13.97L5.82 21L12 17.27Z" fill="#FBBF24" />
                  </svg>
                  <span style={{ fontSize: '14px', fontWeight: 600, color: '#000000' }}>4.8</span>
                  <span style={{ fontSize: '13px', color: '#000000' }}>(124 reviews)</span>
                </div>
                {/* Title */}
                <h3 style={{ margin: '0 0 8px', fontSize: '28px', fontWeight: 700, color: '#111827' }}>
                  {pkg.BasicInformation?.title}
                </h3>

                {/* Description */}
                <p style={{ margin: '0 0 12px', fontSize: '16px', color: '#6B7280', lineHeight: 1.5, display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                  {pkg.BasicInformation?.description}
                </p>



                {/* highlightsGrid - 2 columns */}
                <div
                  style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(3, 1fr)',
                    gap: '8px',
                    marginTop: '8px',
                  }}
                >
                  {pkg.LocationAndHighlights?.highlights?.map((item, idx) => (
					<div key={idx} style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
					<span style={{ fontSize: '19px', color: '#1b3b80', lineHeight: 1 }}>•</span>
					<span style={{ fontSize: '16px', color: '#3d8cec' }}>{item}</span>
					</div>
                  ))}
                </div>

				{/* Duration & Group Size */}
				<div style={{ display: 'flex', gap: '30px', marginTop: '3px', alignItems: 'center' }}>
				<div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
					<svg width="14" height="14" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
					<rect x="3" y="4" width="18" height="18" rx="2" stroke="#6B7280" strokeWidth="1.6"/>
					<path d="M8 2V6" stroke="#6B7280" strokeWidth="1.6" strokeLinecap="round"/>
					<path d="M16 2V6" stroke="#6B7280" strokeWidth="1.6" strokeLinecap="round"/>
					<path d="M3 10H21" stroke="#6B7280" strokeWidth="1.6" strokeLinecap="round"/>
					</svg>
					<span style={{ fontSize: '17px', fontWeight: 500, color: '#4B5563' }}>{pkg.BasicInformation?.duration}</span>
				</div>
				</div>

                {/* Price Section - Above View Details Button */}
                <div style={{ position: 'absolute', bottom: '82px', right: '24px', display: 'flex', flexDirection: 'column', gap: '4px', alignItems: 'flex-end' }}>
                  {pkg.BasicInformation?.promotionPrice && (
                    <span style={{ fontSize: '16px', color: '#9CA3AF', textDecoration: 'line-through' }}>
                      ${pkg.BasicInformation?.price}
                    </span>
                  )}
                  <span style={{ fontSize: '28px', fontWeight: 700, color: '#000000' }}>
                    ${pkg.BasicInformation?.promotionPrice || pkg.BasicInformation?.price}
                  </span>
                  <span style={{ fontSize: '12px', color: '#6B7280' }}>
                    per person
                  </span>
                </div>

                {/* View Details + Action Buttons - Bottom Right */}
                <div style={{ position: 'absolute', bottom: '24px', right: '24px', display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <IconBtn
                    icon={trashIcon}
                    alt="Delete"
                    tooltip="Delete"
                    onClick={() => handleDelete(pkg._id)}
                    btnStyle={{
                      width: '40px',
                      height: '40px',
                      border: '1px solid #E5E7EB',
                      borderRadius: '12px',
                      background: '#FFFFFF',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      cursor: 'pointer',
                      boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
                    }}
                  />
                  <IconBtn
                    icon={updateIcon}
                    alt="Update"
                    tooltip="Update"
                    onClick={() => navigate(`/packages/edit/${pkg._id}`)}
                    btnStyle={{
                      width: '40px',
                      height: '40px',
                      border: '1px solid #E5E7EB',
                      borderRadius: '12px',
                      background: '#FFFFFF',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      cursor: 'pointer',
                      boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
                    }}
                  />
                  <button
                    type="button"
                    onClick={() => navigate(`/packages/view/${pkg._id}`)}
                    style={{
                      width: '200px',
                      height: '46px',
                      border: 'none',
                      borderRadius: '12px',
                      background: 'linear-gradient(180deg, #2563EB 0%, #1D4ED8 100%)',
                      color: '#FFFFFF',
                      fontSize: '15px',
                      fontWeight: 700,
                      cursor: 'pointer',
                      boxShadow: '0 4px 12px rgba(37, 99, 235, 0.3)',
                    }}
                  >
                    View Details
                  </button>
                </div>

                {/* Wishlist Heart Icon - Bottom Left */}
                <button
                  type="button"
                  onClick={() => toggleFavorite(pkg.id)}
                  style={{
                    position: 'absolute',
                    bottom: '8px',
                    left: '24px',
                    width: '40px',
                    height: '40px',
                    borderRadius: '50%',
                    background: 'rgba(255, 255, 255, 0.9)',
                    border: '1px solid #E5E7EB',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    cursor: 'pointer',
                    boxShadow: '0 2px 8px rgba(0,0,0,0.15)',
                  }}
                >
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12 21.35L10.55 20.03C5.4 15.36 2 12.28 2 8.5C2 5.42 4.42 3 7.5 3C9.24 3 10.91 3.81 12 5.09C13.09 3.81 14.76 3 16.5 3C19.58 3 22 5.42 22 8.5C22 12.28 18.6 15.36 13.45 20.04L12 21.35Z" stroke="#EF4444" strokeWidth="1.8" fill={favorites[pkg.id] ? '#EF4444' : 'none'} />
                  </svg>
                </button>
                </div>
              </div>
          ))}
        </div>
      </section>
    </main>
  )

  if (embedLayout) {
    return mainContent
  }

  return (
    <div
      style={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        background: 'linear-gradient(180deg, #FFFFFF 0%, #A0DBFF 100%)',
      }}
    >
      <Header />
      {mainContent}
      <Footer />
    </div>
  )
}