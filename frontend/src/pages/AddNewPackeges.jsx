import React from 'react'
import Header from '../components/Header.jsx'
import Footer from '../components/Footer.jsx'

class AddNewPackeges extends React.Component {
  state = {
    selectedImages: [],
    duration: '',
    days: [{ title: '', description: '', activities: ['', '', ''] }],
    activeDay: 0,
  }

  getMaxDays = () => {
    const match = this.state.duration.match(/\d+/)
    return match ? parseInt(match[0], 10) : null
  }

  handleAddDay = () => {
    const max = this.getMaxDays()
    this.setState(prev => {
      if (max !== null && prev.days.length >= max) return null
      const days = [...prev.days, { title: '', description: '', activities: ['', '', ''] }]
      return { days, activeDay: days.length - 1 }
    })
  }

  handleDayField = (dayIndex, field, value) => {
    this.setState(prev => {
      const days = prev.days.map((d, i) => i === dayIndex ? { ...d, [field]: value } : d)
      return { days }
    })
  }

  handleAddActivity = (dayIndex) => {
    this.setState(prev => {
      const days = prev.days.map((d, i) => i === dayIndex ? { ...d, activities: [...d.activities, ''] } : d)
      return { days }
    })
  }

  handleRemoveActivity = (dayIndex, actIndex) => {
    this.setState(prev => {
      const days = prev.days.map((d, i) => i === dayIndex ? { ...d, activities: d.activities.filter((_, j) => j !== actIndex) } : d)
      return { days }
    })
  }

  handleActivityChange = (dayIndex, actIndex, value) => {
    this.setState(prev => {
      const days = prev.days.map((d, i) => {
        if (i !== dayIndex) return d
        const activities = d.activities.map((a, j) => j === actIndex ? value : a)
        return { ...d, activities }
      })
      return { days }
    })
  }

  handleImageChange = (event) => {
    const files = Array.from(event.target.files || [])
    this.setState({ selectedImages: files })
  }

