export const algorithmInfos = {
  "Djikstra's": {
    worst: { text: "O(|E| + |V|log|V|)", style: { color: "black", margin: 0 } },
    description: "",
  },
  "A\u002A -  Manhattan Distance": {
    worst: { text: "O(|E|)", style: { color: "black", margin: 0 } },
    description: "A* algorithm using Manhattan Distance as its heuristic.",
  },
  "A\u002A - Cross Product": {
    worst: { text: "O(|E|)", style: { color: "black", margin: 0 } },
    description:
      "A* algorithm using the cross product between the start to end vector and the current cell to end vector as its heuristic.",
  },
  "Breadth First Search": {
    worst: { text: "O(|V| + |E|)", style: { color: "black", margin: 0 } },
    description: "",
  },
  "Depth First Search": {
    worst: { text: "O(|V| + |E|)", style: { color: "black", margin: 0 } },
    description: "",
  },
};
