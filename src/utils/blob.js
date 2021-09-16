
export function urlToBlob (b64Data) {
  return fetch(b64Data)
    .then(res => res.blob());
};
export function urlToImage (b64Data) {
  const img = new Image();
  img.src = b64Data;
  return img;
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

export function blobToBase64 (dataBlob) {
  return new Promise((resolve) => {
    const reader = new FileReader();
    reader.readAsDataURL(dataBlob);
    reader.onloadend = function () {
      resolve(reader.result);
    };
  });
}

export function base64ToBlob (b64Data) {
  return fetch(b64Data)
    .then(res => res.blob());
};
