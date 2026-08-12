import PhotoPreview from './PhotoPreview';

import type {
  DemoDevice,
  DemoPhoto,
} from './model';

import styles from '../FrameCastDemo.module.css';

interface DeviceEditorDemoProps {
  photos: readonly DemoPhoto[];

  selectedPhotoIds:
    readonly string[];

  onTogglePhoto: (
    photoId: string,
  ) => void;

  devices:
    readonly DemoDevice[];

  targetDeviceIds:
    readonly string[];

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

  onSaveDeviceConfig:
    () => void;

  assignedPhotos:
    readonly DemoPhoto[];

  assignedPreviewPhoto?:
    DemoPhoto;

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
    <div
      className={
        styles.deviceWorkspace
      }
    >
      <section
        className={styles.panel}
      >
        <div
          className={
            styles.panelHeading
          }
        >
          <span
            className={
              styles.sectionIndex
            }
          >
            01 / SOURCE
          </span>

          <div>
            <h3>
              Choose photos.
            </h3>

            <p>
              Select one or more
              source items for
              assignment.
            </p>
          </div>
        </div>

        <fieldset>
          <legend
            className={
              styles.visuallyHidden
            }
          >
            Source photos
          </legend>

          <div
            className={
              styles.selectionList
            }
          >
            {photos.map(
              (photo) => {
                const checked =
                  selectedPhotoIds.includes(
                    photo.id,
                  );

                return (
                  <label
                    key={photo.id}
                    className={`${styles.selectionRow} ${
                      checked
                        ? styles.selectionRowActive
                        : ''
                    }`}
                  >
                    <input
                      type="checkbox"
                      checked={checked}
                      onChange={() =>
                        onTogglePhoto(
                          photo.id,
                        )
                      }
                    />

                    <span
                      className={
                        styles.selectionName
                      }
                    >
                      {photo.name}
                    </span>
                  </label>
                );
              },
            )}
          </div>
        </fieldset>
      </section>

      <section
        className={styles.panel}
      >
        <div
          className={
            styles.panelHeading
          }
        >
          <span
            className={
              styles.sectionIndex
            }
          >
            02 / TARGET
          </span>

          <div>
            <h3>
              Choose frames.
            </h3>

            <p>
              Apply the selected
              source photos to one
              or more devices.
            </p>
          </div>
        </div>

        <fieldset>
          <legend
            className={
              styles.visuallyHidden
            }
          >
            Target devices
          </legend>

          <div
            className={
              styles.selectionList
            }
          >
            {devices.map(
              (device) => {
                const checked =
                  targetDeviceIds.includes(
                    device.id,
                  );

                return (
                  <label
                    key={device.id}
                    className={`${styles.selectionRow} ${
                      checked
                        ? styles.selectionRowActive
                        : ''
                    }`}
                  >
                    <input
                      type="checkbox"
                      checked={checked}
                      onChange={() =>
                        onToggleTargetDevice(
                          device.id,
                        )
                      }
                    />

                    <span
                      className={
                        styles.selectionName
                      }
                    >
                      {device.name}
                    </span>

                    <span
                      className={
                        styles.selectionMeta
                      }
                    >
                      {device.type}
                    </span>
                  </label>
                );
              },
            )}
          </div>

          <button
            type="button"
            onClick={onAddPhotos}
            className={`${styles.primaryButton} ${styles.fullButton}`}
          >
            Add photos to devices
            <span aria-hidden="true">
              →
            </span>
          </button>
        </fieldset>
      </section>

      <section
        className={styles.panel}
      >
        <div
          className={
            styles.panelHeading
          }
        >
          <span
            className={
              styles.sectionIndex
            }
          >
            03 / CONFIG
          </span>

          <div>
            <h3>
              Configure device.
            </h3>

            <p>
              Inspect assignments
              and update playback
              behavior.
            </p>
          </div>
        </div>

        <div
          className={
            styles.config
          }
        >
          <label
            className={
              styles.field
            }
          >
            <span
              className={
                styles.fieldLabel
              }
            >
              Device
            </span>

            <select
              value={activeDeviceId}
              onChange={(event) =>
                onSelectActiveDevice(
                  event.target.value,
                )
              }
              className={
                styles.input
              }
            >
              {devices.map(
                (device) => (
                  <option
                    key={device.id}
                    value={device.id}
                  >
                    {device.name}
                  </option>
                ),
              )}
            </select>
          </label>

          <label
            className={
              styles.field
            }
          >
            <span
              className={
                styles.fieldLabel
              }
            >
              Photo update
              frequency (seconds)
            </span>

            <input
              type="number"
              min="0"
              max="999"
              value={
                deviceFrequency
              }
              onChange={(event) =>
                onDeviceFrequencyChange(
                  event.target.value,
                )
              }
              className={
                styles.input
              }
            />
          </label>

          <label
            className={
              styles.checkboxLine
            }
          >
            <input
              type="checkbox"
              checked={
                deviceRandomOrder
              }
              onChange={(event) =>
                onDeviceRandomOrderChange(
                  event.target
                    .checked,
                )
              }
            />

            Randomize photo order
          </label>

          <div>
            <button
              type="button"
              onClick={
                onSaveDeviceConfig
              }
              className={
                styles.secondaryButton
              }
            >
              Save device
              configuration
            </button>
          </div>
        </div>

        <div
          className={
            styles.assigned
          }
        >
          <p
            className={
              styles.eyebrow
            }
          >
            ASSIGNED PHOTOS
          </p>

          {assignedPhotos.length >
          0 ? (
            <>
              <div
                className={
                  styles.chips
                }
              >
                {assignedPhotos.map(
                  (photo) => {
                    const active =
                      assignedPreviewPhoto
                        ?.id ===
                      photo.id;

                    return (
                      <button
                        key={photo.id}
                        type="button"
                        onClick={() =>
                          onSelectAssignedPreview(
                            photo.id,
                          )
                        }
                        className={`${styles.chip} ${
                          active
                            ? styles.chipActive
                            : ''
                        }`}
                      >
                        {photo.name}
                      </button>
                    );
                  },
                )}
              </div>

              <PhotoPreview
                photo={
                  assignedPreviewPhoto
                }
              />
            </>
          ) : (
            <>
              <p
                className={
                  styles.empty
                }
              >
                No photos assigned.
              </p>

              <PhotoPreview />
            </>
          )}
        </div>
      </section>
    </div>
  );
}
