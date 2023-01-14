export default abstract class Page {
  protected container: HTMLElement;

  constructor(id: string) {
    this.container = document.createElement('div');
    this.container.className = 'wrapper';
    this.container.id = id;
  }

  public render() {
    return this.container;
  }
}