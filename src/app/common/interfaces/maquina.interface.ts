import { IProducto } from "./iProductos";
import { Productos } from "./producto.interface";

export interface Maquina {
  insertMoney(billete: number): boolean;
  buy(producto: IProducto, cantidad: number): boolean;
  change(billete: number, precio: number, cantidad: number): number;
  checkAmount(producto: IProducto,cantidad: number): boolean;
}