  renderContent() {
    const { selectedImages, duration, days, activeDay } = this.state
    const max = this.getMaxDays()

    return (
      <main
        style={{
          flex: 1,
          minHeight: '320vh',
          background: 'linear-gradient(180deg, #FFFFFF 0%, #A0DBFF 100%)',
          paddingTop: '180px',
          paddingBottom: '80px',
        }}
      >
          <div >
            <h1 style={{ margin: '12px 180px', fontSize: '38px', fontWeight: 700, color: '#111827' }}>Add New Package</h1>
            <p style={{ margin: '0px 0px 70px 180px', color: '#6B7280', fontSize: '18px' }}>
              Create a new travel package for your agency
            </p>
          </div>
        <div style={{ maxWidth: '1325px', margin: '0 auto', padding: '0 24px' }}>

          <div
            style={{
              background: '#FFFFFF',
              borderRadius: '14px',
              padding: '26px',
              border: '1px solid #F3D2D9',
              boxShadow: '0 8px 24px rgba(15, 23, 42, 0.06)',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '18px' }}>
              <div
                style={{
                  width: '18px',
                  height: '18px',
                  borderRadius: '999px',
                  background: '#9CA3AF',
                  display: 'inline-flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#FFFFFF',
                  fontSize: '13px',
                  fontWeight: 700,
                }}
              >
                i
              </div>
              <h2 className="m-0 text-[23px] text-gray-900 font-bold">
                Basic Information
              </h2>
            </div>

            <div style={{ marginBottom: '18px' }}>
              <label style={{ display: 'block', fontSize: '18px', fontWeight: 600, color: '#374151', marginBottom: '6px' }}>
                Package Title
              </label>
              <input
                type="text"
                placeholder="e.g., Cultural Triangle Explorer"
                style={{
                  width: '100%',
                  height: '40px',
                  borderRadius: '8px',
                  border: '1px solid #E5E7EB',
                  padding: '0 12px',
                  fontSize: '16px',
                  color: '#111827',
                }}
              />
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, minmax(0, 1fr))', gap: '16px', marginBottom: '16px' }}>
              <div>
                <label style={{ display: 'block', fontSize: '18px', fontWeight: 600, color: '#374151', marginBottom: '6px' }}>
                  Category*
                </label>
                <select
                  defaultValue=""
                  style={{
                    width: '100%',
                    height: '40px',
                    borderRadius: '8px',
                    border: '1px solid #E5E7EB',
                    padding: '0 12px',
                    fontSize: '16px',
                    color: '#6B7280',
                    background: '#FFFFFF',
                  }}
                >
                  <option value="" disabled>
                    Select category
                  </option>
                </select>
              </div>
              <div>
                <label style={{ display: 'block', fontSize: '18px', fontWeight: 600, color: '#374151', marginBottom: '6px' }}>
                  Duration*
                </label>
                <input
                  type="text"
                  placeholder="e.g., 7 Days / 6 Nights"
                  value={duration}
                  onChange={e => {
                    const val = e.target.value
                    const match = val.match(/\d+/)
                    const max = match ? parseInt(match[0], 10) : null
                    this.setState(prev => ({
                      duration: val,
                      days: max !== null && prev.days.length > max ? prev.days.slice(0, max) : prev.days,
                      activeDay: max !== null && prev.activeDay >= max ? Math.max(0, max - 1) : prev.activeDay,
                    }))
                  }}
                  style={{
                    width: '100%',
                    height: '40px',
                    borderRadius: '8px',
                    border: '1px solid #E5E7EB',
                    padding: '0 12px',
                    fontSize: '16px',
                    color: '#111827',
                  }}
                />
              </div>
              <div>
                <label style={{ display: 'block', fontSize: '18px', fontWeight: 600, color: '#374151', marginBottom: '6px' }}>
                  Price (USD)*
                </label>
                <input
                  type="text"
                  style={{
                    width: '100%',
                    height: '40px',
                    borderRadius: '8px',
                    border: '1px solid #E5E7EB',
                    padding: '0 12px',
                    fontSize: '16px',
                    color: '#111827',
                  }}
                />
              </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, minmax(0, 1fr))', gap: '16px', marginBottom: '16px' }}>
              <div>
                <label style={{ display: 'block', fontSize: '18px', fontWeight: 600, color: '#374151', marginBottom: '6px' }}>
                  Group Size
                </label>
                <input
                  type="text"
                  placeholder="e.g., 2-15 people"
                  style={{
                    width: '100%',
                    height: '40px',
                    borderRadius: '8px',
                    border: '1px solid #E5E7EB',
                    padding: '0 12px',
                    fontSize: '16px',
                    color: '#111827',
                  }}
                />
              </div>
              <div>
                <label style={{ display: 'block', fontSize: '16px', fontWeight: 600, color: '#374151', marginBottom: '6px' }}>
                  Difficulty Level
                </label>
                <select
                  defaultValue=""
                  style={{
                    width: '100%',
                    height: '40px',
                    borderRadius: '8px',
                    border: '1px solid #E5E7EB',
                    padding: '0 12px',
                    fontSize: '14px',
                    color: '#6B7280',
                    background: '#FFFFFF',
                  }}
                >
                  <option value="" disabled>
                    Select difficulty
                  </option>
                </select>
              </div>
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '18px', fontWeight: 600, color: '#374151', marginBottom: '6px' }}>
                Description
              </label>
              <textarea
                placeholder="Detailed description of the package..."
                rows={4}
                style={{
                  width: '100%',
                  borderRadius: '8px',
                  border: '1px solid #E5E7EB',
                  padding: '10px 12px',
                  fontSize: '16px',
                  color: '#111827',
                  resize: 'none',
                }}
              />
            </div>
          </div>

          <div
            style={{
              marginTop: '40px',
              background: '#FFFFFF',
              borderRadius: '14px',
              padding: '26px',
              border: '1px solid #F3D2D9',
              boxShadow: '0 8px 24px rgba(15, 23, 42, 0.06)',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '18px' }}>
              <div
                style={{
                  width: '22px',
                  height: '22px',
                  display: 'inline-flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                  <path d="M12 3C8.13 3 5 6.13 5 10C5 15.25 12 21 12 21C12 21 19 15.25 19 10C19 6.13 15.87 3 12 3Z" stroke="#6B7280" strokeWidth="1.6" />
                  <circle cx="12" cy="10" r="2.5" stroke="#6B7280" strokeWidth="1.6" />
                </svg>
              </div>
              <h2 className="m-0 text-[23px] text-gray-900 font-bold">
                Location & Highlights
              </h2>
            </div>

            <div style={{ marginBottom: '18px' }}>
              <label style={{ display: 'block', fontSize: '18px', fontWeight: 600, color: '#374151', marginBottom: '6px' }}>
                Destination
              </label>
              <input
                type="text"
                placeholder="e.g., Kandy, Sigiriya, Ella"
                style={{
                  width: '100%',
                  height: '40px',
                  borderRadius: '8px',
                  border: '1px solid #E5E7EB',
                  padding: '0 12px',
                  fontSize: '16px',
                  color: '#111827',
                }}
              />
            </div>

            <div style={{ marginBottom: '8px' }}>
              <label style={{ display: 'block', fontSize: '18px', fontWeight: 600, color: '#374151', marginBottom: '6px' }}>
                Package Highlights
              </label>
            <textarea
              rows={4}
              placeholder={'• Visit Sigiriya Rock Fortress\n• Explore ancient temples\n• Scenic train journey'}
              style={{
                width: '100%',
                borderRadius: '8px',
                border: '1px solid #E5E7EB',
                padding: '10px 12px',
                fontSize: '16px',
                color: '#6B7280',
                resize: 'none',
              }}
            />
              <div style={{ marginTop: '6px', fontSize: '14px', color: '#9CA3AF' }}>
                Enter each highlight on a new line
              </div>
            </div>

            <div style={{ marginTop: '14px' }}>
              <label style={{ display: 'block', fontSize: '18px', fontWeight: 600, color: '#374151', marginBottom: '12px' }}>
                Upload Image
              </label>
              <label
                htmlFor="package-images"
                style={{
                  border: '2px dashed #B8C1CC',
                  borderRadius: '16px',
                  padding: '32px',
                  textAlign: 'center',
                  background: '#F9FAFB',
                  color: '#6B7280',
                  cursor: 'pointer',
                  display: 'block',
                }}
              >
                <input
                  id="package-images"
                  type="file"
                  accept="image/png, image/jpeg"
                  multiple
                  onChange={this.handleImageChange}
                  style={{ display: 'none' }}
                />
                {selectedImages.length > 0 ? (
                  <div style={{ fontSize: '14px', color: '#4B5563', textAlign: 'left' }}>
                    <div style={{ fontWeight: 600, marginBottom: '8px', color: '#374151' }}>Selected Files:</div>
                    {selectedImages.map((file) => (
                      <div key={`${file.name}-${file.size}`} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '6px 0', borderBottom: '1px solid #F3F4F6' }}>
                        <div style={{ display: 'flex', alignItems: 'center' }}>
                          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ marginRight: '10px' }}>
                            <rect x="3" y="3" width="18" height="18" rx="2" stroke="#6B7280" strokeWidth="2"/>
                            <circle cx="8.5" cy="8.5" r="1.5" fill="#6B7280"/>
                            <path d="M21 15L16 10L5 21" stroke="#6B7280" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                          </svg>
                          <span style={{ maxWidth: '200px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{file.name}</span>
                        </div>
                        <span style={{ color: '#9CA3AF' }}>{(file.size / 1024).toFixed(1)} KB</span>
                      </div>
                    ))}
                    <div style={{ marginTop: '12px', textAlign: 'center', color: '#2563EB', fontSize: '13px', fontWeight: 500 }}>Click again to change selection</div>
                  </div>
                ) : (
                  <>
                    <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '10px' }}>
                      <svg width="38" height="28" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                        <path d="M7 18C4.79 18 3 16.21 3 14C3 11.93 4.57 10.22 6.6 10.02C7.29 7.72 9.43 6 12 6C14.97 6 17.4 8.43 17.4 11.4V11.6H18C20.21 11.6 22 13.39 22 15.6C22 17.81 20.21 19.6 18 19.6H7" stroke="#111827" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                        <path d="M12 12V17" stroke="#111827" strokeWidth="1.5" strokeLinecap="round" />
                        <path d="M10 14L12 12L14 14" stroke="#111827" strokeWidth="1.5" strokeLinecap="round" />
                      </svg>
                    </div>
                    <div style={{ fontSize: '15px', color: '#374151' }}>Click to upload</div>
                    <div style={{ fontSize: '14px', color: '#9CA3AF' }}>images (max 5)</div>
                    <div style={{ fontSize: '14px', color: '#9CA3AF' }}>PNG, JPG up to 5MB each</div>
                  </>
                )}
              </label>
            </div>
          </div>

          <div
            style={{
              marginTop: '40px',
              background: '#FFFFFF',
              borderRadius: '14px',
              padding: '26px',
              border: '1px solid #F3D2D9',
              boxShadow: '0 8px 24px rgba(15, 23, 42, 0.06)',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '18px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <div style={{ width: '22px', height: '22px', display: 'inline-flex', alignItems: 'center', justifyContent: 'center' }}>
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                    <rect x="3" y="4" width="18" height="17" rx="2" stroke="#6B7280" strokeWidth="1.6" />
                    <path d="M8 3V6" stroke="#6B7280" strokeWidth="1.6" strokeLinecap="round" />
                    <path d="M16 3V6" stroke="#6B7280" strokeWidth="1.6" strokeLinecap="round" />
                    <path d="M3 9H21" stroke="#6B7280" strokeWidth="1.6" strokeLinecap="round" />
                  </svg>
                </div>
                <h2 className="m-0 text-[23px] text-gray-900 font-bold">Day-by-Day Itinerary</h2>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '4px', background: '#F9FAFB', border: '1px solid #E5E7EB', borderRadius: '8px', padding: '4px 8px' }}>
                  {days.map((_, i) => (
                    <button
                      key={i}
                      type="button"
                      onClick={() => this.setState({ activeDay: i })}
                      style={{
                        width: '28px', height: '28px', borderRadius: '6px', border: 'none',
                        background: activeDay === i ? '#2563EB' : 'transparent',
                        color: activeDay === i ? '#FFFFFF' : '#6B7280',
                        fontSize: '13px', fontWeight: 600, cursor: 'pointer',
                      }}
                    >
                      {i + 1}
                    </button>
                  ))}
                </div>
                <button
                  type="button"
                  onClick={this.handleAddDay}
                  disabled={max !== null && days.length >= max}
                  style={{
                    display: 'inline-flex', alignItems: 'center', gap: '8px',
                    padding: '8px 14px', borderRadius: '8px',
                    border: '1px solid #E5E7EB',
                    background: max !== null && days.length >= max ? '#F3F4F6' : '#FFFFFF',
                    color: max !== null && days.length >= max ? '#9CA3AF' : '#6B7280',
                    fontSize: '16px', fontWeight: 600, cursor: max !== null && days.length >= max ? 'not-allowed' : 'pointer',
                  }}
                >
                  <span style={{ fontSize: '18px' }}>+</span>
                  Add Day
                </button>
              </div>
            </div>

            {days.map((day, dayIndex) => dayIndex !== activeDay ? null : (
            <div
              key={dayIndex}
              style={{ border: '1px solid #F3A0C6', borderRadius: '12px', padding: '24px' }}
            >
              <div style={{ fontSize: '18px', fontWeight: 700, color: '#111827', marginBottom: '18px' }}>Day {dayIndex + 1}</div>

              <div style={{ marginBottom: '16px' }}>
                <label style={{ display: 'block', fontSize: '18px', fontWeight: 600, color: '#374151', marginBottom: '6px' }}>Day Title</label>
                <input
                  type="text"
                  placeholder="e.g., Arrival in Colombo"
                  value={day.title}
                  onChange={e => this.handleDayField(dayIndex, 'title', e.target.value)}
                  style={{ width: '100%', height: '40px', borderRadius: '8px', border: '1px solid #E5E7EB', padding: '0 12px', fontSize: '16px', color: '#111827' }}
                />
              </div>

              <div style={{ marginBottom: '16px' }}>
                <label style={{ display: 'block', fontSize: '18px', fontWeight: 600, color: '#374151', marginBottom: '6px' }}>Description</label>
                <textarea
                  placeholder="Describe What Happens On This Day......."
                  rows={3}
                  value={day.description}
                  onChange={e => this.handleDayField(dayIndex, 'description', e.target.value)}
                  style={{ width: '100%', borderRadius: '8px', border: '1px solid #E5E7EB', padding: '10px 12px', fontSize: '16px', color: '#111827', resize: 'none' }}
                />
              </div>

              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '10px' }}>
                <label style={{ display: 'block', fontSize: '18px', fontWeight: 600, color: '#374151' }}>Activities</label>
                <button
                  type="button"
                  onClick={() => this.handleAddActivity(dayIndex)}
                  style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '6px 12px', borderRadius: '8px', border: '1px solid #E5E7EB', background: '#FFFFFF', color: '#6B7280', fontSize: '15px', fontWeight: 600, cursor: 'pointer' }}
                >
                  <span style={{ fontSize: '16px' }}>+</span>
                  Add Activity
                </button>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr auto', gap: '12px', rowGap: '10px' }}>
                {day.activities.map((value, actIndex) => (
                  <React.Fragment key={actIndex}>
                    <input
                      type="text"
                      placeholder="Activity description"
                      value={value}
                      onChange={e => this.handleActivityChange(dayIndex, actIndex, e.target.value)}
                      style={{ width: '100%', height: '38px', borderRadius: '8px', border: '1px solid #E5E7EB', padding: '0 12px', fontSize: '15px', color: '#6B7280' }}
                    />
                    <button
                      type="button"
                      onClick={() => this.handleRemoveActivity(dayIndex, actIndex)}
                      style={{ background: 'none', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 0 }}
                      aria-label="Remove activity"
                    >
                      <svg width="18" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                        <path d="M4 7H20" stroke="#9CA3AF" strokeWidth="1.6" strokeLinecap="round" />
                        <path d="M10 11V17" stroke="#9CA3AF" strokeWidth="1.6" strokeLinecap="round" />
                        <path d="M14 11V17" stroke="#9CA3AF" strokeWidth="1.6" strokeLinecap="round" />
                        <path d="M6 7L7 20H17L18 7" stroke="#9CA3AF" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                        <path d="M9 7V4H15V7" stroke="#9CA3AF" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </button>
                  </React.Fragment>
                ))}
              </div>
            </div>
            ))}
          </div>

          <div
            style={{
              marginTop: '40px',
              background: '#FFFFFF',
              borderRadius: '14px',
              padding: '26px',
              border: '1px solid #F3D2D9',
              boxShadow: '0 8px 24px rgba(15, 23, 42, 0.06)',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '18px' }}>
              <div
                style={{
                  width: '20px',
                  height: '20px',
                  borderRadius: '999px',
                  background: '#6B7280',
                  display: 'inline-flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#FFFFFF',
                  fontSize: '13px',
                  fontWeight: 700,
                }}
              >
                i
              </div>
              <h2 className="m-0 text-[23px] text-gray-900 font-bold">
                Agency Contact Information
              </h2>
            </div>

            <div style={{ marginBottom: '18px' }}>
              <label style={{ display: 'block', fontSize: '18px', fontWeight: 600, color: '#374151', marginBottom: '6px' }}>
                Agency Name
              </label>
              <input
                type="text"
                placeholder="Your Travel Agency"
                style={{
                  width: '100%',
                  height: '40px',
                  borderRadius: '8px',
                  border: '1px solid #E5E7EB',
                  padding: '0 12px',
                  fontSize: '16px',
                  color: '#111827',
                }}
              />
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, minmax(0, 1fr))', gap: '16px' }}>
              <div>
                <label style={{ display: 'block', fontSize: '18px', fontWeight: 600, color: '#374151', marginBottom: '6px' }}>
                  Contact Email
                </label>
                <input
                  type="email"
                  placeholder="email@example.com"
                  style={{
                    width: '100%',
                    height: '40px',
                    borderRadius: '8px',
                    border: '1px solid #E5E7EB',
                    padding: '0 12px',
                    fontSize: '16px',
                    color: '#111827',
                  }}
                />
              </div>
              <div>
                <label style={{ display: 'block', fontSize: '18px', fontWeight: 600, color: '#374151', marginBottom: '6px' }}>
                  Contact Phone
                </label>
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                    height: '40px',
                    borderRadius: '8px',
                    border: '1px solid #E5E7EB',
                    padding: '0 12px',
                    background: '#FFFFFF',
                  }}
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                    <path d="M6.62 10.79C8.06 13.62 10.38 15.94 13.21 17.38L15.41 15.18C15.68 14.91 16.08 14.82 16.42 14.94C17.5 15.3 18.67 15.5 19.9 15.5C20.45 15.5 20.9 15.95 20.9 16.5V20.4C20.9 20.95 20.45 21.4 19.9 21.4C10.44 21.4 2.6 13.56 2.6 4.1C2.6 3.55 3.05 3.1 3.6 3.1H7.5C8.05 3.1 8.5 3.55 8.5 4.1C8.5 5.33 8.7 6.5 9.06 7.58C9.17 7.92 9.08 8.32 8.81 8.59L6.62 10.79Z" stroke="#9CA3AF" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                  <input
                    type="tel"
                    placeholder="+94 11 234 5678"
                    style={{
                      width: '100%',
                      border: 0,
                      outline: 'none',
                      fontSize: '16px',
                      color: '#111827',
                      background: 'transparent',
                    }}
                  />
                </div>
              </div>
            </div>
          </div>

          <div style={{ marginTop: '70px', display: 'flex', justifyContent: 'flex-end', gap: '40px' }}>
            <button
              type="button"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '10px',
                padding: '10px 22px',
                borderRadius: '8px',
                border: '1px solid #E5E7EB',
                background: '#FFFFFF',
                color: '#111827',
                fontSize: '15px',
                fontWeight: 600,
                boxShadow: '0 2px 6px rgba(15, 23, 42, 0.12)',
                cursor: 'pointer',
              }}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                <path d="M4 7H20" stroke="#6B7280" strokeWidth="1.6" strokeLinecap="round" />
                <path d="M7 4V10" stroke="#6B7280" strokeWidth="1.6" strokeLinecap="round" />
                <path d="M17 4V10" stroke="#6B7280" strokeWidth="1.6" strokeLinecap="round" />
                <rect x="4" y="6" width="16" height="14" rx="2" stroke="#6B7280" strokeWidth="1.6" />
              </svg>
              Save Draft
            </button>
            <button
              type="button"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '10px',
                padding: '10px 40px',
                borderRadius: '8px',
                border: '1px solid #E5E7EB',
                background: '#FFFFFF',
                color: '#111827',
                fontSize: '15px',
                fontWeight: 600,
                boxShadow: '0 2px 6px rgba(15, 23, 42, 0.12)',
                cursor: 'pointer',
              }}
            >
              Cancel
            </button>
            <button
              type="button"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '10px',
                padding: '10px 22px',
                borderRadius: '8px',
                border: '1px solid #2563EB',
                background: '#2563EB',
                color: '#FFFFFF',
                fontSize: '15px',
                fontWeight: 600,
                boxShadow: '0 3px 8px rgba(37, 99, 235, 0.35)',
                cursor: 'pointer',
              }}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                <path d="M4 7H20" stroke="#FFFFFF" strokeWidth="1.6" strokeLinecap="round" />
                <path d="M7 4V10" stroke="#FFFFFF" strokeWidth="1.6" strokeLinecap="round" />
                <path d="M17 4V10" stroke="#FFFFFF" strokeWidth="1.6" strokeLinecap="round" />
                <rect x="4" y="6" width="16" height="14" rx="2" stroke="#FFFFFF" strokeWidth="1.6" />
                <path d="M9 14H15" stroke="#FFFFFF" strokeWidth="1.6" strokeLinecap="round" />
              </svg>
              Publish Package
            </button>
          </div>
        </div>
      </main>
    )
  }

  render() {
    const { embedLayout = false } = this.props

    if (embedLayout) {
      return this.renderContent()
    }

    return (
      <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', background: 'linear-gradient(180deg, #FFFFFF 0%, #A0DBFF 100%)' }}>
        <Header />
        {this.renderContent()}
        <Footer />
      </div>
    )
  }
}

export default AddNewPackeges