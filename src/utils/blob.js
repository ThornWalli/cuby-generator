
export function urlToBlob (b64Data) {
  return fetch(b64Data)
    .then(res => res.blob());
};

export async function blobToObjectUrl (blob) {
  return global.URL.createObjectURL(await blob);
}

export async function blobToImage (blob) {
  const objectUrl = await blobToObjectUrl(blob);
  return new Promise((resolve) => {
    const img = new Image();
    img.onload = () => resolve(img);
    img.src = objectUrl;
  });
}
