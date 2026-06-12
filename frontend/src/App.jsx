import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import AddNewPackage from './pages/AddNewPackage.jsx'
import SucessPackage from './pages/SucessPackage.jsx'
import UserPackages from './pages/UserPackages.jsx'
import AdminPackages from './pages/AdminPackages.jsx'
import PackageView from './pages/PackageView.jsx'
import CreateAD from './pages/CreateAD.jsx'

class App extends React.Component {
  render() {
    return (
      <BrowserRouter>
        <Routes>
          {/* New route for viewing a single package */}
          <Route path="/packages/view/:id" element={<PackageView />} />

          {/* Default route now opens AddNewPackages */}
          <Route path="/" element={<AdminPackages />} />

          {/* Packages list page */}
          <Route path="/packages" element={<AdminPackages />} />

          {/* Explicit add new package route */}
          <Route path="/packages/new" element={<AddNewPackage />} />
          <Route path="/packages/edit/:id" element={<AddNewPackage />} />

          {/* Success page */}
          <Route path="/packages/success" element={<SucessPackage />} />
        </Routes>
      </BrowserRouter>
    )
  }
}

export default App
