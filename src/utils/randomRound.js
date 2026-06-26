import { pictureLocations } from "../data/pictureLocations.js";
import { mapNodes } from "../data/mapNodes.js";

const ROUND_COUNT = 5;

export function createRounds(mode) {
  const picturePool = shuffleArray(pictureLocations);
  const mapPool = shuffleArray(mapNodes);

  return Array.from({ length: ROUND_COUNT }, (_, index) => {
    if (mode === "picture") {
      return makePictureRound(picturePool[index % picturePool.length]);
    }

    if (mode === "map") {
      return makeMapRound(mapPool[index % mapPool.length]);
    }

    const usePicture = Math.random() < 0.5;
    if (usePicture) {
      return makePictureRound(picturePool[index % picturePool.length]);
    }

    return makeMapRound(mapPool[index % mapPool.length]);
  });
}

function makePictureRound(location) {
  return {
    roundType: "picture",
    clue: location,
    answer: location
  };
}

function makeMapRound(startingNode) {
  return {
    roundType: "map",
    clue: startingNode,
    // The answer is the starting location, even if the player moves around.
    // This keeps Map Mode from becoming too easy after exploring.
    answer: startingNode
  };
}

function shuffleArray(array) {
  const copy = [...array];
  for (let i = copy.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}
