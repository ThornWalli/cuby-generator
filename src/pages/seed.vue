<template>
  <div>
    <face-generator
      ref="generator"
      :has-preview="false"
      :filename="`image_${seed}`"
      :config="config"
      @previewData="$store.dispatch('layout/setPreviewData', $event)"
      @renderType="onChangeRenderType"
    >
      <template #controlsAfter>
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
        <div class="seed-input">
          <atom-base-input v-model="seed" :value="seed" label="Seed:" />
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

import FaceGenerator from '@/components/FaceGenerator';
import MoleculeProperty from '@/components/molecule/Property';
import AtomBaseButton from '@/components/atoms/BaseButton';
import AtomBaseInput from '@/components/atoms/BaseInput';

import assetManager from '../services/assetManager';
import { COLORS } from '../utils/color';
import { TYPES } from '../classes/AssetManager';

export default {
  transitions: 'page',
  components: {
    FaceGenerator, MoleculeProperty, AtomBaseButton, AtomBaseInput
  },
  data () {
    return {
      model: {},
      renderType: null,
      seed: this.$route.query.seed || 'cuby'
    };
  },
  computed: {
    config () {
      return () => {
        const getRandom = seedrandom(this.seed);
        let eyeRandom;
        return this.renderType.props.reduce((result, prop) => {
          if (prop.type === 'color') {
            result[prop.name] = Array((prop.options && prop.options.count) || 1).fill(0).map(() => () => COLORS[Math.floor(getRandom() * (COLORS.length - 1))]);
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
    model: {
      handler () {
        this.$refs.generator.render();
      },
      deep: true
    },
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
    onChangeRenderType (renderType) {
      this.renderType = renderType;
      this.model = this.inputs.reduce((result, prop) => {
        result[prop.name] = this.model[prop.name] || prop.default;
        return result;
      }, {});
    }
  }
};
</script>
<style lang="postcss" scoped>
.seed-input {
  margin-top: calc(20 / 16 * 1rem);
}
</style>
