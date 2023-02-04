import { validationResult } from 'express-validator';
import { AppDataSource } from '../../index';
import { Task } from './tasks.entity';
import { instanceToPlain, plainToInstance } from 'class-transformer';
import { Request, Response } from 'express';
import { UpdateResult } from 'typeorm';

class TasksController {
  //Method for GET ROUTE
  public async getAll(req: Request, res: Response): Promise<Response> {
    let allTasks: Task[];
    try {
      allTasks = await AppDataSource.getRepository(Task).find({
        order: {
          date: 'ASC',
        },
      });
      allTasks = instanceToPlain(allTasks) as Task[];

      return res.json(allTasks).status(200);
    } catch (_errors) {
      return res.json({ error: 'Internal Server Error' }).status(500);
    }
  }

  // Method for POST ROUTE
  public async create(req: Request, res: Response): Promise<Response> {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res
        .json({
          errors: errors.array(),
        })
        .status(400);
    }

    //create a new Instance of Task
    const newTask = new Task();

    // Add the required properties to the task object
    newTask.title = req.body.title;
    newTask.date = req.body.date;
    newTask.description = req.body.description;
    newTask.priority = req.body.priority;
    newTask.status = req.body.status;

    //Add the new task to the Database
    let createdTask: Task;

    try {
      createdTask = await AppDataSource.getRepository(Task).save(newTask);

      //Convert the task to plain Object for Response

      createdTask = instanceToPlain(createdTask) as Task;

      return res.json(createdTask).status(201);
    } catch (errors) {
      return res.json({ error: 'Internal Server Error' }).status(500);
    }
  }

  //Method for Updating Task
  public async update(req: Request, res: Response): Promise<Response> {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res
        .json({
          errors: errors.array(),
        })
        .status(400);
    }

    //Try to find if tasks Exists
    let task: Task | null;

    try {
      task = await AppDataSource.getRepository(Task).findOne({
        where: {
          id: req.body.id,
        },
      });
    } catch (error) {
      return res.json({ error: 'Internal Server Error' }).status(500);
    }

    //Return 400 if task not found

    if (!task) {
      return res.json('The Task with given ID does not exist').status(404);
    }

    //Declare a variable for updatedTask
    let updatedTask: UpdateResult;

    //Update the Task
    try {
      updatedTask = await AppDataSource.getRepository(Task).update(
        req.body.id,
        plainToInstance(Task, {
          status: req.body.status,
        }),
      );

      updatedTask = instanceToPlain(updatedTask) as UpdateResult;

      return res.json(updatedTask).status(200);
    } catch (error) {
      return res.json({ error: 'Internal Server Error' }).status(500);
    }
  }
}

export const tasksController = new TasksController();
