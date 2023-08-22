import { ProductoService } from "./producto.service";
import { Maquina } from "./../../common/interfaces/maquina.interface";
import { IProducto } from "../../common/interfaces/iProductos";

export class MaquinaService implements Maquina {
  private product: ProductoService;
  constructor(product: ProductoService) {
    this.product = product;
  }

  insertMoney(money: number): boolean {
    return 0 > money;
  }

  buy(product: IProducto, amount: number): boolean {
    if (product) {
      this.product.subtractAmount(product.id, amount);
      return true;
    }
    return false;
  }

  change(money: number, price: number, amount: number): number {
    if (money !== 0 && price !== undefined && amount !== 0) {
      return money - price * amount;
    }
    return -1;
  }

  checkAmount(producto: IProducto, cantidad: number): boolean {
    const stock = producto.cantidad - cantidad;
    if (stock > 0) {
      return true;
    }
    return false;
  }
}
