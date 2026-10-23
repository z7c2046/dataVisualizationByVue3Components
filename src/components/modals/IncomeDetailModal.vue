<template>
  <BaseModal :show="show" title-id="income-modal-title" @close="$emit('close')">
    <!-- Header -->
    <div class="modal-header">
      <div class="modal-header-left">
        <div class="modal-header-icon income-accent">
          <svg class="income-svg-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
            />
          </svg>
        </div>
        <div>
          <h2 id="income-modal-title" class="modal-header-title">Income - Detailed View</h2>
          <p class="modal-header-desc">Analyze revenue streams and performance</p>
        </div>
      </div>
      <div class="modal-header-actions">
        <button class="modal-btn-secondary" type="button" @click="handleExport">
          <span class="material-symbols-outlined text-[18px]">download</span>
          Export Report
        </button>
        <button class="modal-btn-icon close-btn" type="button" title="Close" @click="$emit('close')">
          <span class="material-symbols-outlined">close</span>
        </button>
      </div>
    </div>

    <!-- Filter Bar -->
    <div class="modal-filter-bar">
      <!-- Source / Region / Product Tabs -->
      <div class="income-view-tabs">
        <button
          v-for="tab in ['By Source', 'By Region', 'By Product']"
          :key="tab"
          type="button"
          class="tab-btn"
          :class="{ active: activeTab === tab }"
          @click="activeTab = tab"
        >
          {{ tab }}
        </button>
      </div>

      <div class="filter-spacer"></div>

      <!-- Date Range Button -->
      <button class="modal-btn-secondary btn-compact" type="button">
        <span class="material-symbols-outlined text-[16px]">calendar_today</span>
        <span>Jan 1, 2023 - Jun 30, 2023</span>
        <span class="material-symbols-outlined text-[14px]">expand_more</span>
      </button>

      <!-- Compare Selector -->
      <div class="compare-select-wrap">
        <span class="compare-label">Compare to:</span>
        <select v-model="compareOption" class="compare-dropdown">
          <option>Previous Period</option>
          <option>Last Year</option>
          <option>Financial Target</option>
        </select>
      </div>
    </div>

    <!-- Body Scroll Content -->
    <div class="modal-body-scroll modal-custom-scroll">
      <!-- Main Overview Grid: Left Spline Chart (2 cols), Right Breakdown & Gauge (1 col) -->
      <div class="income-main-grid">
        <!-- Left: Spline Chart Card -->
        <div class="chart-section-card income-chart-card">
          <div class="income-chart-header">
            <div>
              <div class="income-total-val">$981,248.48</div>
              <div class="income-growth-row">
                <span class="modal-badge-success">
                  +60.24%
                  <span class="material-symbols-outlined text-[14px]">arrow_upward</span>
                </span>
                <span class="income-vs-text">vs $612,450.00 (Prev. Period)</span>
              </div>
            </div>
            <div class="income-chart-legend">
              <span class="legend-item">
                <span class="legend-dot green"></span> Current
              </span>
              <span class="legend-item">
                <span class="legend-dot dashed-line"></span> Previous
              </span>
            </div>
          </div>

          <!-- SVG Chart Area -->
          <div class="income-svg-container">
            <!-- Y-Axis Labels -->
            <div class="income-y-axis">
              <span>$200k</span>
              <span>$150k</span>
              <span>$100k</span>
              <span>$50k</span>
              <span>0</span>
            </div>

            <!-- Guidelines and SVG -->
            <div class="income-svg-inner">
              <div class="chart-grid-lines">
                <div class="grid-line"></div>
                <div class="grid-line"></div>
                <div class="grid-line"></div>
                <div class="grid-line"></div>
                <div class="grid-line base"></div>
              </div>

              <svg class="income-svg" viewBox="0 0 600 200" preserveAspectRatio="none">
                <defs>
                  <linearGradient id="incomeGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" stop-color="#10B981" stop-opacity="0.28" />
                    <stop offset="100%" stop-color="#10B981" stop-opacity="0.0" />
                  </linearGradient>
                </defs>

                <!-- Previous Period Dashed -->
                <path
                  d="M0,150 C50,160 100,120 150,130 C200,140 250,110 300,120 C350,130 400,90 450,100 C500,110 550,80 600,90"
                  fill="none"
                  stroke="#94A3B8"
                  stroke-dasharray="5 5"
                  stroke-opacity="0.6"
                  stroke-width="2"
                />

                <!-- Current Period Area Fill -->
                <path
                  d="M0,120 C50,130 80,80 150,90 C200,100 250,60 300,70 C350,80 400,40 450,50 C500,60 550,20 600,30 V200 H0 Z"
                  fill="url(#incomeGrad)"
                />

                <!-- Current Period Stroke -->
                <path
                  d="M0,120 C50,130 80,80 150,90 C200,100 250,60 300,70 C350,80 400,40 450,50 C500,60 550,20 600,30"
                  fill="none"
                  stroke="#10B981"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="3"
                />

                <!-- Peak Highlight Dot & Tooltip -->
                <circle cx="450" cy="50" r="4" fill="#FFFFFF" stroke="#10B981" stroke-width="2" />
                <g transform="translate(405, 12)">
                  <rect x="0" y="0" width="90" height="26" rx="4" fill="#1E293B" opacity="0.95" />
                  <text x="45" y="17" fill="#FFFFFF" font-size="10" font-weight="700" text-anchor="middle">
                    May 21: $162k
                  </text>
                  <path d="M40,26 L45,31 L50,26 Z" fill="#1E293B" opacity="0.95" />
                </g>
              </svg>

              <!-- X-Axis Labels -->
              <div class="income-x-axis">
                <span>Jan</span>
                <span>Feb</span>
                <span>Mar</span>
                <span>Apr</span>
                <span>May</span>
                <span>Jun</span>
              </div>
            </div>
          </div>
        </div>

        <!-- Right: Revenue Breakdown & Performance vs Target (1 col) -->
        <div class="income-side-col">
          <!-- Card 1: Revenue Breakdown -->
          <div class="income-subcard">
            <h4 class="subcard-title">Revenue Breakdown</h4>
            <div class="breakdown-items-list">
              <!-- Item 1 -->
              <div class="breakdown-item">
                <div class="breakdown-item-labels">
                  <span class="breakdown-name">
                    <span class="dot-indicator blue"></span> Product Sales
                  </span>
                  <span class="breakdown-val">$686,873</span>
                </div>
                <div class="breakdown-bar-track">
                  <div class="breakdown-bar-fill" style="width: 70%; background-color: var(--modal-primary)"></div>
                </div>
              </div>

              <!-- Item 2 -->
              <div class="breakdown-item">
                <div class="breakdown-item-labels">
                  <span class="breakdown-name">
                    <span class="dot-indicator purple"></span> Subscriptions
                  </span>
                  <span class="breakdown-val">$196,249</span>
                </div>
                <div class="breakdown-bar-track">
                  <div class="breakdown-bar-fill" style="width: 20%; background-color: #a855f7"></div>
                </div>
              </div>

              <!-- Item 3 -->
              <div class="breakdown-item">
                <div class="breakdown-item-labels">
                  <span class="breakdown-name">
                    <span class="dot-indicator orange"></span> Services
                  </span>
                  <span class="breakdown-val">$98,126</span>
                </div>
                <div class="breakdown-bar-track">
                  <div class="breakdown-bar-fill" style="width: 10%; background-color: #f97316"></div>
                </div>
              </div>
            </div>
          </div>

          <!-- Card 2: Performance vs Target Gauge -->
          <div class="income-subcard target-gauge-card">
            <h4 class="subcard-title">Performance vs Target</h4>
            <div class="gauge-ring-wrapper">
              <svg class="gauge-svg" viewBox="0 0 128 128">
                <!-- Background Circle -->
                <circle
                  cx="64"
                  cy="64"
                  r="56"
                  fill="transparent"
                  stroke="var(--modal-border)"
                  stroke-width="8"
                />
                <!-- Progress Circle (92%) -->
                <circle
                  cx="64"
                  cy="64"
                  r="56"
                  fill="transparent"
                  stroke="#10B981"
                  stroke-width="8"
                  stroke-dasharray="351"
                  stroke-dashoffset="35"
                  stroke-linecap="round"
                />
              </svg>
              <div class="gauge-center-content">
                <span class="gauge-pct">92%</span>
                <span class="gauge-sub">ACHIEVED</span>
              </div>
            </div>
            <div class="target-val-sub">
              Target: <span class="target-strong">$1,066,000</span>
            </div>
          </div>
        </div>
      </div>

      <!-- Detailed Transactions by Source Table -->
      <div class="transactions-table-card">
        <div class="transactions-header">
          <h4 class="trans-title">Detailed Transactions by Source</h4>
          <button class="trans-view-all" type="button" @click="handleViewAll">View All</button>
        </div>

        <div class="modal-table-container">
          <table class="modal-table">
            <thead>
              <tr>
                <th>Source Name</th>
                <th style="text-align: right">Revenue</th>
                <th style="text-align: right">Growth</th>
                <th style="text-align: right">Contribution</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="source in transactionSources" :key="source.name">
                <td style="font-weight: 600; color: var(--modal-text-title)">
                  <div class="source-cell-wrap">
                    <div class="source-icon-box" :style="{ backgroundColor: source.iconBg, color: source.iconColor }">
                      <span class="material-symbols-outlined text-[16px]">{{ source.icon }}</span>
                    </div>
                    <span>{{ source.name }}</span>
                  </div>
                </td>
                <td style="text-align: right; font-weight: 600">{{ source.revenue }}</td>
                <td style="text-align: right">
                  <span :class="source.growth.startsWith('+') ? 'modal-badge-success' : 'modal-badge-danger'">
                    {{ source.growth }}
                  </span>
                </td>
                <td style="text-align: right; color: var(--modal-text-muted)">{{ source.contribution }}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>

    <!-- Footer -->
    <div class="modal-footer income-footer">
      <button class="modal-btn-secondary" type="button" @click="$emit('close')">
        Cancel
      </button>
      <button class="modal-btn-primary" type="button" @click="handleGeneratePDF">
        Generate Full PDF
      </button>
    </div>
  </BaseModal>
