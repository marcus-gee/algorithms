function bubbleSort(array) {
  // O(n^2)
  let n = array.length;
  for (i = 0; i < n - 1; i++) {
    for (j = 0; j < n - i - 1; j++) {
      if (array[j] > array[j + 1]) {
        const temp = array[j];
        array[j] = array[j + 1];
        array[j + 1] = temp;
      }
    }
  }

  return array;
}

function bucketSort() {
  // todo
}

function heapSort() {
  // todo
}

function insertionSort(array) {
  // O(n^2)
  let n = array.length;
  for (i = 1; i < n; i++) {
    let j = i - 1;
    let curr = array[i];

    while (i > -1 && array[j] > curr) {
      array[i + 1] = array[i];
      i--;
    }
    array[i + 1] = curr;
  }

  return array;
}

function mergeSort() {
  // todo
}

function quickSort() {
  // todo
}

function radixSort() {
  // todo
}

function selectionSort(array) {
  // O(n^2)
  let n = array.length;
  for (i = 0; i < n; i++) {
    let smallest = i;
    for (j = i + 1; j < n; j++) {
      if (array[j] < array[smallest]) {
        smallest = j;
      }
    }
    if (smallest != i) {
      let temp = array[i];
      array[i] = smallest;
      array[j] = temp;
    }
  }

  return array;
}
