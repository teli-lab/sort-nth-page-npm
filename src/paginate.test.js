import { test } from "node:test";
import assert from "node:assert/strict";
import { paginate } from "./paginate.js";

const numCmp = (a, b) => a - b;

test("returns correct first page", () => {
  const items = [5, 3, 8, 1, 9, 2, 7, 4, 6, 10];
  assert.deepEqual(paginate(items, 0, 3, numCmp), [1, 2, 3]);
});

test("returns correct middle page", () => {
  const items = [5, 3, 8, 1, 9, 2, 7, 4, 6, 10];
  assert.deepEqual(paginate(items, 1, 3, numCmp), [4, 5, 6]);
});

test("returns partial last page", () => {
  const items = [5, 3, 8, 1, 9, 2, 7, 4, 6, 10];
  assert.deepEqual(paginate(items, 3, 3, numCmp), [10]);
});

test("returns empty array for out-of-range page", () => {
  assert.deepEqual(paginate([1, 2, 3], 5, 3, numCmp), []);
});

test("returns empty array for empty input", () => {
  assert.deepEqual(paginate([], 0, 10, numCmp), []);
});

test("does not mutate the original array", () => {
  const items = [3, 1, 2];
  const original = [...items];
  paginate(items, 0, 2, numCmp);
  assert.deepEqual(items, original);
});

test("works with objects via custom comparator", () => {
  const items = [{ score: 3 }, { score: 1 }, { score: 2 }];
  const result = paginate(items, 0, 2, (a, b) => a.score - b.score);
  assert.deepEqual(result, [{ score: 1 }, { score: 2 }]);
});

test("single item dataset", () => {
  assert.deepEqual(paginate([42], 0, 10, numCmp), [42]);
});

test("page size equal to dataset size", () => {
  const items = [3, 1, 2];
  assert.deepEqual(paginate(items, 0, 3, numCmp), [1, 2, 3]);
});
