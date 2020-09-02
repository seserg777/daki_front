import { KeyValueInterface } from '../interfaces/key-value.interface';
import { OrderproductModel } from '../models/orderproduct.model';
import { OrderModel } from '../models/order.model';

export class OrderHelper {
    public static createOrderproductModel(parsed: KeyValueInterface<any>): OrderproductModel {
        return new OrderproductModel({
            product_id: parsed.product_id,
            title: parsed.title,
            price: parsed.price,
            quantity: parsed.quantity,
        });
    }

    public static createOrderModelArray(data: any[]): OrderModel[] {
        return data.map((item: KeyValueInterface<any>): OrderModel => OrderHelper.createOrderModelFromServerData(item));
    }

    public static createOrderModelFromServerData(parsed: KeyValueInterface<any> = {}): OrderModel {
        return new OrderModel({
            order_id: parsed.order_id,
            user_email: parsed.user_email,
            summ: parsed.summ,
            hdate: parsed.hdate,
            items: (
                !!parsed.items && parsed.items instanceof Array
                ? parsed.items.map(OrderHelper.createOrderproductModel)
                : []
            )
        });
    }
}
