import type {
  DemoPhoto,
} from './model';

import styles from '../FrameCastDemo.module.css';

interface PhotoPreviewProps {
  photo?: DemoPhoto;
}

export default function PhotoPreview({
  photo,
}: PhotoPreviewProps) {
  if (!photo) {
    return (
      <div
        className={
          styles.preview
        }
      >
        <div
          className={
            styles.previewHeader
          }
        >
          <strong>
            FRAME PREVIEW
          </strong>

          <span
            className={
              styles.previewMeta
            }
          >
            NO SOURCE
          </span>
        </div>

        <div
          className={
            styles.emptyPreview
          }
        >
          No photo selected
        </div>
      </div>
    );
  }

  return (
    <div
      className={
        styles.preview
      }
    >
      <div
        className={
          styles.previewHeader
        }
      >
        <strong>
          {photo.name}
        </strong>

        <span
          className={
            styles.previewMeta
          }
        >
          ROT {photo.rotation}° ·
          {' '}
          SCALE {photo.scaling}%
        </span>
      </div>

      <div
        className={
          styles.previewStage
        }
        aria-label={`Simulated preview for ${photo.name}`}
      >
        <div
          className={
            styles.previewObject
          }
          style={{
            left:
              `${photo.x}%`,

            top:
              `${photo.y}%`,

            width:
              `${photo.width}%`,

            height:
              `${photo.height}%`,

            transform:
              `translate(-50%, -50%) rotate(${photo.rotation}deg) scale(${photo.scaling / 100})`,
          }}
        >
          {photo.name}
        </div>
      </div>
    </div>
  );
}
