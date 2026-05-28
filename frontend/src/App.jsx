import React from 'react'
import Header from './components/Header.jsx'
import Footer from './components/Footer.jsx'
import AddNewPackeges from './pages/AddNewPackeges.jsx'
import SucessPackages from './pages/SucessPackages.jsx'
import PackageView from './pages/PackageView.jsx'

class App extends React.Component {
  render() {
    return (
      <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', background: 'linear-gradient(180deg, #FFFFFF 0%, #A0DBFF 100%)' }}>
        <Header />
        <PackageView embedLayout />
        <Footer />
      </div>
    )
  }
}

export default App
