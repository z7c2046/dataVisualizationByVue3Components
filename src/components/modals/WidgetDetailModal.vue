<template>
  <!-- 1. Pages views detail modal -->
  <PagesViewDetailModal
    :show="isOpen('pages', 'monthHistogram')"
    @close="close"
  />

  <!-- 2. Opening of leaflets detail modal -->
  <LeafletDetailModal
    :show="isOpen('leaflet', 'line')"
    @close="close"
  />

  <!-- 3. Top stores detail modal -->
  <StoresDetailModal
    :show="isOpen('stores', 'leaderBoard')"
    @close="close"
  />

  <!-- 4. Today goals completion / Task Center detail modal -->
  <TaskCenterDetailModal
    :show="isOpen('task', 'donut')"
    @close="close"
  />

  <!-- 5. Goal completions during the week detail modal -->
  <GoalsDetailModal
    :show="isOpen('goals', 'weekHistogram')"
    @close="close"
  />

  <!-- 6. Active users detail modal -->
  <ActiveUsersDetailModal
    :show="isOpen('active-users', 'ratio')"
    @close="close"
  />

  <!-- 7. Income detail modal -->
  <IncomeDetailModal
    :show="isOpen('income', 'monthLine')"
    @close="close"
  />
</template>

<script>
import PagesViewDetailModal from './PagesViewDetailModal.vue';
import LeafletDetailModal from './LeafletDetailModal.vue';
import StoresDetailModal from './StoresDetailModal.vue';
import TaskCenterDetailModal from './TaskCenterDetailModal.vue';
import GoalsDetailModal from './GoalsDetailModal.vue';
import ActiveUsersDetailModal from './ActiveUsersDetailModal.vue';
import IncomeDetailModal from './IncomeDetailModal.vue';

export default {
  name: 'WidgetDetailModal',
  components: {
    PagesViewDetailModal,
    LeafletDetailModal,
    StoresDetailModal,
    TaskCenterDetailModal,
    GoalsDetailModal,
    ActiveUsersDetailModal,
    IncomeDetailModal
  },
  props: {
    activeModal: {
      type: String,
      default: ''
    }
  },
  emits: ['close'],
  methods: {
    isOpen(...types) {
      if (!this.activeModal) return false;
      const current = this.activeModal.toLowerCase();
      return types.some(t => t.toLowerCase() === current);
    },
    close() {
      this.$emit('close');
    }
  }
};
</script>
