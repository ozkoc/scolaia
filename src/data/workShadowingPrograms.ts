export interface WorkShadowingProgram {
  id: string
  title: string
  theme: string
  duration: string
  imageUrl: string
  syllabus: {
    week: string
    title: string
    duration: string
    description: string
    details: string[]
    value?: string[]
  }[]
}

export const workShadowingPrograms: WorkShadowingProgram[] = [
  {
    id: 'high-impact-teaching',
    title: 'High-Impact Teaching Techniques',
    theme: 'Instructional strategies, modelling, checking for understanding, active learning',
    duration: '4–5 weeks',
    imageUrl: '/images/high_impact_teaching.png',
    syllabus: [
      {
        week: 'Week 0',
        title: 'Kick-off: Teaching Moves That Matter',
        duration: '30 minutes',
        description: 'Introduction to high-impact teaching moves and self-assessment.',
        details: [
          'Introduction to high-impact teaching moves',
          'Self-assessment of teaching style',
          'Program overview',
        ],
      },
      {
        week: 'Week 1',
        title: 'Observation: Modelling, Scaffolding & Checking for Understanding',
        duration: '75 minutes',
        description: 'Partner teacher delivers mini-lesson with structured analysis.',
        details: [
          'Partner teacher delivers a 6–10 min mini-lesson',
          'Structured analysis: clarity of explanations, modelling steps, formative assessment methods, scaffolding strategies',
          'Group discussion: "Which student groups benefit most?"',
          'Asynchronous (10 minutes): Try one modelling step in your own lesson',
        ],
      },
      {
        week: 'Week 2',
        title: 'Deep Dive: Questioning Strategies',
        duration: '45–60 minutes',
        description: 'Expert input on question quality and questioning techniques.',
        details: [
          'Expert input: "Question quality = teaching quality."',
          'Techniques: cold call / warm call, wait time, probing, higher-order questioning',
          'Teacher task: rewrite 5 questions using new strategies',
        ],
      },
      {
        week: 'Week 3',
        title: 'Video Workshop: Feedback in Action',
        duration: '60–75 minutes',
        description: 'Joint analysis of feedback types and micro-practice.',
        details: [
          'Joint analysis of a video clip: feedback types, immediate correction, positive reinforcement',
          'Breakouts: micro-practice (20 sec feedback challenge)',
        ],
      },
      {
        week: 'Week 4',
        title: 'Demo Lesson: Active Learning Structures',
        duration: '60 minutes',
        description: 'Partner teacher demonstrates active learning routine with breakdown.',
        details: [
          'Partner teacher demonstrates an active learning routine',
          'Didactic breakdown: why it works, variations, adaptations for age groups',
        ],
      },
      {
        week: 'Optional Week 5',
        title: 'Scaling Excellence',
        duration: '45 minutes',
        description: 'Teachers share implemented examples and collaborative refinement.',
        details: [
          'Teachers share implemented examples',
          'Collaborative refinement',
          'Optional coaching sessions',
        ],
      },
    ],
  },
  {
    id: 'classroom-management',
    title: 'Classroom Management Mastery',
    theme: 'Classroom management, routines, behavior guidance, positive culture',
    duration: '3 weeks (mixed 2–4 sessions)',
    imageUrl: '/images/classroom_management.png',
    syllabus: [
      {
        week: 'Week 0',
        title: 'Kick-off & Goal Setting',
        duration: '30–45 minutes',
        description: 'Welcome, orientation, and identifying classroom management challenges.',
        details: [
          'Welcome & program orientation',
          'Identifying participants\' classroom management challenges',
          'Overview of the 3-week structure',
          'Mini-input: "Management is clarity, not control."',
          'Technical onboarding',
        ],
      },
      {
        week: 'Week 1',
        title: 'Live Observation: Micro-Routines That Work',
        duration: '60 minutes',
        description: 'Partner school demonstrates effective routines and behavior guidance.',
        details: [
          'Partner school demonstrates effective routines (entry routine, transitions, attention signals)',
          'Teaching clip (4–6 minutes)',
          'Structured analysis: How does the teacher guide behavior? Which signals or cues are used? What invisible structures are present?',
          'Breakout: "Which single routine will I try this week?"',
          'Asynchronous (10 minutes): Short micro-implementation + reflection',
        ],
        value: ['Real examples of highly effective management practices'],
      },
      {
        week: 'Week 2',
        title: 'Deep Dive: De-escalation & Relationship-Based Management',
        duration: '45–60 minutes',
        description: 'Q&A with expert on de-escalation techniques and building relationships.',
        details: [
          'Q&A with expert or school team',
          'Themes: de-escalation techniques, building teacher–student relationships, tone and body language, low-energy strategies for high impact',
          'Group polling: biggest challenge?',
          'Discussion: "How does this strategy work with different age groups?"',
          'Asynchronous (5–10 minutes): Practical task - try a new calming or redirecting phrase',
        ],
      },
      {
        week: 'Week 3',
        title: 'Video Analysis Workshop: Handling Challenging Moments',
        duration: '75 minutes',
        description: 'Guided analysis of challenging behavior moments and alternative responses.',
        details: [
          'Short clip showing a challenging behavior moment',
          'Guided analysis: identify triggers, teacher tone + movement, alternative responses',
          'Breakouts (3–4 teachers): "What would you have done here?"',
        ],
        value: ['Sharpened management instincts & response strategies'],
      },
    ],
  },
  {
    id: 'best-practice-model',
    title: '4-Week Best Practice Model',
    theme: 'School insights, video analysis, peer learning, and practical implementation',
    duration: '4 weeks (one live session per week)',
    imageUrl: '/images/best_model.png',
    syllabus: [
      {
        week: 'Week 0',
        title: 'Kick-off & Goal Setting',
        duration: '30–45 minutes',
        description: 'Welcome, orientation, and individual goal setting.',
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
        details: [
          'A teacher (partner school or facilitator) demonstrates a micro-lesson or model routine',
          'Followed by a didactic breakdown: Why this method? What research supports it? Pitfalls and variations. Adaptation for different age groups',
          'Final reflection round: "What changed in my classroom over these 4 weeks?" "How will I share this with colleagues?"',
          'Optional: Certificate of completion',
        ],
        value: ['Immediate practical relevance', 'Clear, sustainable next steps'],
      },
    ],
  },
  {
    id: 'innovative-teaching',
    title: 'Innovative & Creative Teaching Mindset',
    theme: 'Innovation, creative pedagogy, tech-supported learning',
    duration: '2–4 weeks',
    imageUrl: '/images/inovative_thinking.jpg',
    syllabus: [
      {
        week: 'Week 0',
        title: 'Kick-off: Becoming an Innovative Educator',
        duration: '30–40 minutes',
        description: 'Defining innovative teaching and creativity self-reflection.',
        details: [
          'What defines an innovative teacher?',
          'Self-reflection: creativity map',
          'Overview of the program structure',
        ],
      },
      {
        week: 'Week 1',
        title: 'Observation: Creative Lesson Routines & EdTech in Action',
        duration: '60–70 minutes',
        description: 'Partner school presents innovative practice with analysis.',
        details: [
          'Partner school presents an innovative practice (AI feedback, gamification, mini project-based unit)',
          'Analysis: what makes the lesson innovative? student engagement signals, pedagogical rationale behind the tools',
        ],
      },
      {
        week: 'Week 2',
        title: 'Workshop: Design Thinking for Teachers',
        duration: '75 minutes',
        description: 'Mini teacher hackathon with 4-step design thinking structure.',
        details: [
          'Mini teacher hackathon',
          '4-step structure: Empathize → Define → Ideate → Prototype',
          'Teams design a fast classroom prototype',
          'Sharing: "How will I test this in my classroom?"',
          'Asynchronous (5–10 minutes): Run a small pilot in class',
        ],
      },
      {
        week: 'Week 3',
        title: 'Video Analysis: Identifying Innovative Practices',
        duration: '45–60 minutes',
        description: 'Joint coding of creative teaching techniques.',
        details: [
          'Clip: creative teaching technique (e.g., storytelling + problem solving)',
          'Joint coding: innovative element, cognitive load, evidence of learning',
        ],
      },
      {
        week: 'Optional Week 4',
        title: 'Demo & Showcase',
        duration: '60 minutes',
        description: 'Participants present mini-innovations with group feedback.',
        details: [
          'Participants present their own mini-innovations',
          'Group feedback & refinement',
          'Certificate + final reflection',
        ],
      },
    ],
  },
]
