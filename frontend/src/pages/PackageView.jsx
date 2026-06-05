import React, { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import Header from '../components/Header.jsx'
import Footer from '../components/Footer.jsx'

export default function PackageView() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [pkg, setPkg] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    fetch(`http://localhost:5000/api/packages/${id}`)
      .then(res => res.json())
      .then(({ data }) => {
        if (!data) throw new Error('Package not found')
        setPkg(data)
      })
      .catch(err => setError(err.message))
      .finally(() => setLoading(false))
  }, [id])

  if (loading) return (
    <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '18px', color: '#6B7280' }}>
      Loading...
    </div>
  )

  if (error || !pkg) return (
    <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '18px', color: '#EF4444' }}>
      {error || 'Package not found'}
    </div>
  )

  const bi = pkg.BasicInformation || {}
  const lh = pkg.LocationAndHighlights || {}
  const itinerary = pkg.DayByDayItinerary || []
  const agency = pkg.AgencyContactInformation || {}
  const heroImage = lh.images?.[0] || null
  const highlights = Array.isArray(lh.highlights) ? lh.highlights : lh.highlights?.split('\n').filter(Boolean) ?? []

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', background: 'linear-gradient(180deg, #FFFFFF 0%, #A0DBFF 100%)' }}>
      <Header />
      <main style={{ flex: 1, paddingTop: '110px', paddingBottom: '140px' }}>

        {/* Hero */}
        <section style={{ position: 'relative', overflow: 'hidden', boxShadow: '0 18px 40px rgba(15,23,42,0.18)' }}>
          <div
            style={{
              height: '460px',
              backgroundImage: heroImage
                ? `linear-gradient(90deg, rgba(17,24,39,0.65) 0%, rgba(17,24,39,0.2) 55%, rgba(17,24,39,0) 100%), url(${heroImage})`
                : 'linear-gradient(90deg, #1e3a5f, #2563EB)',
              backgroundSize: 'cover',
              backgroundPosition: 'center',
            }}
          />
          <button
            onClick={() => navigate(-1)}
            style={{ position: 'absolute', top: '18px', left: '22px', display: 'inline-flex', alignItems: 'center', gap: '8px', color: '#F8FAFC', fontSize: '18px', background: 'none', border: 'none', cursor: 'pointer' }}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none"><path d="M15 6L9 12L15 18" stroke="#F8FAFC" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
            Back
          </button>
          <div style={{ position: 'absolute', left: '28px', bottom: '22px', color: '#F8FAFC', padding: '40px 12px' }}>
            <h1 style={{ margin: 0, fontSize: '38px', fontWeight: 700 }}>{bi.title || 'Untitled Package'}</h1>
            <div style={{ marginTop: '8px', display: 'flex', gap: '16px', fontSize: '16px' }}>
              {bi.duration && (
                <span style={{ display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none"><path d="M8 2H16V6H8V2ZM5 8H19V20C19 21.1 18.1 22 17 22H7C5.9 22 5 21.1 5 20V8Z" fill="#E2E8F0" /></svg>
                  {bi.duration}
                </span>
              )}
              {bi.groupSize && (
                <span style={{ display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none"><path d="M12 12C14.21 12 16 10.21 16 8C16 5.79 14.21 4 12 4C9.79 4 8 5.79 8 8C8 10.21 9.79 12 12 12ZM12 14C8.69 14 6 16.69 6 20H18C18 16.69 15.31 14 12 14Z" fill="#E2E8F0" /></svg>
                  {bi.groupSize}
                </span>
              )}
              {bi.difficulty && (
                <span style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', textTransform: 'capitalize' }}>
                  {bi.difficulty}
                </span>
              )}
            </div>
          </div>
        </section>

        {/* Body */}
        <section style={{ maxWidth: '1160px', margin: '24px auto 0', padding: '0 24px', display: 'grid', gridTemplateColumns: '1.5fr 0.6fr', gap: '24px' }}>

          {/* Left */}
          <div>
            <h2 style={{ margin: 0, fontSize: '26px', fontWeight: 700, color: '#111827', paddingTop: '20px', paddingBottom: '20px' }}>About This Package</h2>
            <p style={{ margin: '12px 0 0', color: '#6B7280', fontSize: '16px', lineHeight: 1.7, paddingBottom: '40px' }}>
              {bi.description || 'No description available.'}
            </p>

            {lh.destination && (
              <p style={{ margin: '0 0 24px', fontSize: '16px', color: '#374151' }}>
                <strong>Destination:</strong> {lh.destination}
              </p>
            )}

            {highlights.length > 0 && (
              <>
                <h3 style={{ margin: '0 0 12px', fontSize: '20px', fontWeight: 700, color: '#111827' }}>Package Highlights</h3>
                <ul style={{ margin: '0 0 32px', paddingLeft: '20px', color: '#6B7280', fontSize: '15px', lineHeight: 2 }}>
                  {highlights.map((h, i) => <li key={i}>{h}</li>)}
                </ul>
              </>
            )}

            {itinerary.length > 0 && (
              <>
                <h3 style={{ margin: '22px 0 24px', fontSize: '25px', fontWeight: 700, color: '#111827' }}>Day by Day Itinerary</h3>
                <div style={{ background: '#F3FAFF', borderRadius: '16px', padding: '16px', boxShadow: '0 10px 24px rgba(15,23,42,0.08)', display: 'flex', flexDirection: 'column', gap: '10px' }}>
                  {itinerary.map((item, i) => (
                    <div key={i} style={{ background: '#D9FBE5', borderRadius: '12px', padding: '14px 16px', boxShadow: 'inset 0 0 0 1px rgba(34,197,94,0.18)' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: item.activities?.length ? '10px' : 0 }}>
                        <div style={{ width: '26px', height: '26px', borderRadius: '999px', background: '#C7D2FE', color: '#1D4ED8', fontSize: '12px', fontWeight: 700, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                          {item.day}
                        </div>
                        <div>
                          <div style={{ fontSize: '15px', fontWeight: 700, color: '#166534' }}>Day {item.day}</div>
                          <div style={{ fontSize: '15px', color: '#4B5563' }}>{item.title}</div>
                        </div>
                      </div>
                      {item.description && <p style={{ margin: '0 0 8px 38px', fontSize: '14px', color: '#6B7280' }}>{item.description}</p>}
                      {item.activities?.length > 0 && (
                        <ul style={{ margin: '0', paddingLeft: '54px', fontSize: '14px', color: '#374151', lineHeight: 1.8 }}>
                          {item.activities.map((a, j) => <li key={j}>{a}</li>)}
                        </ul>
                      )}
                    </div>
                  ))}
                </div>
              </>
            )}
          </div>

          {/* Right sidebar */}
          <aside style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <div style={{ background: '#FFFFFF', borderRadius: '14px', padding: '18px', boxShadow: '0 10px 24px rgba(15,23,42,0.1)', border: '1px solid #E5E7EB' }}>
              <div style={{ fontSize: '16px', color: '#94A3B8', fontWeight: 600 }}>PER PERSON</div>
              <div style={{ marginTop: '6px', fontSize: '28px', fontWeight: 700, color: '#2563EB' }}>
                {bi.price != null ? `$${Number(bi.price).toFixed(2)}` : 'Price unavailable'}
              </div>
              {bi.categories?.length > 0 && (
                <div style={{ marginTop: '12px', display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                  {bi.categories.map(cat => (
                    <span key={cat} style={{ fontSize: '12px', background: '#EFF6FF', color: '#2563EB', padding: '3px 8px', borderRadius: '999px', textTransform: 'capitalize' }}>{cat}</span>
                  ))}
                </div>
              )}
              <button
                type="button"
                style={{ marginTop: '16px', width: '100%', height: '48px', borderRadius: '8px', background: '#2563EB', color: '#FFFFFF', border: 'none', fontSize: '16px', fontWeight: 600, cursor: 'pointer' }}
              >
                Book Now
              </button>
            </div>

            {(agency.agencyName || agency.email || agency.phone) && (
              <div style={{ background: '#FFFFFF', borderRadius: '11px', padding: '16px', boxShadow: '0 10px 24px rgba(15,23,42,0.08)', border: '1px solid #E5E7EB' }}>
                <div style={{ fontSize: '18px', fontWeight: 700, color: '#111827', marginBottom: '10px' }}>
                  {agency.agencyName || 'Contact Agency'}
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '15px', color: '#64748B' }}>
                  {agency.phone && (
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none"><path d="M6.62 10.79C8.06 13.62 10.38 15.94 13.21 17.38L15.41 15.18C15.68 14.91 16.08 14.82 16.43 14.94C17.55 15.31 18.75 15.5 20 15.5C20.55 15.5 21 15.95 21 16.5V20C21 20.55 20.55 21 20 21C10.61 21 3 13.39 3 4C3 3.45 3.45 3 4 3H7.5C8.05 3 8.5 3.45 8.5 4C8.5 5.25 8.69 6.45 9.06 7.57C9.18 7.92 9.09 8.32 8.82 8.59L6.62 10.79Z" fill="#94A3B8" /></svg>
                      <span>{agency.phone}</span>
                    </div>
                  )}
                  {agency.email && (
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none"><path d="M4 4H20C21.1 4 22 4.9 22 6V18C22 19.1 21.1 20 20 20H4C2.9 20 2 19.1 2 18V6C2 4.9 2.9 4 4 4ZM4 6V18H20V6L12 11L4 6Z" fill="#94A3B8" /></svg>
                      <span>{agency.email}</span>
                    </div>
                  )}
                </div>
              </div>
            )}
          </aside>
        </section>
      </main>
      <Footer />
    </div>
  )
}
