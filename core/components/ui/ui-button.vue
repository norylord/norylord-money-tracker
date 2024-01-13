<template>
  <button
    v-if="!icon"
    class="ui-button"
  >
    <slot />
  </button>
  <div
    v-else
    class="ui-button"
  >
    <img
      :src="buttonIcon"
      alt=""
      class="ui-button__icon"
    >
  </div>
</template>

<script lang="ts" setup>


interface IProps {
  icon?: string
}

const props = defineProps<IProps>()

const buttonIcon = computed(() => {
  return `/icons/${props.icon}.svg`
})

</script>

<style lang='scss'>
.ui-button {
  padding: 12px 26px;
  background: var(--primary);
  color: #ffffff;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 14px;
  outline: none;
  border: none;
  border-radius: 9999px;
  cursor: pointer;
  transition: .2s ease-in-out all;

  &__icon {
    width: 18px;
    height: 18px;
  }

  &:hover {
    background: var(--primary-light);
  }
}
</style>