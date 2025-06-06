import { Elysia } from 'elysia';
import { appRoutes } from './presentation/routes';
import { ProjectController } from './presentation/controllers/project.controller';
import { CreateProjectUseCase } from './core/use-cases/project/createProject';
import { GetAllProjectsUseCase } from './core/use-cases/project/getAllProjects';
import { MariaDbProjectRepository } from './infrastructure/data-sources/mariadb/repositories/MariaDbProjectRepository';

// Create dependencies for testing
const projectRepository = new MariaDbProjectRepository();
const createProjectUseCase = new CreateProjectUseCase(projectRepository);
const getAllProjectsUseCase = new GetAllProjectsUseCase(projectRepository);
const projectController = new ProjectController(createProjectUseCase, getAllProjectsUseCase);

// Create a test instance of the app
const testApp = new Elysia()
  .use(appRoutes);

// Simulate a POST request to create a new drilling project
const testCreateProject = async () => {
  console.log('Testing project creation...');

  const testData = {
    clientId: 'client123',
    location: {
      address: '123 Test Street, Test City',
      latitude: 10.123,
      longitude: 20.456
    },
    expectedDepth: 150
  };

  try {
    // Call the controller method directly
    const result = await projectController.createProject({ body: testData });

    console.log('Test result:', result);
    console.log('Test successful!');
  } catch (error) {
    console.error('Test failed:', error);
  }
};

// Simulate a GET request to retrieve all projects
const testGetAllProjects = async () => {
  console.log('\nTesting get all projects...');

  try {
    // Call the controller method directly
    const result = await projectController.getAllProjects();

    console.log('Test result:', result);
    console.log('Test successful!');
  } catch (error) {
    console.error('Test failed:', error);
  }
};

// Run the tests
const runTests = async () => {
  await testCreateProject();
  await testGetAllProjects();
};

runTests();
