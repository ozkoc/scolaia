import { useState } from 'react'
import { Video, Users, Calendar, CheckCircle, ArrowRight, ChevronDown, ChevronUp } from 'lucide-react'
import { Section } from '../components/Section'
import { workShadowingPrograms } from '../data/workShadowingPrograms'

const DEFAULT_SYLLABUS = [
  {
    week: 'Week 0',
    title: 'Kick-off & Goal Setting',
    duration: '30–45 minutes',
    description: 'Welcome, orientation, and individual goal setting.',
    icon: Calendar,
    details: [
      'Welcome & orientation',
      'Individual learning goals',
      'Overview of the 4-week structure',
      'Short input: Why online observations can outperform on-site visits',
      'Technical onboarding',
    ],
  },
  {
    week: 'Week 1',
    title: 'Live Observation (Partner School)',
    duration: '60–75 minutes',
    description: 'Partner school joins via Zoom. Analysis of live/pre-recorded clips.',
    icon: Video,
    details: [
      'A partner school joins via Zoom/Teams',
      'They present a short live or pre-recorded teaching clip (3–8 minutes)',
      'Structured live analysis: What do we notice? Which routines/structures are visible? What is the pedagogical intention?',
      'Mini-breakout: "What can I transfer to my classroom this week?"',
      'School Q&A with 2–3 teachers',
      'Asynchronous: Short reflection (10 minutes)',
    ],
    value: ['Authentic insight without travel', 'Many teachers observe simultaneously'],
  },
  {
    week: 'Week 2',
    title: 'Live Deep Dive: Q&A + Thematic Exploration',
    duration: '60 minutes',
    description: 'Topic-focused Q&A with a school team or expert.',
    icon: Users,
    details: [
      'Topic-focused Q&A with a school team or expert',
      'Possible themes: Differentiation, Classroom management, SEL / restorative practices, Team teaching',
      'Interactive poll: group selects the most relevant challenges',
      'Asynchronous: Mini implementation: Apply one idea (5–10 minutes)',
    ],
    value: ['Schools become active partners', 'Teachers get direct, pressure-free access to expertise'],
  },
  {
    week: 'Week 3',
    title: 'Live Video Analysis Workshop ("Joint Coding")',
    duration: '75 minutes',
    description: 'Guided analysis of teaching moves & "What would you do here?"',
    icon: Video,
    details: [
      'Participants watch the same short teaching clip (5–10 minutes)',
      'Guided analysis: Annotate key moments, Identify effective teaching moves, Discuss: "What would you do here?"',
      'Breakouts: Groups of 3–4 teachers, Structured protocol to sharpen observation skills',
    ],
    value: ['Deep pedagogical analysis', 'High professional growth'],
  },
  {
    week: 'Week 4',
    title: 'Final Demo Lesson + Transfer & Scaling',
    duration: '60–75 minutes',
    description: 'Final demo lesson, didactic breakdown, and classroom transfer strategy.',
    icon: CheckCircle,
    details: [
      'A teacher (partner school or facilitator) demonstrates a micro-lesson or model routine',
      'Followed by a didactic breakdown: Why this method? What research supports it? Pitfalls and variations. Adaptation for different age groups',
      'Final reflection round: "What changed in my classroom over these 4 weeks?" "How will I share this with colleagues?"',
      'Optional: Certificate of completion',
    ],
    value: ['Immediate practical relevance', 'Clear, sustainable next steps'],
  },
]

const PILLARS = [
  {
    title: 'Customer Focus',
    description: 'Simple and straightforward for teachers.',
    color: 'pink',
  },
  {
    title: 'Collaboration First',
    description: 'Interactive development is the basis of the platform.',
    color: 'green',
  },
  {
    title: 'Infrastructure',
    description: 'Seamless digital process from registration to live sessions.',
    color: 'blue',
  },
  {
    title: 'Quality',
    description: 'High-quality courses showcasing innovative schools.',
    color: 'green',
  },
]

