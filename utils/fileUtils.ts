
interface GenerativePart {
    mimeType: string;
    data: string;
}

export const fileToGenerativePart = (file: File): Promise<GenerativePart> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => {
      if (typeof reader.result !== 'string') {
        return reject(new Error('Failed to read file as data URL.'));
      }
      const dataUrl = reader.result;
      const base64Data = dataUrl.split(',')[1];
      if (!base64Data) {
        return reject(new Error('Could not extract base64 data from file.'));
      }
      resolve({
        mimeType: file.type,
        data: base64Data,
      });
    };
    reader.onerror = (error) => reject(error);
    reader.readAsDataURL(file);
  });
};
