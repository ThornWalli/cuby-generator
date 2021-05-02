import { MODE, TYPES } from '../classes/AssetManager';

const facesetSvgContext = require.context('@/assets/svg/faceset/', true, /\.svg$/);
const facesetPngContext = require.context('@/assets/img/faceset/', true, /\.png$/);

const getFiles = value => Object.values(MODE).reduce((result, type) => {
  result.svg[String(type)] = facesetSvgContext(`./${type}/faceset${type[0].toUpperCase() + type.slice(1, type.length)}_${value}.svg`).default;
  result.png[String(type)] = facesetPngContext(`./${type}/${value}.png`);
  return result;
}, { svg: {}, png: {} });

export default [{
  type: TYPES.EYE_LEFT,
  files: getFiles('eye_left_0')
}, {
  type: TYPES.EYE_LEFT,
  files: getFiles('eye_left_1')
}, {
  type: TYPES.EYE_LEFT,
  files: getFiles('eye_left_2')
}, {
  type: TYPES.EYE_LEFT,
  files: getFiles('eye_left_3')
}, {
  type: TYPES.EYE_LEFT,
  files: getFiles('eye_left_4')
}, {
  type: TYPES.EYE_LEFT,
  files: getFiles('eye_left_5')
},
{
  type: TYPES.EYE_RIGHT,
  files: getFiles('eye_right_0')
}, {
  type: TYPES.EYE_RIGHT,
  files: getFiles('eye_right_1')
}, {
  type: TYPES.EYE_RIGHT,
  files: getFiles('eye_right_2')
}, {
  type: TYPES.EYE_RIGHT,
  files: getFiles('eye_right_3')
}, {
  type: TYPES.EYE_RIGHT,
  files: getFiles('eye_right_4')
}, {
  type: TYPES.EYE_RIGHT,
  files: getFiles('eye_right_5')
},
{
  type: TYPES.MOUTH,
  files: getFiles('mouth_0')
}, {
  type: TYPES.MOUTH,
  files: getFiles('mouth_1')
}, {
  type: TYPES.MOUTH,
  files: getFiles('mouth_2')
}, {
  type: TYPES.MOUTH,
  files: getFiles('mouth_3')
}, {
  type: TYPES.MOUTH,
  files: getFiles('mouth_4')
}, {
  type: TYPES.MOUTH,
  files: getFiles('mouth_5')
}];
