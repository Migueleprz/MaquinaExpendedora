import { cProductos } from "../../common/constants/productos";
import { IProducto } from "../../common/interfaces/iProductos";
import { Productos } from "../../common/interfaces/producto.interface";

export class ProductoService implements Productos {
  private products: IProducto[] = cProductos;
  private product: any;

  readProduct(): IProducto[] {
    return this.products;
  }

  getProduct(id: number): IProducto {
    if (id !== null)
      this.product = this.readProduct().find((p) => {
        return p.id === id;
      });
    return this.product;
  }

  subtractAmount(id: number, cantidad: number): boolean {
    const producto = this.getProduct(id);
    if (producto === undefined) {
      return false;
    }
    let cantidadS: number = producto.cantidad;
    cantidadS = cantidadS - cantidad;
    if (cantidadS <= 0) {
      return false;
    }
    producto.cantidad = cantidadS;
    return true;
  }
}
