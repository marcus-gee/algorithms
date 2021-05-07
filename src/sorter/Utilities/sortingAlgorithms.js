export function bubbleSort(array) {
  // O(n^2)
  let animations = [];

  let n = array.length;
  for (var i = 0; i < n - 1; i++) {
    for (var j = 0; j < n - i - 1; j++) {
      animations.push([[j, j + 1], "access"]);
      if (array[j] > array[j + 1]) {
        swap(array, j, j + 1);
        animations.push([[j, j + 1], "swap"]);
      }
    }
  }

  return animations;
}

/* -------------------------------------------------------------------------- */

// todo: add animations
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
      animations.push([[k + indexOffset], "access"]);
      animations.push([[k + indexOffset, bucket[k]], "insert"]);
    }
  });

  // sort buckets w/ insertionSort
  array = [];
  buckets.forEach((bucket, index) => {
    let indexOffset = index > 0 ? bucketPointers[index - 1] : 0;
    // indices in animation from insertion sort dont match og array indices
    let bucketAnimations = insertionSort(bucket);
    // for all indices in animations, update by adding offset (which is length of prior buckets)
    bucketAnimations = bucketAnimations.map(([barIndices, type]) => {
      return [barIndices.map((i) => i + indexOffset), type];
    });
    animations = [...animations, ...bucketAnimations];
    array = [...array, ...bucket];
  });

  return animations;
}

/* -------------------------------------------------------------------------- */

// todo: color levels of heap
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
      animations.push([[i, max], "access"]);
      swap(array, i, max);
      animations.push([[i, max], "swap"]);

      heapify(array, size, max, animations);
    }
  };

  let n = array.length;
  // create heap
  for (var i = Math.floor(n / 2 - 1); i >= 0; i--) {
    animations.push([[i], "access"]);
    heapify(array, n, i, animations);
  }

  for (i = n - 1; i >= 0; i--) {
    animations.push([[0, i], "access"]);
    swap(array, 0, i);
    animations.push([[0, i], "swap"]);
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
      animations.push([[j, j + 1], "access"]);
      if (array[j] > array[j + 1]) {
        swap(array, j, j + 1);
        animations.push([[j, j + 1], "swap"]);
      } else break;
    }
  }

  return animations;
}

/* -------------------------------------------------------------------------- */

export function mergeSort(array, animations = [], offset = 0) {
  // O(n log(n))
  console.log("-");
  console.log(array);
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
    animations.push([[i + offset, j + offset + mid], "access"]);

    if (left[i] < right[j]) {
      animations.push([[k + offset, left[i]], "insert"]);
      array[k] = left[i];
      i += 1;
    } else {
      animations.push([[k + offset, right[j]], "insert"]);
      array[k] = right[j];
      j += 1;
    }
    k += 1;
  }

  while (i < p) {
    array[k] = left[i];
    animations.push([[i + offset], "access"]);
    animations.push([[k + offset, left[i]], "insert"]);
    i += 1;
    k += 1;
  }
  while (j < q) {
    array[k] = right[j];
    animations.push([[j + offset + mid], "access"]);
    animations.push([[k + offset, right[j]], "insert"]);
    j += 1;
    k += 1;
  }
  console.log(animations);
  console.log(array);
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
        animations.push([[start, pivotIdx], "access"]);
        start++;
      }
      while (array[end] > pivotVal) {
        animations.push([[end, pivotIdx], "access"]);
        end--;
      }
      animations.push([[start, end], "access"]);
      if (start <= end) {
        swap(array, start, end);
        animations.push([[start, end], "swap"]);

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
      animations.push([[j], "access"]);
      animations.push([[j, array[j]], "insert"]);
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
      animations.push([[j, smallest], "access"]);
      if (array[j] < array[smallest]) {
        smallest = j;
      }
    }
    if (smallest !== i) {
      swap(array, i, smallest);
      animations.push([[i, smallest], "swap"]);
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
