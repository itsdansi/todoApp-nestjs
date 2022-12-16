import { Body, Controller, Delete, Get, Param, Patch, Post, Query, UsePipes, ValidationPipe } from '@nestjs/common';
import { Task, TaskStatus } from './task.model';
import { TasksService } from './tasks.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { GetTasksFilterDto } from './dto/get-tasks-filter.dto';
import { TaskStatusValidationPipe } from './pipes/tasts-status-validation.pipe';

@Controller('tasks')
export class TasksController {
    constructor(private tasksService: TasksService){}

    @Get()
    getTasks(@Query(ValidationPipe) filter?: GetTasksFilterDto): Task[]{
        if(Object.keys(filter).length){
            console.log(filter);
            return this.tasksService.getTasksWithFilters(filter)
        } else{
            return this.tasksService.getAllTasks()
        }    
    }

    @Get('/:id')
    getTaskById(@Param('id') id:string){
        return this.tasksService.getTaskById(id)
    }

    @Post()
    @UsePipes(ValidationPipe)
    createTask(
    @Body() createTaskDto: CreateTaskDto): Task{    
        return this.tasksService.createTask(createTaskDto)  
    }

    @Delete('/:id')
    deleteTask(@Param('id') id:string): void{
        this.tasksService.deleteTask(id)
    }

    @Patch('/:id')
    updateTaskstatus(
        @Param('id') id:string,
        @Body('status', TaskStatusValidationPipe) status:TaskStatus
    ){
        this.tasksService.updateTaskStatus(id, status)
    }
}
