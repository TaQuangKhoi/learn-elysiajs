export type ProjectStatus = 'pending' | 'in_progress' | 'completed' | 'cancelled';

export interface DrillingProject {
  id: string;
  clientId: string; // ID của khách hàng
  location: {
    address: string;
    latitude: number;
    longitude: number;
  };
  expectedDepth: number; // Độ sâu dự kiến (mét)
  actualDepth?: number;   // Độ sâu thực tế
  status: ProjectStatus;
  startDate: Date;
  completionDate?: Date;
}