"use strict";

class DNA {
  constructor(target) {
    this.genes = this.generateString(target.length);
    this.fitness = 0;
  }

  generateString(length) {
    let genes = [];
    while (genes.length !== length) {
      genes.push(String.fromCharCode(Math.random() * 95 + 32));
    }
    return genes;
  }

  crossover(parentOne, parentTwo) {
    let child = [];
    let parentOneSelection = Math.random();
    while (parentOneSelection > 0.6 || parentOneSelection < 0.4) {
      parentOneSelection = Math.random();
    }
    parentOne.map((letter, key) => {
      if (Math.random() < parentOneSelection) child.push(letter);
      else child.push(parentTwo[key]);
    });
    this.genes = child;
  }

  mutate(mutationRate) {
    if (Math.random() < mutationRate) {
      this.genes[Math.random() * this.genes.length] = String.fromCharCode(
        Math.random() * 95 + 32
      );
    }
  }

  calcFitness(target) {
    let fitness = 0;
    target.map((letter, key) => {
      if (letter === this.genes[key]) {
        fitness++;
      }
    });
    this.fitness = fitness;
  }
}
