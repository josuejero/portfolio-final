export type DemoMode =
  | 'devices'
  | 'photos';

export interface DemoPhoto {
  id: string;
  name: string;
  rotation: number;
  scaling: number;
  x: number;
  y: number;
  width: number;
  height: number;
}

export interface DemoDevice {
  id: string;
  name: string;
  type: 'Principal' | 'Agent';
  updateFrequency: number;
  randomOrder: boolean;
  photoIds: string[];
}

export const INITIAL_PHOTOS: readonly DemoPhoto[] = [
  {
    id: 'mpBSMKE4D8.jpg',
    name: 'mpBSMKE4D8.jpg',
    rotation: 0,
    scaling: 60,
    x: 50,
    y: 50,
    width: 70,
    height: 70,
  },
  {
    id: 'Pkroj66an4.jpg',
    name: 'Pkroj66an4.jpg',
    rotation: 0,
    scaling: 75,
    x: 50,
    y: 50,
    width: 70,
    height: 70,
  },
  {
    id: 'fS62c2xUWT.jpg',
    name: 'fS62c2xUWT.jpg',
    rotation: 0,
    scaling: 75,
    x: 50,
    y: 50,
    width: 70,
    height: 70,
  },
  {
    id: 'FvcNHSlZ7N.jpg',
    name: 'FvcNHSlZ7N.jpg',
    rotation: 0,
    scaling: 75,
    x: 50,
    y: 50,
    width: 70,
    height: 70,
  },
  {
    id: 'VMNx4GiCdR.jpg',
    name: 'VMNx4GiCdR.jpg',
    rotation: 0,
    scaling: 75,
    x: 50,
    y: 50,
    width: 70,
    height: 70,
  },
  {
    id: 'iCX17AHy6U.jpg',
    name: 'iCX17AHy6U.jpg',
    rotation: 0,
    scaling: 75,
    x: 50,
    y: 50,
    width: 70,
    height: 70,
  },
  {
    id: 'JFXmfbO2Us.jpg',
    name: 'JFXmfbO2Us.jpg',
    rotation: 0,
    scaling: 75,
    x: 50,
    y: 50,
    width: 70,
    height: 70,
  },
  {
    id: 'pVjzOkvFUI.jpg',
    name: 'pVjzOkvFUI.jpg',
    rotation: 0,
    scaling: 40,
    x: 50,
    y: 50,
    width: 70,
    height: 70,
  },
  {
    id: 'kIq6e2IxYh.jpg',
    name: 'kIq6e2IxYh.jpg',
    rotation: 0,
    scaling: 40,
    x: 50,
    y: 50,
    width: 70,
    height: 70,
  },
];

export const INITIAL_DEVICES: readonly DemoDevice[] = [
  {
    id: 'frame-1',
    name: 'My Frame 1',
    type: 'Principal',
    updateFrequency: 5,
    randomOrder: false,
    photoIds: [
      'mpBSMKE4D8.jpg',
      'Pkroj66an4.jpg',
      'fS62c2xUWT.jpg',
    ],
  },
  {
    id: 'frame-2',
    name: 'My Frame 2',
    type: 'Agent',
    updateFrequency: 5,
    randomOrder: false,
    photoIds: [
      'FvcNHSlZ7N.jpg',
      'VMNx4GiCdR.jpg',
      'iCX17AHy6U.jpg',
    ],
  },
  {
    id: 'frame-3',
    name: 'My Frame 3',
    type: 'Agent',
    updateFrequency: 5,
    randomOrder: false,
    photoIds: [
      'JFXmfbO2Us.jpg',
      'pVjzOkvFUI.jpg',
      'kIq6e2IxYh.jpg',
    ],
  },
];

export function toggleValue(
  values: readonly string[],
  value: string,
): string[] {
  return values.includes(value)
    ? values.filter((item) => item !== value)
    : [...values, value];
}

export function clamp(
  value: number,
  minimum: number,
  maximum: number,
): number {
  return Math.min(
    maximum,
    Math.max(minimum, value),
  );
}

export function normalizeRotation(
  value: number,
): number {
  return ((value % 360) + 360) % 360;
}

export function mergeUnique(
  current: readonly string[],
  additions: readonly string[],
): string[] {
  return Array.from(
    new Set([
      ...current,
      ...additions,
    ]),
  );
}