export const WorkShadowingPage = () => {
  const [expandedWeek, setExpandedWeek] = useState<string | null>(null)
  const [selectedProgram, setSelectedProgram] = useState<string | null>(null)
  const [showRegistrationForm, setShowRegistrationForm] = useState(false)
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    school: '',
    teachingExperience: '',
    purpose: '',
    expectations: '',
    additionalComments: '',
  })

  const toggleWeek = (week: string) => {
    setExpandedWeek(expandedWeek === week ? null : week)
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmitRegistration = (e: React.FormEvent) => {
    e.preventDefault()
    console.log('Registration submitted:', formData)
    // Handle form submission here (e.g., send to API)
    alert('Registration submitted successfully!')
    setShowRegistrationForm(false)
    setFormData({
      name: '',
      email: '',
      school: '',
      teachingExperience: '',
      purpose: '',
      expectations: '',
      additionalComments: '',
    })
  }

  const getIcon = (week: string) => {
    if (week.includes('0')) return Calendar
    if (week.includes('1')) return Video
    if (week.includes('2')) return Users
    return CheckCircle
  }

  const currentSyllabus = selectedProgram
    ? workShadowingPrograms.find((p) => p.id === selectedProgram)?.syllabus || DEFAULT_SYLLABUS
    : DEFAULT_SYLLABUS

  const handleProgramClick = (programId: string) => {
    setSelectedProgram(programId)
    setExpandedWeek(null)
  }

  const handleBackToPrograms = () => {
    setSelectedProgram(null)
    setExpandedWeek(null)
    setShowRegistrationForm(false)
  }

  return (
    <div className="work-shadowing-page">
      <section className="hero work-shadowing-hero">
        <div className="hero-content">
          <p className="eyebrow">Digital Professional Development</p>
          <h1>Germany's First Digital Work-Shadowing Network</h1>
          <p className="lead">
            Authentic school insights, video analysis, and peer learning—without the travel.
          </p>
        </div>
      </section>

      {!selectedProgram ? (
        <>
          <Section
            title="Work Shadowing Programs"
            description="Choose a program to explore its structure and content."
            className="content-section--wide"
          >
            <div className="grid grid-activities">
              {workShadowingPrograms.map((program) => (
                <div
                  key={program.id}
                  className="card activity-card"
                  onClick={() => handleProgramClick(program.id)}
                  style={{ cursor: 'pointer' }}
                >
                  <div className="activity-card__media">
                    <img src={program.imageUrl} alt={program.title} />
                  </div>
                  <div className="activity-card__content">
                    <h3 className="activity-card__title">{program.title}</h3>
                    <p className="activity-card__meta">{program.duration}</p>
                    <p>{program.theme}</p>
                    <div className="activity-card__actions">
                      <button className="link-button">
                        View Program <ArrowRight size={16} style={{ marginLeft: '0.25rem' }} />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </Section>

          <Section
            title="Our Core Values"
            description="The strategic pillars that define our approach to digital work shadowing."
            className="content-section--wide"
          >
            <div className="pillars-grid">
              {PILLARS.map((pillar, index) => (
                <div key={index} className={`pillar-card pillar-card--${pillar.color}`}>
                  <h3>{pillar.title}</h3>
                  <p>{pillar.description}</p>
                </div>
              ))}
            </div>
          </Section>
        </>
      ) : (
        <>
          <Section
            title={workShadowingPrograms.find((p) => p.id === selectedProgram)?.title || 'Program Details'}
            description="A structured journey from onboarding to classroom transfer. Click on a week to see details."
          >
            <button
              onClick={handleBackToPrograms}
              className="link-button"
              style={{ marginBottom: '1.5rem' }}
            >
              ← Back to Programs
            </button>
            <div className="syllabus-timeline">
              {currentSyllabus.map((item, index) => {
                const isExpanded = expandedWeek === item.week
                const Icon = getIcon(item.week)
                return (
                  <div key={index} className="timeline-item">
                    <div className="timeline-marker">
                      <div className="timeline-icon">
                        <Icon size={20} />
                      </div>
                      {index !== currentSyllabus.length - 1 && <div className="timeline-line" />}
                    </div>
                    <div
                      className={`timeline-content ${isExpanded ? 'timeline-content--expanded' : ''}`}
                      onClick={() => toggleWeek(item.week)}
                      role="button"
                      tabIndex={0}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter' || e.key === ' ') {
                          toggleWeek(item.week)
                        }
                      }}
                    >
                      <div className="timeline-header">
                        <span className="timeline-week">{item.week}</span>
                        <div className="timeline-meta">
                          <span className="timeline-duration">{item.duration}</span>
                          {isExpanded ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                        </div>
                      </div>
                      <h3>{item.title}</h3>
                      <p>{item.description}</p>

                      {isExpanded && (
                        <div className="timeline-details">
                          <ul>
                            {item.details.map((detail, i) => (
                              <li key={i}>{detail}</li>
                            ))}
                          </ul>
                          {item.value && (
                            <div className="timeline-value">
                              <strong>Value:</strong>
                              <ul>
                                {item.value.map((val, i) => (
                                  <li key={i}>{val}</li>
                                ))}
                              </ul>
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                  </div>
                )
              })}
            </div>

            {!showRegistrationForm ? (
              <div style={{ textAlign: 'center', marginTop: '2rem' }}>
                <button
                  onClick={() => setShowRegistrationForm(true)}
                  className="btn btn--primary"
                  style={{
                    padding: '1rem 2rem',
                    fontSize: '1.125rem',
                    fontWeight: 600,
                    borderRadius: '8px',
                    border: 'none',
                    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                    color: 'white',
                    cursor: 'pointer',
                    transition: 'transform 0.2s',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'scale(1.05)'
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'scale(1)'
                  }}
                >
                  Register for This Program
                </button>
              </div>
            ) : (
              <div
                style={{
                  marginTop: '2rem',
                  padding: '2rem',
                  background: '#f8f9fa',
                  borderRadius: '12px',
                  maxWidth: '700px',
                  margin: '2rem auto',
                }}
              >
                <h3 style={{ marginBottom: '1.5rem', textAlign: 'center' }}>Program Registration</h3>
                <form onSubmit={handleSubmitRegistration}>
                  <div style={{ marginBottom: '1.25rem' }}>
                    <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 600 }}>
                      Full Name *
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      required
                      style={{
                        width: '100%',
                        padding: '0.75rem',
                        borderRadius: '6px',
                        border: '1px solid #ddd',
                        fontSize: '1rem',
                      }}
                    />
                  </div>

                  <div style={{ marginBottom: '1.25rem' }}>
                    <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 600 }}>
                      Email *
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                      style={{
                        width: '100%',
                        padding: '0.75rem',
                        borderRadius: '6px',
                        border: '1px solid #ddd',
                        fontSize: '1rem',
                      }}
                    />
                  </div>

                  <div style={{ marginBottom: '1.25rem' }}>
                    <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 600 }}>
                      School / Institution *
                    </label>
                    <input
                      type="text"
                      name="school"
                      value={formData.school}
                      onChange={handleInputChange}
                      required
                      style={{
                        width: '100%',
                        padding: '0.75rem',
                        borderRadius: '6px',
                        border: '1px solid #ddd',
                        fontSize: '1rem',
                      }}
                    />
                  </div>

                  <div style={{ marginBottom: '1.25rem' }}>
                    <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 600 }}>
                      Years of Teaching Experience *
                    </label>
                    <input
                      type="text"
                      name="teachingExperience"
                      value={formData.teachingExperience}
                      onChange={handleInputChange}
                      required
                      placeholder="e.g., 5 years"
                      style={{
                        width: '100%',
                        padding: '0.75rem',
                        borderRadius: '6px',
                        border: '1px solid #ddd',
                        fontSize: '1rem',
                      }}
                    />
                  </div>

                  <div style={{ marginBottom: '1.25rem' }}>
                    <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 600 }}>
                      Purpose of Attending This Program *
                    </label>
                    <textarea
                      name="purpose"
                      value={formData.purpose}
                      onChange={handleInputChange}
                      required
                      rows={4}
                      placeholder="Please describe your goals and what you hope to achieve..."
                      style={{
                        width: '100%',
                        padding: '0.75rem',
                        borderRadius: '6px',
                        border: '1px solid #ddd',
                        fontSize: '1rem',
                        fontFamily: 'inherit',
                      }}
                    />
                  </div>

                  <div style={{ marginBottom: '1.25rem' }}>
                    <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 600 }}>
                      What Are Your Expectations? *
                    </label>
                    <textarea
                      name="expectations"
                      value={formData.expectations}
                      onChange={handleInputChange}
                      required
                      rows={4}
                      placeholder="What do you expect to learn or experience during this program?"
                      style={{
                        width: '100%',
                        padding: '0.75rem',
                        borderRadius: '6px',
                        border: '1px solid #ddd',
                        fontSize: '1rem',
                        fontFamily: 'inherit',
                      }}
                    />
                  </div>

                  <div style={{ marginBottom: '1.25rem' }}>
                    <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 600 }}>
                      Additional Comments or Questions
                    </label>
                    <textarea
                      name="additionalComments"
                      value={formData.additionalComments}
                      onChange={handleInputChange}
                      rows={3}
                      placeholder="Any other information you'd like to share..."
                      style={{
                        width: '100%',
                        padding: '0.75rem',
                        borderRadius: '6px',
                        border: '1px solid #ddd',
                        fontSize: '1rem',
                        fontFamily: 'inherit',
                      }}
                    />
                  </div>

                  <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', marginTop: '2rem' }}>
                    <button
                      type="button"
                      onClick={() => setShowRegistrationForm(false)}
                      style={{
                        padding: '0.75rem 1.5rem',
                        borderRadius: '6px',
                        border: '1px solid #ddd',
                        background: 'white',
                        cursor: 'pointer',
                        fontSize: '1rem',
                      }}
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      style={{
                        padding: '0.75rem 1.5rem',
                        borderRadius: '6px',
                        border: 'none',
                        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                        color: 'white',
                        cursor: 'pointer',
                        fontSize: '1rem',
                        fontWeight: 600,
                      }}
                    >
                      Submit Registration
                    </button>
                  </div>
                </form>
              </div>
            )}
          </Section>
        </>
      )}
    </div>
  )
}
