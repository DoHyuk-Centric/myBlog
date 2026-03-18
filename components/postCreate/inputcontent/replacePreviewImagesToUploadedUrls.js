import { uploadPostImage } from "./uploadPostImage.js";
import { imageMap } from "./inputPostEditor.js";

export async function replacePreviewImagesToUploadedUrls(markdown) {
  const imageRegex = /!\[([^\]]*)\]\((blob:[^)]+)\)/g;

  const matches = [...markdown.matchAll(imageRegex)];
  if (matches.length === 0) return markdown;

  let updatedMarkdown = markdown;

  for (const match of matches) {
    const alt = match[1];
    const previewUrl = match[2];

    const file = imageMap.get(previewUrl);
    if (!file) continue;

    const uploadedUrl = await uploadPostImage(file);
    const oldMarkdown = `![${alt}](${previewUrl})`;
    const newMarkdown = `![${alt}](${uploadedUrl})`;

    updatedMarkdown = updatedMarkdown.replace(oldMarkdown, newMarkdown);

    URL.revokeObjectURL(previewUrl);
    imageMap.delete(previewUrl);
  }

  return updatedMarkdown;
}