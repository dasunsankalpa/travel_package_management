import React from 'react'
import Header from '../components/Header.jsx'
import Footer from '../components/Footer.jsx'

const categoryOptions = [
	'Beach Holidays',
	'Wildlife Safaris',
	'Cultural Heritage',
	'Wellness & Ayurveda',
	'Adventure Tours',
	'Luxury Escapes',
	'Family Vacations',
	'Budget & Short Trips',
	'Festivals & Events',
	'Eco & Nature',
]

function IconSearch() {
	return (
		<svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
			<circle cx="11" cy="11" r="6.5" stroke="#C7CDD7" strokeWidth="1.8" />
			<path d="M16 16L20.5 20.5" stroke="#C7CDD7" strokeWidth="1.8" strokeLinecap="round" />
		</svg>
	)
}

function IconFilter() {
	return (
		<svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
			<path d="M4 7H20" stroke="#6B7280" strokeWidth="1.8" strokeLinecap="round" />
			<path d="M4 11H16" stroke="#6B7280" strokeWidth="1.8" strokeLinecap="round" />
			<path d="M4 15H12" stroke="#6B7280" strokeWidth="1.8" strokeLinecap="round" />
		</svg>
	)
}

function IconPriceTag() {
	return (
		<svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
			<path d="M5 11.5L11.5 5H19V12.5L12.5 19L5 11.5Z" stroke="#6B7280" strokeWidth="1.8" strokeLinejoin="round" />
			<circle cx="15.25" cy="8.75" r="1.25" fill="#6B7280" />
		</svg>
	)
}

function IconChevron() {
	return (
		<svg width="14" height="14" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
			<path d="M6 9L12 15L18 9" stroke="#C1C7D0" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
		</svg>
	)
}

function IconPlus() {
	return (
		<svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
			<circle cx="12" cy="12" r="10" fill="white" opacity="0.22" />
			<path d="M12 7V17" stroke="white" strokeWidth="1.8" strokeLinecap="round" />
			<path d="M7 12H17" stroke="white" strokeWidth="1.8" strokeLinecap="round" />
		</svg>
	)
}

export default function Packages({ embedLayout = false }) {
	const [isCategoryOpen, setIsCategoryOpen] = React.useState(false)
	const categoryDropdownRef = React.useRef(null)

	React.useEffect(() => {
		const handleOutsideClick = event => {
			if (!isCategoryOpen) {
				return
			}

			if (categoryDropdownRef.current && !categoryDropdownRef.current.contains(event.target)) {
				setIsCategoryOpen(false)
			}
		}

		document.addEventListener('mousedown', handleOutsideClick)
		return () => document.removeEventListener('mousedown', handleOutsideClick)
	}, [isCategoryOpen])

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
								All Categories
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
							{categoryOptions.map(category => (
								<div
									key={category}
									style={{
										padding: '10px 14px',
										fontSize: '13px',
										color: '#334155',
										lineHeight: 1.2,
									}}
								>
									{category}
								</div>
							))}
							</div>
						)}
					</div>

						<button
							type="button"
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
							}}
						>
							<span style={{ display: 'inline-flex', alignItems: 'center', gap: '10px' }}>
								<IconPriceTag />
								All Prices
							</span>
							<IconChevron />
						</button>
					</div>
				</div>

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
						Showing <span style={{ fontWeight: 700, color: '#111827' }}>9 Packages</span>
					</p>

					<button 
						type="button" 
						style={{
							height: '42px',
							padding: '0 18px',
							border: '0',
							borderRadius: '8px',
							background: 'linear-gradient(180deg, #0B72E8 100%)',
							color: '#FFFFFF',
							fontSize: '14px',
							fontWeight: 600,
							display: 'inline-flex',
							alignItems: 'center',
							gap: '10px',
							boxShadow: '0 10px 18px rgba(11, 114, 232, 0.28)',
						}}
					>
						<IconPlus />
						Add new Package
					</button>
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
