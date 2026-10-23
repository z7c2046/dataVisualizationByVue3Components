<template>
  <BaseModal :show="show" title-id="pages-modal-title" @close="$emit('close')">
    <!-- Header -->
    <div class="modal-header">
      <div class="modal-header-left">
        <div class="modal-header-icon">
          <span class="material-symbols-outlined">monitoring</span>
        </div>
        <div>
          <h3 id="pages-modal-title" class="modal-header-title">Page Views Analysis</h3>
          <p class="modal-header-desc">Detailed breakdown of traffic sources and visitor behavior.</p>
        </div>
      </div>
      <div class="modal-header-actions">
        <button class="modal-btn-icon close-btn" type="button" title="Close" @click="$emit('close')">
          <span class="material-symbols-outlined">close</span>
        </button>
      </div>
    </div>

    <!-- Filter Bar -->
    <div class="modal-filter-bar">
      <div class="filter-dropdown-wrapper">
        <select v-model="selectedPeriod" class="modal-filter-select">
          <option value="30">Last 30 Days</option>
          <option value="7">Last 7 Days</option>
          <option value="90">Last 3 Months</option>
          <option value="365">This Year</option>
        </select>
        <span class="material-symbols-outlined filter-icon">calendar_today</span>
      </div>

      <div class="filter-dropdown-wrapper">
        <select v-model="selectedDemographic" class="modal-filter-select">
          <option value="all">All Demographics</option>
          <option value="na">North America</option>
          <option value="eu">Europe</option>
          <option value="apac">Asia Pacific</option>
        </select>
        <span class="material-symbols-outlined filter-icon">group</span>
      </div>

      <div class="filter-spacer"></div>

      <button class="modal-btn-primary" type="button" @click="handleExport">
        <span class="material-symbols-outlined">download</span>
        <span>Export Data</span>
      </button>
    </div>

    <!-- Body Scroll Content -->
    <div class="modal-body-scroll modal-custom-scroll">
      <!-- 4 Key Metric Cards -->
      <div class="modal-metrics-grid">
        <div class="modal-metric-card">
          <div class="modal-metric-label">Total Page Views</div>
          <div class="modal-metric-value-row">
            <span class="modal-metric-value">67.9M</span>
            <span class="modal-badge-success">+25.3%</span>
          </div>
        </div>

        <div class="modal-metric-card">
          <div class="modal-metric-label">Unique Visitors</div>
          <div class="modal-metric-value-row">
            <span class="modal-metric-value">12.4M</span>
            <span class="modal-badge-success">+14.2%</span>
          </div>
        </div>

        <div class="modal-metric-card">
          <div class="modal-metric-label">Avg. Time on Page</div>
          <div class="modal-metric-value-row">
            <span class="modal-metric-value">2m 45s</span>
            <span class="modal-badge-danger">-1.2%</span>
          </div>
        </div>

        <div class="modal-metric-card">
          <div class="modal-metric-label">Bounce Rate</div>
          <div class="modal-metric-value-row">
            <span class="modal-metric-value">42.8%</span>
            <span class="modal-badge-success">-3.5%</span>
          </div>
        </div>
      </div>

      <!-- Traffic Trends Chart Section -->
      <div class="chart-section-card">
        <div class="chart-section-header">
          <h4 class="chart-title">Traffic Trends</h4>
          <div class="chart-legend">
            <span class="legend-item">
              <span class="legend-dot primary"></span> Current Period
            </span>
            <span class="legend-item">
              <span class="legend-dot muted"></span> Previous Period
            </span>
          </div>
        </div>

        <!-- Custom Responsive Bar Chart -->
        <div class="bar-chart-container">
          <!-- Background Grid Guidelines -->
          <div class="chart-grid-lines">
            <div class="grid-line"></div>
            <div class="grid-line"></div>
            <div class="grid-line"></div>
            <div class="grid-line"></div>
            <div class="grid-line base"></div>
          </div>

          <!-- Y-Axis Labels -->
          <div class="chart-y-axis">
            <span>80M</span>
            <span>60M</span>
            <span>40M</span>
            <span>20M</span>
            <span>0</span>
          </div>

          <!-- Interactive Bar Columns -->
          <div class="chart-bars-wrap">
            <div
              v-for="(bar, index) in trendBars"
              :key="index"
              class="bar-column-group"
              @mouseenter="hoveredIndex = index"
              @mouseleave="hoveredIndex = null"
            >
              <!-- Bar Pillar -->
              <div
                class="bar-pillar"
                :style="{ height: bar.height + '%' }"
              >
                <!-- Tooltip -->
                <div class="bar-tooltip" :class="{ 'tooltip-visible': hoveredIndex === index }">
                  {{ bar.value }}
                </div>
              </div>
            </div>
          </div>

          <!-- X-Axis Labels -->
          <div class="chart-x-axis">
            <span v-for="d in xDates" :key="d">{{ d }}</span>
          </div>
        </div>
      </div>

      <!-- Top Pages Performance Table Section -->
      <div class="table-section-card">
        <h4 class="table-title">Top Pages Performance</h4>
        <div class="modal-table-container">
          <table class="modal-table">
            <thead>
              <tr>
                <th style="width: 40%">Page Name</th>
                <th style="text-align: right; width: 20%">Views</th>
                <th style="text-align: right; width: 20%">Trend</th>
                <th style="text-align: right; width: 20%">Conversion</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="row in pageRows" :key="row.name">
                <td class="page-name-cell">
                  <span class="page-url">{{ row.name }}</span>
                </td>
                <td style="text-align: right; font-weight: 600">{{ row.views }}</td>
                <td style="text-align: right">
                  <span :class="row.trend.startsWith('+') ? 'modal-badge-success' : 'modal-badge-danger'">
                    {{ row.trend }}
                  </span>
                </td>
                <td style="text-align: right; color: var(--modal-text-muted)">{{ row.conversion }}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </BaseModal>
