export async function readStream(stream: ReadableStream) {
  const reader = stream.getReader();
  let result = "";

  try {
    // Keep reading until the stream is done
    while (true) {
      const { done, value } = await reader.read();
      if (done) break; // End of stream
      result += new TextDecoder().decode(value);
    }
  } catch (error) {
    console.error("Error reading the stream:", error);
  } finally {
    reader.releaseLock(); // Always release the lock after reading
  }

  return result;
}
