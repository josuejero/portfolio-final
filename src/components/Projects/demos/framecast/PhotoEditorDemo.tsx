import PhotoPreview from './PhotoPreview';
import {
  clamp,
  type DemoPhoto,
} from './model';

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
    updates: Partial<DemoPhoto>,
  ) => void;

  onSavePhotoConfig: () => void;
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
                  photo.id === activePhotoId
                }
                onChange={() =>
                  onSelectPhoto(photo.id)
                }
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
          <PhotoPreview photo={activePhoto} />

          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-3">
              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-muted-foreground">
                Transform
              </p>

              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() =>
                    onRotatePhoto(-90)
                  }
                  className="flex-1 rounded-control border border-border px-3 py-2 text-xs font-semibold"
                >
                  Rotate −90°
                </button>

                <button
                  type="button"
                  onClick={() =>
                    onRotatePhoto(90)
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
                    onUpdatePhoto({
                      scaling: clamp(
                        Number(
                          event.target.value,
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
                        onChange={(event) =>
                          onUpdatePhoto({
                            [field]:
                              clamp(
                                Number(
                                  event
                                    .target
                                    .value,
                                ) || 0,
                                0,
                                100,
                              ),
                          })
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
            onClick={onSavePhotoConfig}
            className="rounded-control bg-brand px-4 py-2 text-sm font-semibold text-brand-foreground transition-colors duration-fast hover:bg-brand-hover"
          >
            Save photo configuration
          </button>
        </div>
      )}
    </div>
  );
}
