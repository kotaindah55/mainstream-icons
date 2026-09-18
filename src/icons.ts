import $LucideIcons from 'lucide-static/icon-nodes.json';
import $LucideLabIcons from '@lucide/lab/icon-nodes.json';
import type { IconData } from './types';

export const LucideIcons = $LucideIcons as unknown as Record<string, IconData>;
export const LucideLabIcons = $LucideLabIcons as unknown as Record<string, IconData>;