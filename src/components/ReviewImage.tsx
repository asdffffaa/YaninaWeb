import { reviewCrops } from '../data/reviews';

export function ReviewImage({
  src,
  alt,
  className,
}: {
  src: string;
  alt: string;
  className?: string;
}) {
  const crop = reviewCrops[src];
  if (!crop)
    return <img className={className} src={src} alt={alt} loading="lazy" decoding="async" />;
  return (
    <div className={className} style={className ? undefined : { width: '100%', height: '100%' }}>
      <div
        style={{
          position: 'relative',
          width: '100%',
          aspectRatio: `${crop.width} / ${crop.height}`,
          overflow: 'clip',
          borderRadius: `${(crop.radius / crop.width) * 100}% / ${(crop.radius / crop.height) * 100}%`,
        }}
      >
        <img
          src={src}
          alt={alt}
          loading="lazy"
          decoding="async"
          style={{
            position: 'absolute',
            maxWidth: 'none',
            width: crop.imageWidth,
            height: crop.imageHeight,
            left: crop.left,
            top: crop.top,
          }}
        />
      </div>
    </div>
  );
}
