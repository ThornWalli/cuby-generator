<template>
  <div>
    <face-generator
      ref="generator"
      :model-extend="model"
      :inputs="inputs"
      :has-preview="false"
      @previewData="$store.dispatch('layout/setPreviewData', $event)"
    >
      <template #controlsRightTop>
        <atom-base-button
          :to="{
            path: '/seed',
            query: $route.query
          }"
        >
          Seed
        </atom-base-button>
      </template>
    </face-generator>
  </div>
</template>
<script>
import { MODE, TYPES } from '../classes/AssetManager';
import { COLORS } from '../utils/color';
import FaceGenerator from '@/components/organisms/FaceGenerator';
import ItemSelect from '@/components/molecules/property/ItemSelect';
import AtomBaseButton from '@/components/atoms/BaseButton';

import SvgControlsEyeLeft from '@/assets/svg/controls/controls_eyeLeft.svg?vue-template';
import SvgControlsEyeRight from '@/assets/svg/controls/controls_eyeRight.svg?vue-template';
import SvgControlsMouth from '@/assets/svg/controls/controls_mouth.svg?vue-template';

import assetManager from '@/services/assetManager';

export default {
  transitions: 'page',

  components: {
    FaceGenerator,
    AtomBaseButton
  },

  data () {
    return {
      COLORS,
      model: this.getModel(),
      faceInputs: []
    };
  },

  computed: {
    inputs () {
      const inputs = [
        ...this.faceInputs
      ];
      return inputs.map((input) => {
        return Object.assign({}, input);
      });
    }
  },

  async mounted () {
    this.faceInputs = await this.getFaceInputs();
  },

  methods: {

    getModel () {
      const eyeLeft = (assetManager.getAssetsByType(TYPES.EYE_LEFT)[this.$route.query.eyeLeft] && this.$route.query.eyeLeft) || 2;
      const eyeRight = (assetManager.getAssetsByType(TYPES.EYE_RIGHT)[this.$route.query.eyeRight] && this.$route.query.eyeRight) || 2;
      const mouth = (assetManager.getAssetsByType(TYPES.MOUTH)[this.$route.query.mouth] && this.$route.query.mouth) || 2;

      return {
        eyeLeft,
        eyeRight,
        mouth
      };
    },
    async getFaceInputs () {
      await assetManager.ready;
      return [
        {
          icon: SvgControlsEyeLeft,
          component: ItemSelect,
          name: 'eyeLeft',
          label: 'Eye Left',
          options: {
            items: assetManager.getAssetsByType(TYPES.EYE_LEFT).map((asset, index) => ({
              label: `Eye ${index}`,
              value: index,
              imageSrc: asset.images[MODE.COLOR].src
            }))
          }
        },
        {
          icon: SvgControlsEyeRight,
          component: ItemSelect,
          name: 'eyeRight',
          label: 'Eye Right',
          options: {
            items: assetManager.getAssetsByType(TYPES.EYE_RIGHT).map((asset, index) => ({
              label: `Eye ${index}`,
              value: index,
              imageSrc: asset.images[MODE.COLOR].src
            }))
          }
        },
        {
          icon: SvgControlsMouth,
          component: ItemSelect,
          name: 'mouth',
          label: 'Mouth',
          options: {
            items: assetManager.getAssetsByType(TYPES.MOUTH).map((asset, index) => ({
              label: `Mouth ${index}`,
              value: index,
              imageSrc: asset.images[MODE.COLOR].src
            }))
          }
        }
      ];
    }
  }
};
</script>

<style lang="postcss">
.props {
  margin-bottom: calc(10 / 16 * 1rem);

  & > * { transition: all 1s ease; }

  &:last-child {
    margin-bottom: 0;
  }
}

</style>
