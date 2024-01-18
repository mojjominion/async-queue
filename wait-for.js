export async function waitFor({ predicate, errorMsg, noTimeout }) {
  return new Promise((resolve, reject) => {
    if (!noTimeout) {
      setTimeout(() => reject(errorMsg ?? "Timeout"), 3 * 1000);
    }

    setInterval(() => {
      if (predicate()) {
        resolve(true);
      }
    }, 200);
  });
}
