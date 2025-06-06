import { IProjectRepository } from '../../domain/repositories/IProjectRepository';
import { DrillingProject } from '../../domain/entities/drillingProject.entity';

export class CreateProjectUseCase {
  constructor(private readonly projectRepository: IProjectRepository) {}

  async execute(data: { 
    clientId: string; 
    location: { address: string; latitude: number; longitude: number };
    expectedDepth: number; 
  }): Promise<DrillingProject> {
    // Ví dụ: có thể thêm logic kiểm tra xem khách hàng (clientId) có tồn tại không
    // const clientExists = await this.clientRepository.findById(data.clientId);
    // if (!clientExists) {
    //   throw new Error('Client does not exist.');
    // }

    // Logic tạo dự án mới
    return this.projectRepository.create(data);
  }
}