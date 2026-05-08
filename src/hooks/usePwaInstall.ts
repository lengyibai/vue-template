import { computed, onBeforeUnmount, onMounted, ref } from "vue";

interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>;
  userChoice: Promise<{
    outcome: "accepted" | "dismissed";
    platform: string;
  }>;
}

/** @description PWA安装状态监听参数 */
interface UsePwaInstallOptions {
  /** 可触发安装时回调 */
  onReady?: () => void;
  /** 安装完成时回调 */
  onInstalled?: () => void;
  /** 用户确认安装时回调 */
  onAccepted?: () => void;
  /** 用户取消安装时回调 */
  onDismissed?: () => void;
}

/** @description PWA安装能力hooks */
export const usePwaInstall = (options: UsePwaInstallOptions = {}) => {
  /** 安装提示事件 */
  const installPromptEvent = ref<BeforeInstallPromptEvent>();
  /** 是否可安装 */
  const isInstallable = computed(() => !!installPromptEvent.value);
  /** 是否已安装 */
  const isInstalled = ref(false);
  /** 是否正在安装 */
  const isInstalling = ref(false);
  const displayModeMediaQuery = window.matchMedia("(display-mode: standalone)") as any;

  const handleBeforeInstallPrompt = (event: Event) => {
    event.preventDefault();
    installPromptEvent.value = event as BeforeInstallPromptEvent;
    options.onReady?.();
  };

  const handleAppInstalled = () => {
    isInstalled.value = true;
    installPromptEvent.value = undefined;
    options.onInstalled?.();
  };

  const updateInstalledState = () => {
    const isStandaloneMode = displayModeMediaQuery.matches;
    const isIosStandalone = Boolean((window.navigator as Navigator & { standalone?: boolean }).standalone);
    const isTwa = document.referrer.startsWith("android-app://");
    isInstalled.value = isStandaloneMode || isIosStandalone || isTwa;
  };

  const install = async () => {
    if (!installPromptEvent.value || isInstalling.value) {
      return false;
    }

    isInstalling.value = true;

    try {
      await installPromptEvent.value.prompt();
      const choiceResult = await installPromptEvent.value.userChoice;
      const accepted = choiceResult.outcome === "accepted";

      if (accepted) {
        options.onAccepted?.();
        updateInstalledState();
      } else {
        options.onDismissed?.();
      }

      installPromptEvent.value = undefined;
      return accepted;
    } finally {
      isInstalling.value = false;
    }
  };

  onMounted(() => {
    updateInstalledState();

    window.addEventListener("beforeinstallprompt", handleBeforeInstallPrompt);
    window.addEventListener("appinstalled", handleAppInstalled);
    window.addEventListener("pageshow", updateInstalledState);
    document.addEventListener("visibilitychange", updateInstalledState);
    if ("addEventListener" in displayModeMediaQuery) {
      displayModeMediaQuery.addEventListener("change", updateInstalledState);
    } else {
      displayModeMediaQuery.addListener(updateInstalledState);
    }
  });

  onBeforeUnmount(() => {
    window.removeEventListener("beforeinstallprompt", handleBeforeInstallPrompt);
    window.removeEventListener("appinstalled", handleAppInstalled);
    window.removeEventListener("pageshow", updateInstalledState);
    document.removeEventListener("visibilitychange", updateInstalledState);
    if ("removeEventListener" in displayModeMediaQuery) {
      displayModeMediaQuery.removeEventListener("change", updateInstalledState);
    } else {
      displayModeMediaQuery.removeListener(updateInstalledState);
    }
  });

  return {
    isInstallable,
    isInstalled,
    isInstalling,
    install,
  };
};
