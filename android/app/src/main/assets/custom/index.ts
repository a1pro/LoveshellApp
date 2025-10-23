import { Platform } from "react-native";

const FONTS = {
  black: "Poppins-Black",
    bold: "Poppins-Bold",
    heavy: "Poppins-ExtraBold",
    light: "Poppins-Light",
    medium: "Poppins-Medium",
    regular: "Poppins-Regular",
    semiBold: "Poppins-SemiBold",
    thin: "Poppins-Thin",
};

export type FontFamilyType = keyof typeof FONTS;

/**
 * Function to get the platform-specific font family
 * @param fontKey {FontFamilyType} - The font key from the FONTS object
 * @returns {string} - The platform-specific font family name
 */
export const getPlatformFont = (fontKey: FontFamilyType): string => {
  const iosFonts = {
    black: "Poppins-Black",
    bold: "Poppins-Bold",
    heavy: "Poppins-ExtraBold",
    light: "Poppins-Light",
    medium: "Poppins-Medium",
    regular: "Poppins-Regular",
    semiBold: "Poppins-SemiBold",
    thin: "Poppins-Thin",
    
  };

  return (
    Platform.select({
      ios: iosFonts[fontKey],
      android: FONTS[fontKey],
    }) || FONTS[fontKey]
  );
};
