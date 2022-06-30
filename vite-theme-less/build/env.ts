import { loadEnv as _loadEnv } from "vite";

export interface IEnv {
  DEV: boolean;
  PROD: boolean;
  VITE_ENV_THEME_DEFAULT: string;
}

export const loadEnv = (options: { command: string; mode: string }) => {
  const { command, mode } = options;
  const isDev = command === "serve";
  const env: IEnv = Object.assign(
    {
      DEV: isDev,
      PROD: !isDev,
      VITE_ENV_THEME_DEFAULT: "",
    },
    _loadEnv(isDev ? "development" : "production", process.cwd(), ""),
    _loadEnv(mode, process.cwd(), "")
  );

  return env;
};
