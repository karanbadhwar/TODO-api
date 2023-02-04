import { body, ValidationChain } from 'express-validator';
import { Priority } from '../enums/Priority';
import { Status } from '../enums/Status';

export const createValidator: ValidationChain[] = [
  body('title')
    .not()
    .isEmpty()
    .withMessage('The Task Title is Mandatory')
    .trim()
    .isString()
    .withMessage('Title needs to be in Text Format'),
  body('date')
    .not()
    .isEmpty()
    .withMessage('The Task Date is Mandatory')
    .isString()
    .withMessage('Date needs to be in a Valid Date Format'),
  body('description')
    .trim()
    .isString()
    .withMessage('Description needs to be in Text Format'),
  body('priority')
    .trim()
    .isIn([Priority.normal, Priority.low, Priority.high])
    .withMessage('Priority can only be Normal, Low or High'),
  body('status')
    .trim()
    .isIn([Status.todo, Status.inProgress, Status.completed])
    .withMessage('Status can only be Todo, inProgress or Completed'),
];

export const updateValidator: ValidationChain[] = [
  body('id')
    .not()
    .isEmpty()
    .withMessage('The Task ID is Mandatory')
    .trim()
    .isString()
    .withMessage('ID needs to be a valid UUID Format'),
  body('status')
    .trim()
    .isIn([Status.todo, Status.inProgress, Status.completed])
    .withMessage('Status can only be Todo, inProgress or Completed'),
];
