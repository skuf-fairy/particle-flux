import {GlobalWindow} from './types';

export const globalWindow: GlobalWindow | null = globalThis.window || null;
