<template>
  <div
    v-font="[
      $getFont('Open Sans', 400, 'normal'),
      $getFont('BitFont', 400, 'normal', {selector:'.atom-base-button'})]"
  >
    <atom-preview class="preview" v-bind="previewData" />
    <Nuxt />
  </div>
</template>
<script>

import AtomPreview from '@/components/atoms/Preview';
export default {
  components: { AtomPreview },
  computed: {
    previewData () {
      return this.$store.getters['layout/previewData'];
    }
  }
}; </script>
<style>
.page-enter-active,
.page-leave-active {
  transition: opacity 0.5s;
}

.page-enter,
.page-leave-to {
  opacity: 0;
}

.preview {
  position: fixed !important;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  overflow: hidden;
}

html {
  box-sizing: border-box;
  font-family:
    'Source Sans Pro',
    -apple-system,
    BlinkMacSystemFont,
    'Segoe UI',
    Roboto,
    'Helvetica Neue',
    Arial,
    sans-serif;
  font-size: calc(12 / 414 * 100vw);
  background: url('@/assets/grid.png');
  word-spacing: 1px;
  -ms-text-size-adjust: 100%;
  -webkit-text-size-adjust: 100%;
  -moz-osx-font-smoothing: grayscale;
  -webkit-font-smoothing: antialiased;

  @media (min-width: 576px) {
    font-size: 14px;
  }

  @media (min-width: 768px) {
    font-size: 14px;
  }

  @media (min-width: 1400px) {
    font-size: 16px;
  }
}

*,
*::before,
*::after {
  box-sizing: border-box;
  margin: 0;
}

.button--green {
  display: inline-block;
  padding: 10px 30px;
  color: #3b8070;
  text-decoration: none;
  border: 1px solid #3b8070;
  border-radius: 4px;
}

.button--green:hover {
  color: #fff;
  background-color: #3b8070;
}

.button--grey {
  display: inline-block;
  padding: 10px 30px;
  margin-left: 15px;
  color: #35495e;
  text-decoration: none;
  border: 1px solid #35495e;
  border-radius: 4px;
}

.button--grey:hover {
  color: #fff;
  background-color: #35495e;
}
</style>
