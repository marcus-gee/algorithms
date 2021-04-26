function bubbleSort(array) {
  // O(n^2)
  let arr = [...array]; // copy array to not change original

  let n = arr.length;
  for (i = 0; i < n - 1; i++) {
    for (j = 0; j < n - i - 1; j++) {
      if (arr[j] > arr[j + 1]) {
        const temp = arr[j];
        arr[j] = arr[j + 1];
        arr[j + 1] = temp;
      }
    }
  }

  return arr;
}

/* -------------------------------------------------------------------------- */

function bucketSort(array) {
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

  for (i = 0; i < bucketCount; i++) {
    buckets[i] = [];
  }

  // add values to buckets
  arr.forEach((val) => {
    buckets[Math.floor((val - min) / bucketSize)].push(val);
  });

  // sort buckets w/ insertionSort
  sortedArray = [];
  buckets.forEach((bucket) => {
    sortedBucket = insertionSort(bucket);
    sortedArray = sortedArray.concat(sortedBucket);
  });

  return sortedArray;
}

/* -------------------------------------------------------------------------- */

function heapSort(array) {
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
    if (max != i) {
      // swap
      const temp = arr[i];
      arr[i] = arr[max];
      arr[max] = temp;

      heapify(arr, size, max);
    }
  };

  let n = arr.length;
  // create heap
  for (i = Math.floor(n / 2 - 1); i >= 0; i--) {
    heapify(arr, n, i);
  }

  for (i = n - 1; i >= 0; i--) {
    const temp = arr[0];
    arr[0] = arr[i];
    arr[i] = temp;

    heapify(arr, i, 0);
  }

  return arr;
}

/* -------------------------------------------------------------------------- */

function insertionSort(array) {
  // O(n^2)
  let arr = [...array]; // copy array to not change original

  let n = arr.length;
  for (i = 1; i < n; i++) {
    let j = i - 1;
    let curr = arr[i];

    while (j > -1 && arr[j] > curr) {
      arr[j + 1] = arr[j];
      j--;
    }
    arr[j + 1] = curr;
  }

  return arr;
}

/* -------------------------------------------------------------------------- */

function mergeSort() {
  // O(n log(n))
  let arr = [...array]; // copy array to not change original

  // todo
}

/* -------------------------------------------------------------------------- */

function quickSort(array, start = 0, end = array.length - 1) {
  // O(n^2)
  let arr = [...array]; // copy array to not change original

  // recursive implementation
  const partition = (arr, start, end) => {
    const pivot = arr[Math.floor((start + end) / 2)];
    while (start <= end) {
      while (arr[start] < pivot) {
        start++;
      }
      while (arr[end] > pivot) {
        end--;
      }
      if (start <= end) {
        const temp = arr[start];
        arr[start] = arr[end];
        arr[end] = temp;
        start++;
        end--;
      }
    }
    return start;
  };

  if (start >= end) {
    return;
  }
  let index = partition(arr, start, end);

  if (start < index - 1) {
    quickSort(arr, start, index - 1);
  }
  if (index < end) {
    quickSort(arr, index, end);
  }

  return arr;
}

/* -------------------------------------------------------------------------- */

function radixSort(array) {
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
  for (i = 0; i < maxLength; i++) {
    const bucketCount = 10;
    var buckets = new Array(bucketCount);
    for (k = 0; k < bucketCount; k++) {
      buckets[k] = [];
    }

    for (j = 0; j < arr.length; j++) {
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

function selectionSort(array) {
  // O(n^2)
  let arr = [...array]; // copy array to not change original

  // O(n^2)
  let n = arr.length;
  for (i = 0; i < n; i++) {
    let smallest = i;
    for (j = i + 1; j < n; j++) {
      if (arr[j] < arr[smallest]) {
        smallest = j;
      }
    }
    if (smallest != i) {
      let temp = arr[i];
      arr[i] = arr[smallest];
      arr[smallest] = temp;
    }
  }

  return arr;
}
