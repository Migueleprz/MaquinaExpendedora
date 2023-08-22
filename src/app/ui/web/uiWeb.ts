import { IPagesManager } from "../../common/interfaces/web/iPagesManager";

export class UIWeb implements IPagesManager {
  constructor() {}

  public async setPage(
    selectorTag: string,
    templatePage: string
  ): Promise<void> {
    let root: HTMLElement = document.querySelector(selectorTag)!;
    let tempPage = await fetch(`./src/app/ui/web/pages/${templatePage}.html`);
    let htmlPage = await tempPage.text();
    root.innerHTML = htmlPage;
  }
}
