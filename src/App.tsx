import { NavLink, Outlet, Route, Routes, Navigate } from 'react-router-dom'
import './App.css'
import './styles/partners-banner.css'
import { LandingPage } from './pages/LandingPage'
import { ActivitiesPage } from './pages/ActivitiesPage'
import { ActivityDetailPage } from './pages/ActivityDetailPage'
import { EventDetailPage } from './pages/EventDetailPage'
import { TeacherOnStagePage } from './pages/TeacherOnStagePage'
import { WorkShadowingPage } from './pages/WorkShadowingPage'
import { TeachersHubPage } from './pages/TeachersHubPage'
import { EventsPage } from './pages/EventsPage'
import { PartnersPage } from './pages/PartnersPage'


const AppLayout = () => (
  <div className="app-shell">
    <header className="site-header">
      <NavLink to="/" className="site-logo">
        <span className="brand-highlight">Scolaia</span>
      </NavLink>
      <nav>
        <NavLink to="/" end>
          Home
        </NavLink>
        <NavLink to="/work-shadowing">Work Shadowing</NavLink>
        <NavLink to="/activities">Activities</NavLink>
        <NavLink to="/teacher-on-stage">Teacher on Stage</NavLink>
        <NavLink to="/teachers-hub">Teachers Hub</NavLink>
        <NavLink to="/events">Events</NavLink>
        <NavLink to="/partners">Partners & Tools</NavLink>
      </nav>
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
        <Route path="teacher-on-stage" element={<TeacherOnStagePage />} />
        <Route path="work-shadowing" element={<WorkShadowingPage />} />
        <Route path="teachers-hub" element={<TeachersHubPage />} />
        <Route path="events" element={<EventsPage />} />
        <Route path="events/:id" element={<EventDetailPage />} />
        <Route path="partners" element={<PartnersPage />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Route>
    </Routes>
  )
}

export default App
