
export interface Project {
  id: number;
  name: string;
  description?: string;
  category: string;
  isPublic: boolean;    
  createdAt?: string;
}
