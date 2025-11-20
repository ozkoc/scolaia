import { NavLink, Outlet, Route, Routes, Navigate } from 'react-router-dom'
import './App.css'
import { LandingPage } from './pages/LandingPage'
import { ActivitiesPage } from './pages/ActivitiesPage'
import { ActivityDetailPage } from './pages/ActivityDetailPage'

const AppLayout = () => (
  <div className="app-shell">
    <header className="site-header">
      <NavLink to="/" className="site-logo">
        Scolaia
      </NavLink>
      <nav>
        <NavLink to="/" end>
          Home
        </NavLink>
        <NavLink to="/activities">Activities</NavLink>
      </nav>
      <a className="link-button ghost" href="#askia" onClick={(e) => e.preventDefault()}>
        Request a demo
      </a>
    </header>
    <main className="site-main">
      <Outlet />
    </main>
    <footer className="site-footer">
      <p>© {new Date().getFullYear()} Askia by Scolaia. Built for teacher planning labs.</p>
    </footer>
  </div>
)

function App() {
  return (
    <Routes>
      <Route element={<AppLayout />}>
        <Route index element={<LandingPage />} />
        <Route path="activities" element={<ActivitiesPage />} />
        <Route path="activities/:activityId" element={<ActivityDetailPage />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Route>
    </Routes>
  )
}

export default App
