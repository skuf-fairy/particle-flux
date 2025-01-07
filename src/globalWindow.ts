export type GlobalWindow = Window & typeof globalThis;

export const globalWindow: GlobalWindow | null = window || null;
