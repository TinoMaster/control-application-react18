/**
 * Formats a text reference by wrapping it in special characters to highlight it
 * @param text The text to format as a reference
 * @returns The formatted text with special characters
 */
export const formatTextReference = (text?: string | null): string => {
  if (!text) return '""';
  return `"${text}"`;
};

/**
 * Formats a text reference with a custom style
 * @param text The text to format as a reference
 * @param style The style to apply ('quotes' | 'brackets' | 'parentheses' | 'bold')
 * @returns The formatted text with the specified style
 */
export const formatTextReferenceWithStyle = (
  text?: string | null,
  style: "quotes" | "brackets" | "parentheses" | "bold" = "quotes"
): string => {
  if (!text) return '""';

  const styles = {
    quotes: `"${text}"`,
    brackets: `[${text}]`,
    parentheses: `(${text})`,
    bold: `*${text}*`,
  };

  return styles[style];
};
