import Emblem from "@/components/ui/Emblem";
import { site } from "@/lib/site";

/**
 * PATEQ mark used by the boot screen, top bar, and system core.
 * If a real logo URL is configured in src/lib/site.ts it is used;
 * otherwise the Kali-inspired dragon emblem renders.
 */
export default function BrandMark({
  size = 64,
  className,
  squared = true,
  variant = "dragon",
}: {
  size?: number;
  className?: string;
  squared?: boolean;
  variant?: "dragon" | "serpent";
}) {
  if (site.logo) {
    return (
      // eslint-disable-next-line @next/next/no-img-element
      <img
        src={site.logo}
        alt="PATEQ"
        width={size}
        height={size}
        style={{ borderRadius: squared ? Math.round(size * 0.26) : size / 2 }}
        className={`object-cover ${className ?? ""}`}
      />
    );
  }
  return <Emblem size={size} className={className} variant={variant} />;
}
