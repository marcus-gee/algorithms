// good
export function bubbleSort(array) {
  // O(n^2)
  let animations = [];
  let arr = [...array]; // copy array to not change original

  let n = arr.length;
  for (var i = 0; i < n - 1; i++) {
    for (var j = 0; j < n - i - 1; j++) {
      animations.push([[j, j + 1], "comparison"]);
      if (arr[j] > arr[j + 1]) {
        swap(arr, j, j + 1);
        animations.push([[j, j + 1], "swap"]);
      }
    }
  }

  return animations;
}

/* -------------------------------------------------------------------------- */

// todo: add animations
export function bucketSort(array) {
  // O(n^2)
  let arr = [...array]; // copy array to not change original

  let min = arr[0];
  let max = arr[0];
  let bucketSize = 5;

  arr.forEach((val) => {
    if (val < min) {
      min = val;
    } else if (val > max) {
      max = val;
    }
  });

  // init buckets
  let bucketCount = Math.floor((max - min) / bucketSize) + 1;
  var buckets = new Array(bucketCount);

  for (var i = 0; i < bucketCount; i++) {
    buckets[i] = [];
  }

  // add values to buckets
  arr.forEach((val) => {
    buckets[Math.floor((val - min) / bucketSize)].push(val);
  });

  // sort buckets w/ insertionSort
  let sortedArray = [];
  buckets.forEach((bucket) => {
    let sortedBucket = insertionSort(bucket);
    sortedArray = sortedArray.concat(sortedBucket);
  });

  return sortedArray;
}

/* -------------------------------------------------------------------------- */

// todo: add animations
export function heapSort(array) {
  // O(n log(n))
  let arr = [...array]; // copy array to not change original

  const heapify = (arr, size, i) => {
    let max = i;
    let left = 2 * i + 1; // left child idx
    let right = 2 * i + 2; // right child idx

    // left child is not last and value is bigger than root
    if (left < size && arr[left] > arr[max]) {
      max = left;
    }
    // left child is not last and value is bigger than root
    if (right < size && arr[right] > arr[max]) {
      max = right;
    }
    if (max !== i) {
      swap(arr, i, max);
      heapify(arr, size, max);
    }
  };

  let n = arr.length;
  // create heap
  for (var i = Math.floor(n / 2 - 1); i >= 0; i--) {
    heapify(arr, n, i);
  }

  for (i = n - 1; i >= 0; i--) {
    swap(arr, 0, i);
    heapify(arr, i, 0);
  }

  return arr;
}

/* -------------------------------------------------------------------------- */

// good
export function insertionSort(array) {
  // O(n^2)
  let animations = [];
  let arr = [...array]; // copy array to not change original

  let n = arr.length;
  for (var i = 1; i < n; i++) {
    for (var j = i - 1; j > -1; j--) {
      animations.push([[j, j + 1], "comparison"]);
      if (arr[j] > arr[j + 1]) {
        swap(arr, j, j + 1);
        animations.push([[j, j + 1], "swap"]);
      } else break;
    }
  }

  return animations;
}

/* -------------------------------------------------------------------------- */

// todo: add animations
export function mergeSort(array) {
  // O(n log(n))
  let animations = [];
  let arr = [...array]; // copy array to not change original

  function merge(left, right) {
    let arr = [];

    while (left.length && right.length) {
      if (left[0] < right[0]) {
        arr.push(left.shift());
      } else {
        arr.push(right.shift());
      }
    }

    return [...arr, ...left, ...right];
  }

  const mid = arr.length / 2;

  if (arr.length < 2) {
    return arr;
  }

  const left = arr.splice(0, mid); // right = arr
  return merge(mergeSort(left), mergeSort(arr));
}

/* -------------------------------------------------------------------------- */

// good
export function quickSort(
  array,
  start = 0,
  end = array.length - 1,
  animations = []
) {
  // O(n^2)
  let arr = [...array]; // copy array to not change original

  // recursive implementation
  const partition = (arr, start, end, animations) => {
    const pivotIdx = Math.floor((start + end) / 2);
    const pivotVal = arr[pivotIdx];
    while (start <= end) {
      while (arr[start] < pivotVal) {
        animations.push([[start, pivotIdx], "comparison"]);
        start++;
      }
      while (arr[end] > pivotVal) {
        animations.push([[end, pivotIdx], "comparison"]);
        end--;
      }
      animations.push([[start, end], "comparison"]);
      if (start <= end) {
        swap(arr, start, end);
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
  let index = partition(arr, start, end, animations);

  if (start < index - 1) {
    quickSort(arr, start, index - 1, animations);
  }
  if (index < end) {
    quickSort(arr, index, end, animations);
  }

  return animations;
}

/* -------------------------------------------------------------------------- */

// todo: add animations
export function radixSort(array) {
  // O(nk)
  let arr = [...array]; // copy array to not change original

  const getNum = (val, idx) => {
    const strNum = val.toString();
    let end = strNum.length - 1;
    const num = strNum[end - idx];
    return num === undefined ? 0 : num;
  };
  const longestNum = (arr) => {
    let longest = "0";
    arr.forEach((num) => {
      const strNum = num.toString();
      if (strNum.length > longest.length) {
        longest = strNum;
      }
    });
    return longest.length;
  };

  let maxLength = longestNum(arr);
  for (var i = 0; i < maxLength; i++) {
    const bucketCount = 10;
    var buckets = new Array(bucketCount);
    for (var k = 0; k < bucketCount; k++) {
      buckets[k] = [];
    }

    for (var j = 0; j < arr.length; j++) {
      let num = getNum(arr[j], i);
      if (num !== undefined) {
        buckets[num].push(arr[j]);
      }
    }
    arr = buckets.flat();
  }

  return arr;
}

/* -------------------------------------------------------------------------- */

// good
export function selectionSort(array) {
  // O(n^2)
  let animations = [];
  let arr = [...array]; // copy array to not change original

  // O(n^2)
  let n = arr.length;
  for (var i = 0; i < n; i++) {
    let smallest = i;
    for (var j = i + 1; j < n; j++) {
      animations.push([[j, smallest], "comparison"]);
      if (arr[j] < arr[smallest]) {
        smallest = j;
      }
    }
    if (smallest !== i) {
      swap(arr, i, smallest);
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
