<template>
  <Teleport to="body">
    <Transition name="modal" :duration="{ enter: 380, leave: 240 }">
      <div
        v-if="show"
        class="modal-teleport-root"
        role="dialog"
        :aria-modal="true"
        :aria-labelledby="titleId"
        @keydown.esc="handleClose"
      >
        <!-- Backdrop -->
        <div class="modal-backdrop" @click="handleBackdropClick"></div>

        <!-- Modal Card Container -->
        <div
          ref="modalCardRef"
          class="modal-card"
          :class="customCardClass"
          :style="customCardStyle"
          tabindex="-1"
        >
          <slot></slot>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<script>
export default {
  name: 'BaseModal',
  props: {
    show: {
      type: Boolean,
      default: false
    },
    titleId: {
      type: String,
      default: ''
    },
    customCardClass: {
      type: [String, Object, Array],
      default: ''
    },
    customCardStyle: {
      type: [String, Object],
      default: () => ({})
    },
    closeOnBackdrop: {
      type: Boolean,
      default: true
    }
  },
  emits: ['close'],
  watch: {
    show: {
      immediate: true,
      handler(val) {
        if (typeof document !== 'undefined') {
          if (val) {
            this.prevOverflow = document.body.style.overflow;
            document.body.style.overflow = 'hidden';
            window.addEventListener('keydown', this.handleKeyDown);
            this.$nextTick(() => {
              if (this.$refs.modalCardRef) {
                this.$refs.modalCardRef.focus();
              }
            });
          } else {
            this.restoreScroll();
            window.removeEventListener('keydown', this.handleKeyDown);
          }
        }
      }
    }
  },
  beforeUnmount() {
    this.restoreScroll();
    if (typeof window !== 'undefined') {
      window.removeEventListener('keydown', this.handleKeyDown);
    }
  },
  methods: {
    handleClose() {
      this.$emit('close');
    },
    handleBackdropClick() {
      if (this.closeOnBackdrop) {
        this.handleClose();
      }
    },
    handleKeyDown(e) {
      if (e.key === 'Escape') {
        this.handleClose();
      }
    },
    restoreScroll() {
      if (typeof document !== 'undefined') {
        document.body.style.overflow = this.prevOverflow !== undefined ? this.prevOverflow : '';
      }
    }
  }
}
</script>

<style scoped>
/* Scoped overrides if needed; main classes are in modal.css */
</style>
