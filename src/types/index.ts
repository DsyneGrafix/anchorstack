export interface VaultProduct {
  id: string;
  title: string;
  description: string;
  tier: 'free' | 'premium' | 'exclusive';
  url: string;
  category: string;
}

export interface Note {
  id: string;
  content: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface TimerSession {
  id: string;
  duration: number;
  completedAt: Date;
  type: 'focus' | 'break';
}
