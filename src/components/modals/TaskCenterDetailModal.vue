<template>
  <BaseModal
    :show="show"
    title-id="task-modal-title"
    custom-card-class="task-modal-custom-card"
    @close="$emit('close')"
  >
    <div class="task-modal-split-container">
      <!-- Left Column: Goals Tracker Panel -->
      <div class="goals-tracker-panel">
        <!-- Ambient Blur Highlights -->
        <div class="glow-circle top-glow"></div>
        <div class="glow-circle bottom-glow"></div>

        <div class="tracker-content-top">
          <!-- Mini Badge -->
          <div class="tracker-badge">
            <div class="badge-icon-box">
              <span class="material-symbols-outlined text-sm">dataset</span>
            </div>
            <span class="badge-text">GOALS TRACKER</span>
          </div>

          <!-- Titles -->
          <h2 class="tracker-title">Today's Progress</h2>
          <p class="tracker-subtitle">Keep up the momentum!</p>

          <!-- Circular Progress Ring (SVG) -->
          <div class="circle-progress-wrapper">
            <div class="circle-box">
              <svg class="circle-svg" viewBox="0 0 224 224">
                <!-- Background Ring -->
                <circle
                  cx="112"
                  cy="112"
                  r="90"
                  fill="transparent"
                  stroke="rgba(255, 255, 255, 0.12)"
                  stroke-width="16"
                />
                <!-- Progress Ring -->
                <circle
                  cx="112"
                  cy="112"
                  r="90"
                  fill="transparent"
                  stroke="#ffffff"
                  stroke-dasharray="565"
                  :stroke-dashoffset="ringOffset"
                  stroke-linecap="round"
                  stroke-width="16"
                  class="progress-ring-circle"
                />
              </svg>

              <!-- Glowing Dot at tip of progress -->
              <div class="orbit-glow-dot">
                <div class="glow-dot"></div>
              </div>

              <!-- Center Text -->
              <div class="circle-center-text">
                <span class="percentage-val">78%</span>
                <span class="percentage-status">COMPLETED</span>
              </div>
            </div>
          </div>

          <!-- Stats Grid: Total Goals & Remaining -->
          <div class="tracker-stats-grid">
            <div class="tracker-stat-box">
              <div class="stat-box-label">TOTAL GOALS</div>
              <div class="stat-box-num">12,500</div>
              <div class="stat-box-sub">Target</div>
            </div>
            <div class="tracker-stat-box">
              <div class="stat-box-label">REMAINING</div>
              <div class="stat-box-num">1,543</div>
              <div class="stat-box-sub">To achieve</div>
            </div>
          </div>
        </div>

        <!-- Bottom Notice Card -->
        <div class="tracker-bottom-tip">
          <div class="tip-icon-box">
            <span class="material-symbols-outlined text-sm">trending_up</span>
          </div>
          <span class="tip-text">15% more tasks than yesterday</span>
        </div>
      </div>

      <!-- Right Column: Task Center -->
      <div class="task-center-panel">
        <!-- Header -->
        <div class="task-center-header">
          <div>
            <h1 id="task-modal-title" class="task-center-title">Task Center</h1>
            <p class="task-center-subtitle">Manage your daily objectives</p>
          </div>
          <div class="task-center-actions">
            <button class="modal-btn-icon" type="button" title="Search">
              <span class="material-symbols-outlined">search</span>
            </button>
            <button class="modal-btn-icon" type="button" title="Notifications">
              <span class="material-symbols-outlined">notifications</span>
            </button>
            <div class="header-divider"></div>
            <button class="modal-btn-icon close-btn" type="button" title="Close" @click="$emit('close')">
              <span class="material-symbols-outlined">close</span>
            </button>
          </div>
        </div>

        <!-- Scrollable Task List -->
        <div class="task-center-body modal-custom-scroll">
          <!-- Create New Task Button Card -->
          <button class="create-task-btn-card" type="button" @click="handleCreateTask">
            <div class="create-task-left">
              <div class="create-task-icon-box">
                <span class="material-symbols-outlined text-2xl">add</span>
              </div>
              <div class="create-task-info">
                <h3 class="create-task-heading">Create New Task</h3>
                <p class="create-task-desc">Add a new goal to your daily list</p>
              </div>
            </div>
            <div class="create-task-arrow-box">
              <span class="material-symbols-outlined">arrow_forward</span>
            </div>
          </button>

          <!-- Active Tasks Header -->
          <div class="active-tasks-bar">
            <h3 class="active-tasks-title">ACTIVE TASKS ({{ tasks.length }})</h3>
            <span class="sort-action" @click="toggleSort">Sort by: Priority</span>
          </div>

          <!-- Task Cards List -->
          <div class="task-cards-list">
            <div
              v-for="task in tasks"
              :key="task.id"
              class="task-item-card"
              :class="{ 'is-completed': task.completed }"
            >
              <!-- Left Info -->
              <div class="task-left-section">
                <div class="task-icon-box" :style="{ backgroundColor: task.iconBg, color: task.iconColor }">
                  <span class="material-symbols-outlined">{{ task.icon }}</span>
                </div>
                <div class="task-details">
                  <h4 class="task-item-title">{{ task.title }}</h4>
                  <div class="task-meta-row">
                    <span class="task-tag" :style="{ backgroundColor: task.tagBg, color: task.tagColor }">
                      <span class="material-symbols-outlined text-[13px]">{{ task.tagIcon }}</span>
                      {{ task.tagText }}
                    </span>
                    <span class="meta-dot">|</span>
                    <span class="task-category" :style="{ color: task.categoryColor }">{{ task.category }}</span>
                  </div>
                </div>
              </div>

              <!-- Right Progress & Action -->
              <div class="task-right-section">
                <div class="task-progress-wrap">
                  <div class="progress-labels">
                    <span class="prog-label">Progress</span>
                    <span class="prog-pct" :style="{ color: task.completed ? '#10B981' : 'var(--modal-primary)' }">
                      {{ task.progress }}
                    </span>
                  </div>
                  <div class="task-progress-track">
                    <div
                      class="task-progress-fill"
                      :style="{ width: task.progressVal + '%', background: task.progressGradient }"
                    ></div>
                  </div>
                </div>
                <button class="modal-btn-icon" type="button" title="More options" @click.stop="toggleTask(task)">
                  <span class="material-symbols-outlined">
                    {{ task.completed ? 'check_circle' : 'more_vert' }}
                  </span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </BaseModal>
