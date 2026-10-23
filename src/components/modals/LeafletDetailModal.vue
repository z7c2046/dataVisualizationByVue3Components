<template>
  <BaseModal :show="show" title-id="leaflet-modal-title" @close="$emit('close')">
    <!-- Header -->
    <div class="modal-header">
      <div class="modal-header-left">
        <div class="modal-header-icon leaflet-accent">
          <span class="material-symbols-outlined">analytics</span>
        </div>
        <div>
          <h2 id="leaflet-modal-title" class="modal-header-title">Opening of leaflets</h2>
          <p class="modal-header-desc">Detailed performance analysis &amp; trends</p>
        </div>
      </div>
      <div class="modal-header-actions">
        <button class="modal-btn-icon" type="button" title="Download" @click="handleExport">
          <span class="material-symbols-outlined">download</span>
        </button>
        <button class="modal-btn-icon" type="button" title="Toggle Fullscreen" @click="toggleFullscreen">
          <span class="material-symbols-outlined">{{ isFullscreen ? 'fullscreen_exit' : 'fullscreen' }}</span>
        </button>
        <button class="modal-btn-icon close-btn" type="button" title="Close" @click="$emit('close')">
          <span class="material-symbols-outlined">close</span>
        </button>
      </div>
    </div>

    <!-- Filter Bar -->
    <div class="modal-filter-bar">
      <div class="filter-dropdown-wrapper">
        <select v-model="selectedLocation" class="modal-filter-select">
          <option>All Locations</option>
          <option>North America</option>
          <option>Europe</option>
          <option>Asia Pacific</option>
        </select>
        <span class="material-symbols-outlined filter-icon">public</span>
      </div>

      <div class="filter-dropdown-wrapper">
        <select v-model="selectedDevice" class="modal-filter-select">
          <option>All Devices</option>
          <option>Mobile</option>
          <option>Desktop</option>
          <option>Tablet</option>
        </select>
        <span class="material-symbols-outlined filter-icon">devices</span>
      </div>

      <div class="filter-dropdown-wrapper">
        <select v-model="selectedDateRange" class="modal-filter-select">
          <option>Last 30 Days</option>
          <option>Last 7 Days</option>
          <option>This Quarter</option>
          <option>Year to Date</option>
        </select>
        <span class="material-symbols-outlined filter-icon">calendar_today</span>
      </div>

      <div class="filter-spacer"></div>

      <!-- Benchmarks Toggle -->
      <div class="benchmarks-toggle-wrap">
        <span class="benchmarks-label">Benchmarks</span>
        <label class="switch-control">
          <input v-model="benchmarksEnabled" type="checkbox" />
          <span class="switch-slider"></span>
        </label>
      </div>
    </div>

    <!-- Body Scroll Content -->
    <div class="modal-body-scroll modal-custom-scroll">
      <!-- Main Overview & Trend Grid -->
      <div class="leaflet-top-grid">
        <!-- Left Stats (1 col) -->
        <div class="leaflet-left-stats">
          <!-- Total Openings Card -->
          <div class="total-openings-card">
            <div class="total-openings-label">Total Openings</div>
            <div class="total-openings-num">2,129,446</div>
            <div class="total-openings-badge-row">
              <span class="modal-badge-success">
                +28.7%
                <span class="material-symbols-outlined text-[13px]">trending_up</span>
              </span>
              <span class="vs-text">vs last period</span>
            </div>
          </div>

          <!-- 2 Mini Stats -->
          <div class="mini-stats-row">
            <div class="mini-stat-card">
              <div class="mini-stat-label">Avg. Duration</div>
              <div class="mini-stat-num">1m 42s</div>
            </div>
            <div class="mini-stat-card">
              <div class="mini-stat-label">Bounce Rate</div>
              <div class="mini-stat-num">34.2%</div>
            </div>
          </div>
        </div>

        <!-- Right Trend SVG Chart (3 cols) -->
        <div class="trend-analysis-card">
          <div class="trend-card-header">
            <h3 class="trend-title">Trend Analysis</h3>
            <div class="trend-legend">
              <span class="legend-item">
                <span class="legend-dot primary"></span> Current Period
              </span>
              <span v-if="benchmarksEnabled" class="legend-item">
                <span class="legend-dot dashed"></span> Industry Avg.
              </span>
            </div>
          </div>

          <div class="spline-chart-wrapper">
            <!-- Y-axis -->
            <div class="chart-y-axis-labels">
              <span>400k</span>
              <span>300k</span>
              <span>200k</span>
              <span>100k</span>
              <span>0</span>
            </div>

            <!-- SVG Graphic -->
            <div class="svg-container">
              <svg class="trend-svg" viewBox="0 0 800 280" preserveAspectRatio="none">
                <defs>
                  <linearGradient id="leafletGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stop-color="#2563EB" stop-opacity="0.28" />
                    <stop offset="100%" stop-color="#2563EB" stop-opacity="0.01" />
                  </linearGradient>
                </defs>

                <!-- Grid Horizontal Lines -->
                <line x1="0" y1="0" x2="800" y2="0" stroke="currentColor" stroke-opacity="0.08" />
                <line x1="0" y1="65" x2="800" y2="65" stroke="currentColor" stroke-opacity="0.08" />
                <line x1="0" y1="130" x2="800" y2="130" stroke="currentColor" stroke-opacity="0.08" />
                <line x1="0" y1="195" x2="800" y2="195" stroke="currentColor" stroke-opacity="0.08" />
                <line x1="0" y1="260" x2="800" y2="260" stroke="currentColor" stroke-opacity="0.12" />

                <!-- Benchmark Dashed Line (Toggled) -->
                <path
                  v-if="benchmarksEnabled"
                  d="M0,220 C100,210 200,195 300,205 S500,175 600,155 S700,140 800,130"
                  fill="none"
                  stroke="#94A3B8"
                  stroke-dasharray="6 4"
                  stroke-width="2"
                />

                <!-- Current Period Area Fill -->
                <path
                  d="M0,180 C80,160 160,200 240,130 S400,90 480,70 S640,110 720,50 L800,35 V260 H0 Z"
                  fill="url(#leafletGradient)"
                />

                <!-- Current Period Main Stroke -->
                <path
                  d="M0,180 C80,160 160,200 240,130 S400,90 480,70 S640,110 720,50 L800,35"
                  fill="none"
                  stroke="var(--modal-primary, #2563EB)"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="3"
                />

                <!-- Peak Data Point Circle & Tooltip Marker -->
                <circle cx="480" cy="70" r="5" fill="#FFFFFF" stroke="var(--modal-primary, #2563EB)" stroke-width="3" />
                <g transform="translate(480, 40)">
                  <rect x="-35" y="-26" width="70" height="22" rx="4" fill="#1E293B" />
                  <text x="0" y="-11" text-anchor="middle" fill="#FFFFFF" font-size="11" font-weight="700">
                    284,912
                  </text>
                  <path d="M-5,-4 L0,2 L5,-4 Z" fill="#1E293B" />
                </g>
              </svg>
            </div>

            <!-- X-Axis Labels -->
            <div class="chart-x-axis-labels">
              <span>Week 1</span>
              <span>Week 2</span>
              <span>Week 3</span>
              <span>Week 4</span>
              <span>Week 5</span>
              <span>Week 6</span>
              <span>Week 7</span>
              <span>Week 8</span>
            </div>
          </div>
        </div>
      </div>

      <!-- Granular Data Points Table Section -->
      <div class="granular-table-card">
        <div class="granular-header">
          <h3 class="granular-title">Granular Data Points</h3>
          <button class="export-link-btn" type="button" @click="handleExport">
            Export CSV
            <span class="material-symbols-outlined text-[16px]">download</span>
          </button>
        </div>

        <div class="modal-table-container">
          <table class="modal-table">
            <thead>
              <tr>
                <th>Leaflet Name</th>
                <th>Date</th>
                <th>Location</th>
                <th>Device Type</th>
                <th style="text-align: right">Openings</th>
                <th style="text-align: right">Engagement</th>
                <th style="text-align: center">Benchmark</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="item in pagedData" :key="item.name">
                <td style="font-weight: 600; color: var(--modal-text-title)">{{ item.name }}</td>
                <td style="color: var(--modal-text-muted)">{{ item.date }}</td>
                <td>
                  <span class="location-pill">
                    <span class="loc-dot" :style="{ backgroundColor: item.locColor }"></span>
                    {{ item.location }}
                  </span>
                </td>
                <td>
                  <span class="device-pill">
                    <span class="material-symbols-outlined text-[16px]">{{ item.deviceIcon }}</span>
                    {{ item.device }}
                  </span>
                </td>
                <td style="text-align: right; font-weight: 600">{{ item.openings }}</td>
                <td style="text-align: right; font-weight: 600; color: var(--modal-success)">{{ item.engagement }}</td>
                <td style="text-align: center">
                  <span :class="getBenchmarkBadgeClass(item.benchmark)">
                    {{ item.benchmark }}
                  </span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <!-- Table Pagination Footer -->
        <div class="table-pagination-footer">
          <span class="pagination-info">Showing 1-4 of 24 results</span>
          <div class="pagination-btns">
            <button class="modal-btn-secondary btn-sm" disabled>Previous</button>
            <button class="modal-btn-secondary btn-sm">Next</button>
          </div>
        </div>
      </div>
    </div>
  </BaseModal>
