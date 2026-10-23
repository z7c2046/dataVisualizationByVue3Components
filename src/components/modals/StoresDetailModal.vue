<template>
  <BaseModal :show="show" title-id="stores-modal-title" @close="$emit('close')">
    <!-- Header -->
    <div class="modal-header">
      <div class="modal-header-left">
        <div class="modal-header-icon stores-accent">
          <span class="material-symbols-outlined">storefront</span>
        </div>
        <div>
          <h2 id="stores-modal-title" class="modal-header-title">Top Stores</h2>
          <p class="modal-header-desc">Detailed performance metrics by store</p>
        </div>
      </div>
      <div class="modal-header-actions">
        <button class="modal-btn-icon close-btn" type="button" title="Close" @click="$emit('close')">
          <span class="material-symbols-outlined">close</span>
        </button>
      </div>
    </div>

    <!-- Search & Sort Controls -->
    <div class="modal-filter-bar">
      <div class="search-input-wrapper">
        <span class="material-symbols-outlined search-icon">search</span>
        <input
          v-model="searchQuery"
          type="text"
          placeholder="Search stores..."
          class="store-search-input"
        />
      </div>

      <div class="filter-spacer"></div>

      <div class="sort-by-wrap">
        <span class="sort-label">Sort by:</span>
        <select v-model="sortBy" class="modal-filter-select">
          <option value="revenue">Revenue</option>
          <option value="traffic">Traffic</option>
          <option value="conversion">Conversion</option>
        </select>
        <button class="modal-btn-icon" type="button" title="Filter" @click="toggleSortOrder">
          <span class="material-symbols-outlined">filter_list</span>
        </button>
      </div>
    </div>

    <!-- Body Scroll Content -->
    <div class="modal-body-scroll modal-custom-scroll">
      <div class="stores-accordion-list">
        <div
          v-for="store in filteredStores"
          :key="store.name"
          class="store-accordion-card"
          :class="{ 'is-expanded': expandedStore === store.name }"
        >
          <!-- Store Header Bar (Clickable to Toggle) -->
          <div class="store-row-header" @click="toggleAccordion(store.name)">
            <!-- Left Info: Rank, Logo, Name -->
            <div class="store-identity">
              <span class="store-rank" :class="{ 'top-rank': store.rank === 1 }">{{ store.rank }}</span>
              <div class="store-logo-box">
                <img :src="store.logo" :alt="store.name" class="store-img" />
              </div>
              <div>
                <h3 class="store-title">{{ store.name }}</h3>
                <p class="store-domain">{{ store.domain }}</p>
              </div>
            </div>

            <!-- Right Stats: Revenue, Traffic, Trend, Arrow -->
            <div class="store-metrics-right">
              <div class="metric-col hide-mobile">
                <span class="m-label">Revenue</span>
                <span class="m-val">${{ formatNumber(store.revenue) }}</span>
              </div>
              <div class="metric-col hide-mobile">
                <span class="m-label">Traffic</span>
                <span class="m-val">{{ store.traffic }}</span>
              </div>
              <div class="metric-col trend-col">
                <span :class="store.trend.startsWith('+') ? 'modal-badge-success' : 'modal-badge-danger'">
                  {{ store.trend }}
                  <span class="material-symbols-outlined text-[14px]">
                    {{ store.trend.startsWith('+') ? 'trending_up' : 'trending_down' }}
                  </span>
                </span>
                <span class="m-label">vs last month</span>
              </div>
              <span class="material-symbols-outlined accordion-arrow">
                {{ expandedStore === store.name ? 'expand_less' : 'expand_more' }}
              </span>
            </div>
          </div>

          <!-- Expanded Accordion Detail Body -->
          <div v-show="expandedStore === store.name" class="store-expanded-body">
            <div class="expanded-grid">
              <!-- Conversion Rate Card -->
              <div class="expanded-subcard">
                <div class="subcard-label">Conversion Rate</div>
                <div class="subcard-val-row">
                  <span class="subcard-val">{{ store.conversionRate }}%</span>
                  <div class="progress-track">
                    <div class="progress-bar" :style="{ width: store.progressWidth + '%' }"></div>
                  </div>
                </div>
              </div>

              <!-- Avg Order Value Card -->
              <div class="expanded-subcard">
                <div class="subcard-label">Avg. Order Value</div>
                <div class="subcard-val-row">
                  <span class="subcard-val">${{ store.aov }}</span>
                  <span class="modal-badge-success">{{ store.aovGrowth }}</span>
                </div>
              </div>

              <!-- Full Report Button Card -->
              <div class="expanded-subcard report-action-card" @click.stop="openReport(store)">
                <span class="report-link">
                  Full Report
                  <span class="material-symbols-outlined text-base">arrow_forward</span>
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Footer -->
    <div class="modal-footer">
      <button class="modal-btn-secondary" type="button" @click="connectStore">
        <span class="material-symbols-outlined text-[18px]">add</span>
        Connect new store
      </button>
      <button class="modal-btn-primary" type="button" @click="handleExport">
        <span class="material-symbols-outlined text-[18px]">download</span>
        Export List
      </button>
    </div>
  </BaseModal>