</template>

<script>
import BaseModal from './BaseModal.vue';

export default {
  name: 'TaskCenterDetailModal',
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
      // 565 - (565 * 0.78) = 124.3
      ringOffset: 124,
      tasks: [
        {
          id: 1,
          title: 'Website Redesign Mockups',
          icon: 'design_services',
          iconBg: 'rgba(168, 85, 247, 0.15)',
          iconColor: '#9333ea',
          tagIcon: 'schedule',
          tagText: 'Due 5:00 PM',
          tagBg: 'rgba(249, 115, 22, 0.12)',
          tagColor: '#ea580c',
          category: 'Design System',
          categoryColor: '#9333ea',
          progress: '75%',
          progressVal: 75,
          progressGradient: 'linear-gradient(90deg, #3b82f6, #a855f7)',
          completed: false
        },
        {
          id: 2,
          title: 'Q3 Revenue Analysis',
          icon: 'analytics',
          iconBg: 'rgba(249, 115, 22, 0.15)',
          iconColor: '#ea580c',
          tagIcon: 'timer',
          tagText: '2h remaining',
          tagBg: 'rgba(100, 116, 139, 0.12)',
          tagColor: '#64748b',
          category: 'Finance',
          categoryColor: '#ea580c',
          progress: '40%',
          progressVal: 40,
          progressGradient: 'linear-gradient(90deg, #f97316, #ef4444)',
          completed: false
        },
        {
          id: 3,
          title: 'API Integration Tests',
          icon: 'check_circle',
          iconBg: 'rgba(16, 185, 129, 0.15)',
          iconColor: '#10b981',
          tagIcon: 'done_all',
          tagText: 'Completed',
          tagBg: 'rgba(16, 185, 129, 0.12)',
          tagColor: '#10b981',
          category: 'Development',
          categoryColor: '#10b981',
          progress: 'Done',
          progressVal: 100,
          progressGradient: '#10b981',
          completed: true
        },
        {
          id: 4,
          title: 'Evening Workout Session',
          icon: 'fitness_center',
          iconBg: 'rgba(59, 130, 246, 0.15)',
          iconColor: '#3b82f6',
          tagIcon: 'event_upcoming',
          tagText: '7:00 PM',
          tagBg: 'rgba(100, 116, 139, 0.12)',
          tagColor: '#64748b',
          category: 'Health',
          categoryColor: '#3b82f6',
          progress: 'Not started',
          progressVal: 0,
          progressGradient: '#3b82f6',
          completed: false
        }
      ]
    };
  },
  methods: {
    handleCreateTask() {
      const title = prompt('Enter new task name:');
      if (title && title.trim()) {
        this.tasks.unshift({
          id: Date.now(),
          title: title.trim(),
          icon: 'task_alt',
          iconBg: 'rgba(41, 118, 255, 0.15)',
          iconColor: '#2976ff',
          tagIcon: 'schedule',
          tagText: 'Due today',
          tagBg: 'rgba(41, 118, 255, 0.1)',
          tagColor: '#2976ff',
          category: 'General',
          categoryColor: '#2976ff',
          progress: '0%',
          progressVal: 0,
          progressGradient: 'linear-gradient(90deg, #2976ff, #38ab70)',
          completed: false
        });
      }
    },
    toggleTask(task) {
      task.completed = !task.completed;
      if (task.completed) {
        task.progress = 'Done';
        task.progressVal = 100;
        task.progressGradient = '#10b981';
      } else {
        task.progress = '50%';
        task.progressVal = 50;
        task.progressGradient = 'linear-gradient(90deg, #3b82f6, #a855f7)';
      }
    },
    toggleSort() {
      this.tasks.reverse();
    }
  }
};
</script>

