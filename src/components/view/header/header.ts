import { PageIds } from "../../../types/enum";

export default class Header {
  public header: HTMLElement;

  public toGarage: HTMLLinkElement;

  public toWinners: HTMLLinkElement;

  constructor() {
    this.header = this.createDomNode('header', ['header']);
    this.toGarage = this.createDomNode('a', ['button', 'button__garage'], `#${PageIds.GARAGE}`, 'to garage') as HTMLLinkElement;
    this.toWinners = this.createDomNode('a', ['button', 'button__winners'], `#${PageIds.WINNERS}`, 'to winners') as HTMLLinkElement;

    this.append();
  }

  private append(): void {
    this.header.append(this.toGarage, this.toWinners);
  }

  private createDomNode(element: string, classElement: string[], attr?: string, text?: string): HTMLElement | HTMLLinkElement {
    const node = document.createElement(element);
    node.classList.add(...classElement);
    if(attr) {
      node.setAttribute('href', attr);
    }
    if (text !== undefined) {
      node.innerText = text;
    }
    return node;
  }
}