</template>

<script>
import BaseModal from './BaseModal.vue';

export default {
  name: 'PagesViewDetailModal',
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
      selectedPeriod: '30',
      selectedDemographic: 'all',
      hoveredIndex: null,
      xDates: ['01', '03', '05', '07', '09', '11', '13', '15', '17', '19', '21', '23', '25', '27', '29'],
      trendBars: [
        { height: 40, value: '32M' },
        { height: 60, value: '48M' },
        { height: 30, value: '24M' },
        { height: 20, value: '16M' },
        { height: 50, value: '40M' },
        { height: 80, value: '64M' },
        { height: 40, value: '32M' },
        { height: 25, value: '20M' },
        { height: 35, value: '28M' },
        { height: 65, value: '52M' },
        { height: 55, value: '44M' },
        { height: 70, value: '56M' },
        { height: 45, value: '36M' },
        { height: 55, value: '44M' },
        { height: 60, value: '48M' }
      ],
      pageRows: [
        { name: '/home', views: '12,405,920', trend: '+12%', conversion: '4.2%' },
        { name: '/products/dashboard-kit', views: '8,203,112', trend: '+8.5%', conversion: '12.8%' },
        { name: '/blog/analytics-tips', views: '5,901,440', trend: '-2.1%', conversion: '1.5%' }
      ]
    };
  },
  methods: {
    handleExport() {
      // Mock CSV export
      const csvContent = "data:text/csv;charset=utf-8," 
        + "Page,Views,Trend,Conversion\n"
        + this.pageRows.map(e => `"${e.name}",${e.views},${e.trend},${e.conversion}`).join("\n");
      const encodedUri = encodeURI(csvContent);
      const link = document.createElement("a");
      link.setAttribute("href", encodedUri);
      link.setAttribute("download", "page_views_analysis.csv");
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
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

.chart-section-card {
  background-color: var(--modal-bg-card);
  border: 1px solid var(--modal-border);
  border-radius: var(--modal-radius-inner);
  padding: 20px;
  margin-bottom: 24px;
}

.chart-section-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 16px;
}

.chart-title {
  font-size: 1rem;
  font-weight: 600;
  color: var(--modal-text-title);
  margin: 0;
}

.chart-legend {
  display: flex;
  align-items: center;
  gap: 14px;
  font-size: 0.78rem;
  color: var(--modal-text-muted);
}

.legend-item {
  display: flex;
  align-items: center;
  gap: 6px;
}

.legend-dot {
  width: 8px;
  height: 8px;
  border-radius: 50%;
}

.legend-dot.primary {
  background-color: var(--modal-primary);
}

.legend-dot.muted {
  background-color: var(--modal-border);
}

/* Bar Chart styling */
.bar-chart-container {
  position: relative;
  height: 250px;
  width: 100%;
}

.chart-grid-lines {
  position: absolute;
  inset: 0;
  left: 45px;
  bottom: 24px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  pointer-events: none;
}

.grid-line {
  width: 100%;
  border-top: 1px dashed var(--modal-border);
}

.grid-line.base {
  border-top: 1px solid var(--modal-border);
}

.chart-y-axis {
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
  text-align: right;
  padding-right: 8px;
  box-sizing: border-box;
}

.chart-bars-wrap {
  position: absolute;
  left: 48px;
  right: 0;
  top: 0;
  bottom: 24px;
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  gap: 6px;
  padding: 0 4px;
  box-sizing: border-box;
}

.bar-column-group {
  position: relative;
  flex: 1;
  height: 100%;
  display: flex;
  align-items: flex-end;
  justify-content: center;
  cursor: pointer;
}

.bar-pillar {
  width: 80%;
  max-width: 28px;
  background-color: var(--modal-primary);
  opacity: 0.85;
  border-radius: 4px 4px 0 0;
  transition: opacity 0.2s, transform 0.2s, background-color 0.2s;
  position: relative;
}

.bar-column-group:hover .bar-pillar {
  opacity: 1;
  transform: scaleY(1.02);
  background-color: var(--modal-primary-hover);
}

.bar-tooltip {
  position: absolute;
  top: -32px;
  left: 50%;
  transform: translateX(-50%);
  background-color: #0f172a;
  color: #ffffff;
  font-size: 11px;
  font-weight: 600;
  padding: 3px 6px;
  border-radius: 4px;
  white-space: nowrap;
  pointer-events: none;
  opacity: 0;
  transition: opacity 0.2s;
  box-shadow: 0 4px 8px rgba(0,0,0,0.2);
}

.bar-tooltip.tooltip-visible {
  opacity: 1;
}

.chart-x-axis {
  position: absolute;
  left: 48px;
  right: 0;
  bottom: 0;
  height: 20px;
  display: flex;
  justify-content: space-between;
  font-size: 10px;
  font-weight: 600;
  color: var(--modal-text-muted);
  padding: 0 4px;
  box-sizing: border-box;
}

/* Table Section */
.table-section-card {
  margin-top: 24px;
}

.table-title {
  font-size: 1rem;
  font-weight: 600;
  color: var(--modal-text-title);
  margin-bottom: 12px;
}

.page-name-cell {
  font-weight: 500;
  color: var(--modal-text-title);
}

.page-url {
  font-family: monospace;
  font-size: 0.85rem;
}
</style>