<style scoped>
:deep(.task-modal-custom-card) {
  max-width: 1080px;
  height: 86vh;
}

.task-modal-split-container {
  display: flex;
  height: 100%;
  width: 100%;
  overflow: hidden;
}

@media (max-width: 820px) {
  .task-modal-split-container {
    flex-direction: column;
    overflow-y: auto;
  }
}

/* Left Column: Goals Tracker Panel */
.goals-tracker-panel {
  width: 38%;
  background: linear-gradient(160deg, #1e40af 0%, #1e3a8a 50%, #172554 100%);
  color: #ffffff;
  padding: 32px 28px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  position: relative;
  overflow: hidden;
  box-sizing: border-box;
}

@media (max-width: 820px) {
  .goals-tracker-panel {
    width: 100%;
    padding: 24px;
  }
}

.glow-circle {
  position: absolute;
  border-radius: 50%;
  pointer-events: none;
  filter: blur(50px);
}

.top-glow {
  top: -60px;
  right: -60px;
  width: 200px;
  height: 200px;
  background: rgba(255, 255, 255, 0.15);
}

.bottom-glow {
  bottom: -60px;
  left: -60px;
  width: 220px;
  height: 220px;
  background: rgba(0, 0, 0, 0.35);
}

.tracker-content-top {
  position: relative;
  z-index: 2;
}

.tracker-badge {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 4px 10px;
  background: rgba(255, 255, 255, 0.12);
  border-radius: 8px;
  backdrop-filter: blur(8px);
  margin-bottom: 20px;
}

.badge-icon-box {
  display: flex;
  align-items: center;
  justify-content: center;
}

.badge-text {
  font-size: 0.72rem;
  font-weight: 700;
  letter-spacing: 0.08em;
  color: #bfdbfe;
}

.tracker-title {
  font-size: 1.85rem;
  font-weight: 800;
  letter-spacing: -0.02em;
  margin: 0;
  line-height: 1.2;
}

.tracker-subtitle {
  font-size: 0.85rem;
  color: #93c5fd;
  margin-top: 6px;
  margin-bottom: 20px;
}

/* Circular Progress Ring */
.circle-progress-wrapper {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 12px 0 20px;
}

.circle-box {
  position: relative;
  width: 180px;
  height: 180px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.circle-svg {
  width: 100%;
  height: 100%;
  transform: rotate(-90deg);
}

.progress-ring-circle {
  transition: stroke-dashoffset 0.6s cubic-bezier(0.16, 1, 0.3, 1);
}

.orbit-glow-dot {
  position: absolute;
  inset: 0;
  transform: rotate(190deg);
  pointer-events: none;
}

.glow-dot {
  position: absolute;
  top: 14px;
  left: 50%;
  transform: translateX(-50%);
  width: 8px;
  height: 8px;
  background-color: #ffffff;
  border-radius: 50%;
  box-shadow: 0 0 12px 2px rgba(255, 255, 255, 0.9);
}

.circle-center-text {
  position: absolute;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.percentage-val {
  font-size: 2.5rem;
  font-weight: 800;
  letter-spacing: -0.02em;
  line-height: 1;
}

.percentage-status {
  font-size: 0.7rem;
  font-weight: 700;
  color: #bfdbfe;
  letter-spacing: 0.12em;
  margin-top: 6px;
}

/* Stats Grid */
.tracker-stats-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 12px;
  margin-top: 10px;
}

.tracker-stat-box {
  background: rgba(37, 99, 235, 0.35);
  border: 1px solid rgba(255, 255, 255, 0.12);
  border-radius: 12px;
  padding: 12px 14px;
  backdrop-filter: blur(8px);
}

.stat-box-label {
  font-size: 0.68rem;
  font-weight: 700;
  color: #bfdbfe;
  letter-spacing: 0.05em;
  margin-bottom: 2px;
}

.stat-box-num {
  font-size: 1.4rem;
  font-weight: 800;
  line-height: 1.2;
}

.stat-box-sub {
  font-size: 0.7rem;
  color: #93c5fd;
}

/* Bottom tip */
.tracker-bottom-tip {
  position: relative;
  z-index: 2;
  margin-top: 20px;
  display: flex;
  align-items: center;
  gap: 10px;
  background: rgba(30, 58, 138, 0.45);
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 10px;
  padding: 10px 14px;
}

.tip-icon-box {
  width: 24px;
  height: 24px;
  border-radius: 50%;
  background-color: rgba(16, 185, 129, 0.2);
  color: #10B981;
  display: flex;
  align-items: center;
  justify-content: center;
}

.tip-text {
  font-size: 0.78rem;
  font-weight: 500;
  color: #eff6ff;
}

/* Right Column: Task Center */
.task-center-panel {
  flex: 1;
  background-color: var(--modal-bg-subtle);
  display: flex;
  flex-direction: column;
  overflow: hidden;
}

.task-center-header {
  padding: 20px 28px;
  background-color: var(--modal-bg-card);
  border-bottom: 1px solid var(--modal-border);
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-shrink: 0;
}

.task-center-title {
  font-size: 1.35rem;
  font-weight: 800;
  color: var(--modal-text-title);
  margin: 0;
}

.task-center-subtitle {
  font-size: 0.8rem;
  color: var(--modal-text-muted);
  margin-top: 2px;
  margin-bottom: 0;
}

.task-center-actions {
  display: flex;
  align-items: center;
  gap: 8px;
}

.header-divider {
  width: 1px;
  height: 20px;
  background-color: var(--modal-border);
  margin: 0 4px;
}

.task-center-body {
  padding: 24px 28px;
  overflow-y: auto;
  flex: 1;
}

/* Create New Task Action Card */
.create-task-btn-card {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 16px 20px;
  margin-bottom: 24px;
  background-color: var(--modal-bg-card);
  border: 1.5px dashed rgba(41, 118, 255, 0.4);
  border-radius: var(--modal-radius-inner);
  cursor: pointer;
  transition: all 0.25s;
}

.create-task-btn-card:hover {
  border-color: var(--modal-primary);
  box-shadow: 0 6px 16px rgba(41, 118, 255, 0.08);
  transform: translateY(-1px);
}

.create-task-left {
  display: flex;
  align-items: center;
  gap: 16px;
  text-align: left;
}

.create-task-icon-box {
  width: 44px;
  height: 44px;
  border-radius: 12px;
  background-color: var(--modal-primary-soft);
  color: var(--modal-primary);
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s;
}

.create-task-btn-card:hover .create-task-icon-box {
  background-color: var(--modal-primary);
  color: #ffffff;
  transform: scale(1.05);
}

.create-task-heading {
  font-size: 1rem;
  font-weight: 700;
  color: var(--modal-text-title);
  margin: 0;
}

.create-task-desc {
  font-size: 0.8rem;
  color: var(--modal-text-muted);
  margin-top: 2px;
  margin-bottom: 0;
}

.create-task-arrow-box {
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background-color: var(--modal-bg-hover);
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--modal-text-muted);
  transition: all 0.2s;
}

.create-task-btn-card:hover .create-task-arrow-box {
  background-color: var(--modal-primary-soft);
  color: var(--modal-primary);
}

/* Active Tasks Section */
.active-tasks-bar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 14px;
}

