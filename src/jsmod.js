// JS functions
export function fibonacci2(n) {
    if (n <= 1) {
      return n;
    }
    return fibonacci2(n - 1) + fibonacci2(n - 2);
  }