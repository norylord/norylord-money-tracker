<template>
  <div class="ui-input__wrapper">
    <label
      v-if="label"
      :class="{'ui-input__label--active': isInputFocused || checkVModel}"
      class="ui-input__label"
      for=""
      @click="customInput.focus()"
    >{{ label }}</label>
    <input
      ref="customInput"
      :type="type"
      :value="modelValue"
      class="ui-input"
      @focus="onFocus"
      @focusout="onFocusOut"
      @input="e => emit('update:modelValue', e.target.value)"
    >
  </div>
</template>

<script lang="ts" setup>


interface IProps {
  modelValue?: any
  label: string
  type: string
}

const props = defineProps<IProps>()
const emit = defineEmits(['update:modelValue'])

const customInput = ref(null);

const isInputFocused = ref(false);

const checkVModel = computed(() => {
  if (props.modelValue instanceof Array) {
    return props.modelValue.length > 0;
  }
  return props.modelValue;
});

const onFocus = () => {
  isInputFocused.value = true;
};

const onFocusOut = () => {
  isInputFocused.value = false;
};
</script>

<style lang='scss'>
.ui-input {
  padding: 16px 20px;
  transition: all .2s ease-in-out;
  outline: none;
  font-size: 14px;
  border: none;
  border-bottom: 1px solid #a4a4a4;
  background: transparent;
  color: var(--text-color);

  &__wrapper {
    width: 100%;
    display: flex;
    flex-direction: column;
    position: relative;
  }

  &__label {
    font-size: 12px;
    color: var(--ui-labels);
    position: absolute;
    top: 50%;
    left: 24px;
    transform: translate(0, -50%);
    z-index: 1;
    transition: all 0.1s linear;
    cursor: text;
    transition-delay: 100ms;


    &--active {
      top: 5%;
      left: 6px;
    }
  }

  &:focus {
    border-bottom: 1px solid var(--ui-color);
  }
}
</style>