</template>

<script>
import BaseModal from './BaseModal.vue';
import googleLogo from '@/assets/images/dataLogo/google.png';
import youtubeLogo from '@/assets/images/dataLogo/youtube.png';
import facebookLogo from '@/assets/images/dataLogo/facebook.png';
import twitterLogo from '@/assets/images/dataLogo/twitter.png';
import amazonLogo from '@/assets/images/dataLogo/amazon.png';

export default {
  name: 'StoresDetailModal',
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
      searchQuery: '',
      sortBy: 'revenue',
      sortAsc: false,
      expandedStore: 'Google',
      stores: [
        {
          rank: 1,
          name: 'Google',
          domain: 'google.com',
          logo: googleLogo,
          revenue: 2450290,
          traffic: '45.2M',
          trend: '+12.5%',
          conversionRate: '3.2',
          progressWidth: 65,
          aov: 145,
          aovGrowth: '+5%'
        },
        {
          rank: 2,
          name: 'YouTube',
          domain: 'youtube.com',
          logo: youtubeLogo,
          revenue: 1890400,
          traffic: '32.8M',
          trend: '+8.2%',
          conversionRate: '4.1',
          progressWidth: 78,
          aov: 98,
          aovGrowth: '+4%'
        },
        {
          rank: 3,
          name: 'Facebook',
          domain: 'facebook.com',
          logo: facebookLogo,
          revenue: 980500,
          traffic: '28.4M',
          trend: '-2.4%',
          conversionRate: '2.8',
          progressWidth: 55,
          aov: 112,
          aovGrowth: '+2%'
        },
        {
          rank: 4,
          name: 'Twitter',
          domain: 'twitter.com',
          logo: twitterLogo,
          revenue: 750200,
          traffic: '15.1M',
          trend: '+5.8%',
          conversionRate: '1.9',
          progressWidth: 42,
          aov: 85,
          aovGrowth: '+1%'
        },
        {
          rank: 5,
          name: 'Amazon',
          domain: 'amazon.com',
          logo: amazonLogo,
          revenue: 620150,
          traffic: '12.9M',
          trend: '+1.5%',
          conversionRate: '5.6',
          progressWidth: 88,
          aov: 165,
          aovGrowth: '+8%'
        }
      ]
    };
  },
  computed: {
    filteredStores() {
      let list = this.stores.filter(s =>
        s.name.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
        s.domain.toLowerCase().includes(this.searchQuery.toLowerCase())
      );
      list.sort((a, b) => {
        let valA = a[this.sortBy];
        let valB = b[this.sortBy];
        if (this.sortBy === 'traffic') {
          valA = parseFloat(a.traffic);
          valB = parseFloat(b.traffic);
        } else if (this.sortBy === 'conversion') {
          valA = parseFloat(a.conversionRate);
          valB = parseFloat(b.conversionRate);
        }
        return this.sortAsc ? valA - valB : valB - valA;
      });
      return list;
    }
  },
  methods: {
    formatNumber(num) {
      return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    },
    toggleAccordion(storeName) {
      this.expandedStore = this.expandedStore === storeName ? null : storeName;
    },
    toggleSortOrder() {
      this.sortAsc = !this.sortAsc;
    },
    openReport(store) {
      alert(`Opening detailed analytics report for ${store.name}`);
    },
    connectStore() {
      alert('Connect store wizard opened');
    },
    handleExport() {
      const csv = "Rank,Store,Domain,Revenue,Traffic,Trend,Conversion,AOV\n"
        + this.stores.map(s => `${s.rank},"${s.name}","${s.domain}",${s.revenue},"${s.traffic}","${s.trend}",${s.conversionRate}%,$${s.aov}`).join("\n");
      const blob = new Blob([csv], { type: 'text/csv' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'top_stores_performance.csv';
      a.click();
      URL.revokeObjectURL(url);
    }
  }
};
</script>

<style scoped>
.search-input-wrapper {
  position: relative;
  display: inline-flex;
  align-items: center;
}

.search-icon {
  position: absolute;
  left: 12px;
  font-size: 18px;
  color: var(--modal-text-muted);
  pointer-events: none;
}

.store-search-input {
  background-color: var(--modal-bg-card);
  border: 1px solid var(--modal-border);
  border-radius: 8px;
  padding: 7px 12px 7px 36px;
  font-size: 0.85rem;
  color: var(--modal-text-body);
  outline: none;
  width: 220px;
  transition: all 0.2s;
}

.store-search-input:focus {
  border-color: var(--modal-primary);
  width: 260px;
}

.sort-by-wrap {
  display: flex;
  align-items: center;
  gap: 8px;
}

.sort-label {
  font-size: 0.8rem;
  font-weight: 500;
  color: var(--modal-text-muted);
}

.stores-accordion-list {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.store-accordion-card {
  border: 1px solid var(--modal-border);
  border-radius: var(--modal-radius-inner);
  background-color: var(--modal-bg-card);
  overflow: hidden;
  transition: all 0.2s;
}

.store-accordion-card:hover {
  border-color: rgba(41, 118, 255, 0.35);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.04);
}

.store-accordion-card.is-expanded {
  border-color: var(--modal-primary);
}

.store-row-header {
  padding: 16px 20px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  cursor: pointer;
  user-select: none;
}

.store-identity {
  display: flex;
  align-items: center;
  gap: 16px;
}

.store-rank {
  font-size: 1.1rem;
  font-weight: 700;
  color: var(--modal-text-muted);
  width: 24px;
  text-align: center;
}

.store-rank.top-rank {
  color: var(--modal-primary);
}

.store-logo-box {
  width: 42px;
  height: 42px;
  border-radius: 10px;
  background-color: var(--modal-bg-subtle);
  border: 1px solid var(--modal-border);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 6px;
  box-sizing: border-box;
}

.store-img {
  width: 100%;
  height: 100%;
  object-fit: contain;
}

.store-title {
  font-size: 0.95rem;
  font-weight: 700;
  color: var(--modal-text-title);
  margin: 0;
}

.store-domain {
  font-size: 0.78rem;
  color: var(--modal-text-muted);
  margin-top: 2px;
}

.store-metrics-right {
  display: flex;
  align-items: center;
  gap: 24px;
}

.metric-col {
  text-align: right;
  display: flex;
  flex-direction: column;
  gap: 2px;
}

.m-label {
  font-size: 0.72rem;
  color: var(--modal-text-muted);
}

.m-val {
  font-size: 0.9rem;
  font-weight: 600;
  color: var(--modal-text-title);
}

.trend-col {
  align-items: flex-end;
}

.accordion-arrow {
  color: var(--modal-text-muted);
  transition: transform 0.2s;
}

.store-expanded-body {
  padding: 16px 20px 20px;
  border-top: 1px solid var(--modal-border);
  background-color: var(--modal-bg-subtle);
}

.expanded-grid {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  gap: 16px;
}

@media (max-width: 650px) {
  .expanded-grid {
    grid-template-columns: 1fr;
  }
}

.expanded-subcard {
  background-color: var(--modal-bg-card);
  border: 1px solid var(--modal-border);
  border-radius: 10px;
  padding: 14px;
}

.subcard-label {
  font-size: 0.75rem;
  color: var(--modal-text-muted);
  margin-bottom: 8px;
}

.subcard-val-row {
  display: flex;
  align-items: center;
  gap: 12px;
}

.subcard-val {
  font-size: 1.25rem;
  font-weight: 700;
  color: var(--modal-text-title);
}

.progress-track {
  flex: 1;
  height: 6px;
  background-color: var(--modal-border);
  border-radius: 9999px;
  overflow: hidden;
}

.progress-bar {
  height: 100%;
  background-color: var(--modal-primary);
  border-radius: 9999px;
}

.report-action-card {
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.2s;
}

.report-action-card:hover {
  background-color: var(--modal-primary-soft);
  border-color: var(--modal-primary);
}

.report-link {
  font-size: 0.85rem;
  font-weight: 600;
  color: var(--modal-primary);
  display: inline-flex;
  align-items: center;
  gap: 6px;
}

@media (max-width: 768px) {
  .hide-mobile {
    display: none;
  }
}
</style>
