import { CreateProjectUseCase } from '../../core/use-cases/project/createProject';
import { GetAllProjectsUseCase } from '../../core/use-cases/project/getAllProjects';

export class ProjectController {
  constructor(
    private readonly createProjectUseCase: CreateProjectUseCase,
    private readonly getAllProjectsUseCase: GetAllProjectsUseCase
  ) {}

  async createProject(context: { body: { 
    clientId: string; 
    location: { address: string; latitude: number; longitude: number; };
    expectedDepth: number; 
  } }) {
    try {
      const project = await this.createProjectUseCase.execute(context.body);
      return { status: 201, body: project };
    } catch (error: any) {
      // Có thể log lỗi chi tiết ở đây
      return { status: 400, body: { message: error.message } };
    }
  }

  async getAllProjects() {
    try {
      const projects = await this.getAllProjectsUseCase.execute();
      return { status: 200, body: projects };
    } catch (error: any) {
      // Có thể log lỗi chi tiết ở đây
      return { status: 500, body: { message: error.message } };
    }
  }
}
