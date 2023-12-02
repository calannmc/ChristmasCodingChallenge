const fs = require("fs");
const readline = require("readline");

// Limits for the number of red, green, and blue cubes
const REDLIMIT = 12;
const GREENLIMIT = 13;
const BLUELIMIT = 14;

// Data array to store information about each game
const data = [];

// Function to read the input from the text file
const readFile = () => {
  return new Promise((resolve, reject) => {
    const lineArray = [];
    const readInterface = readline.createInterface({
      input: fs.createReadStream("inputDayTwo.txt"),
      output: process.stdout,
      terminal: false,
    });

    readInterface
      .on("line", (line) => {
        lineArray.push(line);
      })
      .on("close", () => {
        resolve(lineArray);
      });
  });
};

// Function to prepare the data for each game
const prepareData = (game, line) => {
  const entry = {
    game: game + 1,
    sets: [],
    valid: undefined,
  };
  const sets = line.slice(line.indexOf(":") + 1);
  const hands = sets.split(";");
  for (const hand of hands) {
    const dices = hand.trim().split(", ");
    const set = {
      red: 0,
      green: 0,
      blue: 0,
    };
    for (const dice of dices) {
      parsedDice = dice.split(" ");
      set[parsedDice[1]] = Number(parsedDice[0]);
    }
    entry.sets.push(set);
  }
  data.push(entry);
};

// Function to validate each game based on cube limits
const validateGame = (game) => {
  for (const set of game.sets) {
    if (set.red > REDLIMIT || set.green > GREENLIMIT || set.blue > BLUELIMIT) {
      game.valid = false;
      return;
    } else {
      game.valid = true;
    }
  }
};

// Function to calculate the minimum dices power for each game
const getMinimumDicesPower = (game) => {
  const reds = [];
  const greens = [];
  const blues = [];
  for (const set of game.sets) {
    reds.push(set.red);
    greens.push(set.green);
    blues.push(set.blue);
  }
  return Math.max(...reds) * Math.max(...greens) * Math.max(...blues);
};

// Read the input file and process the data
readFile().then((res) => {
  for (const [index, line] of res.entries()) {
    prepareData(index, line);
  }

  // Validate each game
  for (const game of data) {
    validateGame(game);
  }

  // Print the sum of IDs of valid games
  console.log(
    data
      .filter((game) => {
        return game.valid == true;
      })
      .reduce((sum, game) => sum + game.game, 0)
  );

  // Print the sum of minimum dices power for all games
  console.log(data.reduce((sum, game) => sum + getMinimumDicesPower(game), 0));
});