</template>

<script>
import BaseModal from './BaseModal.vue';

export default {
  name: 'IncomeDetailModal',
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
      activeTab: 'By Source',
      compareOption: 'Previous Period',
      transactionSources: [
        {
          name: 'Direct Online Sales',
          icon: 'shopping_bag',
          iconBg: 'rgba(37, 99, 235, 0.12)',
          iconColor: '#2563EB',
          revenue: '$450,230',
          growth: '+12.5%',
          contribution: '45.8%'
        },
        {
          name: 'Affiliate Partners',
          icon: 'groups',
          iconBg: 'rgba(168, 85, 247, 0.12)',
          iconColor: '#9333ea',
          revenue: '$120,400',
          growth: '+8.2%',
          contribution: '12.2%'
        },
        {
          name: 'Email Marketing',
          icon: 'mail',
          iconBg: 'rgba(249, 115, 22, 0.12)',
          iconColor: '#ea580c',
          revenue: '$85,150',
          growth: '-2.4%',
          contribution: '8.6%'
        }
      ]
    };
  },
  methods: {
    handleExport() {
      alert('Exporting income report data...');
    },
    handleGeneratePDF() {
      alert('Generating high-resolution financial PDF...');
    },
    handleViewAll() {
      alert('Viewing all detailed income sources...');
    }
  }
};
</script>

