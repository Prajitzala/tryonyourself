
import { GoogleGenAI, SegmentMode } from "@google/genai";

// Specialized models for fashion and image tasks
const TRY_ON_MODEL = 'virtual-try-on-preview-08-04';
const SEGMENTATION_MODEL = 'image-segmentation-001';
const REASONING_MODEL = 'gemini-2.5-flash-image';

const getApiKey = () =>
  import.meta.env.VITE_GEMINI_API_KEY ||
  import.meta.env.GEMINI_API_KEY ||
  process.env.API_KEY ||
  '';

export async function processOutfit(
  topBase64: string | null,
  bottomBase64: string | null,
  personBase64: string | null
): Promise<string | null> {
  const ai = new GoogleGenAI({ apiKey: getApiKey() });

  if (!personBase64) return null;

  const productImages = [];
  if (topBase64) {
    productImages.push({ 
      productImage: { 
        imageBytes: topBase64.split(',')[1], 
        mimeType: 'image/png' 
      } 
    });
  }
  if (bottomBase64) {
    productImages.push({ 
      productImage: { 
        imageBytes: bottomBase64.split(',')[1], 
        mimeType: 'image/png' 
      } 
    });
  }

  try {
    // Use the dedicated Virtual Try-On API
    const response = await ai.models.recontextImage({
      model: TRY_ON_MODEL,
      source: {
        personImage: { 
          imageBytes: personBase64.split(',')[1], 
          mimeType: 'image/png' 
        },
        productImages: productImages,
      },
      config: {
        numberOfImages: 1,
      },
    });

    const imgData = response.generatedImages?.[0]?.image?.imageBytes;
    return imgData ? `data:image/png;base64,${imgData}` : null;
  } catch (error) {
    console.error('Virtual Try-On failed, falling back to general model:', error);
    // Fallback to general model if specialized model is unavailable
    const parts: any[] = [];
    if (topBase64) parts.push({ inlineData: { data: topBase64.split(',')[1], mimeType: 'image/png' } });
    if (bottomBase64) parts.push({ inlineData: { data: bottomBase64.split(',')[1], mimeType: 'image/png' } });
    parts.push({ inlineData: { data: personBase64.split(',')[1], mimeType: 'image/png' } });
    parts.push({ text: "Perform a virtual try-on. Put the clothes from the first images onto the person in the last image. White background." });

    const fallbackResponse = await ai.models.generateContent({
      model: REASONING_MODEL,
      contents: { parts }
    });
    const imgPart = fallbackResponse.candidates?.[0]?.content?.parts.find(p => p.inlineData);
    return imgPart ? `data:image/png;base64,${imgPart.inlineData.data}` : null;
  }
}

export async function extractGarment(
  imageBase64: string,
  type: 'top' | 'bottom'
): Promise<string | null> {
  const ai = new GoogleGenAI({ apiKey: getApiKey() });

  try {
    // Use specialized segmentation to extract the garment
    const response = await ai.models.segmentImage({
      model: SEGMENTATION_MODEL,
      source: {
        image: { 
          imageBytes: imageBase64.split(',')[1], 
          mimeType: 'image/png' 
        },
      },
      config: {
        mode: SegmentMode.FOREGROUND,
      },
    });

    const imgData = response.generatedMasks?.[0]?.mask?.imageBytes;
    return imgData ? `data:image/png;base64,${imgData}` : null;
  } catch (error) {
    console.error('Segmentation failed, falling back to general model:', error);
    const prompt = type === 'top' ? 
      "Extract only the top clothing item. White background." : 
      "Extract only the bottom clothing item. White background.";
    
    const fallbackResponse = await ai.models.generateContent({
      model: REASONING_MODEL,
      contents: {
        parts: [
          { inlineData: { data: imageBase64.split(',')[1], mimeType: 'image/png' } },
          { text: prompt }
        ]
      }
    });
    const imgPart = fallbackResponse.candidates?.[0]?.content?.parts.find(p => p.inlineData);
    return imgPart ? `data:image/png;base64,${imgPart.inlineData.data}` : null;
  }
}

export async function normalizePose(imageBase64: string): Promise<string | null> {
  const ai = new GoogleGenAI({ apiKey: getApiKey() });
  
  // Normalize pose using reasoning model
  const response = await ai.models.generateContent({
    model: REASONING_MODEL,
    contents: {
      parts: [
        { inlineData: { data: imageBase64.split(',')[1], mimeType: 'image/png' } },
        { text: "Normalize the person's pose to a simple standing straight position. White background." }
      ]
    }
  });

  const imgPart = response.candidates?.[0]?.content?.parts.find(p => p.inlineData);
  return imgPart ? `data:image/png;base64,${imgPart.inlineData.data}` : null;
}

export type BackgroundVariant = 'transparent' | 'white' | 'custom';

export async function removeBackground(
  imageBase64: string,
  variant: BackgroundVariant,
  color?: string
): Promise<string | null> {
  const ai = new GoogleGenAI({ apiKey: getApiKey() });
  
  try {
    const response = await ai.models.segmentImage({
      model: SEGMENTATION_MODEL,
      source: {
        image: { 
          imageBytes: imageBase64.split(',')[1], 
          mimeType: 'image/png' 
        },
      },
      config: {
        mode: variant === 'white' ? SegmentMode.BACKGROUND : SegmentMode.FOREGROUND,
      },
    });

    const imgData = response.generatedMasks?.[0]?.mask?.imageBytes;
    return imgData ? `data:image/png;base64,${imgData}` : null;
  } catch (error) {
    // Fallback for background removal
    const prompt = variant === 'white' ? "Remove background and replace with white." : "Remove background.";
    const fallbackResponse = await ai.models.generateContent({
      model: REASONING_MODEL,
      contents: {
        parts: [
          { inlineData: { data: imageBase64.split(',')[1], mimeType: 'image/png' } },
          { text: prompt }
        ]
      }
    });
    const imgPart = fallbackResponse.candidates?.[0]?.content?.parts.find(p => p.inlineData);
    return imgPart ? `data:image/png;base64,${imgPart.inlineData.data}` : null;
  }
}
