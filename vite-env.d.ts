// vite-env.d.ts
interface ImportMetaEnv {
  VITE_BASE_URL: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
