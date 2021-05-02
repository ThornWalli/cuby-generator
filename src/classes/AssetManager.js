import { blobToImage, urlToBlob } from '../utils/blob';
import Deferred from './Deferred';

export default class AssetManager {
  readyDeferred = new Deferred()
  constructor ({ assets }) {
    this.assets = assets;
  }

  get (type, index, mode = MODE.COLOR) {
    const asset = this.assets.filter(asset => asset.type === type).find((asset, assetIndex) => assetIndex === Number(index));
    if (!asset) {
      throw new Error(`Asset not found! ${type}; ${index}; ${mode}`);
    } if (!asset.images[String(mode)]) {
      throw new Error('Asset Mode not found!');
    }
    return asset.images[String(mode)];
  }

  async setup () {
    this.assets = await this.loadAssets();
    this.readyDeferred.resolve();
  }

  getAssetsByType (type) {
    return this.assets.filter(asset => asset.type === type);
  }

  loadAssets () {
    return Promise.all(this.assets.map(async (asset) => {
      const images = await Promise.all(Object.keys(asset.files[String(FILE_TYPE)]).map(async (key) => {
        return [
          key,
          await blobToImage(await urlToBlob(asset.files[String(FILE_TYPE)][String(key)]))];
      }));
      return Object.assign({ images: Object.fromEntries(images) }, asset);
    }));
  }

  get ready () {
    return this.readyDeferred.promise;
  }
}

export const TYPES = {
  EYE_LEFT: 0,
  EYE_RIGHT: 1,
  MOUTH: 2
};

export const MODE = {
  COLOR: 'color',
  ALPHA: 'alpha'
};

const FILE_TYPE = isFirefox() ? 'png' : 'svg';
export function isFirefox () {
  return typeof InstallTrigger !== 'undefined';
}
