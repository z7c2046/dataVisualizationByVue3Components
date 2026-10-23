<template>
  <BaseModal :show="show" title-id="active-users-modal-title" @close="$emit('close')">
    <!-- Header -->
    <div class="modal-header">
      <div class="modal-header-left">
        <div class="modal-header-icon users-accent">
          <span class="material-symbols-outlined">group</span>
        </div>
        <div>
          <h2 id="active-users-modal-title" class="modal-header-title">Active Users Analysis</h2>
          <p class="modal-header-desc">Detailed segmentation and historical activity trends.</p>
        </div>
      </div>
      <div class="modal-header-actions">
        <!-- Range Toggle -->
        <div class="time-range-toggle">
          <button
            v-for="range in ['30 Days', '3 Months', 'Year']"
            :key="range"
            type="button"
            class="range-pill"
            :class="{ active: selectedRange === range }"
            @click="selectedRange = range"
          >
            {{ range }}
          </button>
        </div>
        <button class="modal-btn-icon close-btn" type="button" title="Close" @click="$emit('close')">
          <span class="material-symbols-outlined">close</span>
        </button>
      </div>
    </div>

    <!-- Body Scroll Content -->
    <div class="modal-body-scroll modal-custom-scroll">
      <!-- 3 Top Metric Cards -->
      <div class="modal-metrics-grid user-metrics-grid">
        <!-- Card 1 -->
        <div class="modal-metric-card">
          <div class="card-metric-top">
            <span class="modal-metric-label">Total Active Users</span>
            <span class="material-symbols-outlined metric-icon">person</span>
          </div>
          <div class="modal-metric-value">39,271</div>
          <div class="metric-trend-row">
            <span class="modal-badge-danger">
              -53.67%
              <span class="material-symbols-outlined text-[13px]">trending_down</span>
            </span>
            <span class="trend-vs-text">vs previous period</span>
          </div>
        </div>

        <!-- Card 2 -->
        <div class="modal-metric-card">
          <div class="card-metric-top">
            <span class="modal-metric-label">Avg. Session Duration</span>
            <span class="material-symbols-outlined metric-icon">timer</span>
          </div>
          <div class="modal-metric-value">4m 12s</div>
          <div class="metric-trend-row">
            <span class="modal-badge-success">
              +12.5%
              <span class="material-symbols-outlined text-[13px]">trending_up</span>
            </span>
            <span class="trend-vs-text">vs previous period</span>
          </div>
        </div>

        <!-- Card 3 -->
        <div class="modal-metric-card">
          <div class="card-metric-top">
            <span class="modal-metric-label">Returning Users</span>
            <span class="material-symbols-outlined metric-icon">sync</span>
          </div>
          <div class="modal-metric-value">12,840</div>
          <div class="ret-users-bar-wrap">
            <div class="ret-users-bar-track">
              <div class="ret-users-bar-fill" style="width: 32.6%"></div>
            </div>
            <span class="ret-users-text">32.6% of total traffic</span>
          </div>
        </div>
      </div>

      <!-- Activity Fluctuation Trend Chart Card -->
      <div class="chart-section-card">
        <div class="chart-section-header">
          <h3 class="chart-title">Activity Fluctuation Trend</h3>
          <div class="chart-legend">
            <span class="legend-item">
              <span class="legend-dot primary"></span> Current
            </span>
            <span class="legend-item">
              <span class="legend-dot muted"></span> Previous
            </span>
          </div>
        </div>

        <div class="trend-svg-box">
          <!-- Background Horizontal Lines -->
          <div class="chart-grid-lines">
            <div class="grid-line"></div>
            <div class="grid-line"></div>
            <div class="grid-line"></div>
            <div class="grid-line"></div>
            <div class="grid-line base"></div>
          </div>

          <!-- SVG Graphic -->
          <svg class="active-users-svg" viewBox="0 0 800 200" preserveAspectRatio="none">
            <defs>
              <linearGradient id="activeUsersGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stop-color="#2563EB" stop-opacity="0.25" />
                <stop offset="100%" stop-color="#2563EB" stop-opacity="0.0" />
              </linearGradient>
            </defs>

            <!-- Area Fill -->
            <path
              d="M0,200 L0,120 Q50,140 100,100 T200,80 T300,120 T400,90 T500,140 T600,110 T700,160 T800,130 L800,200 Z"
              fill="url(#activeUsersGrad)"
            />

            <!-- Previous Period Dashed Curve -->
            <path
              d="M0,150 Q50,160 100,130 T200,140 T300,100 T400,130 T500,110 T600,140 T700,120 T800,150"
              fill="none"
              stroke="#94A3B8"
              stroke-dasharray="4 4"
              stroke-width="2"
            />

            <!-- Current Period Solid Spline -->
            <path
              d="M0,120 Q50,140 100,100 T200,80 T300,120 T400,90 T500,140 T600,110 T700,160 T800,130"
              fill="none"
              stroke="var(--modal-primary, #2563EB)"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="3"
            />

            <!-- Highlight Nodes -->
            <circle cx="200" cy="80" r="4" fill="#ffffff" stroke="var(--modal-primary, #2563EB)" stroke-width="2" />
            <circle cx="500" cy="140" r="4" fill="#ffffff" stroke="var(--modal-primary, #2563EB)" stroke-width="2" />
            <circle cx="800" cy="130" r="4" fill="#ffffff" stroke="var(--modal-primary, #2563EB)" stroke-width="2" />
          </svg>

          <!-- Floating Data Badge on Node 1 -->
          <div class="chart-floating-badge" style="top: 30%; left: 25%">
            42,500 Users
            <div class="badge-arrow"></div>
          </div>

          <!-- X-Axis Labels -->
          <div class="chart-x-axis-dates">
            <span>Oct 01</span>
            <span>Oct 05</span>
            <span>Oct 10</span>
            <span>Oct 15</span>
            <span>Oct 20</span>
            <span>Oct 25</span>
            <span>Oct 30</span>
          </div>
        </div>
      </div>

      <!-- User Segmentation Breakdown (4 Panels) -->
      <div class="segmentation-section">
        <h3 class="segmentation-heading">User Segmentation Breakdown</h3>

        <div class="segmentation-grid">
          <!-- 1. Browsers Panel -->
          <div class="segment-card">
            <div class="segment-card-header">
              <span class="segment-title">Browsers</span>
              <span class="segment-pill blue">15,046 total</span>
            </div>
            <div class="segment-bars-list">
              <div class="seg-bar-row">
                <div class="seg-bar-labels">
                  <span>Chrome</span>
                  <span class="seg-bold">65%</span>
                </div>
                <div class="seg-track"><div class="seg-fill" style="width: 65%; background: var(--modal-primary)"></div></div>
              </div>
              <div class="seg-bar-row">
                <div class="seg-bar-labels">
                  <span>Safari</span>
                  <span class="seg-bold">20%</span>
                </div>
                <div class="seg-track"><div class="seg-fill" style="width: 20%; background: #60a5fa"></div></div>
              </div>
              <div class="seg-bar-row">
                <div class="seg-bar-labels">
                  <span>Firefox</span>
                  <span class="seg-bold">10%</span>
                </div>
                <div class="seg-track"><div class="seg-fill" style="width: 10%; background: #93c5fd"></div></div>
              </div>
            </div>
          </div>

          <!-- 2. Favorites Panel -->
          <div class="segment-card">
            <div class="segment-card-header">
              <span class="segment-title">Favorites</span>
              <span class="segment-pill purple">2,118 interactions</span>
            </div>
            <div class="favorites-body">
              <div class="fav-ring-box">
                <svg viewBox="0 0 64 64" class="fav-ring-svg">
                  <circle cx="32" cy="32" r="28" fill="transparent" stroke="var(--modal-border)" stroke-width="6" />
                  <circle
                    cx="32"
                    cy="32"
                    r="28"
                    fill="transparent"
                    stroke="#a855f7"
                    stroke-width="6"
                    stroke-dasharray="175.9"
                    stroke-dashoffset="44"
                    stroke-linecap="round"
                  />
                </svg>
                <span class="fav-ring-pct">75%</span>
              </div>
              <div class="fav-text-col">
                <p class="fav-desc">Most favorites added from product pages vs listing pages.</p>
                <a href="javascript:void(0)" class="fav-link">View details</a>
              </div>
            </div>
          </div>

          <!-- 3. Localizations Panel -->
          <div class="segment-card">
            <div class="segment-card-header">
              <span class="segment-title">Localizations</span>
              <span class="segment-pill orange">972 users</span>
            </div>
            <div class="loc-list">
              <div class="loc-item">
                <div class="loc-name-wrap">
                  <div class="flag-icon us-flag"></div>
                  <span>United States</span>
                </div>
                <span class="loc-count">450</span>
              </div>
              <div class="loc-item">
                <div class="loc-name-wrap">
                  <div class="flag-icon fr-flag"></div>
                  <span>France</span>
                </div>
                <span class="loc-count">210</span>
              </div>
              <div class="loc-item">
                <div class="loc-name-wrap">
                  <div class="flag-icon de-flag"></div>
                  <span>Germany</span>
                </div>
                <span class="loc-count">128</span>
              </div>
            </div>
          </div>

          <!-- 4. Blog Reads Panel -->
          <div class="segment-card">
            <div class="segment-card-header">
              <span class="segment-title">Blog</span>
              <span class="segment-pill green">655 reads</span>
            </div>
            <div class="blog-posts-list">
              <div class="blog-mini-card">
                <div class="blog-post-title">10 Tips for Better Analytics</div>
                <div class="blog-post-stats">
                  <span><span class="material-symbols-outlined text-[12px]">visibility</span> 320</span>
                  <span><span class="material-symbols-outlined text-[12px]">share</span> 15</span>
                </div>
              </div>
              <div class="blog-mini-card">
                <div class="blog-post-title">Q4 Market Trends Report</div>
                <div class="blog-post-stats">
                  <span><span class="material-symbols-outlined text-[12px]">visibility</span> 210</span>
                  <span><span class="material-symbols-outlined text-[12px]">share</span> 42</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Footer -->
    <div class="modal-footer">
      <button class="modal-btn-secondary" type="button" @click="handleExport">
        <span class="material-symbols-outlined text-[18px]">download</span>
        Export Data
      </button>
      <button class="modal-btn-primary" type="button" @click="handleJourneyAnalysis">
        User Journey Analysis
        <span class="material-symbols-outlined text-[18px]">arrow_forward</span>
      </button>
    </div>
  </BaseModal>
