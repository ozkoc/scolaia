import type { CommunityDiscussion } from '../types/content'

export const communityDiscussions: CommunityDiscussion[] = [
  {
    topicId: 'topic-fractions-joy',
    guidingPrompt: 'How do you keep discourse joyful when fractions create frustration?',
    summary: 'Teachers share sentence stems and critique norms that keep math studios brave yet rigorous.',
    messages: [
      {
        id: 'fractions-1',
        authorRole: 'teacher',
        authorName: 'Ms. Ramirez',
        authorProfileId: 'profile-ramirez',
        timestamp: '2024-10-12T14:15:00.000Z',
        content:
          'We post critique stems on the board ("Can you help me understand..." "What if we tried...") and rehearse them like a choral reading. Students love dramatizing what not to do first.',
        upvotes: 18,
      },
      {
        id: 'fractions-2',
        authorRole: 'coach',
        authorName: 'Caleb (Instructional Coach)',
        authorProfileId: 'profile-caleb',
        timestamp: '2024-10-12T16:45:00.000Z',
        content:
          'Co-planning tip: script 2-3 anticipated misconceptions and assign each group a "studio note" to investigate. It keeps revisions purposeful and slows down the rush to finish.',
        upvotes: 11,
      },
      {
        id: 'fractions-3',
        authorRole: 'askia',
        authorName: 'Askia',
        authorProfileId: 'profile-askia',
        timestamp: '2024-10-12T18:02:00.000Z',
        content:
          'Prompt students to draw the story of a fraction before touching numbers. When they explain the storyboard to a peer, capture quotes for an anchor chart of joyful math language.',
        upvotes: 9,
      },
    ],
  },
  {
    topicId: 'topic-cooperative-playbook',
    guidingPrompt: 'What norms keep cooperative learning from slipping into free riding?',
    summary: 'Role cards, micro-reflections, and public progress trackers surface contribution patterns early.',
    messages: [
      {
        id: 'coop-1',
        authorRole: 'teacher',
        authorName: 'Mr. Ellis',
        authorProfileId: 'profile-ellis',
        timestamp: '2024-09-04T15:10:00.000Z',
        content:
          'My grade 7 science teams tape mini Kanban boards to their lab trays. Seeing "Need Ideas" or "Testing" cards move gives quieter students an entry point to offer help.',
        upvotes: 21,
      },
      {
        id: 'coop-2',
        authorRole: 'coach',
        authorName: 'Tina (Coach)',
        authorProfileId: 'profile-tina',
        timestamp: '2024-09-04T16:05:00.000Z',
        content:
          'Try rotating a "process checker" role whose only job is to pause the group for 60-second self-assessment against norms. The pause acts like a system reboot.',
        upvotes: 13,
      },
      {
        id: 'coop-3',
        authorRole: 'askia',
        authorName: 'Askia',
        authorProfileId: 'profile-askia',
        timestamp: '2024-09-04T17:10:00.000Z',
        content:
          'Before roles rotate, ask each student to jot one "how I helped the team" sticky. These exit slips become artifacts for conferences and stop free riding from staying invisible.',
        upvotes: 10,
      },
    ],
  },
  {
    topicId: 'topic-askia-ai',
    guidingPrompt: 'When does AI coaching add value to planning time?',
    summary: 'Coaches describe when AI drafts openers, question ladders, or observation look-fors to speed up prep.',
    messages: [
      {
        id: 'ai-1',
        authorRole: 'coach',
        authorName: 'Riya (Coach)',
        authorProfileId: 'profile-riya',
        timestamp: '2024-11-02T12:30:00.000Z',
        content:
          'We start planning meetings with a 3-minute "Ask the AI" sprint where teams submit the same prompt. Comparing outputs surfaces the strongest criteria to keep and what to toss.',
        upvotes: 17,
      },
      {
        id: 'ai-2',
        authorRole: 'teacher',
        authorName: 'Ms. Jordan',
        authorProfileId: 'profile-jordan',
        timestamp: '2024-11-02T13:05:00.000Z',
        content:
          'AI helps me brainstorm culturally responsive hooks. I ask it for analogies tied to local landmarks, then vet the ideas with students before finalizing.',
        upvotes: 14,
      },
      {
        id: 'ai-3',
        authorRole: 'askia',
        authorName: 'Askia',
        authorProfileId: 'profile-askia',
        timestamp: '2024-11-02T13:45:00.000Z',
        content:
          'Use AI to draft observation look-fors aligned to the lesson goal. Coaches can then calibrate quickly on which look-fors reveal depth vs compliance.',
        upvotes: 12,
      },
    ],
  },
]
