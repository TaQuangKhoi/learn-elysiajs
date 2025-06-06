import { Elysia } from 'elysia';
import { MariaDbProjectRepository } from '../../infrastructure/data-sources/mariadb/repositories/MariaDbProjectRepository';
import { CreateProjectUseCase } from '../../core/use-cases/project/createProject';
import { GetAllProjectsUseCase } from '../../core/use-cases/project/getAllProjects';
import { ProjectController } from '../controllers/project.controller';
import { createProjectSchema } from '../models/project.model';

// 1. Khởi tạo các dependencies
const projectRepository = new MariaDbProjectRepository();
const createProjectUseCase = new CreateProjectUseCase(projectRepository);
const getAllProjectsUseCase = new GetAllProjectsUseCase(projectRepository);
const projectController = new ProjectController(createProjectUseCase, getAllProjectsUseCase);

// 2. Định nghĩa routes và inject dependencies
export const appRoutes = new Elysia()
  .decorate('projectController', projectController)
  .group('/api/v1', app => app
    .post('/projects', ({ body, projectController }) => projectController.createProject({ body }), {
      body: createProjectSchema
    })
    .get('/projects', ({ projectController }) => projectController.getAllProjects())
    // Thêm các routes khác cho dự án ở đây (VD: GET /projects/:id)
  );
