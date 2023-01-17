export default class GenerateCars {
  private static getRandomCarName() {
    const models = [
      'Ford',
      'Mitsubishi',
      'Mercedes',
      'BMW',
      'Audi',
      'Lexus',
      'Volkswagen',
      'Nissan',
      'Peugeot',
      'Skoda',
      'Opel',
      'Tesla',
    ];
    const types = ['Octavia', '5', 'Combi', 'X6', '206', 'Partner', 'RX', 'Lancer', 'Model S', 'Mustang'];
    const model: string = models[Math.floor(Math.random() * models.length)];
    const type: string = types[Math.floor(Math.random() * types.length)];

    return `${model} ${type}`;
  }

  private static getRandomColor() {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i += 1) {
      color += letters[Math.floor(Math.random() * letters.length)];
    }

    return color;
  }

  public static generateRandomCars(items = 100) {
    return new Array(items).fill(0).map(() => ({ name: this.getRandomCarName(), color: this.getRandomColor() }));
  }
}
