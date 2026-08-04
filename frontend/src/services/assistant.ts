import { api } from "./api";

export interface AskAssistantRequest {
  query: string;
  recipe_title?: string;
  current_step?: string;
}

export interface AskAssistantResponse {
  answer: string;
  source?: string;
}

export interface SubstituteRequest {
  ingredient: string;
}

export interface SubstituteResponse {
  original: string;
  substitute: string;
  explanation: string;
  cost_impact: string;
}

export async function askAssistant(data: AskAssistantRequest): Promise<AskAssistantResponse> {
  const response = await api.post<AskAssistantResponse>("assistant/ask/", data);
  return response.data;
}

export async function getSubstitution(data: SubstituteRequest): Promise<SubstituteResponse> {
  const response = await api.post<SubstituteResponse>("assistant/substitute/", data);
  return response.data;
}
