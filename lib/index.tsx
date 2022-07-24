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
import { KonvaEvents, TransformerEvents } from "./types";

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
  return stage;
}

export function Stage(
  props: JSX.HTMLAttributes<HTMLDivElement> & Omit<StageConfig, "container">
) {
  const stageProps = createStage({ ...props });

  return (
    <div ref={stageProps.ref} {...props}>
      <StageContextProvider stageProps={stageProps}>
        {props.children}
      </StageContextProvider>
    </div>
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
    console.log("murp");
    layer.destroy();
  });
  return (
    // idk why, but this div fixes using <Show>
    <div>
      <LayerContext.Provider value={{ layer }}>
        {props.children}
      </LayerContext.Provider>
    </div>
  );
}

const propsToSkip = {
  children: true,
  ref: true,
  key: true,
  style: true,
  forwardedRef: true,
  unstable_applyCache: true,
  unstable_applyDrawHitFromCache: true,
};

function createEntity<T>(shapeName: keyof typeof Konva) {
  function Entity(props: ShapeConfig & KonvaEvents & T) {
    let prevProps = {};
    const [entity, setEntity] = createSignal<Konva.Shape>(null);
    const layer = useLayer();

    onMount(() => {
      const _entity = new Konva[shapeName as any](props);
      setEntity(_entity);
      layer?.layer?.add(_entity);
    });

    createEffect(() => {
      if (!entity()) {
        return;
      }
      entity().setAttrs(props);
    });

    createEffect(() => {
      if (!entity()) {
        return;
      }
      if (prevProps) {
        for (const key in prevProps) {
          if (propsToSkip[key]) {
            continue;
          }
          const isEvent = key.slice(0, 2) === "on";
          const propChanged = prevProps[key] !== props[key];

          // if that is a changed event, we need to remvoe it
          if (isEvent && propChanged) {
            let eventName = key.substring(2).toLowerCase();
            if (eventName.substring(0, 7) === "content") {
              eventName =
                "content" +
                eventName.substring(7, 1).toUpperCase() +
                eventName.substring(8);
            }
            entity().off(eventName, prevProps[key]);
          }
          let toRemove = !props.hasOwnProperty(key);
          if (toRemove) {
            entity().setAttr(key, undefined);
          }
        }
      }

      const newEvents = {};

      for (const key in props) {
        if (propsToSkip[key]) {
          continue;
        }
        const isEvent = key.slice(0, 2) === "on";
        const toAdd = prevProps[key] !== props[key];
        if (isEvent && toAdd) {
          let eventName = key.substring(2).toLowerCase();
          if (eventName.substring(0, 7) === "content") {
            eventName =
              "content" +
              eventName.substring(7, 1).toUpperCase() +
              eventName.substring(8);
          }
          // check that event is not undefined
          if (props[key]) {
            newEvents[eventName] = props[key];
          }
        }
      }
      for (var eventName in newEvents) {
        // console.log(eventName);
        entity()?.on(eventName, newEvents[eventName]);
      }
      prevProps = props;
    });

    onCleanup(() => {
      entity().destroy();
      console.log("destroyed");
    });
    return <>{/* shape */}</>;
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
export const Transformer = createEntity<TransformerEvents>("Transformer");
