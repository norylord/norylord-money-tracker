<template>
  <div class="ui-select__wrapper">
    <label
      v-if="label"
      :class="{'ui-select__label--active': isSelectFocused || checkVModel, 'ui-select__label--multiple': (isSelectFocused || checkVModel)}"
      class="ui-select__label"
      @click="customSelect.focus()"
    >{{ label }}</label>
    <select
      :value="modelValue"
      class="ui-select"
      @change="e => handleSelect(e.target.value)"
      @focus="onFocus"
      @focusout="onFocusOut"
    >
      <option
        v-for="option of options"
        :key="option.value"
        :value="option.value"
        v-text="option.title"
      />
    </select>
  </div>
</template>

<script lang="ts" setup>


interface IProps {
  options: { title: string, value: any }[]
  label?: string
  modelValue: any
}

const props = defineProps<IProps>()
const emit = defineEmits(['update:modelValue'])
const handleSelect = (value: any): void => {
  console.log(value)
  emit("update:modelValue", value)
}

const customSelect = ref(null);

const isSelectFocused = ref(false);

const checkVModel = computed(() => {
  if (props.modelValue instanceof Array) {
    return props.modelValue.length > 0;
  }
  return props.modelValue;
});

const onFocus = () => {
  isSelectFocused.value = true;
};

const onFocusOut = () => {
  isSelectFocused.value = false;
};
const onClear = () => {
  isSelectFocused.value = true;
};

</script>

<style lang='scss'>
.ui-select {
  padding: 12px 12px;
  background: rgba(0, 0, 0, 0);
  border: none;
  border-bottom: 1px solid #484848;
  outline: none;
  width: 100%;

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
      top: 10%;
      left: 6px;
    }
  }

  &__wrapper {
    width: 100%;
    display: flex;
    flex-direction: column;
    position: relative;
    cursor: pointer;
  }
}
</style>