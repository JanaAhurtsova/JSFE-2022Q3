export default class Message {
  public overlay: HTMLElement;

  constructor() {
    this.overlay = document.createElement('div');
    this.overlay.className = 'overlay';
    this.inner();
  }

  public inner() {
    const message = `
    <div class="wrapper__message">
      <h2 class='message'></h2>
    </div>`;
    this.overlay.innerHTML = message;
    this.overlay.addEventListener('click', this.closeMessage);
  }

  public showMessage() {
    document.body.append(this.overlay);
  }

  public closeMessage(event: Event) {
    const target = event.target as HTMLElement;
    if (target.classList.contains('overlay')) {
      target.remove();
    }
  }
}
