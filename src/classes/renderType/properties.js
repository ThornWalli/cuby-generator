
import ColorSelect from '@/components/molecules/property/ColorSelect';
import Number from '@/components/molecules/property/Number';
import Dimension from '@/components/molecules/property/Dimension';
import ItemSelect from '@/components/molecules/property/ItemSelect';

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
  },
  items: {
    component: ItemSelect,
    type: 'items'
  }
};

export function getProperty (type, name, label, options) {
  const property = PROPERTY_TYPES[String(type)];
  return Object.assign({}, property, {
    label,
    name
  }, options);
}
