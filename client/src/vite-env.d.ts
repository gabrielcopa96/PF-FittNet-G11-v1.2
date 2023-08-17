/// <reference types="vite/client" />

interface ImportMetaEnv {
    readonly VITE_API_ENDPOINT: string;
    readonly VITE_POWENS_CLIENT_ID: string;
    readonly VITE_POWENS_WEBVIEW_CONNECT: string;
    readonly VITE_POWENS_WEBVIEW_MANAGER: string;
    readonly VITE_POWENS_WEBVIEW_RECONNECT_URL: string;
    readonly VITE_LOGO_URL: string;
    // more env variables...
}

interface ImportMeta {
    readonly env: ImportMetaEnv;
}
