<template>
  <BaseModal :show="show" title-id="goals-modal-title" @close="$emit('close')">
    <!-- Header -->
    <div class="modal-header">
      <div class="modal-header-left">
        <div class="modal-header-icon goals-accent">
          <span class="material-symbols-outlined">flag</span>
        </div>
        <div>
          <h2 id="goals-modal-title" class="modal-header-title">Goal completions during the week</h2>
          <p class="modal-header-desc">Detailed breakdown of daily goal achievements and performance.</p>
        </div>
      </div>
      <div class="modal-header-actions">
        <button class="modal-btn-icon close-btn" type="button" title="Close" @click="$emit('close')">
          <span class="material-symbols-outlined">close</span>
        </button>
      </div>
    </div>

    <!-- Week Day Bar Selector Section -->
    <div class="week-selector-wrapper">
      <div class="week-bars-container">
        <div
          v-for="(day, index) in weekDays"
          :key="day.id"
          class="day-column"
          :class="{ 'is-selected': selectedDayIndex === index }"
          @click="selectDay(index)"
        >
          <!-- Pillar Bar -->
          <div class="bar-track">
            <div
              class="day-pillar"
              :style="{ height: day.barHeight + 'px', backgroundColor: getBarColor(day, index) }"
            >
              <div v-if="selectedDayIndex === index" class="pillar-selected-ring"></div>
            </div>
          </div>

          <!-- Day Short Label -->
          <span class="day-label" :class="{ 'label-active': selectedDayIndex === index }">
            {{ day.shortLabel }}
          </span>

          <!-- Floating Badge / Selected Tag -->
          <div v-if="selectedDayIndex === index" class="selected-pill-badge">
            <span class="pill-badge-text">{{ day.fullLabel }}</span>
            <span class="selected-sub-text">Selected</span>
          </div>
        </div>
      </div>
    </div>

    <!-- Body Scroll: Day Completion Breakdown -->
    <div class="modal-body-scroll modal-custom-scroll">
      <h1 class="selected-date-heading">{{ currentDay.dateString }}</h1>

      <div class="goals-items-list">
        <div
          v-for="(goal, gIndex) in currentDay.goals"
          :key="gIndex"
          class="goal-breakdown-row"
        >
          <div class="goal-name-left">
            <span class="goal-number">{{ gIndex + 1 }}.</span>
            <span class="goal-name-text">{{ goal.name }}</span>
          </div>

          <div class="goal-stats-right">
            <span class="goal-value">{{ goal.value }}</span>
            <span
              :class="goal.trend.startsWith('+') ? 'modal-badge-success' : 'goal-neutral-badge'"
            >
              {{ goal.trend }}
            </span>
          </div>
        </div>
      </div>
    </div>

    <!-- Footer -->
    <div class="modal-footer">
      <button class="modal-btn-primary" type="button" @click="handleManageGoals">
        <span class="material-symbols-outlined text-[18px]">tune</span>
        Manage goals
      </button>
    </div>
  </BaseModal>
</template>

<script>
import BaseModal from './BaseModal.vue';

