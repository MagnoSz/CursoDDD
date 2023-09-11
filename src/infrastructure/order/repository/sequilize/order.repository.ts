import Order from "../../../../domain/checkout/entity/order";
import OrderItem from "../../../../domain/checkout/entity/order_item";
import OrderItemModel from "./order-item.model";
import OrderModel from "./order.model";

export default class OrderRepository {

  async create(entity: Order): Promise<void> {
    await OrderModel.create(
      {
        id: entity.id,
        customer_id: entity.customerId,
        total: entity.total(),
        items: entity.items.map((item) => ({
          id: item.id,
          name: item.name,
          price: item.price,
          product_id: item.productId,
          quantity: item.quantity,
        })),
      },
      {
        include: [{ model: OrderItemModel }],
      }
    );
  }

  async update(entity: Order): Promise<void> {
    await OrderModel.update(
      {
        customer_id: entity.customerId,
        items: entity.items
      },
      {
        where: {
          id: entity.id,
        }
      }
    );
  }

  async find(id: string): Promise<Order> {
    let orderModel;
    try {

      orderModel = await OrderModel.findOne({
        where: {id: id},
        include: ["items"],
      });

      const items: OrderItem[] = orderModel.items.map((item) => {
        return new OrderItem(item.id, item.name, item.price, item.product_id, item.quantity)
      });

      const order = new Order(orderModel.id, orderModel.customer_id, items);

      return order;

    } catch (err) {
      throw new Error("Order not found.");
    }
  }

  async findAll(): Promise<Order[]> {
    const ordersModel: OrderModel[] = await OrderModel.findAll({include: ["items"]});
    const orders: Order[] = ordersModel.map((orderModel) => {
      const items: OrderItem[] = orderModel.items.map((item) => {
        return new OrderItem(item.id, item.name, item.price, item.product_id, item.quantity)
      });
      return new Order(orderModel.id, orderModel.customer_id, items)
    });

    return orders;
  }

}
