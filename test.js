"use strict";

const target = "Hello".split("");

const getRandomBetween = (minimum, maximum) => {
  let num = Math.random();
  while (num < minimum || num > maximum) {
    num = Math.random();
  }
  return num;
};

let Winner = {
  fitness: 0,
  selectionVars: {}
};

let totalPops = 0;

const max = 100;

const selectionVariables = {
  primeWithRandom: {
    chance: 0.2,
    probabilities: [4, 1.5]
  },
  twoPrimes: 2.5
};

// const selectionVariables = {
//   primeWithRandom: {
//     chance: getRandomBetween(0.1, 0.3),
//     probabilities: [
//       getRandomBetween(0.6, 1) * 4,
//       getRandomBetween(0.4, 0.6) * 2
//     ]
//   },
//   twoPrimes: getRandomBetween(0.6, 0.8) * 4
// };

console.log(selectionVariables);

for (let i = 0; i < max; i++) {
  const population = new Population(target, 0.1, 100, selectionVariables);

  while (!population.checkPerfectOne() && population.generations < 1500) {
    population.naturalSelection();
    population.newGeneration();
    population.calcFitness();
  }
  totalPops += population.generations;
}

let fitness = Math.round(totalPops / max);
console.log(fitness);

if (fitness > Winner.fitness) {
  Winner.fitness = fitness;
  Winner.selectionVars = selectionVariables;
}
