import { DrillingProject, ProjectStatus } from '../entities/drillingProject.entity';

export interface IProjectRepository {
  findById(id: string): Promise<DrillingProject | null>;
  findByClientId(clientId: string): Promise<DrillingProject[]>;
  create(project: Omit<DrillingProject, 'id' | 'status' | 'startDate'>): Promise<DrillingProject>;
  updateStatus(id: string, status: ProjectStatus): Promise<DrillingProject | null>;
}