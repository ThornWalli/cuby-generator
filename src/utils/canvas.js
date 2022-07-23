import { urlToImage } from './blob';

export function createPattern (colorTexture, { width, height }) {
  const canvas = document.createElement('canvas');
  const context = canvas.getContext('2d');
  const patternImg = urlToImage(colorTexture.textureSrc);
  canvas.width = height * (patternImg.naturalWidth / patternImg.naturalHeight) * colorTexture.textureScale;
  canvas.height = height * colorTexture.textureScale;
  context.drawImage(patternImg, 0, 0, canvas.width, canvas.height);
  return {
    pattern: context.createPattern(canvas, 'repeat'),
    offset: [
      (width - Math.ceil(width / canvas.width) * canvas.width) / 2,
      (height - Math.ceil(height / canvas.height) * canvas.height) / 2
    ]
  };
}