</template>

<script>
import BaseModal from './BaseModal.vue';

export default {
  name: 'ActiveUsersDetailModal',
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
      selectedRange: '30 Days'
    };
  },
  methods: {
    handleExport() {
      alert('Exporting active users data...');
    },
    handleJourneyAnalysis() {
      alert('Opening User Journey Analysis flow...');
    }
  }
};
</script>

<style scoped>
.time-range-toggle {
  display: flex;
  background-color: var(--modal-bg-subtle);
  border: 1px solid var(--modal-border);
  border-radius: 8px;
  padding: 3px;
  gap: 2px;
}

.range-pill {
  border: none;
  background: transparent;
  padding: 4px 10px;
  border-radius: 6px;
  font-size: 0.75rem;
  font-weight: 600;
  color: var(--modal-text-muted);
  cursor: pointer;
  transition: all 0.2s;
}

.range-pill.active {
  background-color: var(--modal-bg-card);
  color: var(--modal-text-title);
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
}

.user-metrics-grid {
  grid-template-columns: repeat(3, 1fr);
  margin-bottom: 24px;
}

@media (max-width: 768px) {
  .user-metrics-grid {
    grid-template-columns: 1fr;
  }
}

.card-metric-top {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.metric-icon {
  font-size: 20px;
  color: var(--modal-text-muted);
}

.metric-trend-row {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-top: 6px;
}

.trend-vs-text {
  font-size: 0.72rem;
  color: var(--modal-text-muted);
}

.ret-users-bar-wrap {
  margin-top: 8px;
}

.ret-users-bar-track {
  height: 6px;
  background-color: var(--modal-border);
  border-radius: 9999px;
  overflow: hidden;
  margin-bottom: 4px;
}

.ret-users-bar-fill {
  height: 100%;
  background-color: var(--modal-primary);
  border-radius: 9999px;
}

.ret-users-text {
  font-size: 0.72rem;
  color: var(--modal-text-muted);
  display: block;
  text-align: right;
}

/* SVG Trend Card */
.trend-svg-box {
  position: relative;
  height: 200px;
  width: 100%;
}

.active-users-svg {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  overflow: visible;
}

.chart-floating-badge {
  position: absolute;
  background-color: #0f172a;
  color: #ffffff;
  font-size: 11px;
  font-weight: 700;
  padding: 4px 8px;
  border-radius: 6px;
  transform: translate(-50%, -120%);
  pointer-events: none;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.25);
}

