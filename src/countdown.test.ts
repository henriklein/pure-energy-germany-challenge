import { describe, it, expect } from 'vitest';
import { formatCountdown } from './countdown';

describe('formatCountdown', () => {
  it('formats countdown before 14:45', () => {
    const date = new Date('2024-01-01T14:44:30');
    expect(formatCountdown(date)).toBe('00:00:30');
  });

  it('rolls to next day after 14:45', () => {
    const date = new Date('2024-01-01T15:00:00');
    expect(formatCountdown(date)).toBe('23:45:00');
  });
});
