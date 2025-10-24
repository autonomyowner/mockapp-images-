
import React, { useState, useCallback } from 'react';
import { INITIAL_IMAGE_BASE64, INITIAL_IMAGE_MIME_TYPE } from '../constants';
import { editImage } from '../services/geminiService';
import { fileToGenerativePart } from '../utils/fileUtils';
import { Spinner } from './Spinner';
import { UploadIcon, WandIcon } from './icons';

const ImageEditor: React.FC = () => {
  const [originalImage, setOriginalImage] = useState<string>(`data:${INITIAL_IMAGE_MIME_TYPE};base64,${INITIAL_IMAGE_BASE64}`);
  const [originalMimeType, setOriginalMimeType] = useState<string>(INITIAL_IMAGE_MIME_TYPE);
  const [originalBase64, setOriginalBase64] = useState<string>(INITIAL_IMAGE_BASE64);

  const [generatedImage, setGeneratedImage] = useState<string | null>(null);
  const [prompt, setPrompt] = useState<string>('Create a mockup of this logo on a premium black t-shirt, worn by a model in a modern urban setting.');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [fileName, setFileName] = useState<string>('SITEDZSTORE.jpg');

  const handleFileChange = useCallback(async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      try {
        setError(null);
        setGeneratedImage(null);
        setFileName(file.name);
        const { mimeType, data } = await fileToGenerativePart(file);
        setOriginalImage(`data:${mimeType};base64,${data}`);
        setOriginalMimeType(mimeType);
        setOriginalBase64(data);
      } catch (err) {
        setError('Failed to load image. Please try another file.');
        console.error(err);
      }
    }
  }, []);
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!prompt || !originalBase64) {
      setError('Please provide a base image and a prompt.');
      return;
    }
    setIsLoading(true);
    setError(null);
    setGeneratedImage(null);

    try {
      const newImageBase64 = await editImage(originalBase64, originalMimeType, prompt);
      setGeneratedImage(`data:image/png;base64,${newImageBase64}`);
    } catch (err: any) {
      setError(`Generation failed: ${err.message}. Please try again.`);
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  const ImageCard = ({ title, imageUrl, children, isLoading = false }: { title: string, imageUrl: string | null, children?: React.ReactNode, isLoading?: boolean }) => (
    <div className="bg-black bg-opacity-20 rounded-xl shadow-lg flex flex-col h-full">
      <h2 className="text-lg font-semibold text-[#f0e6b6] p-4 border-b border-white border-opacity-10">{title}</h2>
      <div className="p-4 flex-grow flex items-center justify-center relative min-h-[250px] md:min-h-[400px]">
        {isLoading && <Spinner />}
        {!isLoading && imageUrl && <img src={imageUrl} alt={title} className="max-w-full max-h-full object-contain rounded-md" />}
        {!isLoading && !imageUrl && !children && <div className="text-gray-400">Your mockup will appear here</div>}
        {children}
      </div>
    </div>
  );

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <ImageCard title="Original Image" imageUrl={originalImage}>
            <div className="absolute bottom-4 right-4">
                <label htmlFor="file-upload" className="cursor-pointer bg-[#f0e6b6] text-[#2d5c67] px-4 py-2 rounded-lg shadow-md hover:bg-opacity-90 transition-all flex items-center gap-2 font-semibold">
                    <UploadIcon />
                    Upload
                </label>
                <input id="file-upload" type="file" className="hidden" accept="image/*" onChange={handleFileChange} />
            </div>
            <p className="absolute bottom-4 left-4 text-xs text-gray-400 bg-black/30 px-2 py-1 rounded">{fileName}</p>
        </ImageCard>

        <ImageCard title="Generated Mockup" imageUrl={generatedImage} isLoading={isLoading} />
      </div>
      
      {error && (
        <div className="bg-red-500 bg-opacity-30 border border-red-500 text-red-200 px-4 py-3 rounded-lg text-center" role="alert">
          <p>{error}</p>
        </div>
      )}

      <form onSubmit={handleSubmit} className="bg-black bg-opacity-20 rounded-xl shadow-lg p-4 sticky bottom-4 backdrop-blur-sm">
        <div className="flex flex-col sm:flex-row items-center gap-4">
          <textarea
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            placeholder="Describe the mockup you want to create..."
            className="w-full bg-gray-900 bg-opacity-50 text-white placeholder-gray-400 rounded-lg p-3 border border-transparent focus:border-[#f0e6b6] focus:ring-0 transition-colors h-24 sm:h-auto resize-none flex-grow"
            rows={2}
            disabled={isLoading}
          />
          <button
            type="submit"
            disabled={isLoading}
            className="w-full sm:w-auto flex-shrink-0 bg-[#f0e6b6] text-[#2d5c67] font-bold py-3 px-6 rounded-lg shadow-md hover:bg-opacity-90 transition-all disabled:bg-gray-500 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          >
            {isLoading ? 'Generating...' : <><WandIcon /> Generate</>}
          </button>
        </div>
      </form>
    </div>
  );
};

export default ImageEditor;
