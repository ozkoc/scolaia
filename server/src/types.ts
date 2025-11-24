export type Tag = string;

export interface Activity {
  id: string;
  title: string;
  summary: string;
  description: string;
  tags: Tag[];
  gradeBand: string;
  subject: string;
  duration: string;
  imageUrl: string;
  objectives: string[];
  materials: string[];
  steps: string[];
}

export interface CommunityTopic {
  id: string;
  title: string;
  summary: string;
  tags: Tag[];
  url: string;
}

export interface PartnerResource {
  id: string;
  name: string;
  description: string;
  url: string;
  focus: string;
}

export interface ChatRequest {
  messages: Array<{
    role: 'user' | 'assistant'
    content: string
  }>
}

export interface ChatResponse {
  reply: string
}

export type DiscussionAuthorRole = 'teacher' | 'coach' | 'askia';

export interface DiscussionMessage {
  id: string;
  authorRole: DiscussionAuthorRole;
  authorName: string;
  authorProfileId?: string;
  timestamp: string;
  content: string;
  upvotes: number;
}

export interface TeacherProfile {
  id: string;
  name: string;
  role: string;
  school: string;
  location: string;
  bio: string;
  expertise: string[];
  avatarUrl: string;
}

export interface CommunityDiscussion {
  topicId: string;
  guidingPrompt: string;
  summary: string;
  messages: DiscussionMessage[];
}

export interface Event {
  id: string;
  title: string;
  description: string;
  startTime: string;  // ISO string
  endTime: string;    // ISO string
  topic: string;
  focusAreas: string[];
  language: 'de' | 'en';
  targetAudience: string;
  mode: 'online' | 'onsite' | 'hybrid';
  location: string;
  host: string;
  imageUrl: string;
  registrationUrl?: string;
}

export interface TeacherStageTalk {
  id: string;
  title: string;
  description: string;
  highlight: string;
  scheduledAt: string;
  duration: string;
  mode: 'online' | 'onsite' | 'hybrid';
  location: string;
  teacherName: string;
  teacherRole: string;
  school: string;
  tags: string[];
  imageUrl: string;
  registrationUrl?: string;
}