<style scoped>
.income-svg-icon {
  width: 22px;
  height: 22px;
}

.income-view-tabs {
  display: flex;
  background-color: var(--modal-border);
  padding: 3px;
  border-radius: 10px;
  gap: 2px;
}

.tab-btn {
  border: none;
  background: transparent;
  padding: 6px 14px;
  border-radius: 8px;
  font-size: 0.8rem;
  font-weight: 600;
  color: var(--modal-text-muted);
  cursor: pointer;
  transition: all 0.2s;
}

.tab-btn.active {
  background-color: var(--modal-bg-card);
  color: var(--modal-text-title);
  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.1);
}

.btn-compact {
  padding: 6px 12px;
  font-size: 0.8rem;
}

.compare-select-wrap {
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 0.8rem;
}

.compare-label {
  color: var(--modal-text-muted);
}

.compare-dropdown {
  background: transparent;
  border: none;
  color: var(--modal-primary);
  font-weight: 600;
  outline: none;
  cursor: pointer;
}

/* Income Grid */
.income-main-grid {
  display: grid;
  grid-template-columns: 2fr 1fr;
  gap: 20px;
  margin-bottom: 24px;
}

@media (max-width: 900px) {
  .income-main-grid {
    grid-template-columns: 1fr;
  }
}

.income-chart-card {
  margin-bottom: 0;
  display: flex;
  flex-direction: column;
}

.income-chart-header {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  margin-bottom: 16px;
}

