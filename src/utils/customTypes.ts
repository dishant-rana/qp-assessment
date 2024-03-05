
export type Grocery = {
  id?: number,
  name: string,
  price: number,
  description: string,
  _destroy: boolean,
  quantity: number,
};

export type Groceries = Array<Grocery>;

export type UserOrder = {
  orderId?: number,
  userId?: number,
  status: string,
  createdAt: EpochTimeStamp,
}