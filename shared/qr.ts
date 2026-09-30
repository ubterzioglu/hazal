/**
 * Single source of truth for the permanent QR entry point.
 *
 * The printed QR code encodes `https://hazaloral.site${QR_PATH}` and that URL
 * must NEVER change — a code hanging on a museum label cannot be reprinted.
 * To move the experience, change QR_TARGET only (and the matching rule in
 * vercel.json). See docs/AR_QR_PLAN.md.
 */
export const QR_PATH = "/qr";

/** Where /qr currently sends visitors. Safe to change at any time. */
export const QR_TARGET = "/ar";