</template>

<script>
import BaseModal from './BaseModal.vue';

export default {
  name: 'LeafletDetailModal',
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
      selectedLocation: 'All Locations',
      selectedDevice: 'All Devices',
      selectedDateRange: 'Last 30 Days',
      benchmarksEnabled: true,
      isFullscreen: false,
      pagedData: [
        {
          name: "Summer Sale '24",
          date: 'Oct 24, 2023',
          location: 'North America',
          locColor: '#6366F1',
          device: 'Mobile',
          deviceIcon: 'smartphone',
          openings: '124,592',
          engagement: '4.2%',
          benchmark: 'Above Avg'
        },
        {
          name: 'Tech Week Special',
          date: 'Oct 23, 2023',
          location: 'Europe',
          locColor: '#3B82F6',
          device: 'Desktop',
          deviceIcon: 'computer',
          openings: '98,201',
          engagement: '5.8%',
          benchmark: 'Above Avg'
        },
        {
          name: 'Home & Garden',
          date: 'Oct 22, 2023',
          location: 'Asia Pacific',
          locColor: '#F97316',
          device: 'Mobile',
          deviceIcon: 'smartphone',
          openings: '85,334',
          engagement: '2.1%',
          benchmark: 'Average'
        },
        {
          name: 'Holiday Prep',
          date: 'Oct 21, 2023',
          location: 'North America',
          locColor: '#6366F1',
          device: 'Tablet',
          deviceIcon: 'tablet',
          openings: '45,100',
          engagement: '1.5%',
          benchmark: 'Below Avg'
        }
      ]
    };
  },
  methods: {
    toggleFullscreen() {
      this.isFullscreen = !this.isFullscreen;
    },
    getBenchmarkBadgeClass(status) {
      if (status === 'Above Avg') return 'benchmark-pill above';
      if (status === 'Below Avg') return 'benchmark-pill below';
      return 'benchmark-pill normal';
    },
    handleExport() {
      const csv = "Name,Date,Location,Device,Openings,Engagement,Benchmark\n"
        + this.pagedData.map(r => `"${r.name}","${r.date}","${r.location}","${r.device}",${r.openings},${r.engagement},"${r.benchmark}"`).join("\n");
      const blob = new Blob([csv], { type: 'text/csv' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'opening_of_leaflets.csv';
      a.click();
      URL.revokeObjectURL(url);
    }
  }
};
</script>

<style scoped>
.filter-dropdown-wrapper {
  position: relative;
  display: inline-flex;
  align-items: center;
}

.filter-icon {
  position: absolute;
  left: 10px;
  font-size: 18px;
  color: var(--modal-text-muted);
  pointer-events: none;
}

.modal-filter-select {
  padding-left: 34px;
}

.filter-spacer {
  flex: 1;
}

/* Benchmarks Toggle Switch */
.benchmarks-toggle-wrap {
  display: flex;
  align-items: center;
  gap: 10px;
  background-color: var(--modal-bg-card);
  padding: 4px 10px;
  border-radius: 8px;
  border: 1px solid var(--modal-border);
}

.benchmarks-label {
  font-size: 0.8rem;
  font-weight: 500;
  color: var(--modal-text-muted);
}

.switch-control {
  position: relative;
  display: inline-block;
  width: 36px;
  height: 20px;
}

.switch-control input {
  opacity: 0;
  width: 0;
  height: 0;
}

.switch-slider {
  position: absolute;
  cursor: pointer;
  inset: 0;
  background-color: var(--modal-border);
  transition: 0.25s;
  border-radius: 20px;
}

.switch-slider:before {
  position: absolute;
  content: "";
  height: 14px;
  width: 14px;
  left: 3px;
  bottom: 3px;
  background-color: white;
  transition: 0.25s;
  border-radius: 50%;
}

input:checked + .switch-slider {
  background-color: var(--modal-primary);
}

input:checked + .switch-slider:before {
  transform: translateX(16px);
}

/* Grid Layout */
.leaflet-top-grid {
  display: grid;
  grid-template-columns: 1fr 2.6fr;
  gap: 20px;
  margin-bottom: 24px;
}

@media (max-width: 900px) {
  .leaflet-top-grid {
    grid-template-columns: 1fr;
  }
}

.leaflet-left-stats {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.total-openings-card {
  background: linear-gradient(135deg, rgba(37, 99, 235, 0.08) 0%, rgba(37, 99, 235, 0.02) 100%);
  border: 1px solid rgba(37, 99, 235, 0.18);
  border-radius: var(--modal-radius-inner);
  padding: 20px;
}

.total-openings-label {
  font-size: 0.85rem;
  font-weight: 500;
  color: var(--modal-text-muted);
  margin-bottom: 6px;
}

.total-openings-num {
  font-size: 1.9rem;
  font-weight: 800;
  color: var(--modal-text-title);
  letter-spacing: -0.02em;
  margin-bottom: 8px;
}

.total-openings-badge-row {
  display: flex;
  align-items: center;
  gap: 8px;
}

.vs-text {
  font-size: 0.75rem;
  color: var(--modal-text-muted);
}

.mini-stats-row {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 12px;
}

.mini-stat-card {
  background-color: var(--modal-bg-subtle);
  border: 1px solid var(--modal-border);
  border-radius: var(--modal-radius-inner);
  padding: 14px;
}

.mini-stat-label {
  font-size: 0.75rem;
  color: var(--modal-text-muted);
  margin-bottom: 4px;
}

.mini-stat-num {
  font-size: 1.25rem;
  font-weight: 700;
  color: var(--modal-text-title);
}

/* Trend Analysis Card */
.trend-analysis-card {
  background-color: var(--modal-bg-card);
  border: 1px solid var(--modal-border);
  border-radius: var(--modal-radius-inner);
  padding: 20px;
  display: flex;
  flex-direction: column;
}

.trend-card-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 16px;
}

.trend-title {
  font-size: 1rem;
  font-weight: 600;
  color: var(--modal-text-title);
  margin: 0;
}

.trend-legend {
  display: flex;
  align-items: center;
  gap: 16px;
  font-size: 0.8rem;
  color: var(--modal-text-muted);
}

.legend-item {
  display: flex;
  align-items: center;
  gap: 6px;
}

.legend-dot.primary {
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background-color: var(--modal-primary);
}

.legend-dot.dashed {
  width: 10px;
  height: 10px;
  border-radius: 50%;
  border: 2px dashed #94a3b8;
}

/* Spline Chart Wrapper */
.spline-chart-wrapper {
  position: relative;
  height: 220px;
  width: 100%;
}

.chart-y-axis-labels {
  position: absolute;
  left: 0;
  top: 0;
  bottom: 24px;
  width: 40px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  font-size: 11px;
  font-weight: 600;
  color: var(--modal-text-muted);
}

.svg-container {
  position: absolute;
  left: 45px;
  right: 0;
  top: 0;
  bottom: 24px;
}

.trend-svg {
  width: 100%;
  height: 100%;
  overflow: visible;
}

.chart-x-axis-labels {
  position: absolute;
  left: 45px;
  right: 0;
  bottom: 0;
  height: 20px;
  display: flex;
  justify-content: space-between;
  font-size: 11px;
  font-weight: 600;
  color: var(--modal-text-muted);
}

/* Granular Table Card */
.granular-table-card {
  background-color: var(--modal-bg-card);
  border: 1px solid var(--modal-border);
  border-radius: var(--modal-radius-inner);
  overflow: hidden;
}

.granular-header {
  padding: 16px 20px;
  border-bottom: 1px solid var(--modal-border);
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.granular-title {
  font-size: 0.95rem;
  font-weight: 600;
  color: var(--modal-text-title);
  margin: 0;
}

.export-link-btn {
  display: inline-flex;
  align-items: center;
  gap: 4px;
  border: none;
  background: transparent;
  color: var(--modal-primary);
  font-size: 0.8rem;
  font-weight: 600;
  cursor: pointer;
}

.export-link-btn:hover {
  text-decoration: underline;
}

.location-pill, .device-pill {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  font-size: 0.82rem;
}

.loc-dot {
  width: 8px;
  height: 8px;
  border-radius: 50%;
}

.benchmark-pill {
  display: inline-block;
  padding: 2px 8px;
  border-radius: 4px;
  font-size: 0.72rem;
  font-weight: 600;
}

.benchmark-pill.above {
  background-color: rgba(16, 185, 129, 0.12);
  color: #10B981;
}

.benchmark-pill.normal {
  background-color: rgba(100, 116, 139, 0.12);
  color: var(--modal-text-muted);
}

.benchmark-pill.below {
  background-color: rgba(239, 68, 68, 0.12);
  color: #EF4444;
}

.table-pagination-footer {
  padding: 12px 20px;
  border-top: 1px solid var(--modal-border);
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.pagination-info {
  font-size: 0.78rem;
  color: var(--modal-text-muted);
}

.pagination-btns {
  display: flex;
  gap: 8px;
}

.btn-sm {
  padding: 4px 10px;
  font-size: 0.75rem;
}
</style>
