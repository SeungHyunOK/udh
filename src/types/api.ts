// LLM Adventure API 응답 타입들 (실제 API 기반)

export interface NewGameResponse {
  success: boolean;
  data?: GameData;
  error?: string;
  message?: string;
}

export interface LoadGameResponse {
  success: boolean;
  data?: GameData | null;
  error?: string;
  message?: string;
}

export interface LoadInfoResponse {
  success: boolean;
  data?: GameInfo | null;
  error?: string;
  message?: string;
}

export interface SelectChoiceRequest {
  select: number; // API 스펙에 맞춰 "select"로 변경하고 타입을 number로 수정
}

export interface SelectChoiceResponse {
  success: boolean;
  data?: GameData;
  error?: string;
  message?: string;
}

export interface GameData {
  id: string;
  title: string;
  description: string;
  content: string;
  choices?: string[];
  current_state: string;
  created_at: string;
  updated_at: string;
}

export interface GameInfo {
  game_id: string;
  title: string;
  description: string;
  current_state: string;
  available_choices?: string[];
  progress: number;
  map?: string;
  items?: string;
  health?: number;
  choices?: string[];
  current_mood?: string;
  story_beats?: StoryBeat[];
  current_location?: string;
  monster?: string;
  sanity?: number;
  master_lore?: string;
  player_lore?: string;
  purification?: number;
  money?: number;
}

export interface MapNode {
  id: number;
  name: string;
  monster: string;
  items: string;
  lore: string;
}

export interface MapEdge {
  source: number;
  target: number;
}

export interface MapData {
  nodes: MapNode[];
  edges: MapEdge[];
}

export interface MonsterInfo {
  name: string;
  퇴치법: string;
  lore: string;
}

export interface MonsterData {
  monsters: MonsterInfo[];
}

export interface StoryBeat {
  speaker: string;
  text: string;
  type: string;
}

// API 에러 타입
export interface APIError {
  status: number;
  message: string;
  details?: any;
}

// API 응답 래퍼 타입
export interface APIResponse<T> {
  success: boolean;
  data?: T;
  error?: APIError;
  message?: string;
}
