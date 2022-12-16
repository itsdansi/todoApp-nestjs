import { Controller, Get } from '@nestjs/common';
import { TasksService } from './tasks/tasks.service';
// import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly taskService: TasksService) {}

  @Get()
  getHello(): any {
    return this.taskService.getAllTasks();
  }
}
