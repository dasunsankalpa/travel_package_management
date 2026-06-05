import React from 'react'
import Header from '../components/Header.jsx'
import Footer from '../components/Footer.jsx'
import New from '../assets/New.png'


export default function SucessPackages({ embedLayout = false }) {
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
							<label style={{ display: 'block', fontSize: 15, fontWeight: 600, color: '#334155', marginBottom: 10 }}>Advertisement Title</label>
							<input placeholder="Advertisement title" aria-label="Advertisement Title" style={{ width: '100%', height: 52, borderRadius: 10, border: '1px solid #E6EEF8', padding: '0 16px', fontSize: 16 }} />
						</div>

						<div style={{ marginBottom: 22 }}>
							<label style={{ display: 'block', fontSize: 15, fontWeight: 600, color: '#334155', marginBottom: 10 }}>Description</label>
							<textarea placeholder="Describe your promotional offer..." aria-label="Description" rows={4} style={{ width: '100%', borderRadius: 10, border: '1px solid #E6EEF8', padding: 14, fontSize: 16, resize: 'vertical' }} />
						</div>

						<div style={{ display: 'grid', gridTemplateColumns: '1fr 240px', gap: 18, alignItems: 'center', marginBottom: 22 }}>
							<div>
								<label style={{ display: 'block', fontSize: 15, fontWeight: 600, color: '#334155', marginBottom: 10 }}>Advertisement Type</label>
								<select aria-label="Advertisement Type" style={{ width: '100%', height: 48, borderRadius: 10, border: '1px solid #E6EEF8', padding: '0 14px', fontSize: 16 }}>
									<option value="">Banner Ad</option>
								</select>
							</div>

							<div>
								<label style={{ display: 'block', fontSize: 15, fontWeight: 600, color: '#334155', marginBottom: 10 }}>Budget</label>
								<input placeholder="$500" aria-label="Budget" style={{ width: '100%', height: 48, borderRadius: 10, border: '1px solid #E6EEF8', padding: '0 14px', fontSize: 16 }} />
							</div>
						</div>

						<div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 18, marginBottom: 22 }}>
							<div>
								<label style={{ display: 'block', fontSize: 15, fontWeight: 600, color: '#334155', marginBottom: 10 }}>Start Date</label>
								<input type="date" aria-label="Start Date" style={{ width: '100%', height: 48, borderRadius: 10, border: '1px solid #E6EEF8', padding: '0 14px', fontSize: 16 }} />
							</div>
							<div>
								<label style={{ display: 'block', fontSize: 15, fontWeight: 600, color: '#334155', marginBottom: 10 }}>End Date</label>
								<input type="date" aria-label="End Date" style={{ width: '100%', height: 48, borderRadius: 10, border: '1px solid #E6EEF8', padding: '0 14px', fontSize: 16 }} />
							</div>
						</div>

						<div style={{ marginBottom: 24 }}>
							<label style={{ display: 'block', fontSize: 15, fontWeight: 600, color: '#334155', marginBottom: 10 }}>Upload Advertisement Image</label>
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
