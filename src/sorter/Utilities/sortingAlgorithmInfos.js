export const algorithmInfos = {
  "Bubble Sort": {
    worst: { text: "O(n\u00B2)", style: { color: "red", margin: 0 } },
    best: { text: "O(n)", style: { color: "green", margin: 0 } },
    average: { text: "O(n\u00B2)", style: { color: "red", margin: 0 } },
    description:
      "Bubble Sort steps through the array, compares adjacent elements and swaps them if they are in the wrong order, moving the larger elements to the back of the array. The pass through the array is repeated until the array is sorted.",
  },
  "Bucket Sort": {
    worst: { text: "O(n\u00B2)", style: { color: "red", margin: 0 } },
    best: { text: "O(n+k)", style: { color: "green", margin: 0 } },
    average: { text: "O(n+k)", style: { color: "green", margin: 0 } },
    description:
      "Bucket Sort is a divide and conquer sorting algorithm that generalizes counting sort by partitioning an array into a finite number of buckets. Each bucket is then sorted individually (here, using insertion sort).",
  },
  "Heap Sort": {
    worst: { text: "O(n log(n))", style: { color: "darkorange", margin: 0 } },
    best: { text: "O(n log(n))", style: { color: "darkorange", margin: 0 } },
    average: { text: "O(n log(n))", style: { color: "darkorange", margin: 0 } },
    description:
      "Heap Sort sorts an array by first converting the array into a heap. It then sorts the data in reverse by repeatedly placing the largest unsorted element into its correct place. It does so by repeatedly by removing the maximum value in the heap, putting that value into the sorted array, and rebuilding the heap with one fewer elements.",
  },
  "Insertion Sort": {
    worst: { text: "O(n\u00B2)", style: { color: "red", margin: 0 } },
    best: { text: "O(n)", style: { color: "green", margin: 0 } },
    average: { text: "O(n\u00B2)", style: { color: "red", margin: 0 } },
    description:
      "Insertion Sort iterates through the array and at each iteration, removes one element from the input data, finds the location it belongs within the sorted array, and inserts it there. It repeats until no input elements remain.",
  },
  "Merge Sort": {
    worst: { text: "O(n log(n))", style: { color: "darkorange", margin: 0 } },
    best: { text: "O(n log(n))", style: { color: "darkorange", margin: 0 } },
    average: { text: "O(n log(n))", style: { color: "darkorange", margin: 0 } },
    description:
      "Merge Sort divides the unsorted array into n sub-arrays, each containing one element. Then, repeatedly merges sub-arrays to produce new sorted sub-arrays until there is only one sub-array remaining (the sorted array).",
  },
  "Quick Sort": {
    worst: { text: "O(n\u00B2)", style: { color: "red", margin: 0 } },
    best: { text: "O(n log(n))", style: { color: "darkorange", margin: 0 } },
    average: { text: "O(n log(n))", style: { color: "darkorange", margin: 0 } },
    description:
      "Quick Sort is a divide-and-conquer algorithm. It works by selecting a 'pivot' element from the array and partitioning the other elements into two sub-arrays, according to whether they are less than or greater than the pivot. The sub-arrays are then sorted recursively.",
  },
  "Radix Sort": {
    worst: { text: "O(nk)", style: { color: "green", margin: 0 } },
    best: { text: "O(nk)", style: { color: "green", margin: 0 } },
    average: { text: "O(nk)", style: { color: "green", margin: 0 } },
    description:
      "Radix Sort is an algorithm that sorts numbers by processing individual digits. The (LSD) algorithm first sorts the array by the least significant digit while preserving their relative order using a stable sort. Then it sorts them by the next digit, and so on from the least significant to the most significant, ending up with a sorted array",
  },
  "Selection Sort": {
    worst: { text: "O(n\u00B2)", style: { color: "red", margin: 0 } },
    best: { text: "O(n\u00B2)", style: { color: "red", margin: 0 } },
    average: { text: "O(n\u00B2)", style: { color: "red", margin: 0 } },
    description:
      "Selection Sort divides the input array into two parts: a sorted sub-array of items and a sub-array of the remaining unsorted items that occupy the rest of the array. Initially, the sorted sub-array is empty and the unsorted sub-array is the entire input array. The algorithm proceeds by finding the smallest element in the unsorted sub-array, swapping it with the leftmost unsorted element (putting it in sorted order), and moving the sub-array boundaries one element to the right.",
  },
};
