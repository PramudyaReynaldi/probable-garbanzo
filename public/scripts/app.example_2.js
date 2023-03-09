class App {
  constructor() {
    this.clearButton = document.getElementById("clear-btn");
    this.loadButton = document.getElementById("load-btn");
    this.filterButton = document.getElementById("filter");
    this.carContainerElement = document.getElementById("cars-container");
  }

  async init() {
    await this.load();

    // Register click listener
    // this.clearButton.onclick = this.clear;
    // this.loadButton.onclick = this.run;
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
    const driver = document.getElementById("tipedriver").value
    console.log(driver)

    // Tanggal
    const tanggal = document.getElementById("tanggal").value
    console.log(tanggal)

    // Penumpang
    const jmlPenumpang = document.getElementById("jumlah-penumpang")
    console.log(jmlPenumpang)
    
    const cars = await Binar.listCars((e) => {
      // tambahkan fungsi filter
      return e.typeDriver === driver
    });

    const tgl = await Binar.listCars((x) => {
      return x.availableAt ===  tanggal
    })

    const penumpang = await Binar.listCars((y) => {
      return y.capacity === jmlPenumpang
    })
    
    Car.init(cars);
    document.getElementById("cars-container").innerHTML = ''
    Car.list.forEach((car) => {
      const node = document.createElement("div");
      node.innerHTML = car.render();
      document.getElementById("cars-container").appendChild(node);
    });

    Car.init(penumpang);
    document.getElementById("cars-container").innerHTML = ''
    Car.list.forEach((car) => {
      const newNode = document.createElement("div");
      newNode.innerHTML = car.render();
      document.getElementById("cars-container").appendChild(newNode);
    });
  }

  // Tanggal
  // async filterTgl() {
  //   const tanggal = document.getElementById("tanggal").value
  //   console.log(tanggal)

  //   const tgl = await Binar.listCars((x) => {
  //     return x.availableAt === tanggal
  //   })

  //   Car.init(tgl);
  //   document.getElementById("cars-container").innerHTML = ''
  //   Car.list.forEach((car) => {
  //     const node = document.createElement("div");
  //     node.innerHTML = car.render();
  //     document.getElementById("cars-container").appendChild(node);
  //   });
  // }
  



  async load(filter) {
    const cars = await Binar.listCars(filter);
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
