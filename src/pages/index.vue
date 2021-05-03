<template>
  <div>
    <face-generator ref="generator" :has-preview="false" :config="config" @previewData="$store.dispatch('layout/setPreviewData', $event)" @renderType="onChangeRenderType">
      <template #controlsAfter>
        <molecule-property v-model="model.eyeLeft" v-bind="propertyLeftEye" :value="model.eyeLeft" />
        <molecule-property v-model="model.eyeRight" v-bind="propertyRightEye" :value="model.eyeRight" />
        <molecule-property v-model="model.mouth" v-bind="propertyMouth" :value="model.mouth" />
        <molecule-property
          v-for="input in inputs"
          :key="input.name"
          v-model="model[input.name]"
          :icon="input.icon"
          :component="input.component"
          :options="input.options"
          :label="input.label"
          :value="model[input.name]"
        />
      </template>
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
import FaceGenerator from '@/components/FaceGenerator';
import MoleculeProperty from '@/components/molecule/Property';
import ItemSelect from '@/components/molecule/property/ItemSelect';
import AtomBaseButton from '@/components/atoms/BaseButton';

import SvgControlsEyeLeft from '@/assets/svg/controls/controls_eyeLeft.svg?vue-template';
import SvgControlsEyeRight from '@/assets/svg/controls/controls_eyeRight.svg?vue-template';
import SvgControlsMouth from '@/assets/svg/controls/controls_mouth.svg?vue-template';

import assetManager from '@/services/assetManager';
import { MODE, TYPES } from '../classes/AssetManager';
import { COLORS } from '../utils/color';

export default {
  transitions: 'page',
  components: {
    FaceGenerator,
    MoleculeProperty,
    AtomBaseButton
  },
  data () {
    return {
      renderType: null,
      COLORS,
      model: {
        color: [].concat(this.$route.query.color) || null
      },
      rendering: null,
      leftEyes: [],
      rightEyes: [],
      mouths: []
    };
  },
  computed: {
    propertyLeftEye () {
      return {
        icon: SvgControlsEyeLeft,
        component: ItemSelect,
        label: 'Eye Left',
        options: {
          items: this.leftEyes
        }
      };
    },
    propertyRightEye () {
      return {
        icon: SvgControlsEyeRight,
        component: ItemSelect,
        label: 'Eye Right',
        options: {
          items: this.rightEyes
        }
      };
    },
    propertyMouth () {
      return {
        icon: SvgControlsMouth,
        component: ItemSelect,
        label: 'Mouth',
        options: {
          items: this.mouths
        }
      };
    },
    config () {
      return () => Object.keys(this.model).reduce((result, key) => {
        if (Array.isArray(this.model[String(key)])) {
          result[String(key)] = this.model[String(key)].map(value => () => value);
        } else {
          result[String(key)] = () => this.model[String(key)];
        }
        return result;
      }, {});
    },
    inputs () {
      const inputs = (this.renderType && this.renderType.props) || [];
      return inputs.map((input) => {
        return Object.assign({}, input);
      });
    }
  },
  watch: {
    model: {
      handler (model) {
        this.$router.replace({
          query: Object.assign({}, this.$route.query, model)
        });
        this.$nextTick(() => {
          this.$refs.generator.render();
        });
      },
      deep: true
    }
  },
  async mounted () {
    await assetManager.ready;
    this.leftEyes = assetManager.getAssetsByType(TYPES.EYE_LEFT).map((asset, index) => ({
      label: `Eye ${index}`,
      value: index,
      imageSrc: asset.images[MODE.COLOR].src
    }));
    this.rightEyes = assetManager.getAssetsByType(TYPES.EYE_RIGHT).map((asset, index) => ({
      label: `Eye ${index}`,
      value: index,
      imageSrc: asset.images[MODE.COLOR].src
    }));
    this.mouths = assetManager.getAssetsByType(TYPES.MOUTH).map((asset, index) => ({
      label: `Mouth ${index}`,
      value: index,
      imageSrc: asset.images[MODE.COLOR].src
    }));
  },
  methods: {
    onChangeRenderType (renderType) {
      this.renderType = renderType;
      this.model = renderType.props.reduce((result, prop) => {
        result[prop.name] = this.model[prop.name] || prop.default;
        return result;
      }, {
        eyeLeft: this.$route.query.eyeLeft || 2,
        eyeRight: this.$route.query.eyeRight || 2,
        mouth: this.$route.query.mouth || 2
      });
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
