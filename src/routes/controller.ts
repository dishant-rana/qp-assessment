import asyncHandler from 'express-async-handler';
import _ from 'lodash';
import * as service from './service';
import { Groceries, Grocery } from '../utils/customtypes';

export const createGroceries = asyncHandler(async (req, res) => {
  const groceries: Groceries = _.get(req, 'body.groceries') as Groceries;

  const data = await service.createGroceries({
    groceries,
  });

  res.status(201).json({
    success: true,
    data,
  });
});

export const getGroceries = asyncHandler(async (req, res) => {
  const data = await service.getGroceries();

  res.status(200).json({
    success: true,
    data,
  });
});

export const updateGroceries = asyncHandler(async (req, res) => {
  const id: number = Number(_.get(req, 'params.id'));
  const grocery: Grocery = _.get(req, 'body') as Grocery;

  const data = await service.updateGrocery({
    id,
    grocery,
  });

  res.status(200).json({
    success: true,
    data,
  });
});

export const bookGroceries = asyncHandler(async (req, res) => {
  const userId: number = Number(_.get(req, 'params.userId'));
  const groceries: Groceries = _.get(req, 'body.groceries') as Groceries;

  const data = await service.bookGroceries({
    userId,
    groceries,
  });

  res.status(201).json({
    success: true,
    data,
  });
});
