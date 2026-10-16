import { Children,cloneElement,createElement,isValidElement,type CSSProperties,type ReactElement,type ReactNode } from 'react';

export type DesignOverride = { as?: string; children?: ReactNode; style?: CSSProperties; [key: string]: unknown };
export type DesignOverrides = Record<string, DesignOverride>;
const eyebrowIds = new Set(['2351:2419','2351:2430','2351:2615','2351:2669','2351:2198','2351:2470','2351:2100','2351:2278','2351:2518','2351:3003','2351:3016','2351:3342','2351:3359','2351:3305','2351:3120','2351:2995','2351:3465','2351:3050','2351:3202','2351:3514']);

/** Attach application behavior and data to the original Figma layers. */
export function bindDesign(node: ReactNode, overrides: DesignOverrides, eagerImages=false): ReactNode {
  if (!isValidElement(node)) return node;
  const element = node as ReactElement<Record<string, unknown>>;
  const props = element.props;
  const patch = overrides[String(props['data-node-id'])] ?? {};
  const { as, ...changes } = patch;
  // Hidden design alternatives should not create DOM or download their images.
  const children = 'children' in patch ? patch.children : patch.style?.display==='none' ? null : Children.map(props.children as ReactNode, child => bindDesign(child, overrides, eagerImages));
  const imageDefaults:Record<string,unknown>=element.type==='img'?{decoding:'async',loading:eagerImages?'eager':'lazy'}:{};
  const merged = { ...imageDefaults, ...props, ...changes, className: String(changes.className ?? props.className ?? ''), style: { ...(props.style as CSSProperties), ...patch.style }, children };
  if (eyebrowIds.has(String(props['data-node-id']))) {
    merged.className = `${merged.className ?? ''} section-eyebrow`;
    if (['2351:2419','2351:3016'].includes(String(props['data-node-id']))) merged.children = 'МІЙ ПІДХІД';
    if (props['data-node-id'] === '2351:2615') merged.children = 'ЗРУЧНА ОПЛАТА';
  }
  return as ? createElement(as, merged) : cloneElement(element, merged);
}



