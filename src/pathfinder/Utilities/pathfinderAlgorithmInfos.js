export const algorithmInfos = {
  "Djikstra's": {
    worst: { text: "O(n\u00B2)", style: { color: "red", margin: 0 } },
    best: { text: "O(n)", style: { color: "green", margin: 0 } },
    average: { text: "O(n\u00B2)", style: { color: "red", margin: 0 } },
    description:
      "Bubble Sort steps through the array, compares adjacent elements and swaps them if they are in the wrong order, moving the larger elements to the back of the array. The pass through the array is repeated until the array is sorted.",
  },
  "A\u002A": {
    worst: { text: "O(n\u00B2)", style: { color: "red", margin: 0 } },
    best: { text: "O(n+k)", style: { color: "green", margin: 0 } },
    average: { text: "O(n+k)", style: { color: "green", margin: 0 } },
    description:
      "Bucket Sort is a divide and conquer sorting algorithm that generalizes counting sort by partitioning an array into a finite number of buckets. Each bucket is then sorted individually (here, using insertion sort).",
  },
  "Breadth First Search": {
    worst: { text: "O(n log(n))", style: { color: "darkorange", margin: 0 } },
    best: { text: "O(n log(n))", style: { color: "darkorange", margin: 0 } },
    average: { text: "O(n log(n))", style: { color: "darkorange", margin: 0 } },
    description:
      "Heap Sort sorts an array by first converting the array into a heap. It then sorts the data in reverse by repeatedly placing the largest unsorted element into its correct place. It does so by repeatedly by removing the maximum value in the heap, putting that value into the sorted array, and rebuilding the heap with one fewer elements.",
  },
  "Depth First Search": {
    worst: { text: "O(n\u00B2)", style: { color: "red", margin: 0 } },
    best: { text: "O(n)", style: { color: "green", margin: 0 } },
    average: { text: "O(n\u00B2)", style: { color: "red", margin: 0 } },
    description:
      "Insertion Sort iterates through the array and at each iteration, removes one element from the input data, finds the location it belongs within the sorted array, and inserts it there. It repeats until no input elements remain.",
  },
};
