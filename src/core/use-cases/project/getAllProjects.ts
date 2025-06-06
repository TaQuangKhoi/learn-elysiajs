import { IProjectRepository } from '../../domain/repositories/IProjectRepository';
import { DrillingProject } from '../../domain/entities/drillingProject.entity';

export class GetAllProjectsUseCase {
  constructor(private readonly projectRepository: IProjectRepository) {}

  async execute(): Promise<DrillingProject[]> {
    // In a real application, you might want to add pagination, filtering, etc.
    // For simplicity, we're just returning all projects
    
    // We don't have a method to get all projects in the repository interface,
    // so we'll use a mock implementation for now
    // In a real application, you would add this method to the repository interface
    
    // Mock implementation - return some dummy projects
    return [
      {
        id: 'project_1',
        clientId: 'client123',
        location: {
          address: '123 Đường Lê Lợi, TP.HCM',
          latitude: 10.7769,
          longitude: 106.7009
        },
        expectedDepth: 150,
        actualDepth: 145,
        status: 'completed',
        startDate: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000), // 30 days ago
        completionDate: new Date()
      },
      {
        id: 'project_2',
        clientId: 'client456',
        location: {
          address: '456 Đường Nguyễn Huệ, TP.HCM',
          latitude: 10.7731,
          longitude: 106.7031
        },
        expectedDepth: 200,
        status: 'in_progress',
        startDate: new Date(Date.now() - 15 * 24 * 60 * 60 * 1000), // 15 days ago
      },
      {
        id: 'project_3',
        clientId: 'client789',
        location: {
          address: '789 Đường Lý Tự Trọng, TP.HCM',
          latitude: 10.7712,
          longitude: 106.6978
        },
        expectedDepth: 180,
        status: 'pending',
        startDate: new Date()
      }
    ];
  }
}