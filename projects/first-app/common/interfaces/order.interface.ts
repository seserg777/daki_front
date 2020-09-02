import { OrderproductInterface } from './orderproduct.interface';

export interface OrderInterface {
    order_id: number;
    user_email: string;
    summ: number;
    hdate: string;
    items: OrderproductInterface[];
}
