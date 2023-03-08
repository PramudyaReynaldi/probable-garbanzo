class App {
  constructor() {
    this.clearButton = document.getElementById("clear-btn");
    this.loadButton = document.getElementById("load-btn");
    this.carContainerElement = document.getElementById("cars-container");
    this.filterButton = document.getElementById("filter-car")
  }

  async init() {
    await this.load();

    // Register click listener
    this.clearButton.onclick = this.clear;
    this.loadButton.onclick = this.run;
    this.filterButton.onclick = this.filter;
  }

  run = () => {
    Car.list.forEach((car) => {
      const node = document.createElement("div");
      node.innerHTML = car.render();
      this.carContainerElement.appendChild(node);
    });
  };

  async filter() {
    const driver = document.getElementById("typeDriver").value
    console.log(driver)
    const cars = await Binar.listCars((e) => {
      // tambahkan fungsi filter
      return e.typeDriver === driver
    });
    Car.init(cars);
    document.getElementById("cars-container").innerHTML = ''
    Car.list.forEach((car) => {
      const node = document.createElement("div");
      node.innerHTML = car.render();
      document.getElementById("cars-container").appendChild(node);
    });
  }

  async load() {
    const cars = await Binar.listCars();
    Car.init(cars);
  }

  clear = () => {
    let child = this.carContainerElement.firstElementChild;

    while (child) {
      child.remove();
      child = this.carContainerElement.firstElementChild;
    }
  };
}
