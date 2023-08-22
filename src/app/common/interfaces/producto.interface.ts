import { IProducto } from "./iProductos";

export interface Productos {
  readProduct(): IProducto[];
  getProduct(id: number): IProducto;
  subtractAmount(id: number, cantidad: number): boolean;
}
