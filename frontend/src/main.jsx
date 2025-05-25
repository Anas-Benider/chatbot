import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import "./index.css"
import { BrowserRouter, Route, Routes } from 'react-router'
import HrPage from './HrPage.jsx'
import Layout from './Layout.jsx'
import UserPage from './UserPage.jsx'

createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<App />} />
        <Route path="/hr" element={<HrPage />} />
        <Route path='/user' element={<UserPage/>} />
      </Route>
    </Routes>
  </BrowserRouter>
)
