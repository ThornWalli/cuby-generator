
<template>
  <molecule-form :buttons="buttons" :inputs="inputs" class="molecule-color-texture" />
</template>

<script>
/* eslint-disable no-unused-vars */
import MoleculeForm from '@/components/molecules/Form';
import AtomInputText from '@/components/atoms/input/Text';
import AtomInputColor from '@/components/atoms/input/Color';
import AtomInputTexture from '@/components/atoms/input/Texture';
export default {
  components: { MoleculeForm },
  data () {
    return {
      buttons: [
        {
          width: 1,
          options: {
            styleType: 'form',
            tag: 'button',
            label: 'Apply'
          }
        }
      ],
      inputs: [
        {
          width: 1 / 2,
          component: AtomInputText,
          name: 'texta',
          default: 'Test',
          options: {
            label: 'Text',
            required: true
          },
          validation: (model, value) => {
            const invalids = [];
            (!value || value.length < 1) && invalids.push('TextA must not be empty');
            return invalids;
          }
        },
        {
          width: 1 / 2,
          component: AtomInputText,
          name: 'textb',
          default: 'Test',
          options: {
            label: 'Text',
            required: true
          },
          validation: (model, value) => {
            const invalids = [];
            (!value || value.length < 1) && invalids.push('TextB must not be empty');
            (model.texta !== value) && invalids.push('TextA must match TextB');
            return invalids;
          }
        },
        {
          width: 1 / 2,
          component: AtomInputText,
          name: 'number',
          default: '2000',
          options: {
            type: 'number',
            label: 'Number',
            required: true
          },
          validation: (model, value) => {
            const invalids = [];
            (Number(value) <= 0) && invalids.push('Number must not  higher then 0');
            return invalids;
          }
        },
        {
          width: 1 / 2,
          component: AtomInputColor,
          name: 'color',
          default: '#ff0000',
          options: {
            label: 'Color',
            required: true
          }
        },
        {
          width: 1 / 2,
          component: AtomInputTexture,
          name: 'texture',
          options: {
            label: 'Texture',
            required: true
          },
          validation: (model, value) => {
            const invalids = [];
            (!value) && invalids.push('Texture must not be empty');
            return invalids;
          }
        }
        // {
        //   width: 1 / 2,
        //   component: AtomInputColor,
        //   name: 'color',
        //   // default: '#ff0000',
        //   options: {
        //     label: 'Color',
        //     required: true
        //   }
        // },
        // {
        //   width: 1 / 2,
        //   component: AtomInputTexture,
        //   name: 'texture',
        //   options: {
        //     label: 'Texture',
        //     required: true
        //   }
        // },
        // {
        //   width: 1 / 2,
        //   component: AtomBaseButton,
        //   name: 'reset',
        //   options: {
        //     tag: 'button',
        //     type: 'reset',
        //     label: 'Reset'
        //   }
        // },
        // {
        //   width: 1 / 2,
        //   component: AtomBaseButton,
        //   name: 'apply',
        //   options: {
        //     tag: 'button',
        //     label: 'Apply'
        //   }
        // }
      ]
    };
  }
};
</script>

<style lang="postcss" scoped>
.molecule-color-texture {
  /* empty  */
}
</style>