.badge-arrow {
  position: absolute;
  bottom: -4px;
  left: 50%;
  transform: translateX(-50%) rotate(45deg);
  width: 8px;
  height: 8px;
  background-color: #0f172a;
}

.chart-x-axis-dates {
  position: absolute;
  bottom: -22px;
  left: 0;
  right: 0;
  display: flex;
  justify-content: space-between;
  font-size: 11px;
  font-weight: 600;
  color: var(--modal-text-muted);
}

/* User Segmentation Section */
.segmentation-section {
  margin-top: 40px;
}

.segmentation-heading {
  font-size: 1.05rem;
  font-weight: 700;
  color: var(--modal-text-title);
  margin-bottom: 16px;
}

.segmentation-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 16px;
}

@media (max-width: 900px) {
  .segmentation-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 500px) {
  .segmentation-grid {
    grid-template-columns: 1fr;
  }
}

.segment-card {
  background-color: var(--modal-bg-subtle);
  border: 1px solid var(--modal-border);
  border-radius: var(--modal-radius-inner);
  padding: 16px;
}

.segment-card-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 14px;
}

.segment-title {
  font-size: 0.88rem;
  font-weight: 700;
  color: var(--modal-text-title);
}

.segment-pill {
  font-size: 0.7rem;
  font-weight: 600;
  padding: 2px 8px;
  border-radius: 9999px;
}