.active-tasks-title {
  font-size: 0.75rem;
  font-weight: 700;
  color: var(--modal-text-muted);
  letter-spacing: 0.06em;
  margin: 0;
}

.sort-action {
  font-size: 0.75rem;
  font-weight: 500;
  color: var(--modal-text-muted);
  cursor: pointer;
}

.sort-action:hover {
  color: var(--modal-primary);
}

.task-cards-list {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.task-item-card {
  padding: 16px 20px;
  background-color: var(--modal-bg-card);
  border: 1px solid var(--modal-border);
  border-radius: var(--modal-radius-inner);
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
  transition: all 0.25s;
}

.task-item-card:hover {
  border-color: rgba(41, 118, 255, 0.3);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.04);
}

.task-item-card.is-completed {
  opacity: 0.65;
}

.task-item-card.is-completed:hover {
  opacity: 1;
}

.task-item-card.is-completed .task-item-title {
  text-decoration: line-through;
  color: var(--modal-text-muted);
}

.task-left-section {
  display: flex;
  align-items: center;
  gap: 16px;
  flex: 1;
}

.task-icon-box {
  width: 40px;
  height: 40px;
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.task-item-title {
  font-size: 0.95rem;
  font-weight: 700;
  color: var(--modal-text-title);
  margin: 0;
}

.task-meta-row {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 0.75rem;
  margin-top: 4px;
}

.task-tag {
  display: inline-flex;
  align-items: center;
  gap: 4px;
  padding: 2px 6px;
  border-radius: 4px;
  font-weight: 600;
}

.meta-dot {
  color: var(--modal-border);
}

.task-category {
  font-weight: 600;
}

.task-right-section {
  display: flex;
  align-items: center;
  gap: 16px;
  width: 220px;
  flex-shrink: 0;
}

@media (max-width: 600px) {
  .task-item-card {
    flex-direction: column;
    align-items: flex-start;
  }
  .task-right-section {
    width: 100%;
    margin-top: 8px;
  }
}

.task-progress-wrap {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.progress-labels {
  display: flex;
  justify-content: space-between;
  font-size: 0.75rem;
  font-weight: 700;
}

.prog-label {
  color: var(--modal-text-muted);
}

.task-progress-track {
  height: 6px;
  background-color: var(--modal-border);
  border-radius: 9999px;
  overflow: hidden;
}

.task-progress-fill {
  height: 100%;
  border-radius: 9999px;
  transition: width 0.4s ease;
}
</style>
