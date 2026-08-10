import type { DemoPhoto } from './model';

interface PhotoPreviewProps {
  photo?: DemoPhoto;
}

export default function PhotoPreview({
  photo,
}: PhotoPreviewProps) {
  if (!photo) {
    return (
      <div className="flex aspect-video items-center justify-center rounded-surface border border-dashed border-border bg-muted/30 text-xs text-muted-foreground">
        No photo selected
      </div>
    );
  }

  return (
    <div
      className="relative aspect-video overflow-hidden rounded-surface border border-border/70 bg-muted/30"
      aria-label={`Simulated preview for ${photo.name}`}
    >
      <div
        className="absolute flex items-center justify-center overflow-hidden rounded-control border border-brand/50 bg-surface-raised/90 p-3 text-center text-xs font-medium text-foreground shadow-soft"
        style={{
          left: `${photo.x}%`,
          top: `${photo.y}%`,
          width: `${photo.width}%`,
          height: `${photo.height}%`,
          transform:
            `translate(-50%, -50%) rotate(${photo.rotation}deg) scale(${photo.scaling / 100})`,
        }}
      >
        {photo.name}
      </div>
    </div>
  );
}
