"use strict";

const target = "The small brown dog".split("");

function getRandomBetween(min, max) {
  let num = Math.random();
  while (min => num || max <= num) {
    num = Math.random();
  }
  return num;
}

let totalPops = 0;

const max = 1;

const selectionVariables = {
  primeWithRandom: {
    chance: getRandomBetween(0.1, 0.3),
    probabilities: [
      getRandomBetween(0.6, 1) * 5,
      getRandomBetween(0.4, 0.6) * 2
    ]
  },
  twoPrimes: [getRandomBetween(0.4, 0.7) * 2, getRandomBetween(0.5, 0.7) * 2]
};

const selectionVariables2 = {
  primeWithRandom: {
    chance: 0.2,
    probabilities: [4, 0.9]
  },
  twoPrimes: [2.5, 2.5]
};

for (let i = 0; i < max; i++) {
  const population = new Population(target, 0.1, 100, selectionVariables2);

  while (!population.checkPerfectOne() && population.generations <= 1500) {
    population.naturalSelection();
    population.newGeneration();
    population.calcFitness();
  }
  totalPops += population.generations;
}

console.log(Math.round(totalPops / max));
