import { IProjectRepository } from '../../../../core/domain/repositories/IProjectRepository';
import { DrillingProject, ProjectStatus } from '../../../../core/domain/entities/drillingProject.entity';
import { db } from '../connection';

export class MariaDbProjectRepository implements IProjectRepository {
  async findById(id: string): Promise<DrillingProject | null> {
    // Logic truy vấn MariaDB để tìm dự án bằng id
    const projects = await db.query('SELECT * FROM projects WHERE id = ?', [id]);
    if (!projects.length) return null;
    
    const project = projects[0];
    return this.mapToEntity(project);
  }

  async findByClientId(clientId: string): Promise<DrillingProject[]> {
    const projects = await db.query('SELECT * FROM projects WHERE client_id = ?', [clientId]);
    return projects.map(this.mapToEntity);
  }

  async create(projectData: Omit<DrillingProject, 'id' | 'status' | 'startDate'>): Promise<DrillingProject> {
    const { clientId, location, expectedDepth } = projectData;
    // Logic để tạo dự án mới trong MariaDB
    const result = await db.query(
      'INSERT INTO projects (client_id, address, latitude, longitude, expected_depth, status, start_date) VALUES (?, ?, ?, ?, ?, ?, ?)', 
      [clientId, location.address, location.latitude, location.longitude, expectedDepth, 'pending', new Date()]
    );

    const newProject: DrillingProject = {
      id: result.insertId,
      clientId,
      location,
      expectedDepth,
      status: 'pending',
      startDate: new Date(),
    };
    return newProject;
  }
  
  async updateStatus(id: string, status: ProjectStatus): Promise<DrillingProject | null> {
    // Check if project exists
    const project = await this.findById(id);
    if (!project) return null;
    
    // Update status
    await db.query('UPDATE projects SET status = ? WHERE id = ?', [status, id]);
    
    // Return updated project
    return {
      ...project,
      status
    };
  }
  
  private mapToEntity(dbProject: any): DrillingProject {
    return {
      id: dbProject.id,
      clientId: dbProject.client_id,
      location: {
        address: dbProject.address,
        latitude: dbProject.latitude,
        longitude: dbProject.longitude
      },
      expectedDepth: dbProject.expected_depth,
      actualDepth: dbProject.actual_depth,
      status: dbProject.status as ProjectStatus,
      startDate: new Date(dbProject.start_date),
      completionDate: dbProject.completion_date ? new Date(dbProject.completion_date) : undefined
    };
  }
}