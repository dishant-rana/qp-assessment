import { toTuple, flatten } from 'pg-parameterize';
import { db } from '../db';
import { Groceries, Grocery } from '../utils/customTypes';

export const createGroceries = async ({
  groceries,
}: {
  groceries: Groceries,
}): Promise<Groceries> => {
  const groceriesReplacements = groceries.map((g) => [
    g.name,
    g.price,
    g.description,
    g._destroy ? 'DELETED' : 'ACTIVE',
    g.quantity,
  ]);

  const createdGroceries = await db.many(`INSERT INTO public.groceries(name, price, description, status, quantity)
                                          VALUES ${toTuple(groceriesReplacements, true)}
                                          RETURNING *`, flatten(groceriesReplacements));
  return createdGroceries;
};

export const getGroceries = async (): Promise<Groceries> => {
  const data = await db.many(`
                              SELECT * FROM public.groceries WHERE status <> 'DELETED'`) as Groceries;

  return data;
};

export const updateGrocery = async ({
  id,
  grocery,
}: {
  id: number,
  grocery: Grocery
}): Promise<Grocery> => {
  const {
    name,
    description,
    _destroy,
    price,
    quantity,
  } = grocery;
  const data = await db.one(`UPDATE public.groceries SET name=$(name),
                                                     price=$(price)
                                                     description=$(description)
                                                     status=$(status)
                                                     quantity=$(quantity)
                              RETURNING *`, {
    name: name,
    price: price,
    description: description,
    status: _destroy ? 'DELETED' : 'ACTIVE',
    quantity: quantity,
  });

  return data;
};

export const bookGroceries = async ({
  userId,
  groceries,
}: {
  userId: number,
  groceries: Groceries,
}) => {
  const createdOrder = await db.one(`INSERT INTO public.user_orders (user_id, created_at, status)
                                  VALUES ($(userId), now(), $(status))
                                  RETURNING order_id;`, {
    userId,
    status: 'IN_PROGRESS',
  });

  const groceriesReplacements = groceries.map((g) => [
    createdOrder.id,
    g.id,
    g.quantity,
  ]);

  const createdOrderedItems = await db.many(`INSERT INTO public.user_ordered_items (order_id, grocery_id, quantity)
                                              VALUES ${toTuple(groceriesReplacements, true)}`, flatten(groceriesReplacements));

  return {
    createdOrder,
    createGroceries,
  };
};
