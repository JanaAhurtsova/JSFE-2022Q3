import { ICreateTrack } from '../../../../types/interfaces';
import { TGetCar } from '../../../../types/types';

export default class CreateTrack implements ICreateTrack {
  static getCarImage(color: string): string {
    return `<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"
      version="1.1" width="256" height="256" viewBox="0 0 256 256" xml:space="preserve">
    <defs></defs>
    <g style="stroke: none; stroke-width: 0; stroke-dasharray: none; stroke-linecap: butt;
      stroke-linejoin: miter; stroke-miterlimit: 10; fill: none; fill-rule: nonzero; opacity: 1;"
      transform="translate(1.4065934065934016 1.4065934065934016) scale(2.81 2.81)" >
      <circle cx="70.735" cy="56.775" r="1.955" style="stroke: none; stroke-width: 1;
      stroke-dasharray: none; stroke-linecap: butt; stroke-linejoin: miter; stroke-miterlimit: 10;
      fill: ${color}; fill-rule: nonzero; opacity: 1;" transform="  matrix(1 0 0 1 0 0) "/>
      <circle cx="19.765" cy="56.775" r="1.955" style="stroke: none; stroke-width: 1; stroke-dasharray: none;
      stroke-linecap: butt; stroke-linejoin: miter; stroke-miterlimit: 10; fill: ${color}; fill-rule: nonzero;
      opacity: 1;" transform="  matrix(1 0 0 1 0 0) "/>
      <path d="M 75.479 36.045 l -7.987 -1.22 l -2.35 -2.574 c -5.599 -6.132 -13.571 -9.649 -21.874 -9.649 h -6.245
      c -1.357 0 -2.696 0.107 -4.016 0.296 c -0.022 0.004 -0.044 0.006 -0.066 0.01 c -7.799 1.133 -14.802 5.468 -19.285
      12.106 C 5.706 37.913 0 45.358 0 52.952 c 0 3.254 2.647 5.9 5.9 5.9 h 3.451 c 0.969 4.866 5.269 8.545 10.416 8.545
      s 9.447 -3.679 10.416 -8.545 h 30.139 c 0.969 4.866 5.27 8.545 10.416 8.545 s 9.446 -3.679 10.415 -8.545 H 84.1 c
      3.254 0 5.9 -2.646 5.9 -5.9 C 90 44.441 83.894 37.331 75.479 36.045 z M 43.269 26.602 c 7.065 0 13.848 2.949
      18.676 8.094 H 39.464 l -3.267 -8.068 c 0.275 -0.009 0.55 -0.026 0.826 -0.026 H 43.269 z M 32.08 27.118 l 3.068
      7.578 H 18.972 C 22.429 30.813 27.018 28.169 32.08 27.118 z M 19.767 63.397 c -3.652 0 -6.623 -2.971 -6.623 -6.622
      c 0 -3.652 2.971 -6.623 6.623 -6.623 s 6.623 2.971 6.623 6.623 C 26.39 60.427 23.419 63.397 19.767 63.397 z M 70.738
      63.397 c -3.652 0 -6.623 -2.971 -6.623 -6.622 c 0 -3.652 2.971 -6.623 6.623 -6.623 c 3.651 0 6.622 2.971 6.622 6.623 C
      77.36 60.427 74.39 63.397 70.738 63.397 z" style="stroke: none; stroke-width: 1; stroke-dasharray: none; stroke-linecap: butt;
      stroke-linejoin: miter; stroke-miterlimit: 10; fill: ${color}; fill-rule: nonzero; opacity: 1;"
      transform=" matrix(1 0 0 1 0 0) " stroke-linecap="round" />
    </g>
    </svg>`;
  }

  public getCarTrack({ name, color, id }: TGetCar): string {
    return `
    <div class="buttons-track">
      <button class="button select__button" id="select-car-${id}">Select</button>
      <button class="button remove__button" id="remove-car-${id}">Remove</button>
      <span class="car-name">${name}</span>
    </div>
    <div class="road">
      <div class="road__wrapper">
        <div class="controls-track">
          <button class="button start-engine__button" id="start-engine-car-${id}"> A </button>
          <button class="button stop-engine__button" id="stop-engine-car-${id}" disabled> B </button>
        </div>
        <div class="car" id="car-${id}">
          ${CreateTrack.getCarImage(color)}
        </div>
      </div>
      <div class="flag" id="flag-${id}"></div>
    </div>`;
  }
}
