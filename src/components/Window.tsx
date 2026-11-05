import Image from "next/image";
import { Lock } from "lucide-react";

type Props = {
  src: string;
  alt: string;
  domain: string;
  preload?: boolean;
  sizes?: string;
  className?: string;
  /** Aspect ratio of the visible screenshot area. */
  ratio?: string;
};

/** A browser window around a real screenshot. */
export default function Window({ src, alt, domain, preload, sizes, className = "", ratio = "16 / 10" }: Props) {
  return (
    <div className={`window ${className}`}>
      <div className="window__bar" aria-hidden>
        <div className="window__dots">
          <span />
          <span />
          <span />
        </div>
        <div className="window__url">
          <Lock size={11} strokeWidth={2} />
          {domain}
        </div>
        <div className="w-[42px]" />
      </div>
      <div className="shot" style={{ aspectRatio: ratio }}>
        <Image
          src={src}
          alt={alt}
          width={1600}
          height={1000}
          sizes={sizes ?? "(min-width: 1024px) 50vw, 100vw"}
          preload={preload}
        />
      </div>
    </div>
  );
}
