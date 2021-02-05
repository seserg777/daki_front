import { OrderInterface } from '../interfaces/order.interface';
import { KeyValueInterface } from '../interfaces/key-value.interface';
import { OrderproductModel } from './orderproduct.model';

export class OrderModel implements OrderInterface {
    public order_id: number;
    public user_email: string;
    public summ: number;
    public hdate: string;
    public items: OrderproductModel[];

    constructor(params: OrderInterface = {} as OrderInterface) {
        this.order_id = params.order_id;
        this.user_email = params.user_email;
        this.summ = params.summ;
        this.hdate = params.hdate;
        this.items =
        (
            !!params.items && params.items instanceof Array
            ? params.items.map((item: KeyValueInterface<any>): OrderproductModel => this.createOrderproductModel(item))
            : []
        )
    }

    public createOrderproductModel(parsed: KeyValueInterface<any>): OrderproductModel {
        return new OrderproductModel({
            product_id: parsed.product_id,
            title: parsed.title,
            price: parsed.price,
            quantity: parsed.quantity,
        });
    }

    public createOrderModelFromServerData(parsed: KeyValueInterface<any> = {}): OrderModel {
        return new OrderModel({
            order_id: parsed.order_id,
            user_email: parsed.user_email,
            summ: parsed.summ,
            hdate: parsed.hdate,
            items: (
                !!parsed.items && parsed.items instanceof Array
                ? parsed.items.map(this.createOrderproductModel)
                : []
            )
        });
    }
}
