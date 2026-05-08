<script setup lang="ts">
import { computed, ref } from "vue";

import { usePwaInstall } from "@/hooks";

/** PWA状态日志 */
const pwaLogs = ref<string[]>([]);

const { isInstallable, isInstalled, isInstalling, install } = usePwaInstall({
  onReady: () => {
    pwaLogs.value.unshift("收到 beforeinstallprompt");
  },
  onInstalled: () => {
    pwaLogs.value.unshift("收到 appinstalled");
  },
  onAccepted: () => {
    pwaLogs.value.unshift("收到 onAccepted 回调");
  },
  onDismissed: () => {
    pwaLogs.value.unshift("收到 onDismissed 回调");
  },
});

const finalStatusText = computed(() => {
  if (isInstalled.value) {
    return "已安装";
  }

  if (isInstalling.value) {
    return "安装进行中";
  }

  if (isInstallable.value) {
    return "可安装";
  }

  return "暂不可安装（等待触发 beforeinstallprompt）";
});

const handleInstall = async () => {
  const accepted = await install();

  if (!accepted) {
    pwaLogs.value.unshift("本次未完成安装");
  }
};
</script>

<template>
  <div class="home">
    <div class="card">
      <div class="title">PWA 状态与回调</div>

      <div class="status-row">
        <span class="label">当前状态：</span>
        <span class="value">{{ finalStatusText }}</span>
      </div>

      <div class="status-row">
        <span class="label">原始可安装状态：</span>
        <span class="value">{{ isInstallable ? "是" : "否" }}</span>
      </div>

      <div class="status-row">
        <span class="label">原始已安装状态：</span>
        <span class="value">{{ isInstalled ? "是" : "否" }}</span>
      </div>

      <div class="status-row">
        <span class="label">安装中：</span>
        <span class="value">{{ isInstalling ? "是" : "否" }}</span>
      </div>

      <div class="actions">
        <button class="btn primary" :disabled="!isInstallable || isInstalling" @click="handleInstall">
          触发安装
        </button>
      </div>

      <div class="log-wrap">
        <div class="log-title">事件日志</div>
        <div v-if="pwaLogs.length === 0" class="log-empty">暂无日志</div>
        <div v-for="(item, index) in pwaLogs" :key="`${item}-${index}`" class="log-item">
          {{ item }}
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="less">
.home {
  position: relative;
  display: flex;
  justify-content: center;
  padding: 24px;

  > .card {
    width: 100%;
    max-width: 640px;
    border: 1px solid #d8dee9;
    border-radius: 12px;
    background: linear-gradient(180deg, #f8fbff 0%, #ffffff 100%);
    padding: 20px;

    > .title {
      font-size: 20px;
      font-weight: bold;
      color: #1f2937;
      margin-bottom: 16px;
    }

    > .status-row {
      display: flex;
      margin-bottom: 10px;

      > .label {
        width: 140px;
        color: #4b5563;
      }

      > .value {
        color: #111827;
      }
    }

    > .actions {
      display: flex;
      margin-top: 12px;
      margin-bottom: 14px;

      > .btn {
        border: 1px solid #d1d5db;
        background-color: #ffffff;
        border-radius: 8px;
        padding: 8px 14px;
        cursor: pointer;
        color: #111827;
      }

      > .btn:disabled {
        cursor: not-allowed;
        color: #9ca3af;
        background-color: #f3f4f6;
      }

      > .primary {
        border-color: #2563eb;
        background-color: #2563eb;
        color: #ffffff;
      }
    }

    > .log-wrap {
      border: 1px solid #e5e7eb;
      border-radius: 8px;
      background-color: #ffffff;
      padding: 10px;

      > .log-title {
        font-weight: bold;
        color: #374151;
        margin-bottom: 8px;
      }

      > .log-empty {
        color: #6b7280;
      }

      > .log-item {
        color: #111827;
      }

      > .log-item + .log-item {
        margin-top: 6px;
      }
    }
  }
}
</style>
