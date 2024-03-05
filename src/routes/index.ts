import { Router } from 'express';
import * as validators from './validators';
import * as controller from './controller';
import validateRequest from '../utils/validateRequest';

const router = Router();

// For Routes we can Add custom Validator with User Role as [Admin, User]. Both will have access to own routes only

router.post('/groceries', [validators.createGroceries, validateRequest], controller.createGroceries);

// This route can be used by both User And Admin

router.get('/groceries', controller.getGroceries);

router.put('groceries/:id', [validators.updateGroceries, validateRequest], controller.updateGroceries);

router.post('groceries/book/:userId', [validators.bookGroceries, validateRequest], controller.bookGroceries);

export default router;

