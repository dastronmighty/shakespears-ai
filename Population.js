"use strict";

class Population {
  constructor(target, mutationRate, maximumPopulation, selectionVars) {
    this.selectionVars = selectionVars;
    this.target = target;
    this.mutationRate = mutationRate;
    this.maximumPopulation = maximumPopulation;
    this.generations = 0;
    this.population = [];
    while (this.population.length < maximumPopulation) {
      this.population.push(new DNA(target));
    }
    this.highestScore = this.population[0];
    this.calcFitness();
    this.matingPool = [];
  }

  calcFitness() {
    for (let i = 0; i < this.population.length; i++) {
      this.population[i].calcFitness(this.target);
    }
  }

  naturalSelection() {
    this.matingPool = [];
    let totalFitness = 0;
    this.population.map(el => {
      totalFitness += el.fitness;
    });
    this.population.map(el => {
      let percentage = Math.round((el.fitness / totalFitness) * 100);
      for (let i = 0; i <= percentage; i++) {
        this.matingPool.push(el);
      }
    });
    this.matingPool
      .sort(
        (a, b) => (a.fitness > b.fitness ? 1 : b.fitness > a.fitness ? -1 : 0)
      )
      .reverse();
    this.generations++;
  }

  skewedRand(num) {
    return Math.floor(this.matingPool.length * Math.pow(Math.random(), num));
  }

  newGeneration() {
    for (let i = 0; i < this.maximumPopulation; i++) {
      if (Math.random() < 0.2) {
        this.population[i].crossover(
          this.matingPool[
            this.skewedRand(this.selectionVars.primeWithRandom.probabilities[0])
          ].genes,
          this.matingPool[
            this.skewedRand(this.selectionVars.primeWithRandom.probabilities[1])
          ].genes
        );
      } else {
        this.population[i].crossover(
          this.matingPool[this.skewedRand(this.selectionVars.twoPrimes)].genes,
          this.matingPool[this.skewedRand(this.selectionVars.twoPrimes)].genes
        );
      }
      this.population[i].mutate(this.mutationRate);
    }
  }

  checkPerfectOne() {
    let found = false;
    this.population.map(element => {
      if (element.genes.join("") === this.target.join("")) {
        found = true;
      }
    });
    return found;
  }
}
