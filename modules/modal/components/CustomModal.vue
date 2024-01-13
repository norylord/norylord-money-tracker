<template>
  <div
    v-if="isActive"
    class="modal-overlay"
    @click="toggleModal"
  >
    <div
      class="modal"
      @click.stop
    >
      <h3 class="modal__title">
        {{ currentScheme.title }}
      </h3>
      <component :is="currentScheme.component" />
    </div>
  </div>
</template>

<script lang="ts" setup>


import {useModal} from "~/modules/modal/composables/useModal";


// const props = defineProps<IProps>()
const emit = defineEmits(['update:isActive'])

const {isActive, toggleModal, currentScheme} = useModal()
</script>

<style lang='scss'>
.modal {
  background: var(--background-light);
  border-radius: 12px;
  padding: 48px;
  max-width: 1140px;
  max-height: 90vh;
  margin: 40px auto 0;
  overflow-y: scroll;

  &__title {
    font-size: clamp(20px, 5vw, 32px);
    margin-bottom: 20px;
  }

  &-overlay {
    position: fixed;
    left: 0;
    top: 0;
    width: 100dvw;
    height: 100dvh;
    background: rgba(52, 52, 52, 0.63);
    z-index: 1000;
  }
}
</style>