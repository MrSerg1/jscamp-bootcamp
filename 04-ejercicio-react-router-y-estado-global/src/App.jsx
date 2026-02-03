import { Header } from './components/Header.jsx'
import { Footer } from './components/Footer.jsx'
import { Routes, Route } from 'react-router'
import { lazy, Suspense } from 'react'

import Waiting from './components/Waiting.jsx'


const JobDetail = lazy(() => import('./pages/Detail.jsx'))
const HomePage = lazy(() => import('./pages/Home.jsx'))
const SearchPage = lazy(() => import('./pages/Search.jsx'))

function App() {
  return (
    <>
      <Header />
      <Suspense fallback={<Waiting />}>
      <Routes>
       <Route path="/" element={<HomePage />} />
       <Route path="/search" element={<SearchPage />} />
       <Route path="/job/:id" element={<JobDetail />} />
      </Routes>
      </Suspense>
      <Footer />
    </>
  )
}

export default App
