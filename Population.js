"use strict";

class Population {
  constructor(target, mutationRate, maximumPopulation) {
    this.target = target;
    this.mutationRate = mutationRate;
    this.maximumPopulation = maximumPopulation;
    this.generations = [];
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
      for (let i = 0; i < percentage; i++) {
        this.matingPool.push(el);
      }
    });
    this.generations.push(
      JSON.parse(
        JSON.stringify(
          this.matingPool
            .sort(
              (a, b) =>
                a.fitness > b.fitness ? 1 : b.fitness > a.fitness ? -1 : 0
            )
            .reverse()
        )
      )
    );
  }

  newGeneration() {
    for (let i = 0; i < this.maximumPopulation; i++) {
      this.population[i].crossover(
        this.matingPool[
          Math.floor(Math.random() * Math.random() * this.maximumPopulation)
        ].genes,
        this.matingPool[
          Math.floor(Math.random() * Math.random() * this.maximumPopulation)
        ].genes
      );
      this.population[i].mutate(this.mutationRate);
    }
  }
}