export default {
  name: 'GoalsDetailModal',
  components: {
    BaseModal
  },
  props: {
    show: {
      type: Boolean,
      default: false
    }
  },
  emits: ['close'],
  data() {
    return {
      selectedDayIndex: 5, // Saturday by default
      weekDays: [
        {
          id: 'mon',
          shortLabel: 'M',
          fullLabel: 'Monday',
          dateString: 'Monday Feb 12, 2023',
          barHeight: 56,
          color: null,
          goals: [
            { name: 'Opening at least one leaflet', value: '4,120', trend: '+890%' },
            { name: 'Fully browsed leaflet', value: '820', trend: '62.4%' }
          ]
        },
        {
          id: 'tue',
          shortLabel: 'Tue',
          fullLabel: 'Tuesday',
          dateString: 'Tuesday Feb 13, 2023',
          barHeight: 88,
          color: '#2976ff',
          goals: [
            { name: 'Opening at least one leaflet', value: '5,340', trend: '+1,120%' },
            { name: 'Fully browsed leaflet', value: '980', trend: '71.2%' }
          ]
        },
        {
          id: 'wed',
          shortLabel: 'W',
          fullLabel: 'Wednesday',
          dateString: 'Wednesday Feb 14, 2023',
          barHeight: 48,
          color: null,
          goals: [
            { name: 'Opening at least one leaflet', value: '3,890', trend: '+640%' },
            { name: 'Fully browsed leaflet', value: '710', trend: '58.0%' }
          ]
        },
        {
          id: 'thu',
          shortLabel: 'T',
          fullLabel: 'Thursday',
          dateString: 'Thursday Feb 15, 2023',
          barHeight: 110,
          color: '#38ab70',
          goals: [
            { name: 'Opening at least one leaflet', value: '6,120', trend: '+1,420%' },
            { name: 'Fully browsed leaflet', value: '1,050', trend: '74.5%' }
          ]
        },
        {
          id: 'fri',
          shortLabel: 'F',
          fullLabel: 'Friday',
          dateString: 'Friday Feb 16, 2023',
          barHeight: 110,
          color: '#38ab70',
          goals: [
            { name: 'Opening at least one leaflet', value: '6,290', trend: '+1,480%' },
            { name: 'Fully browsed leaflet', value: '1,100', trend: '75.0%' }
          ]
        },
        {
          id: 'sat',
          shortLabel: 'Saturday',
          fullLabel: 'Saturday',
          dateString: 'Saturday Feb 17, 2023',
          barHeight: 96,
          color: '#0f172a',
          goals: [
            { name: 'Opening at least one leaflet', value: '6,489', trend: '+1,579%' },
            { name: 'Fully browsed leaflet', value: '1,137', trend: '75.8%' }
          ]
        },
        {
          id: 'sun',
          shortLabel: 'S',
          fullLabel: 'Sunday',
          dateString: 'Sunday Feb 18, 2023',
          barHeight: 76,
          color: null,
          goals: [
            { name: 'Opening at least one leaflet', value: '5,020', trend: '+950%' },
            { name: 'Fully browsed leaflet', value: '910', trend: '68.2%' }
          ]
        }
      ]
    };
  },
  computed: {
    currentDay() {
      return this.weekDays[this.selectedDayIndex];
    }
  },
  methods: {
    selectDay(idx) {
      this.selectedDayIndex = idx;
    },
    getBarColor(day, idx) {
      if (this.selectedDayIndex === idx) {
        return 'var(--modal-primary, #2976ff)';
      }
      if (day.color) return day.color;
      return 'var(--modal-border, #cbd5e1)';
    },
    handleManageGoals() {
      alert('Manage Goals settings modal opened');
    }
  }
};
</script>

<style scoped>
.week-selector-wrapper {
  padding: 30px 24px 44px;
  background-color: var(--modal-bg-subtle);
  border-bottom: 1px solid var(--modal-border);
  display: flex;
  justify-content: center;
}

.week-bars-container {
  display: flex;
  align-items: flex-end;
  justify-content: center;
  gap: clamp(16px, 4vw, 56px);
  height: 140px;
  width: 100%;
  max-width: 640px;
}

.day-column {
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
  cursor: pointer;
  user-select: none;
}

.bar-track {
  height: 120px;
  display: flex;
  align-items: flex-end;
}

.day-pillar {
  width: 12px;
  border-radius: 9999px;
  transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
  position: relative;
}

.day-column:hover .day-pillar {
  transform: scaleY(1.08);
}

.day-column.is-selected .day-pillar {
  width: 14px;
  box-shadow: 0 4px 12px rgba(41, 118, 255, 0.4);
}

.day-label {
  font-size: 0.78rem;
  font-weight: 700;
  color: var(--modal-text-muted);
  transition: color 0.2s;
}

.day-label.label-active {
  color: var(--modal-primary);
}

/* Floating pill for the selected day */
.selected-pill-badge {
  position: absolute;
  bottom: -36px;
  display: flex;
  flex-direction: column;
  align-items: center;
  white-space: nowrap;
  z-index: 5;
}

.pill-badge-text {
  background-color: var(--modal-text-title);
  color: var(--modal-bg-card);
  font-size: 0.72rem;
  font-weight: 600;
  padding: 2px 10px;
  border-radius: 9999px;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.15);
}

.selected-sub-text {
  font-size: 0.65rem;
  color: var(--modal-text-muted);
  margin-top: 2px;
}

/* Detail Body */
.selected-date-heading {
  font-size: 1.65rem;
  font-weight: 800;
  color: var(--modal-text-title);
  margin-bottom: 20px;
  letter-spacing: -0.02em;
}

.goals-items-list {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.goal-breakdown-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 12px 0;
  border-bottom: 1px solid var(--modal-border);
}

.goal-name-left {
  display: flex;
  align-items: center;
  gap: 10px;
}

.goal-number {
  font-size: 0.85rem;
  font-weight: 600;
  color: var(--modal-text-muted);
}

.goal-name-text {
  font-size: 0.92rem;
  font-weight: 600;
  color: var(--modal-text-title);
}

.goal-stats-right {
  display: flex;
  align-items: center;
  gap: 20px;
}

.goal-value {
  font-size: 0.95rem;
  font-weight: 700;
  color: var(--modal-text-title);
  min-width: 60px;
  text-align: right;
}

.goal-neutral-badge {
  font-size: 0.85rem;
  font-weight: 600;
  color: var(--modal-text-muted);
  min-width: 64px;
  text-align: right;
}
</style>
