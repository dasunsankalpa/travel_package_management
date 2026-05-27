import React from 'react'
import Header from '../components/Header.jsx'
import Footer from '../components/Footer.jsx'

class AddNewPackeges extends React.Component {
  renderContent() {
    return (
      <main
        style={{
          flex: 1,
          minHeight: '156vh',
          background: 'linear-gradient(180deg, #FFFFFF 0%, #A0DBFF 100%)',
        }}
      />
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