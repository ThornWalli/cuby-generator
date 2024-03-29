<template>
  <div>
    <face-generator
      ref="generator"
      :has-preview="false"
      :filename="`image_${seed}`"
      :override-config="config"
      input-filter="seed"
      @previewData="$store.dispatch('layout/setPreviewData', $event)"
      @renderType="onRenderType"
    >
      <template #controlsAfter>
        <div class="seed-input">
          <atom-input-text v-model="seed" :value="seed" label="Seed:" />
        </div>
      </template>
      <template #controlsRightTop>
        <atom-base-button
          :to="{
            path: '/',
            query: $route.query
          }"
        >
          Custom
        </atom-base-button>
      </template>
    </face-generator>
  </div>
</template>

<script>
import seedrandom from 'seedrandom';

import assetManager from '../services/assetManager';
import { RANDOM_COLORS } from '../utils/color';
import { TYPES } from '../classes/AssetManager';
import ColorTexture from '../classes/ColorTexture';
import { ALIGNMENT } from '../utils/face';
import AtomInputText from '@/components/atoms/input/Text';
import AtomBaseButton from '@/components/atoms/BaseButton';
import FaceGenerator from '@/components/organisms/FaceGenerator';

export default {
  transitions: 'page',
  components: {
    FaceGenerator, AtomBaseButton, AtomInputText
  },
  data () {
    return {
      renderType: null,
      seed: this.$route.query.seed || 'Cuby'
    };
  },
  computed: {
    model () {
      const getRandom = seedrandom(this.seed);
      let eyeRandom;
      return {
        eyeLeft: () => (eyeRandom = Math.floor(getRandom() * assetManager.getAssetsByType(TYPES.EYE_LEFT).length)),
        eyeRight: () => eyeRandom,
        mouth: () => Math.floor(getRandom() * assetManager.getAssetsByType(TYPES.MOUTH).length)
      };
    },
    config () {
      return () => {
        const getRandom = seedrandom(this.seed);
        let eyeRandom;
        return this.renderType.props.reduce((result, prop) => {
          if (prop.type === 'color') {
            result[prop.name] = Array((prop.options && prop.options.count) || 1).fill(0).map(() => () => {
              return new ColorTexture({ color: RANDOM_COLORS[Math.round(getRandom() * (RANDOM_COLORS.length - 1))] });
            });
          }
          return result;
        }, Object.assign(Object.keys(this.model).reduce((result, key) => {
          if (Array.isArray(this.model[String(key)])) {
            result[String(key)] = this.model[String(key)].map(value => () => value);
          } else {
            result[String(key)] = () => this.model[String(key)];
          }
          return result;
        }, {}), {
          alignment: [() => ALIGNMENT.LEFT, () => ALIGNMENT.TOP, () => ALIGNMENT.RIGHT, () => ALIGNMENT.BOTTOM],
          eyeLeft: () => (eyeRandom = Math.floor(getRandom() * assetManager.getAssetsByType(TYPES.EYE_LEFT).length)),
          eyeRight: () => eyeRandom,
          mouth: () => Math.floor(getRandom() * assetManager.getAssetsByType(TYPES.MOUTH).length)
        }));
      };
    },
    inputs () {
      const inputs = (this.renderType && this.renderType.props.filter(prop => (prop.availableViews || []).includes('seed'))) || [];
      return inputs.map((input) => {
        return Object.assign({}, input);
      });
    }
  },
  watch: {
    seed: {
      handler (value, lastValue) {
        if (lastValue) {
          this.$router.replace({
            query: Object.assign({}, this.$route.query, {
              seed: this.seed
            })
          });
        }
        this.$route.query.seed = value;
        this.$refs.generator.render();
      }
    }
  },
  methods: {
    onRenderType (renderType) {
      this.renderType = renderType;
    }
  }
};
</script>
<style lang="postcss" scoped>
.seed-input {
  margin-top: calc(20 / 16 * 1rem);
}
</style>
