import React from 'react'
import Header from '../components/Header.jsx'
import Footer from '../components/Footer.jsx'
import sigiriyaImage from '../assets/sigiriya.png'

export default function PackageView({ embedLayout = false }) {
	const mainContent = (
		<main
			style={{
				flex: 1,
				minHeight: '140vh',
				background: 'linear-gradient(180deg, #FFFFFF 0%, #A0DBFF 100%)',
				paddingTop: '110px',
				paddingBottom: '140px',
			}}
		>
			<section style={{ position: 'relative', overflow: 'hidden', boxShadow: '0 18px 40px rgba(15, 23, 42, 0.18)' }}>
				<div>
					<div
						style={{
							height: '460px',
							backgroundImage: `linear-gradient(90deg, rgba(17, 24, 39, 0.65) 0%, rgba(17, 24, 39, 0.2) 55%, rgba(17, 24, 39, 0) 100%), url(${sigiriyaImage})`,
							backgroundSize: 'cover',
							backgroundPosition: 'center',
						}}
					/>
					<div
						style={{
							position: 'absolute',
							top: '18px',
							left: '22px',
							display: 'inline-flex',
							alignItems: 'center',
							gap: '8px',
							color: '#F8FAFC',
							fontSize: '18px',
							fontFamily: "'Inter', sans-serif",
						}}
					>
						<svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
							<path d="M15 6L9 12L15 18" stroke="#F8FAFC" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
						</svg>
						Back
					</div>
					<div
						style={{
							position: 'absolute',
							left: '28px',
							bottom: '22px',
							color: '#F8FAFC',
							fontFamily: "'Inter', sans-serif",
                            padding: '40px 12px',
						}}
					>
						<h1 style={{ margin: 0, fontSize: '38px', fontWeight: 700 }}>Cultural Triangle Explorer</h1>
						<div style={{ marginTop: '8px', display: 'flex', gap: '16px', fontSize: '16px' }}>
							<span style={{ display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
								<svg width="14" height="14" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
									<path d="M12 17.27L18.18 21L16.54 13.97L22 9.24L14.81 8.63L12 2L9.19 8.63L2 9.24L7.46 13.97L5.82 21L12 17.27Z" fill="#FDE047" />
								</svg>
								4.9 (234 reviews)
							</span>
							<span style={{ display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
								<svg width="14" height="14" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
									<path d="M7 2H17V6H7V2ZM5 8H19V20C19 21.1 18.1 22 17 22H7C5.9 22 5 21.1 5 20V8ZM8 12H12V16H8V12Z" fill="#E2E8F0" />
								</svg>
								7 Days / 6 Nights
							</span>
							<span style={{ display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
								<svg width="14" height="14" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
									<path d="M12 12C14.21 12 16 10.21 16 8C16 5.79 14.21 4 12 4C9.79 4 8 5.79 8 8C8 10.21 9.79 12 12 12ZM12 14C8.69 14 6 16.69 6 20H18C18 16.69 15.31 14 12 14Z" fill="#E2E8F0" />
								</svg>
								2-12 people
							</span>
						</div>
					</div>
				</div>
			</section>

			<section
				style={{
					maxWidth: '1160px',
					margin: '24px auto 0',
					padding: '0 24px',
					display: 'grid',
					gridTemplateColumns: '1.5fr 0.6fr',
					gap: '24px',
				}}
			>
				<div>
					<h2 style={{ margin: 0, fontSize: '26px', fontWeight: 700, color: '#111827', fontFamily: "'Inter', sans-serif",
                        paddingTop: '20px',paddingBottom: '20px' }}>
						About This Package
					</h2>
					<p
						style={{
							margin: '12px 0 0',
							color: '#6B7280',
							fontSize: '16px',
							lineHeight: 1.7,
							fontFamily: "'Inter', sans-serif",
                            paddingBottom: '60px' 

						}}
					>
						Explore the rich history and cultural heritage of Sigiriya Rock Fortress, the stunning cave temples of
							Dambulla Cave Temple, and the ancient ruins of Polonnaruwa Ancient City. Journey through centuries of
							civilization as you witness magnificent architecture, sacred art, and timeless landscapes that tell the story of
							Sri Lanka's glorious past.
					</p>

					<h3 style={{ margin: '22px 0 12px', fontSize: '25px', fontWeight: 700, color: '#111827', fontFamily: "'Inter', sans-serif",
                        paddingBottom: '40px' 
                     }}>
						Day by Day Itinerary
					</h3>
					<div
						style={{
							background: '#F3FAFF',
							borderRadius: '16px',
							padding: '16px',
							boxShadow: '0 10px 24px rgba(15, 23, 42, 0.08)',
							display: 'flex',
							flexDirection: 'column',
							gap: '10px',
						}}
					>
						{[
							{ day: 'Day 1', detail: 'Arrival & Udawalawe' },
							{ day: 'Day 2', detail: 'Colombo To Sigiriya' },
							{ day: 'Day 3', detail: 'Sigiriya Rock Fortress' },
							{ day: 'Day 4', detail: 'Polonnaruwa Ancient City' },
							{ day: 'Day 5', detail: 'Kandy Temple Tour' },
							{ day: 'Day 6', detail: 'Tea Country Experience' },
							{ day: 'Day 7', detail: 'Departure' },
						].map((item) => (
							<div
								key={item.day}
								style={{
									background: '#D9FBE5',
									borderRadius: '12px',
									padding: '12px 16px',
									display: 'flex',
									alignItems: 'center',
									justifyContent: 'space-between',
									boxShadow: 'inset 0 0 0 1px rgba(34, 197, 94, 0.18)',
								}}
							>
								<div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
									<div
										style={{
											width: '26px',
											height: '26px',
											borderRadius: '999px',
											background: '#C7D2FE',
											color: '#1D4ED8',
											fontSize: '12px',
											fontWeight: 700,
											display: 'flex',
											alignItems: 'center',
											justifyContent: 'center',
										}}
									>
										1
									</div>
									<div>
										<div style={{ fontSize: '15px', fontWeight: 700, color: '#166534' }}>{item.day}</div>
										<div style={{ fontSize: '15px', color: '#4B5563' }}>{item.detail}</div>
									</div>
								</div>
								<svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
									<path d="M6 9L12 15L18 9" stroke="#166534" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
								</svg>
							</div>
						))}
					</div>
				</div>

				<aside style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
					<div
						style={{
							background: '#FFFFFF',
							borderRadius: '14px',
							padding: '18px',
							boxShadow: '0 10px 24px rgba(15, 23, 42, 0.1)',
							border: '1px solid #E5E7EB',
                            marginBottom: '-28px',
						}}
					>
						<div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
							<div style={{ fontSize: '16px', color: '#94A3B8', fontWeight: 600 }}>PER PERSON</div>
							<span
								style={{
									fontSize: '14px',
									color: '#16A34A',
									background: '#DCFCE7',
									padding: '2px 6px',
									borderRadius: '999px',
								}}
							>
								Save $134.85
							</span>
						</div>
						<div style={{ marginTop: '6px', fontSize: '28px', fontWeight: 700, color: '#2563EB' }}>$764.15</div>
						<div style={{ marginTop: '12px', fontSize: '18px', fontWeight: 700, color: '#111827' }}>What's included:</div>
						<ul style={{ listStyle: 'none', margin: '10px 0 0', padding: 0, display: 'flex', flexDirection: 'column', gap: '10px', color: '#64748B', fontSize: '15px' }}>
							{[
								'Airport transfers',
								'Accommodation in 4-star hotels',
								'Daily breakfast and dinner',
								'Professional English-speaking guide',
								'All entrance fees',
								'Air-conditioned transportation',
							].map((item) => (
								<li key={item} style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
									<svg width="14" height="14" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
										<circle cx="12" cy="12" r="10" stroke="#22C55E" strokeWidth="2" />
										<path d="M8 12L11 15L16 9" stroke="#22C55E" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
									</svg>
									<span>{item}</span>
								</li>
							))}
						</ul>
						<button
							type="button"
							style={{
								marginTop: '16px',
								width: '100%',
								height: '48px',
								borderRadius: '8px',
								background: '#2563EB',
								color: '#FFFFFF',
								border: 'none',
								fontSize: '16px',
								fontWeight: 600,
								cursor: 'pointer',
							}}
						>
							Book Now
						</button>
						<div style={{ fontSize: '20px', fontWeight: 400, color: '#111827',paddingTop: '30px' }}>Package Features</div>
						<ul style={{ listStyle: 'none', margin: '10px 0 0', padding: 0, display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '15px', color: '#64748B' }}>
							{['Free cancellation up to 24h', 'Instant confirmation', 'Small group experience'].map((item) => (
								<li key={item} style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
									<span style={{ width: '6px', height: '6px', borderRadius: '999px', background: '#94A3B8' }} />
									{item}
								</li>
							))}
						</ul>
					</div>

					<div
						style={{
							background: '#FFFFFF',
							borderRadius: '11px',
							padding: '16px',
							boxShadow: '0 10px 24px rgba(15, 23, 42, 0.08)',
							border: '1px solid #E5E7EB',
                            paddingTop: '30px',
						}}
					>
						<div style={{ fontSize: '18px', fontWeight: 700, color: '#111827' }}>Need Help?</div>
						<div style={{ marginTop: '10px', display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '15px', color: '#64748B' }}>
							<div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
								<svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
									<path d="M6.62 10.79C8.06 13.62 10.38 15.94 13.21 17.38L15.41 15.18C15.68 14.91 16.08 14.82 16.43 14.94C17.55 15.31 18.75 15.5 20 15.5C20.55 15.5 21 15.95 21 16.5V20C21 20.55 20.55 21 20 21C10.61 21 3 13.39 3 4C3 3.45 3.45 3 4 3H7.5C8.05 3 8.5 3.45 8.5 4C8.5 5.25 8.69 6.45 9.06 7.57C9.18 7.92 9.09 8.32 8.82 8.59L6.62 10.79Z" fill="#94A3B8" />
								</svg>
								Call Us
								<span style={{ marginLeft: 'auto' }}>+94 11 234 5678</span>
							</div>
							<div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
								<svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
									<path d="M4 4H20C21.1 4 22 4.9 22 6V18C22 19.1 21.1 20 20 20H4C2.9 20 2 19.1 2 18V6C2 4.9 2.9 4 4 4ZM4 6V18H20V6L12 11L4 6Z" fill="#94A3B8" />
								</svg>
								Email Us
								<span style={{ marginLeft: 'auto' }}>info@ceylontours.lk</span>
							</div>
						</div>
					</div>
				</aside>
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
