interface ImportMetaEnv {
  /** 是否打包清除打印及debug */
  VITE_CLEAR_LOG: string;
  VITE_RESOURSE_VERSION: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
