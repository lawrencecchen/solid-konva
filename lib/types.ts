import Konva from "konva";

// https://konvajs.org/docs/events/Binding_Events.html
export interface KonvaEvents {
  // mouse events
  onMouseOver?: (e: Konva.KonvaEventObject<Konva.Shape>) => void;
  onMouseOut?: (e: Konva.KonvaEventObject<Konva.Shape>) => void;
  onMouseEnter?: (e: Konva.KonvaEventObject<Konva.Shape>) => void;
  onMouseLeave?: (e: Konva.KonvaEventObject<Konva.Shape>) => void;
  onMouseMove?: (e: Konva.KonvaEventObject<Konva.Shape>) => void;
  onMouseDown?: (e: Konva.KonvaEventObject<Konva.Shape>) => void;
  onMouseUp?: (e: Konva.KonvaEventObject<Konva.Shape>) => void;
  onWheel?: (e: Konva.KonvaEventObject<Konva.Shape>) => void;
  onClick?: (e: Konva.KonvaEventObject<Konva.Shape>) => void;
  onDblClick?: (e: Konva.KonvaEventObject<Konva.Shape>) => void;
  onTouchStart?: (e: Konva.KonvaEventObject<Konva.Shape>) => void;
  onTouchMove?: (e: Konva.KonvaEventObject<Konva.Shape>) => void;
  onTouchEnd?: (e: Konva.KonvaEventObject<Konva.Shape>) => void;
  onTap?: (e: Konva.KonvaEventObject<Konva.Shape>) => void;
  onDblTap?: (e: Konva.KonvaEventObject<Konva.Shape>) => void;
  // touch events
  onPointerDown?: (e: Konva.KonvaEventObject<Konva.Shape>) => void;
  onPointerMove?: (e: Konva.KonvaEventObject<Konva.Shape>) => void;
  onPointerUp?: (e: Konva.KonvaEventObject<Konva.Shape>) => void;
  onPointerCancel?: (e: Konva.KonvaEventObject<Konva.Shape>) => void;
  onPointerOver?: (e: Konva.KonvaEventObject<Konva.Shape>) => void;
  onPointerEnter?: (e: Konva.KonvaEventObject<Konva.Shape>) => void;
  onPointerOut?: (e: Konva.KonvaEventObject<Konva.Shape>) => void;
  onPointerLeave?: (e: Konva.KonvaEventObject<Konva.Shape>) => void;
  onPointerClick?: (e: Konva.KonvaEventObject<Konva.Shape>) => void;
  onPointerDblClick?: (e: Konva.KonvaEventObject<Konva.Shape>) => void;
  // drag events
  onDragStart?: (e: Konva.KonvaEventObject<Konva.Shape>) => void;
  onDragMove?: (e: Konva.KonvaEventObject<Konva.Shape>) => void;
  onDragEnd?: (e: Konva.KonvaEventObject<Konva.Shape>) => void;

  // all events in lowercase
  onmouseover?: (e: Konva.KonvaEventObject<Konva.Shape>) => void;
  onmouseout?: (e: Konva.KonvaEventObject<Konva.Shape>) => void;
  onmouseenter?: (e: Konva.KonvaEventObject<Konva.Shape>) => void;
  onmouseleave?: (e: Konva.KonvaEventObject<Konva.Shape>) => void;
  onmousemove?: (e: Konva.KonvaEventObject<Konva.Shape>) => void;
  onmousedown?: (e: Konva.KonvaEventObject<Konva.Shape>) => void;
  onmouseup?: (e: Konva.KonvaEventObject<Konva.Shape>) => void;
  onwheel?: (e: Konva.KonvaEventObject<Konva.Shape>) => void;
  onclick?: (e: Konva.KonvaEventObject<Konva.Shape>) => void;
  ondblclick?: (e: Konva.KonvaEventObject<Konva.Shape>) => void;
  ontouchstart?: (e: Konva.KonvaEventObject<Konva.Shape>) => void;
  ontouchend?: (e: Konva.KonvaEventObject<Konva.Shape>) => void;
  ontap?: (e: Konva.KonvaEventObject<Konva.Shape>) => void;
  ondbltap?: (e: Konva.KonvaEventObject<Konva.Shape>) => void;
  onpointerdown?: (e: Konva.KonvaEventObject<Konva.Shape>) => void;
  onpointermove?: (e: Konva.KonvaEventObject<Konva.Shape>) => void;
  onpointerup?: (e: Konva.KonvaEventObject<Konva.Shape>) => void;
  onpointercancel?: (e: Konva.KonvaEventObject<Konva.Shape>) => void;
  onpointerover?: (e: Konva.KonvaEventObject<Konva.Shape>) => void;
  onpointerenter?: (e: Konva.KonvaEventObject<Konva.Shape>) => void;
  onpointerout?: (e: Konva.KonvaEventObject<Konva.Shape>) => void;
  onpointerleave?: (e: Konva.KonvaEventObject<Konva.Shape>) => void;
  onpointerclick?: (e: Konva.KonvaEventObject<Konva.Shape>) => void;
  onpointerdblclick?: (e: Konva.KonvaEventObject<Konva.Shape>) => void;
  ondragstart?: (e: Konva.KonvaEventObject<Konva.Shape>) => void;
  ondragmove?: (e: Konva.KonvaEventObject<Konva.Shape>) => void;
  ondragend?: (e: Konva.KonvaEventObject<Konva.Shape>) => void;
}

export interface TransformerEvents {
  onTransformStart?: (e: Konva.KonvaEventObject<Konva.Shape>) => void;
  onTransform?: (e: Konva.KonvaEventObject<Konva.Shape>) => void;
  onTransformEnd?: (e: Konva.KonvaEventObject<Konva.Shape>) => void;
  // all events in lowercase
  ontransformstart?: (e: Konva.KonvaEventObject<Konva.Shape>) => void;
  ontransform?: (e: Konva.KonvaEventObject<Konva.Shape>) => void;
  ontransformend?: (e: Konva.KonvaEventObject<Konva.Shape>) => void;
}
