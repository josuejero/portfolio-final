import {
  describe,
  expect,
  it,
} from 'vitest';

import {
  clamp,
  INITIAL_DEVICES,
  INITIAL_PHOTOS,
  mergeUnique,
  normalizeRotation,
  toggleValue,
} from './model';

describe('FrameCast demo model', () => {
  it('toggles selected identifiers', () => {
    expect(
      toggleValue(['a'], 'b'),
    ).toEqual([
      'a',
      'b',
    ]);

    expect(
      toggleValue(
        ['a', 'b'],
        'a',
      ),
    ).toEqual([
      'b',
    ]);
  });

  it('clamps numeric configuration values', () => {
    expect(clamp(-5, 0, 100)).toBe(0);
    expect(clamp(45, 0, 100)).toBe(45);
    expect(clamp(120, 0, 100)).toBe(100);
  });

  it('normalizes photo rotation into one turn', () => {
    expect(
      normalizeRotation(450),
    ).toBe(90);

    expect(
      normalizeRotation(-90),
    ).toBe(270);

    expect(
      normalizeRotation(360),
    ).toBe(0);
  });

  it('merges photo assignments without duplicates', () => {
    expect(
      mergeUnique(
        ['photo-a', 'photo-b'],
        ['photo-b', 'photo-c'],
      ),
    ).toEqual([
      'photo-a',
      'photo-b',
      'photo-c',
    ]);
  });

  it('keeps every initial device assignment resolvable', () => {
    const photoIds = new Set(
      INITIAL_PHOTOS.map(
        (photo) => photo.id,
      ),
    );

    for (const device of INITIAL_DEVICES) {
      for (const photoId of device.photoIds) {
        expect(
          photoIds.has(photoId),
        ).toBe(true);
      }
    }
  });

  it('preserves the verified three-frame seed configuration', () => {
    expect(
      INITIAL_DEVICES.map(
        (device) => ({
          name: device.name,
          type: device.type,
          updateFrequency:
            device.updateFrequency,
          randomOrder:
            device.randomOrder,
        }),
      ),
    ).toEqual([
      {
        name: 'My Frame 1',
        type: 'Principal',
        updateFrequency: 5,
        randomOrder: false,
      },
      {
        name: 'My Frame 2',
        type: 'Agent',
        updateFrequency: 5,
        randomOrder: false,
      },
      {
        name: 'My Frame 3',
        type: 'Agent',
        updateFrequency: 5,
        randomOrder: false,
      },
    ]);
  });
});
