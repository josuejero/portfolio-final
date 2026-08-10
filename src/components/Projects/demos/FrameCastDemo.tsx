'use client';

import {
  useMemo,
  useState,
} from 'react';

import PhotoPreview from './framecast/PhotoPreview';
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
        role="tablist"
        aria-label="FrameCast simulator mode"
      >
        <button
          type="button"
          role="tab"
          aria-selected={
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
          role="tab"
          aria-selected={
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
        <div className="mt-6 grid gap-6 xl:grid-cols-[1fr_1fr_1.2fr]">
          <fieldset className="space-y-3">
            <legend className="text-sm font-semibold text-foreground">
              Photos
            </legend>

            <div className="space-y-2">
              {photos.map((photo) => (
                <label
                  key={photo.id}
                  className="flex items-center gap-2 rounded-control border border-border/60 bg-surface/60 px-3 py-2 text-xs"
                >
                  <input
                    type="checkbox"
                    checked={selectedPhotoIds.includes(
                      photo.id,
                    )}
                    onChange={() =>
                      setSelectedPhotoIds(
                        (current) =>
                          toggleValue(
                            current,
                            photo.id,
                          ),
                      )
                    }
                  />

                  <span className="min-w-0 truncate">
                    {photo.name}
                  </span>
                </label>
              ))}
            </div>
          </fieldset>

          <fieldset className="space-y-3">
            <legend className="text-sm font-semibold text-foreground">
              Target devices
            </legend>

            <div className="space-y-2">
              {devices.map((device) => (
                <label
                  key={device.id}
                  className="flex items-center justify-between gap-3 rounded-control border border-border/60 bg-surface/60 px-3 py-2 text-xs"
                >
                  <span className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      checked={targetDeviceIds.includes(
                        device.id,
                      )}
                      onChange={() =>
                        setTargetDeviceIds(
                          (current) =>
                            toggleValue(
                              current,
                              device.id,
                            ),
                        )
                      }
                    />

                    {device.name}
                  </span>

                  <span className="text-muted-foreground">
                    {device.type}
                  </span>
                </label>
              ))}
            </div>

            <button
              type="button"
              onClick={
                addPhotosToDevices
              }
              className="w-full rounded-control bg-brand px-3 py-2 text-sm font-semibold text-brand-foreground transition-colors duration-fast hover:bg-brand-hover"
            >
              Add photos to devices
            </button>
          </fieldset>

          <div className="space-y-4">
            <h3 className="text-sm font-semibold text-foreground">
              Device configuration
            </h3>

            <label className="block space-y-1.5 text-xs">
              <span className="font-medium text-foreground">
                Device
              </span>

              <select
                value={activeDeviceId}
                onChange={(event) =>
                  selectActiveDevice(
                    event.target.value,
                  )
                }
                className="w-full rounded-control border border-border bg-background px-3 py-2"
              >
                {devices.map((device) => (
                  <option
                    key={device.id}
                    value={device.id}
                  >
                    {device.name}
                  </option>
                ))}
              </select>
            </label>

            <label className="block space-y-1.5 text-xs">
              <span className="font-medium text-foreground">
                Photo update frequency
                (seconds)
              </span>

              <input
                type="number"
                min="0"
                max="999"
                value={deviceFrequency}
                onChange={(event) =>
                  setDeviceFrequency(
                    event.target.value,
                  )
                }
                className="w-full rounded-control border border-border bg-background px-3 py-2"
              />
            </label>

            <label className="flex items-center gap-2 text-xs">
              <input
                type="checkbox"
                checked={deviceRandomOrder}
                onChange={(event) =>
                  setDeviceRandomOrder(
                    event.target.checked,
                  )
                }
              />

              Randomize photo order
            </label>

            <button
              type="button"
              onClick={saveDeviceConfig}
              className="rounded-control border border-border bg-surface-raised px-3 py-2 text-sm font-semibold text-foreground transition-colors duration-fast hover:border-brand/50"
            >
              Save device configuration
            </button>

            <div className="space-y-2 border-t border-border/60 pt-4">
              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-muted-foreground">
                Assigned photos
              </p>

              {assignedPhotos.length > 0 ? (
                <div className="flex flex-wrap gap-2">
                  {assignedPhotos.map(
                    (photo) => (
                      <button
                        key={photo.id}
                        type="button"
                        onClick={() =>
                          setAssignedPreviewPhotoId(
                            photo.id,
                          )
                        }
                        className={`rounded-pill border px-2.5 py-1 text-xs ${
                          assignedPreviewPhoto?.id ===
                          photo.id
                            ? 'border-brand bg-brand/10 text-brand'
                            : 'border-border text-muted-foreground'
                        }`}
                      >
                        {photo.name}
                      </button>
                    ),
                  )}
                </div>
              ) : (
                <p className="text-xs text-muted-foreground">
                  No photos assigned.
                </p>
              )}

              <PhotoPreview
                photo={
                  assignedPreviewPhoto
                }
              />
            </div>
          </div>
        </div>
      ) : (
        <div className="mt-6 grid gap-6 lg:grid-cols-[0.8fr_1.2fr]">
          <fieldset className="space-y-3">
            <legend className="text-sm font-semibold text-foreground">
              Photos
            </legend>

            <div className="space-y-2">
              {photos.map((photo) => (
                <label
                  key={photo.id}
                  className="flex items-center gap-2 rounded-control border border-border/60 bg-surface/60 px-3 py-2 text-xs"
                >
                  <input
                    type="radio"
                    name="framecast-demo-photo"
                    checked={
                      photo.id ===
                      activePhotoId
                    }
                    onChange={() => {
                      setActivePhotoId(
                        photo.id,
                      );
                      setStatus(
                        `Loaded ${photo.name}.`,
                      );
                    }}
                  />

                  <span className="truncate">
                    {photo.name}
                  </span>
                </label>
              ))}
            </div>
          </fieldset>

          {activePhoto && (
            <div className="space-y-5">
              <PhotoPreview
                photo={activePhoto}
              />

              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-3">
                  <p className="text-xs font-semibold uppercase tracking-[0.16em] text-muted-foreground">
                    Transform
                  </p>

                  <div className="flex gap-2">
                    <button
                      type="button"
                      onClick={() =>
                        rotatePhoto(-90)
                      }
                      className="flex-1 rounded-control border border-border px-3 py-2 text-xs font-semibold"
                    >
                      Rotate −90°
                    </button>

                    <button
                      type="button"
                      onClick={() =>
                        rotatePhoto(90)
                      }
                      className="flex-1 rounded-control border border-border px-3 py-2 text-xs font-semibold"
                    >
                      Rotate +90°
                    </button>
                  </div>

                  <label className="block space-y-1.5 text-xs">
                    <span>
                      Scale (%)
                    </span>

                    <input
                      type="number"
                      min="10"
                      max="100"
                      value={
                        activePhoto.scaling
                      }
                      onChange={(event) =>
                        updateActivePhoto({
                          scaling: clamp(
                            Number(
                              event.target
                                .value,
                            ) || 10,
                            10,
                            100,
                          ),
                        })
                      }
                      className="w-full rounded-control border border-border bg-background px-3 py-2"
                    />
                  </label>
                </div>

                <div className="space-y-3">
                  <p className="text-xs font-semibold uppercase tracking-[0.16em] text-muted-foreground">
                    Split-screen geometry
                  </p>

                  <div className="grid grid-cols-2 gap-2">
                    {(
                      [
                        ['x', 'X'],
                        ['y', 'Y'],
                        [
                          'width',
                          'Width',
                        ],
                        [
                          'height',
                          'Height',
                        ],
                      ] as const
                    ).map(
                      ([field, label]) => (
                        <label
                          key={field}
                          className="space-y-1 text-xs"
                        >
                          <span>
                            {label} (%)
                          </span>

                          <input
                            type="number"
                            min="0"
                            max="100"
                            value={
                              activePhoto[
                                field
                              ]
                            }
                            onChange={(
                              event,
                            ) =>
                              updateActivePhoto(
                                {
                                  [field]:
                                    clamp(
                                      Number(
                                        event
                                          .target
                                          .value,
                                      ) ||
                                        0,
                                      0,
                                      100,
                                    ),
                                },
                              )
                            }
                            className="w-full rounded-control border border-border bg-background px-3 py-2"
                          />
                        </label>
                      ),
                    )}
                  </div>
                </div>
              </div>

              <button
                type="button"
                onClick={() =>
                  setStatus(
                    `Saved ${activePhoto.name} display configuration to local simulation state.`,
                  )
                }
                className="rounded-control bg-brand px-4 py-2 text-sm font-semibold text-brand-foreground transition-colors duration-fast hover:bg-brand-hover"
              >
                Save photo configuration
              </button>
            </div>
          )}
        </div>
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
