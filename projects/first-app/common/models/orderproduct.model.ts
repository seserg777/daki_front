import { OrderproductInterface } from '../interfaces/orderproduct.interface';

export class OrderproductModel implements OrderproductInterface {
  public product_id: number;
  public title: string;
  public price: number;
  public quantity: number;

  constructor(params: OrderproductInterface = {} as OrderproductInterface) {
    this.product_id = params.product_id;
    this.title = params.title;
    this.price = params.price;
    this.quantity = params.quantity;
  }
}
