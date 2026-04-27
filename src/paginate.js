function partition(arr, l, r, cmp) {
  const t = Math.floor(Math.random() * (r - l)) + l;
  [arr[l], arr[t]] = [arr[t], arr[l]];
  let j = l;
  for (let i = l + 1; i < r; i++) {
    if (cmp(arr[i], arr[l]) < 0) {
      j++;
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
  }
  [arr[j], arr[l]] = [arr[l], arr[j]];
  return j;
}

function quickselect(arr, l, r, k, cmp) {
  if (l >= r - 1) return;
  const s = partition(arr, l, r, cmp);
  const rank = s - l;
  if (rank === k) return;
  if (rank > k) quickselect(arr, l, s, k, cmp);
  else quickselect(arr, s + 1, r, k - rank - 1, cmp);
}

function quicksort(arr, l, r, cmp) {
  if (l < r - 1) {
    const s = partition(arr, l, r, cmp);
    quicksort(arr, l, s, cmp);
    quicksort(arr, s + 1, r, cmp);
  }
}

/**
 * Returns the sorted results for a given page without sorting the full dataset.
 *
 * Time complexity: O(n) average to isolate the page + O(p log p) to sort it,
 * where n is the total number of items and p is the page size.
 * This is more efficient than O(n log n) full sort when p << n.
 *
 * @param {readonly any[]} items      - Full unsorted dataset (not mutated)
 * @param {number} pageNumber - 0-indexed page number
 * @param {number} pageSize   - Number of items per page
 * @param {(a: any, b: any) => number} comparator - Same convention as Array.sort
 * @returns {any[]} Sorted items for the requested page, or [] if the page is out of range
 */
export function paginate(items, pageNumber, pageSize, comparator) {
  if (pageSize <= 0) throw new RangeError("pageSize must be greater than 0");
  if (pageNumber < 0) throw new RangeError("pageNumber must be non-negative");
  if (items.length === 0) return [];

  const start = pageNumber * pageSize;
  if (start >= items.length) return [];

  const count = Math.min(pageSize, items.length - start);
  const copy = [...items];

  // Step 1: partition so copy[start] is the start-th smallest element
  // and all elements before it are smaller
  quickselect(copy, 0, copy.length, start, comparator);

  // Step 2: within copy[start..], partition so copy[start+count-1] is the
  // (count-1)-th smallest, isolating exactly the page elements
  quickselect(copy, start, copy.length, count - 1, comparator);

  // Step 3: sort only the page slice
  quicksort(copy, start, start + count, comparator);

  return copy.slice(start, start + count);
}
