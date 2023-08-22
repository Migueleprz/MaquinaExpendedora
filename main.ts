import { Application } from "./src/app";
import { MaquinaService } from "./src/app/application/services/maquina.service";
import { ProductoService } from "./src/app/application/services/producto.service";
import { Menu } from "./src/app/ui/console/menu";
import { UiConsole } from "./src/app/ui/console/uiConsole";
import { UIWeb } from "./src/app/ui/web/uiWeb";


/*const console = new Application(
  new UiConsole(
    new Menu(),
    new ProductoService(),
    new MaquinaService(new ProductoService())
  )
);*/
const web = new Application(new UIWeb);
web.start();
