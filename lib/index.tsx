import { createElementSize } from "@solid-primitives/resize-observer";
import Konva from "konva";
import { Layer as KLayer, LayerConfig } from "konva/lib/Layer";
import { ShapeConfig } from "konva/lib/Shape";
import { Stage as KStage, StageConfig } from "konva/lib/Stage";
import {
  createContext,
  createEffect,
  createSignal,
  onCleanup,
  onMount,
  useContext,
} from "solid-js";
import type { JSX } from "solid-js/jsx-runtime";

function createStage(props: Omit<StageConfig, "container">) {
  const [containerRef, setContainerRef] = createSignal<HTMLDivElement>();
  const size = createElementSize(containerRef);
  const [stage, setStage] = createSignal<KStage>();

  onMount(() => {
    setStage(
      new Konva.Stage({
        height: size.width,
        width: size.height,
        container: containerRef(),
        ...props,
      })
    );
  });

  createEffect(() => {
    stage()?.setAttrs({
      width: size.width,
      height: size.height,
    });
  });

  onCleanup(() => {
    stage()?.destroy();
  });

  return {
    ...props,
    ref: setContainerRef,
    containerRef,
    stage,
  };
}

const StageContext = createContext<ReturnType<typeof createStage>>(null);
export function StageContextProvider(props: {
  children: JSX.Element;
  stageProps: ReturnType<typeof createStage>;
}) {
  return (
    <StageContext.Provider value={props.stageProps}>
      {props.children}
    </StageContext.Provider>
  );
}
export function useStage() {
  const stage = useContext(StageContext);
  // invariant(stage, "useStage() must be used within a StageContextProvider");
  return stage;
}

export function Stage(
  props: JSX.HTMLAttributes<HTMLDivElement> & Omit<StageConfig, "container">
) {
  const stageProps = createStage({ ...props });

  return (
    <StageContextProvider stageProps={stageProps}>
      <div ref={stageProps.ref} {...props}>
        {props.children}
      </div>
    </StageContextProvider>
  );
}

const LayerContext = createContext<{ layer: KLayer }>();
function useLayer() {
  return useContext(LayerContext);
}
export function Layer(props: { children?: JSX.Element } & LayerConfig) {
  const layer = new Konva.Layer(props);
  const stage = useStage();
  createEffect(() => {
    if (stage?.stage()) {
      stage.stage().add(layer);
    }
  });

  createEffect(() => {
    layer.setAttrs(props);
  });

  onCleanup(() => {
    layer.destroy();
  });
  return (
    <LayerContext.Provider value={{ layer }}>
      {props.children}
    </LayerContext.Provider>
  );
}
function createEntity(shapeName: keyof typeof Konva) {
  function Entity(props: ShapeConfig) {
    const shape = new Konva[shapeName as any](props);
    const layer = useLayer();
    createEffect(() => {
      layer?.layer?.add(shape);
    });
    createEffect(() => {
      shape.setAttrs(props);
    });
    onCleanup(() => {
      shape.destroy();
    });
    return <></>;
  }
  return Entity;
}
export const Group = createEntity("Group");
export const Rect = createEntity("Rect");
export const Circle = createEntity("Circle");
export const Ellipse = createEntity("Ellipse");
export const Wedge = createEntity("Wedge");
export const Line = createEntity("Line");
export const Sprite = createEntity("Sprite");
export const Image = createEntity("Image");
export const Text = createEntity("Text");
export const TextPath = createEntity("TextPath");
export const Star = createEntity("Star");
export const Ring = createEntity("Ring");
export const Arc = createEntity("Arc");
export const Tag = createEntity("Tag");
export const Path = createEntity("Path");
export const RegularPolygon = createEntity("RegularPolygon");
export const Arrow = createEntity("Arrow");
export const Shape = createEntity("Shape");
export const Transformer = createEntity("Transformer");
