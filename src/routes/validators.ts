import {
  body,
} from 'express-validator';
import { VALIDATION_MESSAGES } from '../utils/constants';

export const createGroceries: any = [
  body('groceries')
    .notEmpty()
    .withMessage(VALIDATION_MESSAGES.required)
    .isArray()
    .withMessage(VALIDATION_MESSAGES.array),
  body('groceries.*.name')
    .notEmpty()
    .withMessage(VALIDATION_MESSAGES.required)
    .isString()
    .withMessage(VALIDATION_MESSAGES.string),
  body('groceries.*.price')
    .notEmpty()
    .withMessage(VALIDATION_MESSAGES.required)
    .isInt()
    .withMessage(VALIDATION_MESSAGES.integer),
  body('groceries.*.description')
    .notEmpty()
    .withMessage(VALIDATION_MESSAGES.required)
    .isString()
    .withMessage(VALIDATION_MESSAGES.string),
  body('groceries.*._destroy')
    .notEmpty()
    .withMessage(VALIDATION_MESSAGES.required)
    .isBoolean()
    .withMessage(VALIDATION_MESSAGES.string),
  body('groceries.*.quantity')
    .notEmpty()
    .withMessage(VALIDATION_MESSAGES.required)
    .isInt()
    .withMessage(VALIDATION_MESSAGES.integer),

];


export const updateGroceries: any = [
  body('name')
    .notEmpty()
    .withMessage(VALIDATION_MESSAGES.required)
    .isString()
    .withMessage(VALIDATION_MESSAGES.string),
  body('price')
    .notEmpty()
    .withMessage(VALIDATION_MESSAGES.required)
    .isInt()
    .withMessage(VALIDATION_MESSAGES.integer),
  body('description')
    .notEmpty()
    .withMessage(VALIDATION_MESSAGES.required)
    .isString()
    .withMessage(VALIDATION_MESSAGES.string),
  body('_destroy')
    .notEmpty()
    .withMessage(VALIDATION_MESSAGES.required)
    .isBoolean()
    .withMessage(VALIDATION_MESSAGES.string),
  body('quantity')
    .notEmpty()
    .withMessage(VALIDATION_MESSAGES.required)
    .isInt()
    .withMessage(VALIDATION_MESSAGES.integer),

];

export const bookGroceries: any = [
  body('groceries')
    .notEmpty()
    .withMessage(VALIDATION_MESSAGES.required)
    .isArray()
    .withMessage(VALIDATION_MESSAGES.array),
  body('groceries.*.id')
    .notEmpty()
    .withMessage(VALIDATION_MESSAGES.required)
    .isInt()
    .withMessage(VALIDATION_MESSAGES.integer),
  body('groceries.*.name')
    .notEmpty()
    .withMessage(VALIDATION_MESSAGES.required)
    .isString()
    .withMessage(VALIDATION_MESSAGES.string),
  body('groceries.*.quantity')
    .notEmpty()
    .withMessage(VALIDATION_MESSAGES.required)
    .isInt()
    .withMessage(VALIDATION_MESSAGES.integer),
];
