export type Domino = [number, number];

export class DominoSet {
  private data: Domino[];

  constructor(initialData: Domino[]) {
    this.data = initialData;
  }

  getDominoes(): Domino[] {
    return this.data;
  }

  reset(initialData: Domino[]) {
    this.data = initialData;
  }

  countDouble(): number {
    return this.data.filter(([a, b]) => a === b).length;
  }

  sort(order: "asc" | "desc") {
    this.data.sort((a, b) => {
      const sumA = a[0] + a[1];
      const sumB = b[0] + b[1];
      if (sumA === sumB) {
        return order === "asc" ? a[0] - b[0] : b[0] - a[0];
      }
      return order === "asc" ? sumA - sumB : sumB - sumA;
    });
  }

  flip() {
    this.data = this.data.map(([a, b]) => [b, a]);
  }

  removeDuplicates() {
    const seen = new Set<string>();
    this.data = this.data.filter(([a, b]) => {
      const key1 = `${a},${b}`;
      const key2 = `${b},${a}`;
      if (seen.has(key1) || seen.has(key2)) return false;
      seen.add(key1);
      return true;
    });
  }

  removeByTotal(total: number) {
    this.data = this.data.filter(([a, b]) => a + b !== total);
  }
}
