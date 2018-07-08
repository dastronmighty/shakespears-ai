"use strict";

const target = "Hello, World!".split("");

const population = new Population(target, 0.05, 100);

population.naturalSelection();
population.newGeneration();
population.calcFitness();

let x = 0;
while (x !== 50) {
  population.naturalSelection();
  population.newGeneration();
  population.calcFitness();
  x++;
}

console.log(population.generations);
console.log(population.population);
