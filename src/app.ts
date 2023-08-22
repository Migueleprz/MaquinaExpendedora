import { IPagesManager } from "./app/common/interfaces/web/iPagesManager";
import { UiConsole } from "./app/ui/console/uiConsole";

export class Application {
  //private uiMachine: UiConsole;
  private uiWeb : IPagesManager;
  constructor(uiWeb : IPagesManager) {
   //this.uiMachine = uiMachine;
   this.uiWeb = uiWeb;
  }

  start(): void {    
    this.uiWeb.setPage("#root", "products");
  }
}
