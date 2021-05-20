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

/* -------------------------------------------------------------------------- */

export function bubbleSort(array) {
  // O(n^2)
  let animations = [];

  let n = array.length;
  for (var i = 0; i < n - 1; i++) {
    for (var j = 0; j < n - i - 1; j++) {
      animations.push({ type: "access", indices: [j, j + 1] });
      if (array[j] > array[j + 1]) {
        swap(array, j, j + 1);
        animations.push({ type: "swap", indices: [j, j + 1] });
      }
    }
  }

  return animations;
}

/* -------------------------------------------------------------------------- */

// todo: color buckets?
export function bucketSort(array, bucketCount = 10) {
  // O(n^2)
  let animations = [];

  let min = Math.min(...array);
  let max = Math.max(...array);

  // init buckets
  const bucketSize = Math.ceil((max - min) / bucketCount);
  let buckets = new Array(bucketCount);
  for (var i = 0; i < bucketCount; i++) {
    buckets[i] = [];
  }

  // bucketPointers[i] points to end index of bucket[i] (i.e. where to insert new value into bucket)
  let bucketPointers = new Array(bucketCount).fill(0);

  // add values to buckets
  array.forEach((val) => {
    let bucketNumber = Math.floor((val - min) / bucketSize);
    // put value into bucket
    buckets[bucketNumber].push(val);
    // update pointer for all buckets after (and including) bucket[bucketNumber]
    for (var j = bucketNumber; j < bucketCount; j++) {
      bucketPointers[j]++;
    }
  });

  // create bucket animation
  buckets.forEach((bucket, index) => {
    let indexOffset = index > 0 ? bucketPointers[index - 1] : 0;
    for (var k = 0; k < bucket.length; k++) {
      animations.push({ type: "access", indices: [k + indexOffset] });
      animations.push({
        type: "insert",
        indices: [k + indexOffset],
        height: bucket[k],
      });
    }
  });

  // sort buckets w/ insertionSort
  array = [];
  buckets.forEach((bucket, index) => {
    let indexOffset = index > 0 ? bucketPointers[index - 1] : 0;
    // indices in animation from insertion sort dont match og array indices
    let bucketAnimations = insertionSort(bucket);
    // for all indices in animations, update by adding offset (which is length of prior buckets)
    bucketAnimations = bucketAnimations.map((animation) => {
      return {
        type: animation["type"],
        indices: animation["indices"].map((i) => i + indexOffset),
      };
    });
    animations = [...animations, ...bucketAnimations];
    array = [...array, ...bucket];
  });

  return animations;
}

/* -------------------------------------------------------------------------- */

// todo: color levels of heap?
export function heapSort(array) {
  // O(n log(n))
  let animations = [];

  const findLevel = (index) => {
    let level = 0;
    while (index > 0) {
      index = Math.floor((index - 1) / 2);
      level++;
    }
    return level;
  };
  const heapify = (array, size, i, animations) => {
    let max = i;
    let left = 2 * i + 1; // left child idx
    let right = 2 * i + 2; // right child idx

    // left child is not last and value is bigger than root
    if (left < size && array[left] > array[max]) {
      max = left;
    }
    // left child is not last and value is bigger than root
    if (right < size && array[right] > array[max]) {
      max = right;
    }
    if (max !== i) {
      animations.push({ type: "access", indices: [i, max] });
      swap(array, i, max);
      animations.push({ type: "swap", indices: [i, max] });

      heapify(array, size, max, animations);
    }
  };

  let n = array.length;
  // create heap
  for (var i = Math.floor(n / 2 - 1); i >= 0; i--) {
    animations.push({ type: "access", indices: [i] });
    heapify(array, n, i, animations);
  }

  for (i = n - 1; i >= 0; i--) {
    animations.push({ type: "access", indices: [0, i] });
    swap(array, 0, i);
    animations.push({ type: "swap", indices: [0, i] });
    heapify(array, i, 0, animations);
  }

  return animations;
}

/* -------------------------------------------------------------------------- */

export function insertionSort(array) {
  // O(n^2)
  let animations = [];

  let n = array.length;
  for (var i = 1; i < n; i++) {
    for (var j = i - 1; j > -1; j--) {
      animations.push({ type: "access", indices: [j, j + 1] });
      if (array[j] > array[j + 1]) {
        swap(array, j, j + 1);
        animations.push({ type: "swap", indices: [j, j + 1] });
      } else break;
    }
  }

  return animations;
}

/* -------------------------------------------------------------------------- */

