import Image from 'next/image';

type BlogImageProps = {
  src: string;
  alt?: string;
  width?: number;
  height?: number;
};

export default function BlogImage({
  src,
  alt = '',
  width = 800,
  height = 450,
}: BlogImageProps) {
  return (
    <div className="my-6 rounded-lg overflow-hidden">
      <Image
        src={src}
        alt={alt}
        width={width}
        height={height}
        className="rounded-lg w-full object-cover"
      />
    </div>
  );
}
