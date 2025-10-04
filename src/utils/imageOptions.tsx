import { MagicWand, Image as ImageIcon, Palette, ArrowClockwise, Upload } from 'phosphor-react';
import { ImageOption } from '@/types/post';
import { 
  mainImageCategoriesData, 
  textGenerationOptionsData, 
  existingImageOptionsData,
  useExistingImagesOptionsData,
  aiGenerationOptionsData
} from '@/constants/imageOptions';

const iconComponents = {
  MagicWand: MagicWand,
  ImageIcon: ImageIcon,
  Palette: Palette,
  ArrowClockwise: ArrowClockwise,
  Upload: Upload
};

interface ImageOptionData {
  id: string;
  name: string;
  description: string;
  iconType: keyof typeof iconComponents;
}

function createImageOption(data: ImageOptionData): ImageOption {
  const IconComponent = iconComponents[data.iconType];
  return {
    ...data,
    icon: <IconComponent size={20} />
  };
}

export const mainImageCategories: ImageOption[] = mainImageCategoriesData.map(createImageOption);
export const textGenerationOptions: ImageOption[] = textGenerationOptionsData.map(createImageOption);
export const existingImageOptions: ImageOption[] = existingImageOptionsData.map(createImageOption);
export const useExistingImagesOptions: ImageOption[] = useExistingImagesOptionsData.map(createImageOption);
export const aiGenerationOptions: ImageOption[] = aiGenerationOptionsData.map(createImageOption);