import type { DetailedHTMLProps, HTMLAttributes } from "react";

/**
 * <model-viewer> is a custom element, so React needs to be told which
 * attributes it accepts. Only the attributes this project actually uses are
 * declared — add more here as they are needed.
 *
 * Docs: https://modelviewer.dev/docs/
 */
interface ModelViewerAttributes extends HTMLAttributes<HTMLElement> {
  src?: string;
  alt?: string;
  poster?: string;
  /** Enables the AR entry point (hidden automatically when unsupported). */
  ar?: boolean;
  /** Space-separated list: "webxr scene-viewer quick-look". */
  "ar-modes"?: string;
  /** "floor" | "wall" */
  "ar-placement"?: string;
  /** "auto" | "fixed" */
  "ar-scale"?: string;
  /** Explicit USDZ for iOS Quick Look; omitted to let model-viewer generate one. */
  "ios-src"?: string;
  "camera-controls"?: boolean;
  "touch-action"?: string;
  "shadow-intensity"?: string;
  "environment-image"?: string;
  "xr-environment"?: boolean;
  "auto-rotate"?: boolean;
  "disable-tap"?: boolean;
  loading?: "auto" | "lazy" | "eager";
}

declare module "react" {
  namespace JSX {
    interface IntrinsicElements {
      "model-viewer": DetailedHTMLProps<ModelViewerAttributes, HTMLElement>;
    }
  }
}