.segment-pill.blue {
  background-color: rgba(37, 99, 235, 0.12);
  color: #2563EB;
}

.segment-pill.purple {
  background-color: rgba(168, 85, 247, 0.12);
  color: #9333ea;
}

.segment-pill.orange {
  background-color: rgba(249, 115, 22, 0.12);
  color: #ea580c;
}

.segment-pill.green {
  background-color: rgba(16, 185, 129, 0.12);
  color: #10B981;
}

/* 1. Browsers */
.segment-bars-list {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.seg-bar-labels {
  display: flex;
  justify-content: space-between;
  font-size: 0.78rem;
  color: var(--modal-text-muted);
  margin-bottom: 4px;
}

.seg-bold {
  font-weight: 600;
  color: var(--modal-text-title);
}

.seg-track {
  height: 6px;
  background-color: var(--modal-border);
  border-radius: 9999px;
  overflow: hidden;
}

.seg-fill {
  height: 100%;
  border-radius: 9999px;
}

/* 2. Favorites */
.favorites-body {
  display: flex;
  align-items: center;
  gap: 12px;
}

.fav-ring-box {
  position: relative;
  width: 56px;
  height: 56px;
  flex-shrink: 0;
}

.fav-ring-svg {
  width: 100%;
  height: 100%;
  transform: rotate(-90deg);
}

.fav-ring-pct {
  position: absolute;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.8rem;
  font-weight: 800;
  color: #9333ea;
}

.fav-text-col {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.fav-desc {
  font-size: 0.72rem;
  color: var(--modal-text-muted);
  margin: 0;
  line-height: 1.3;
}

.fav-link {
  font-size: 0.75rem;
  font-weight: 600;
  color: var(--modal-primary);
  text-decoration: none;
}

.fav-link:hover {
  text-decoration: underline;
}

/* 3. Localizations */
.loc-list {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.loc-item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 0.78rem;
}

.loc-name-wrap {
  display: flex;
  align-items: center;
  gap: 8px;
  color: var(--modal-text-title);
  font-weight: 500;
}

.flag-icon {
  width: 18px;
  height: 12px;
  border-radius: 2px;
  box-shadow: 0 1px 2px rgba(0,0,0,0.1);
  overflow: hidden;
}

.us-flag {
  background: linear-gradient(180deg, #1d4ed8 40%, #ef4444 40%);
}

.fr-flag {
  background: linear-gradient(90deg, #1d4ed8 33%, #ffffff 33%, #ffffff 66%, #ef4444 66%);
}

.de-flag {
  background: linear-gradient(180deg, #000000 33%, #ef4444 33%, #ef4444 66%, #eab308 66%);
}

.loc-count {
  font-weight: 600;
  color: var(--modal-text-muted);
}

/* 4. Blog Posts */
.blog-posts-list {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.blog-mini-card {
  background-color: var(--modal-bg-card);
  border: 1px solid var(--modal-border);
  border-radius: 8px;
  padding: 8px 10px;
}

.blog-post-title {
  font-size: 0.75rem;
  font-weight: 600;
  color: var(--modal-text-title);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.blog-post-stats {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 0.68rem;
  color: var(--modal-text-muted);
  margin-top: 4px;
}

.blog-post-stats span {
  display: inline-flex;
  align-items: center;
  gap: 2px;
}
</style>
