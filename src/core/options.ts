export interface CreateSvgShardsOptions {
    /** Enable MutationObserver auto-refresh (default: false) */
    observe?: boolean;
    /** Debounce interval for observer-triggered refresh in ms (default: 16) */
    observeDebounceMs?: number;
}

export interface AutoRefreshOptions {
    debounceMs?: number;
}
