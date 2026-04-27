# sort-nth-page

Efficient in-memory pagination using quickselect. Returns the sorted items for a single page in **O(n)** average time to isolate the slice + **O(p log p)** to sort it — no full sort required.

## Install

```sh
npm install @telilabs/sort-nth-page
```

## Usage

```ts
import { paginate } from "@telilabs/sort-nth-page";

const items = [5, 3, 8, 1, 9, 2, 7, 4, 6, 10];

paginate(items, 0, 3, (a, b) => a - b); // [1, 2, 3]
paginate(items, 1, 3, (a, b) => a - b); // [4, 5, 6]
paginate(items, 2, 3, (a, b) => a - b); // [7, 8, 9]
```

## API

```ts
paginate<T>(
  items: readonly T[],
  pageNumber: number,   // 0-indexed
  pageSize: number,
  comparator: (a: T, b: T) => number
): T[]
```

Returns the sorted items for the requested page, or `[]` if the page is out of range. The original array is not mutated.

## License

MIT
