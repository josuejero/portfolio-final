import PhotoPreview from './PhotoPreview';
import type {
  DemoDevice,
  DemoPhoto,
} from './model';

interface DeviceEditorDemoProps {
  photos: readonly DemoPhoto[];
  selectedPhotoIds: readonly string[];
  onTogglePhoto: (photoId: string) => void;

  devices: readonly DemoDevice[];
  targetDeviceIds: readonly string[];
  onToggleTargetDevice: (
    deviceId: string,
  ) => void;

  onAddPhotos: () => void;

  activeDeviceId: string;
  onSelectActiveDevice: (
    deviceId: string,
  ) => void;

  deviceFrequency: string;
  onDeviceFrequencyChange: (
    value: string,
  ) => void;

  deviceRandomOrder: boolean;
  onDeviceRandomOrderChange: (
    value: boolean,
  ) => void;

  onSaveDeviceConfig: () => void;

  assignedPhotos: readonly DemoPhoto[];
  assignedPreviewPhoto?: DemoPhoto;
  onSelectAssignedPreview: (
    photoId: string,
  ) => void;
}

export default function DeviceEditorDemo({
  photos,
  selectedPhotoIds,
  onTogglePhoto,
  devices,
  targetDeviceIds,
  onToggleTargetDevice,
  onAddPhotos,
  activeDeviceId,
  onSelectActiveDevice,
  deviceFrequency,
  onDeviceFrequencyChange,
  deviceRandomOrder,
  onDeviceRandomOrderChange,
  onSaveDeviceConfig,
  assignedPhotos,
  assignedPreviewPhoto,
  onSelectAssignedPreview,
}: DeviceEditorDemoProps) {
  return (
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
                  onTogglePhoto(photo.id)
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
                    onToggleTargetDevice(
                      device.id,
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
          onClick={onAddPhotos}
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
              onSelectActiveDevice(
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
            Photo update frequency (seconds)
          </span>

          <input
            type="number"
            min="0"
            max="999"
            value={deviceFrequency}
            onChange={(event) =>
              onDeviceFrequencyChange(
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
              onDeviceRandomOrderChange(
                event.target.checked,
              )
            }
          />

          Randomize photo order
        </label>

        <button
          type="button"
          onClick={onSaveDeviceConfig}
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
                      onSelectAssignedPreview(
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
            photo={assignedPreviewPhoto}
          />
        </div>
      </div>
    </div>
  );
}