export function mergeSort(array, animations = [], offset = 0) {
  // O(n log(n))
  let n = array.length;
  if (n < 2) {
    return animations;
  }

  const mid = Math.floor(n / 2);
  const left = array.slice(0, mid);
  const right = array.slice(mid);

  let lAnimations = mergeSort(left, animations, offset);
  let rAnimations = mergeSort(right, animations, offset + mid);
  animations = [...lAnimations, ...rAnimations];

  let i = 0;
  let j = 0;
  let k = 0;

  let p = left.length;
  let q = right.length;

  while (i < p && j < q) {
    animations.push({
      type: "access",
      indices: [i + offset, j + offset + mid],
    });

    if (left[i] < right[j]) {
      animations.push({
        type: "insert",
        indices: [k + offset],
        height: left[i],
      });
      array[k] = left[i];
      i += 1;
    } else {
      animations.push({
        type: "insert",
        indices: [k + offset],
        height: right[j],
      });
      array[k] = right[j];
      j += 1;
    }
    k += 1;
  }

  while (i < p) {
    array[k] = left[i];
    animations.push({ type: "access", indices: [i + offset] });
    animations.push({ type: "insert", indices: [k + offset], height: left[i] });
    i += 1;
    k += 1;
  }
  while (j < q) {
    array[k] = right[j];
    animations.push({ type: "access", indices: [j + offset + mid] });
    animations.push({
      type: "insert",
      indices: [k + offset],
      height: right[j],
    });
    j += 1;
    k += 1;
  }

  return animations;
}

/* -------------------------------------------------------------------------- */

export function quickSort(
  array,
  start = 0,
  end = array.length - 1,
  animations = []
) {
  // O(n^2)

  // recursive implementation
  const partition = (array, start, end, animations) => {
    const pivotIdx = Math.floor((start + end) / 2);
    const pivotVal = array[pivotIdx];
    while (start <= end) {
      while (array[start] < pivotVal) {
        animations.push({ type: "access", indices: [start, pivotIdx] });
        start++;
      }
      while (array[end] > pivotVal) {
        animations.push({ type: "access", indices: [end, pivotIdx] });
        end--;
      }
      animations.push({ type: "access", indices: [start, end] });
      if (start <= end) {
        swap(array, start, end);
        animations.push({ type: "swap", indices: [start, end] });

        start++;
        end--;
      }
    }
    return start;
  };

  if (start >= end) {
    return;
  }
  let index = partition(array, start, end, animations);

  if (start < index - 1) {
    quickSort(array, start, index - 1, animations);
  }
  if (index < end) {
    quickSort(array, index, end, animations);
  }

  return animations;
}

/* -------------------------------------------------------------------------- */

export function radixSort(array) {
  // O(nk)
  let animations = [];

  const getNum = (val, idx) => {
    const strNum = val.toString();
    let end = strNum.length - 1;
    const num = strNum[end - idx];
    return num === undefined ? 0 : num;
  };
  const longestNum = (array) => {
    let longest = "0";
    array.forEach((num) => {
      const strNum = num.toString();
      if (strNum.length > longest.length) {
        longest = strNum;
      }
    });
    return longest.length;
  };

  let maxLength = longestNum(array);
  for (var i = 0; i < maxLength; i++) {
    const bucketCount = 10;
    var buckets = new Array(bucketCount);
    for (var k = 0; k < bucketCount; k++) {
      buckets[k] = [];
    }

    for (var j = 0; j < array.length; j++) {
      let num = getNum(array[j], i);
      if (num !== undefined) {
        buckets[num].push(array[j]);
      }
    }
    array = buckets.flat();
    // batch update
    for (var j = 0; j < array.length; j++) {
      animations.push({ type: "access", indices: [j] });
      animations.push({ type: "insert", indices: [j], height: array[j] });
    }
  }
  return animations;
}

/* -------------------------------------------------------------------------- */

export function selectionSort(array) {
  // O(n^2)
  let animations = [];

  // O(n^2)
  let n = array.length;
  for (var i = 0; i < n; i++) {
    let smallest = i;
    for (var j = i + 1; j < n; j++) {
      animations.push({ type: "access", indices: [j, smallest] });
      if (array[j] < array[smallest]) {
        smallest = j;
      }
    }
    if (smallest !== i) {
      swap(array, i, smallest);
      animations.push({ type: "swap", indices: [i, smallest] });
    }
  }

  return animations;
}

/* -------------------------------------------------------------------------- */

function swap(array, index1, index2) {
  const temp = array[index1];
  array[index1] = array[index2];
  array[index2] = temp;
}
