import React from 'react'
import Header from '../components/Header.jsx'
import Footer from '../components/Footer.jsx'
import sigiriyaImage from '../assets/sigiriya.png'

export default function SucessPackages({ embedLayout = false }) {
	const mainContent = (
		<main
			style={{
				flex: 1,
				minHeight: '100vh',
				background: 'linear-gradient(180deg, #FFFFFF 0%, #A0DBFF 100%)',
				paddingTop: '180px',
				paddingBottom: '80px',
			}}
		>
			<div style={{ maxWidth: '980px', margin: '0 auto', padding: '0 24px' }}>
				<div style={{ textAlign: 'center', marginBottom: '28px' }}>
					<div
						style={{
							width: '60px',
							height: '60px',
							margin: '0 auto 14px',
							borderRadius: '999px',
							background: '#C7EBD1',
							border: '2px solid #8BC89D',
							display: 'flex',
							alignItems: 'center',
							justifyContent: 'center',
							color: '#2F855A',
							fontSize: '30px',
							fontWeight: 700,
						}}
					>
						✓
					</div>
					<h1
						style={{
							margin: 0,
							fontSize: '32px',
							fontWeight: 700,
							color: '#111827',
							fontFamily: "'Inter', sans-serif",
						}}
					>
						Package Published Successfully !
					</h1>
					<p
						style={{
							margin: '6px 0 0',
							fontSize: '16px',
							color: '#6B7280',
							fontFamily: "'Inter', sans-serif",
						}}
					>
						Your Travel Package Is Now Live And Visible To Users.
					</p>
				</div>

				<div
					style={{
						background: '#FFFFFF',
						borderRadius: '10px',
						border: '1px solid #D9E2EC',
						boxShadow: '0 12px 32px rgba(15, 23, 42, 0.08)',
						padding: '18px',
					}}
				>
					<div
						style={{
							display: 'grid',
							gridTemplateColumns: '360px 1fr',
							gap: '20px',
							alignItems: 'center',
						}}
					>
						<div
							style={{
								background: '#F3F4F6',
								borderRadius: '10px',
								overflow: 'hidden',
								height: '250px',
								display: 'flex',
								alignItems: 'center',
								justifyContent: 'center',
							}}
						>
							<img
								src={sigiriyaImage}
								alt="Sigiriya"
								style={{ width: '100%', height: '100%', objectFit: 'cover' }}
							/>
						</div>

						<div>
							<div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: '16px' }}>
								<div>
									<h2
										style={{
											margin: 0,
											fontSize: '24px',
											fontWeight: 700,
											color: '#111827',
											fontFamily: "'Inter', sans-serif",
										}}
									>
										Cultural Triangle Explorer
									</h2>
									<div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginTop: '6px', color: '#6B7280' }}>
										<span style={{ fontSize: '16px' }}>👤</span>
										<span style={{ fontSize: '16px' }}>Sri Lanka</span>
									</div>
								</div>
								<div
									style={{
										fontSize: '18px',
										fontWeight: 700,
										color: '#111827',
										fontFamily: "'Inter', sans-serif",
									}}
								>
									$764.15
								</div>
							</div>

							<div style={{ height: '1px', background: '#E5E7EB', margin: '16px 0' }} />

							<p
								style={{
									margin: 0,
									color: '#6B7280',
									fontSize: '15px',
									lineHeight: 1.6,
									fontFamily: "'Inter', sans-serif",
								}}
							>
								Professional, licensed driver with 15+ years experience. Air-
								conditioned luxury vehicles, English speaking, island-wide tours
								available. Specializing in airport transfers and multi-day tours.
							</p>
						</div>
					</div>

					<div
						style={{
							display: 'grid',
							gridTemplateColumns: '1fr 1fr 1fr',
							gap: '16px',
							marginTop: '22px',
						}}
					>
						<button
							type="button"
							style={{
								height: '40px',
								borderRadius: '8px',
								background: '#2563EB',
								color: '#FFFFFF',
								border: 'none',
								fontSize: '15px',
								fontWeight: 600,
								cursor: 'pointer',
							}}
						>
							View Package
						</button>
						<button
							type="button"
							style={{
								height: '40px',
								borderRadius: '8px',
								background: '#F3F4F6',
								color: '#6B7280',
								border: 'none',
								fontSize: '15px',
								fontWeight: 600,
								cursor: 'pointer',
							}}
						>
							Edit Package
						</button>
						<button
							type="button"
							style={{
								height: '40px',
								borderRadius: '8px',
								background: '#FACC15',
								color: '#111827',
								border: 'none',
								fontSize: '15px',
								fontWeight: 600,
								cursor: 'pointer',
							}}
						>
							Share Package
						</button>
					</div>
				</div>
			</div>
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
