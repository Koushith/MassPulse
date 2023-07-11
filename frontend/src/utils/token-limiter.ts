function calculateTokenCount(wordCount: any) {
  const averageCharsPerWord = 5; // Assuming an average of 5 characters per word
  const charsPerToken = 4; // Each token consists of 4 characters

  const estimatedTokenCount = Math.ceil(
    (wordCount * averageCharsPerWord) / charsPerToken
  );
  return estimatedTokenCount;
}

export {};
