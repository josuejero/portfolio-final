'use client';

import {
  useMemo,
  useState,
} from 'react';

import DeviceEditorDemo from './framecast/DeviceEditorDemo';
import PhotoEditorDemo from './framecast/PhotoEditorDemo';
import {
  clamp,
  INITIAL_DEVICES,
  INITIAL_PHOTOS,
  mergeUnique,
  normalizeRotation,
  toggleValue,
  type DemoDevice,
  type DemoMode,
  type DemoPhoto,
} from './framecast/model';

export default function FrameCastDemo() {
  const [mode, setMode] =
    useState<DemoMode>('devices');

  const [photos, setPhotos] =
    useState<DemoPhoto[]>([
      ...INITIAL_PHOTOS,
    ]);

  const [devices, setDevices] =
    useState<DemoDevice[]>([
      ...INITIAL_DEVICES.map((device) => ({
        ...device,
        photoIds: [...device.photoIds],
      })),
    ]);

  const [selectedPhotoIds, setSelectedPhotoIds] =
    useState<string[]>([]);

  const [targetDeviceIds, setTargetDeviceIds] =
    useState<string[]>([]);

  const [activeDeviceId, setActiveDeviceId] =
    useState(INITIAL_DEVICES[0].id);

  const [activePhotoId, setActivePhotoId] =
    useState(INITIAL_PHOTOS[0].id);

  const [
    assignedPreviewPhotoId,
    setAssignedPreviewPhotoId,
  ] = useState(
    INITIAL_DEVICES[0].photoIds[0],
  );

  const [deviceFrequency, setDeviceFrequency] =
    useState(
      String(
        INITIAL_DEVICES[0].updateFrequency,
      ),
    );

  const [
    deviceRandomOrder,
    setDeviceRandomOrder,
  ] = useState(
    INITIAL_DEVICES[0].randomOrder,
  );

  const [status, setStatus] = useState(
    'Changes stay inside this browser simulation.',
  );

  const activeDevice = useMemo(
    () =>
      devices.find(
        (device) =>
          device.id === activeDeviceId,
      ),
    [activeDeviceId, devices],
  );

  const activePhoto = useMemo(
    () =>
      photos.find(
        (photo) =>
          photo.id === activePhotoId,
      ),
    [activePhotoId, photos],
  );

  const assignedPhotos = useMemo(
    () =>
      activeDevice
        ? activeDevice.photoIds
            .map((photoId) =>
              photos.find(
                (photo) =>
                  photo.id === photoId,
              ),
            )
            .filter(
              (
                photo,
              ): photo is DemoPhoto =>
                Boolean(photo),
            )
        : [],
    [activeDevice, photos],
  );

  const assignedPreviewPhoto =
    assignedPhotos.find(
      (photo) =>
        photo.id ===
        assignedPreviewPhotoId,
    ) ?? assignedPhotos[0];

  const selectActiveDevice = (
    deviceId: string,
  ) => {
    const next = devices.find(
      (device) =>
        device.id === deviceId,
    );

    if (!next) {
      return;
    }

    setActiveDeviceId(deviceId);
    setDeviceFrequency(
      String(next.updateFrequency),
    );
    setDeviceRandomOrder(
      next.randomOrder,
    );
    setAssignedPreviewPhotoId(
      next.photoIds[0] ?? '',
    );
    setStatus(
      `Loaded ${next.name} configuration.`,
    );
  };

  const addPhotosToDevices = () => {
    if (
      selectedPhotoIds.length === 0 ||
      targetDeviceIds.length === 0
    ) {
      setStatus(
        'Select at least one photo and one target device.',
      );
      return;
    }

    setDevices((current) =>
      current.map((device) => {
        if (
          !targetDeviceIds.includes(
            device.id,
          )
        ) {
          return device;
        }

        return {
          ...device,
          photoIds: mergeUnique(
            device.photoIds,
            selectedPhotoIds,
          ),
        };
      }),
    );

    if (
      targetDeviceIds.includes(
        activeDeviceId,
      ) &&
      !assignedPreviewPhotoId
    ) {
      setAssignedPreviewPhotoId(
        selectedPhotoIds[0],
      );
    }

    setStatus(
      `Assigned ${selectedPhotoIds.length} photo${selectedPhotoIds.length === 1 ? '' : 's'} to ${targetDeviceIds.length} device${targetDeviceIds.length === 1 ? '' : 's'}.`,
    );
  };

  const saveDeviceConfig = () => {
    const frequency = clamp(
      Number(deviceFrequency) || 0,
      0,
      999,
    );

    setDevices((current) =>
      current.map((device) =>
        device.id === activeDeviceId
          ? {
              ...device,
              updateFrequency: frequency,
              randomOrder:
                deviceRandomOrder,
            }
          : device,
      ),
    );

    setDeviceFrequency(
      String(frequency),
    );

    setStatus(
      `Saved ${activeDevice?.name ?? 'device'} configuration to local simulation state.`,
    );
  };

  const updateActivePhoto = (
    updates: Partial<DemoPhoto>,
  ) => {
    setPhotos((current) =>
      current.map((photo) =>
        photo.id === activePhotoId
          ? {
              ...photo,
              ...updates,
            }
          : photo,
      ),
    );
  };

  const rotatePhoto = (
    amount: number,
  ) => {
    if (!activePhoto) {
      return;
    }

    const rotation =
      normalizeRotation(
        activePhoto.rotation + amount,
      );

    updateActivePhoto({
      rotation,
    });

    setStatus(
      `Rotated ${activePhoto.name} to ${rotation}°.`,
    );
  };

  return (
    <div className="rounded-panel border border-border/60 bg-card/60 p-5 shadow-soft">
      <div
        className="flex flex-wrap gap-2"
        role="group"
        aria-label="FrameCast simulator mode"
      >
        <button
          type="button"
          aria-pressed={
            mode === 'devices'
          }
          onClick={() =>
            setMode('devices')
          }
          className={`rounded-control border px-3 py-2 text-sm font-medium transition-colors duration-fast ${
            mode === 'devices'
              ? 'border-brand bg-brand/10 text-brand'
              : 'border-border bg-surface text-muted-foreground hover:text-foreground'
          }`}
        >
          Device editor
        </button>

        <button
          type="button"
          aria-pressed={
            mode === 'photos'
          }
          onClick={() =>
            setMode('photos')
          }
          className={`rounded-control border px-3 py-2 text-sm font-medium transition-colors duration-fast ${
            mode === 'photos'
              ? 'border-brand bg-brand/10 text-brand'
              : 'border-border bg-surface text-muted-foreground hover:text-foreground'
          }`}
        >
          Photo editor
        </button>
      </div>

      {mode === 'devices' ? (
        <DeviceEditorDemo
          photos={photos}
          selectedPhotoIds={
            selectedPhotoIds
          }
          onTogglePhoto={(photoId) =>
            setSelectedPhotoIds(
              (current) =>
                toggleValue(
                  current,
                  photoId,
                ),
            )
          }
          devices={devices}
          targetDeviceIds={
            targetDeviceIds
          }
          onToggleTargetDevice={(
            deviceId,
          ) =>
            setTargetDeviceIds(
              (current) =>
                toggleValue(
                  current,
                  deviceId,
                ),
            )
          }
          onAddPhotos={
            addPhotosToDevices
          }
          activeDeviceId={
            activeDeviceId
          }
          onSelectActiveDevice={
            selectActiveDevice
          }
          deviceFrequency={
            deviceFrequency
          }
          onDeviceFrequencyChange={
            setDeviceFrequency
          }
          deviceRandomOrder={
            deviceRandomOrder
          }
          onDeviceRandomOrderChange={
            setDeviceRandomOrder
          }
          onSaveDeviceConfig={
            saveDeviceConfig
          }
          assignedPhotos={
            assignedPhotos
          }
          assignedPreviewPhoto={
            assignedPreviewPhoto
          }
          onSelectAssignedPreview={
            setAssignedPreviewPhotoId
          }
        />
      ) : (
        <PhotoEditorDemo
          photos={photos}
          activePhotoId={
            activePhotoId
          }
          activePhoto={activePhoto}
          onSelectPhoto={(photoId) => {
            setActivePhotoId(
              photoId,
            );

            const photo =
              photos.find(
                (candidate) =>
                  candidate.id ===
                  photoId,
              );

            if (photo) {
              setStatus(
                `Loaded ${photo.name}.`,
              );
            }
          }}
          onRotatePhoto={
            rotatePhoto
          }
          onUpdatePhoto={
            updateActivePhoto
          }
          onSavePhotoConfig={() => {
            if (!activePhoto) {
              return;
            }

            setStatus(
              `Saved ${activePhoto.name} display configuration to local simulation state.`,
            );
          }}
        />
      )}

      <div
        aria-live="polite"
        className="mt-5 border-t border-border/60 pt-4 text-xs text-muted-foreground"
      >
        {status}
      </div>
    </div>
  );
}
