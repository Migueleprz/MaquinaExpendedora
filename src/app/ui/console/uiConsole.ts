import { MaquinaService } from "../../application/services/maquina.service";
import { ProductoService } from "../../application/services/producto.service";
import { IProducto } from "../../common/interfaces/iProductos";
import { Maquina } from "../../common/interfaces/maquina.interface";
import { IVMenu } from "../../common/interfaces/menu.interface";
import { Productos } from "../../common/interfaces/producto.interface";
import { Menu } from "./menu";
var scanf = require("scanf");
export class UiConsole {
  private product: IProducto;
  private cantidad: number;
  private money: number;
  private id: number;
  private menu: IVMenu;
  private maquina: Maquina;
  private productS: Productos;

  constructor(menu: IVMenu, productS: Productos, maquina: Maquina) {
    this.menu = menu;
    this.productS = productS;
    this.maquina = maquina;
  }

  public machine(): void {
    this.menu.showMenu();
    console.log("Seleccione una opcion: ");
    var option: number = scanf("%d");
    while (option !== 4) {
      switch (option) {
        case 1: {
          this.showMenu();
          break;
        }
        case 2: {
          this.getProduct();
          break;
        }
        case 3: {
          this.buyPresses();
          break;
        }
        default: {
          console.log("Opción no valida");
          break;
        }
      }
      this.menu.showMenu();
      console.log("Seleccione una opcion: ");
      var option: number = scanf("%d");
    }
  }

  private showMenu(): void {
    console.log("----- Lista de Productos -----");
    this.productS.readProduct().forEach(({ id, nombre, precio, cantidad }) => {
      console.log(`${id} - ${nombre} - $${precio} - ${cantidad}`);
    });
    console.log("------------------------------");
  }

  private getProduct(): void {
    console.log("Seleccione un producto: ");
    this.id = scanf("%d");
    this.product = this.productS.getProduct(this.id);
  }

  private buyPresses(): void {
    console.log("Ingrese el dinero: ");
    this.money = scanf("%d");
    console.log("Ingrese la cantidad: ");
    this.cantidad = scanf("%d");

    let change = this.maquina.change(
      this.money,
      this.product?.precio,
      this.cantidad
    );
    if (this.maquina.insertMoney(change)) {
      console.log("\nDinero Insuficiente!\n");
      return;
    }
    if (this.maquina.checkAmount(this.product, this.cantidad)) {
      this.maquina.buy(this.product, this.cantidad);
      console.log("\n");
      console.log("Producto: " + this.product.nombre);
      console.log("Precio: $" + this.product.precio);
      console.log("Cantidad: $" + this.cantidad);
      console.log("Efectivo: $" + this.money);
      console.log("Vuelto: $" + change);
      console.log("\n");
      console.log("Gracias por su compra!");
      console.log("\n");
    } else {
      return console.log("Cantidad insuficiente");
    }
  }
}
