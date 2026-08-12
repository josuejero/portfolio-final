import PhotoPreview from './PhotoPreview';

import {
  clamp,
  type DemoPhoto,
} from './model';

import styles from '../FrameCastDemo.module.css';

interface PhotoEditorDemoProps {
  photos: readonly DemoPhoto[];

  activePhotoId: string;

  activePhoto?: DemoPhoto;

  onSelectPhoto: (
    photoId: string,
  ) => void;

  onRotatePhoto: (
    amount: number,
  ) => void;

  onUpdatePhoto: (
    updates:
      Partial<DemoPhoto>,
  ) => void;

  onSavePhotoConfig:
    () => void;
}

export default function PhotoEditorDemo({
  photos,
  activePhotoId,
  activePhoto,
  onSelectPhoto,
  onRotatePhoto,
  onUpdatePhoto,
  onSavePhotoConfig,
}: PhotoEditorDemoProps) {
  return (
    <div
      className={
        styles.photoWorkspace
      }
    >
      <section
        className={
          styles.photoRail
        }
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
            01 / PHOTO
          </span>

          <div>
            <h3>
              Select source.
            </h3>

            <p>
              Choose the image
              configuration to edit.
            </p>
          </div>
        </div>

        <fieldset>
          <legend
            className={
              styles.visuallyHidden
            }
          >
            Photos
          </legend>

          <div
            className={
              styles.selectionList
            }
          >
            {photos.map(
              (photo) => {
                const active =
                  photo.id ===
                  activePhotoId;

                return (
                  <label
                    key={photo.id}
                    className={`${styles.selectionRow} ${
                      active
                        ? styles.selectionRowActive
                        : ''
                    }`}
                  >
                    <input
                      type="radio"
                      name="framecast-demo-photo"
                      checked={active}
                      onChange={() =>
                        onSelectPhoto(
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

      {activePhoto ? (
        <section
          className={
            styles.photoEditor
          }
        >
          <PhotoPreview
            photo={activePhoto}
          />

          <div
            className={
              styles.editorControls
            }
          >
            <section
              className={
                styles.controlGroup
              }
            >
              <div
                className={
                  styles.controlHeading
                }
              >
                <span
                  className={
                    styles.sectionIndex
                  }
                >
                  02 / TRANSFORM
                </span>

                <h3>
                  Rotation + scale
                </h3>
              </div>

              <div
                className={
                  styles.buttonPair
                }
              >
                <button
                  type="button"
                  onClick={() =>
                    onRotatePhoto(
                      -90,
                    )
                  }
                  className={
                    styles.secondaryButton
                  }
                >
                  Rotate −90°
                </button>

                <button
                  type="button"
                  onClick={() =>
                    onRotatePhoto(
                      90,
                    )
                  }
                  className={
                    styles.secondaryButton
                  }
                >
                  Rotate +90°
                </button>
              </div>

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
                  Scale (%)
                </span>

                <input
                  type="number"
                  min="10"
                  max="100"
                  value={
                    activePhoto.scaling
                  }
                  onChange={(
                    event,
                  ) =>
                    onUpdatePhoto({
                      scaling:
                        clamp(
                          Number(
                            event
                              .target
                              .value,
                          ) || 10,
                          10,
                          100,
                        ),
                    })
                  }
                  className={
                    styles.input
                  }
                />
              </label>
            </section>

            <section
              className={
                styles.controlGroup
              }
            >
              <div
                className={
                  styles.controlHeading
                }
              >
                <span
                  className={
                    styles.sectionIndex
                  }
                >
                  03 / GEOMETRY
                </span>

                <h3>
                  Split-screen bounds
                </h3>
              </div>

              <div
                className={
                  styles.geometryGrid
                }
              >
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
                  ([
                    field,
                    label,
                  ]) => (
                    <label
                      key={field}
                      className={
                        styles.field
                      }
                    >
                      <span
                        className={
                          styles.fieldLabel
                        }
                      >
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
                          onUpdatePhoto(
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
                        className={
                          styles.input
                        }
                      />
                    </label>
                  ),
                )}
              </div>
            </section>
          </div>

          <div
            className={
              styles.saveRow
            }
          >
            <button
              type="button"
              onClick={
                onSavePhotoConfig
              }
              className={
                styles.primaryButton
              }
            >
              Save photo
              configuration
              <span aria-hidden="true">
                →
              </span>
            </button>
          </div>
        </section>
      ) : null}
    </div>
  );
}
