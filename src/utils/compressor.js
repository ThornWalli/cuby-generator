import Compressor from 'compressorjs';

export function compressImage (file, options = {
  quality: 0.8
}) {
  return new Promise((resolve, reject) => {
    return new Compressor(file, Object.assign(options, {
      success: resolve,
      error: reject
    }));
  });
}
