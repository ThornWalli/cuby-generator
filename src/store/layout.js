
import { ipoint } from '@js-basics/vector';

export const state = () => ({
  globalPreview: true,
  previewData: {
    // eslint-disable-next-line no-secrets/no-secrets
    src: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkYAAAAAYAAjCB0C8AAAAASUVORK5CYII=',
    size: ipoint(0, 0)
  }
});

export const mutations = {
  previewData (state, value) {
    state.previewData = value;
  }
};

export const getters = {
  previewData (scope) {
    return scope.previewData;
  },
  globalPreview (scope) {
    return scope.globalPreview;
  }
};

export const actions = {
  setPreviewData (context, value) {
    context.commit('previewData', value);
  }
};
