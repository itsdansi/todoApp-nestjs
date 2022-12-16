import { Injectable, NotFoundException } from '@nestjs/common';
import { Task, TaskStatus } from './task.model';
import {v1 as uuidv1 }  from 'uuid'
import { CreateTaskDto } from './dto/create-task.dto';
import { GetTasksFilterDto } from './dto/get-tasks-filter.dto';

@Injectable()
export class TasksService {
private tasks: Task[] = [];

getAllTasks(): Task[]{
    return this.tasks;
}

getTasksWithFilters(filter: GetTasksFilterDto) : Task[]
{
    const {status, search} = filter;
    let tasks = this.getAllTasks();
    if(status){
        tasks = tasks.filter(task =>task.status === status)
    }
    if (search){
        tasks = tasks.filter(task => task.title.includes(search) || task.description.includes(search) )
    }
return tasks
}
getTaskById(id: string):Task{ 
    const data = this.tasks.find(task => task.id ===id)
    if(!data){
        throw new NotFoundException(`Task with ID '${id}' not found!`)
    }
    return data;

}

createTask(createTaskDto: CreateTaskDto) : Task{

    const { title, description, status} = createTaskDto
    const task: Task = {
        id:uuidv1(),
        title,
        description,
        status: status ?? TaskStatus.TODO
    }
    this.tasks.push(task)
    return task;
}

deleteTask(id:string):void {
    const data = this.getTaskById(id)
    this.tasks = this.tasks.filter(task => task.id !== data.id)
}

updateTaskStatus(id:string, status:TaskStatus){
    const task = this.getTaskById(id);
    task.status = status;
    return task;
}

}
