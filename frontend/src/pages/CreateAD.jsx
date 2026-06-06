import React from 'react'
import Header from '../components/Header.jsx'
import Footer from '../components/Footer.jsx'
import New from '../assets/New.png'


export default function SucessPackages({ embedLayout = false }) {
	const [titleQuery, setTitleQuery] = React.useState('')
	const [packageSuggestions, setPackageSuggestions] = React.useState([])
	const [isSuggestionsOpen, setIsSuggestionsOpen] = React.useState(false)
	const [selectedPackage, setSelectedPackage] = React.useState(null)
	const searchTimeoutRef = React.useRef(null)

	React.useEffect(() => {
		const query = titleQuery.trim()

		if (searchTimeoutRef.current) {
			clearTimeout(searchTimeoutRef.current)
		}

		if (!query) {
			setPackageSuggestions([])
			setIsSuggestionsOpen(false)
			setSelectedPackage(null)
			return undefined
		}

		searchTimeoutRef.current = setTimeout(async () => {
			try {
				const response = await fetch(`http://localhost:5000/api/packages/search?title=${encodeURIComponent(query)}`)
				const data = await response.json()
				setPackageSuggestions(data.data || [])
				setIsSuggestionsOpen(true)
			} catch (error) {
				setPackageSuggestions([])
				setIsSuggestionsOpen(false)
			}
		}, 250)

		return () => {
			if (searchTimeoutRef.current) {
				clearTimeout(searchTimeoutRef.current)
			}
		}
	}, [titleQuery])

	const handlePackageSelect = (packageItem) => {
		setSelectedPackage(packageItem)
		setTitleQuery(packageItem.title)
		setPackageSuggestions([])
		setIsSuggestionsOpen(false)
	}

	const formatPrice = (value) => {
		if (value === null || value === undefined || value === '') return 'Price unavailable'
		const numericValue = Number(value)
		return Number.isNaN(numericValue) ? String(value) : `$${numericValue.toFixed(2)}`
	}

	const formatSuggestionLine = (packageItem) => `Title : ${packageItem.title || 'Unavailable'} — Duration : ${packageItem.duration || 'Unavailable'} — Price : ${formatPrice(packageItem.price)} — Group Size : ${packageItem.groupSize || 'Unavailable'}`

	const main = (
		<main
			style={{
				minHeight: '100vh',
				background: 'linear-gradient(180deg, #FFFFFF 0%, #EAF6FF 100%)',
				paddingTop: 120,
				paddingBottom: 80,
				display: 'flex',
				justifyContent: 'center',
				alignItems: 'flex-start',
				fontFamily: "'Inter', sans-serif",
			}}
		>
			<div style={{ width: '920px', maxWidth: '95%', padding: '54px 28px' }}>
				<div style={{ textAlign: 'center', marginBottom: 28 }}>
                    <img
                        src={New}
                        alt="new"
                        style={{
                        width: 56,
                        height: 56,
                        marginBottom: 12,
                        display: 'block',
                        marginLeft: 'auto',
                        marginRight: 'auto',
                        }}
                    />
					<h1 style={{ margin: 0, fontSize: 32, fontWeight: 700, color: '#0F172A' }}>Create New Advertisement</h1>
					<p style={{ margin: '12px 0 0', fontSize: 16, color: '#64748B' }}>Set up a new promotional campaign for your travel packages</p>
				</div>

				<div
					style={{
						background: '#FFFFFF',
						borderRadius: 14,
						padding: 32,
						boxShadow: '0 18px 40px rgba(15, 23, 42, 0.08)',
						border: '1px solid rgba(2,6,23,0.04)',
						filter: 'grayscale(0.02) contrast(0.98)',
					}}
				>
					<form>
						<div style={{ marginBottom: 22 }}>
							<div style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 15, fontWeight: 600, color: '#334155', marginBottom: 10 }}>
								<svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
									<rect x="3" y="3" width="18" height="18" rx="2" stroke="#334155" strokeWidth="1.5"/>
									<path d="M8 9L16 9" stroke="#334155" strokeWidth="1.5" strokeLinecap="round"/>
									<path d="M8 12L12 12" stroke="#334155" strokeWidth="1.5" strokeLinecap="round"/>
									<path d="M8 15L14 15" stroke="#334155" strokeWidth="1.5" strokeLinecap="round"/>
								</svg>
								Advertisement Title
							</div>
							<input
								placeholder="Advertisement title"
								aria-label="Advertisement Title"
								value={titleQuery}
								onChange={(event) => {
									setTitleQuery(event.target.value)
									setSelectedPackage(null)
								}}
								onFocus={() => {
									if (packageSuggestions.length > 0) {
										setIsSuggestionsOpen(true)
									}
								}}
								onBlur={() => {
									window.setTimeout(() => setIsSuggestionsOpen(false), 150)
								}}
								style={{ width: '100%', height: 52, borderRadius: 10, border: '1px solid #E6EEF8', padding: '0 16px', fontSize: 16 }}
							/>
							{isSuggestionsOpen && packageSuggestions.length > 0 && (
								<div style={{ marginTop: 10, border: '1px solid #D9E6F5', borderRadius: 12, background: '#FFFFFF', boxShadow: '0 14px 30px rgba(15, 23, 42, 0.12)', overflow: 'hidden' }}>
									{packageSuggestions.map((packageItem) => (
										<button
											key={packageItem._id}
											type="button"
											onMouseDown={(event) => event.preventDefault()}
											onClick={() => handlePackageSelect(packageItem)}
											style={{
												width: '100%',
												textAlign: 'left',
												padding: '12px 16px',
												border: 'none',
												background: '#FFFFFF',
												cursor: 'pointer',
												borderBottom: '1px solid #EEF2F7',
												whiteSpace: 'nowrap',
												overflow: 'hidden',
												textOverflow: 'ellipsis',
											}}
										>
											<div style={{ fontSize: 14, fontWeight: 500, color: '#0F172A', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
												{formatSuggestionLine(packageItem)}
											</div>
										</button>
									))}
								</div>
							)}
							{selectedPackage && (
									<div style={{ marginTop: 12, padding: '10px 14px', borderRadius: 10, background: '#F8FAFC', border: '1px solid #D9E6F5', color: '#94A3B8', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', opacity: 0.7 }}>
										<div style={{ fontSize: 14, fontWeight: 500, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
											{formatSuggestionLine(selectedPackage)}
										</div>
								</div>
							)}
						</div>

						<div style={{ marginBottom: 22 }}>
							<div style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 15, fontWeight: 600, color: '#334155', marginBottom: 10 }}>
								<svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
									<path d="M8 7H16V9H8V7Z" fill="#334155"/>
									<path d="M8 11H16V13H8V11Z" fill="#334155"/>
									<path d="M8 15H12V17H8V15Z" fill="#334155"/>
									<rect x="4" y="4" width="16" height="16" rx="2" stroke="#334155" strokeWidth="1.5"/>
								</svg>
								Description
							</div>
							<textarea placeholder="Describe your promotional offer..." aria-label="Description" rows={4} style={{ width: '100%', borderRadius: 10, border: '1px solid #E6EEF8', padding: 14, fontSize: 16, resize: 'vertical' }} />
						</div>

						<div style={{ display: 'grid', gridTemplateColumns: '1fr 240px', gap: 18, alignItems: 'center', marginBottom: 22 }}>
							<div>
								<div style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 15, fontWeight: 600, color: '#334155', marginBottom: 10 }}>
									<svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
										<path d="M12 7L8 11L12 15" stroke="#334155" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
										<path d="M16 11H8" stroke="#334155" strokeWidth="1.5" strokeLinecap="round"/>
										<rect x="3" y="5" width="18" height="14" rx="2" stroke="#334155" strokeWidth="1.5"/>
									</svg>
									Advertisement Type
								</div>
								<select aria-label="Advertisement Type" style={{ width: '100%', height: 48, borderRadius: 10, border: '1px solid #E6EEF8', padding: '0 14px', fontSize: 16 }}>
									<option value="">Banner Ad</option>
								</select>
							</div>

							<div>
								<div style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 15, fontWeight: 600, color: '#334155', marginBottom: 10 }}>
									<svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
										<circle cx="12" cy="12" r="9" stroke="#334155" strokeWidth="1.5"/>
										<path d="M12 7L12 17" stroke="#334155" strokeWidth="1.5" strokeLinecap="round"/>
										<path d="M9 12L15 12" stroke="#334155" strokeWidth="1.5" strokeLinecap="round"/>
									</svg>
									Budget
								</div>
								<input placeholder="$500" aria-label="Budget" style={{ width: '100%', height: 48, borderRadius: 10, border: '1px solid #E6EEF8', padding: '0 14px', fontSize: 16 }} />
							</div>
						</div>

						<div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 18, marginBottom: 22 }}>
							<div>
								<div style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 15, fontWeight: 600, color: '#334155', marginBottom: 10 }}>
									<svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
										<rect x="3" y="5" width="18" height="15" rx="2" stroke="#334155" strokeWidth="1.5"/>
										<path d="M8 3V7" stroke="#334155" strokeWidth="1.5" strokeLinecap="round"/>
										<path d="M16 3V7" stroke="#334155" strokeWidth="1.5" strokeLinecap="round"/>
										<path d="M3 11H21" stroke="#334155" strokeWidth="1.5" strokeLinecap="round"/>
									</svg>
									Start Date
								</div>
								<input type="date" aria-label="Start Date" style={{ width: '100%', height: 48, borderRadius: 10, border: '1px solid #E6EEF8', padding: '0 14px', fontSize: 16 }} />
							</div>
							<div>
								<div style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 15, fontWeight: 600, color: '#334155', marginBottom: 10 }}>
									<svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
										<rect x="3" y="5" width="18" height="15" rx="2" stroke="#334155" strokeWidth="1.5"/>
										<path d="M8 3V7" stroke="#334155" strokeWidth="1.5" strokeLinecap="round"/>
										<path d="M16 3V7" stroke="#334155" strokeWidth="1.5" strokeLinecap="round"/>
										<path d="M3 11H21" stroke="#334155" strokeWidth="1.5" strokeLinecap="round"/>
									</svg>
									End Date
								</div>
								<input type="date" aria-label="End Date" style={{ width: '100%', height: 48, borderRadius: 10, border: '1px solid #E6EEF8', padding: '0 14px', fontSize: 16 }} />
							</div>
						</div>

						<div style={{ marginBottom: 24 }}>
							<div style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 15, fontWeight: 600, color: '#334155', marginBottom: 10 }}>
								<svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
									<rect x="3" y="5" width="18" height="14" rx="2" stroke="#334155" strokeWidth="1.5"/>
									<circle cx="9" cy="10" r="2" stroke="#334155" strokeWidth="1.5"/>
									<path d="M5 19L9 15L14 20L19 15L21 17" stroke="#334155" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
								</svg>
								Upload Advertisement Image
							</div>
							<label
								htmlFor="ad-image"
								style={{
									display: 'flex',
									alignItems: 'center',
									justifyContent: 'center',
									flexDirection: 'column',
									height: 170,
									borderRadius: 12,
									padding: 22,
									background: '#FBFDFF',
									border: '1px solid rgba(2,6,23,0.04)',
									boxShadow: '0 8px 22px rgba(2,6,23,0.06)',
									cursor: 'pointer',
									textAlign: 'center',
								}}
							>
								<svg width="22" height="22" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" style={{ marginBottom: 8 }}>
									<path d="M12 3V15" stroke="#0F172A" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
									<path d="M8 7L12 3L16 7" stroke="#0F172A" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
									<rect x="3" y="15" width="18" height="6" rx="2" stroke="#0F172A" strokeWidth="1.2" />
								</svg>
								<div style={{ color: '#0F172A', fontWeight: 600, fontSize: 16, marginTop: 4 }}>Drag and drop or click to upload</div>
								<div style={{ color: '#2563EB', fontSize: 14, marginTop: 8 }}>PNG, JPG, or PDF up to 10MB</div>
								<input id="ad-image" type="file" accept="image/*,application/pdf" style={{ display: 'none' }} />
							</label>
						</div>
								<div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '56px', gap: '68px' }}>
                                <button
                                    type="button"
                                    style={{
									padding: '14px 26px',
                                    borderRadius: 999,
                                    border: '1px solid #E6EEF8',
                                    background: '#FFFFFF',
                                    color: '#0F172A',
									fontSize: 15,
                                    fontWeight: 600,
                                    }}
                                >
                                    Cancel
                                </button>
                                <button
                                    type="button"
                                    style={{
									padding: '14px 26px',
                                    borderRadius: 999,
                                    border: '0',
                                    background: 'linear-gradient(180deg,#0B72E8 0%,#1A86FF 100%)',
                                    color: '#FFFFFF',
									fontSize: 15,
                                    fontWeight: 700,
                                    }}
                                >
                                    Create Advertisement
                                </button>
                                </div>

					</form>
				</div>
			</div>
		</main>
	)

	if (embedLayout) return main

	return (
		<div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', background: 'linear-gradient(180deg, #FFFFFF 0%, #EAF6FF 100%)' }}>
			<Header />
			{main}
			<Footer />
		</div>
	)
}