.income-total-val {
  font-size: 1.85rem;
  font-weight: 800;
  color: var(--modal-text-title);
  letter-spacing: -0.02em;
}

.income-growth-row {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-top: 4px;
}

.income-vs-text {
  font-size: 0.75rem;
  color: var(--modal-text-muted);
}

.income-chart-legend {
  display: flex;
  align-items: center;
  gap: 14px;
  font-size: 0.78rem;
  color: var(--modal-text-muted);
}

.legend-dot.green {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background-color: #10B981;
}

.legend-dot.dashed-line {
  width: 14px;
  height: 0;
  border-top: 2px dashed #94A3B8;
}

.income-svg-container {
  display: flex;
  position: relative;
  height: 200px;
  width: 100%;
}

.income-y-axis {
  width: 48px;
  height: 175px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  font-size: 11px;
  font-weight: 600;
  color: var(--modal-text-muted);
  text-align: right;
  padding-right: 8px;
  box-sizing: border-box;
}

.income-svg-inner {
  position: relative;
  flex: 1;
  height: 100%;
}

.income-svg-inner .chart-grid-lines {
  bottom: 25px;
}

.income-svg {
  position: absolute;
  inset: 0;
  bottom: 25px;
  width: 100%;
  height: 175px;
  overflow: visible;
}

.income-x-axis {
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  height: 20px;
  display: flex;
  justify-content: space-between;
  font-size: 11px;
  font-weight: 600;
  color: var(--modal-text-muted);
}

/* Side Column */
.income-side-col {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.income-subcard {
  background-color: var(--modal-bg-card);
  border: 1px solid var(--modal-border);
  border-radius: var(--modal-radius-inner);
  padding: 18px;
}

.subcard-title {
  font-size: 0.9rem;
  font-weight: 700;
  color: var(--modal-text-title);
  margin: 0 0 14px 0;
}

.breakdown-items-list {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.breakdown-item-labels {
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 0.78rem;
  margin-bottom: 4px;
}

.breakdown-name {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  color: var(--modal-text-muted);
}

.dot-indicator {
  width: 6px;
  height: 6px;
  border-radius: 50%;
}

.dot-indicator.blue { background-color: var(--modal-primary); }
.dot-indicator.purple { background-color: #a855f7; }
.dot-indicator.orange { background-color: #f97316; }

.breakdown-val {
  font-weight: 600;
  color: var(--modal-text-title);
}

.breakdown-bar-track {
  height: 6px;
  background-color: var(--modal-border);
  border-radius: 9999px;
  overflow: hidden;
}

.breakdown-bar-fill {
  height: 100%;
  border-radius: 9999px;
}

/* Gauge Card */
.target-gauge-card {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.gauge-ring-wrapper {
  position: relative;
  width: 110px;
  height: 110px;
  margin-bottom: 8px;
}

.gauge-svg {
  width: 100%;
  height: 100%;
  transform: rotate(-90deg);
}

.gauge-center-content {
  position: absolute;
  inset: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.gauge-pct {
  font-size: 1.5rem;
  font-weight: 800;
  color: var(--modal-text-title);
  line-height: 1;
}

.gauge-sub {
  font-size: 0.65rem;
  font-weight: 700;
  color: var(--modal-text-muted);
  letter-spacing: 0.1em;
  margin-top: 4px;
}

.target-val-sub {
  font-size: 0.78rem;
  color: var(--modal-text-muted);
}

.target-strong {
  font-weight: 700;
  color: var(--modal-text-title);
}

/* Transactions Table Card */
.transactions-table-card {
  background-color: var(--modal-bg-card);
  border: 1px solid var(--modal-border);
  border-radius: var(--modal-radius-inner);
  overflow: hidden;
}

.transactions-header {
  padding: 16px 20px;
  border-bottom: 1px solid var(--modal-border);
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.trans-title {
  font-size: 0.95rem;
  font-weight: 700;
  color: var(--modal-text-title);
  margin: 0;
}

.trans-view-all {
  border: none;
  background: transparent;
  color: var(--modal-primary);
  font-size: 0.78rem;
  font-weight: 600;
  cursor: pointer;
}

.trans-view-all:hover {
  text-decoration: underline;
}

.source-cell-wrap {
  display: flex;
  align-items: center;
  gap: 10px;
}

.source-icon-box {
  width: 28px;
  height: 28px;
  border-radius: 6px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.income-footer {
  justify-content: space-between;
}
</style>
