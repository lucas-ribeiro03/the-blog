export const asyncDelay = async (
  milisseconds: number = 0,
  verbose: boolean = false
) => {
  if (milisseconds <= 0) return;

  if (verbose) {
    console.log(`Delaying for ${milisseconds / 1000}s`);
  }

  await new Promise((resolve) => setTimeout(resolve, milisseconds));
};
