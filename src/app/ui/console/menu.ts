import { MaquinaService } from "../../application/services/maquina.service";
import { cMenu } from "../../common/constants/menu";
import { IVMenu } from "../../common/interfaces/menu.interface";
import { Productos } from "../../common/interfaces/producto.interface";

export class Menu implements IVMenu {
  showMenu(): void {
    cMenu.forEach(({ id, nombre }) => {
      console.log(`\n${id}). ${nombre}\n`);
    });
  }
}
