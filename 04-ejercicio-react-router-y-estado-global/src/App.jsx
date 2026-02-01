import { Header } from './components/Header.jsx'
import { Footer } from './components/Footer.jsx'
import { JobDetail } from './pages/Detail.jsx'

import { HomePage } from './pages/Home.jsx'
import { SearchPage } from './pages/Search.jsx'
import { Routes, Route } from 'react-router'

function App() {
  return (
    <>
      <Header />
      <Routes>
       <Route path="/" element={<HomePage />} />
       <Route path="/search" element={<SearchPage />} />
       <Route path="/job/:id" element={<JobDetail />} />
      </Routes>
      <Footer />
    </>
  )
}

export default App
