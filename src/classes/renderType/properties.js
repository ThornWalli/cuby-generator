
import ColorSelect from '@/components/molecule/property/ColorSelect';
import Number from '@/components/molecule/property/Number';
import Dimension from '@/components/molecule/property/Dimension';

export const PROPERTY_TYPES = {
  color: {
    component: ColorSelect,
    label: 'Color',
    type: 'color',
    name: 'color'
  },
  number: {
    component: Number,
    type: 'number',
    options: {
      step: 0.1,
      min: 0
    }
  },
  dimension: {
    component: Dimension,
    type: 'dimension'
  }
};

export function getProperty (type, name, label, options) {
  const property = PROPERTY_TYPES[String(type)];
  return Object.assign({}, property, {
    label,
    name
  }, options);
}