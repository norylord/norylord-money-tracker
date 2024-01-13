<template>
  <div
    :class="{'ui-chip--active': isActive}"
    class="ui-chip"
  >
    {{ text }}
  </div>
</template>

<script lang="ts" setup>
interface IProps {
  isActive: boolean
  text: string,
  color: string
}

const props = defineProps<IProps>()

const getColor = computed(() => {
  return props.color
})
</script>

<style lang='scss'>
.ui-chip {
  padding: 8px 16px;
  border: 1px solid v-bind(getColor);
  text: v-bind(getColor);
  color: v-bind(getColor);
  opacity: 0.5;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 9999px;
  text-align: center;
  user-select: none;
  transition: all .3s ease-in-out;
  cursor: pointer;

  &--active {
    opacity: 1;
    background: v-bind(getColor);
    color: #ffffff;
  }
}
</style>