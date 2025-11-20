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

export interface BlogPost {
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
  prompt: string;
}

export interface ChatResponse {
  id: string;
  content: string;
}
