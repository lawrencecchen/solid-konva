import { Component, createSignal } from "solid-js";
import { Circle, Layer, Rect, Stage } from "../lib";

const App: Component = () => {
  const [x, setX] = createSignal(50);
  const [y, setY] = createSignal(50);
  return (
    <div class="h-screen">
      <input
        type="range"
        min={0}
        max={1000}
        value={x()}
        onInput={(e) => setX(e.currentTarget.valueAsNumber)}
      />
      <input
        type="range"
        min={0}
        max={1000}
        value={y()}
        onInput={(e) => setY(e.currentTarget.valueAsNumber)}
      />
      <Stage class="h-full">
        <Layer>
          <Circle
            {...{
              x: x(),
              y: y(),
              width: 100,
              height: 50,
              fill: "red",
              stroke: "black",
              strokeWidth: 4,
            }}
          />
          <Rect
            {...{
              x: x() * 2,
              y: y() * 2,
              width: 100,
              height: 50,
              fill: "red",
              stroke: "black",
              strokeWidth: 4,
              draggable: true,
            }}
          />
        </Layer>
      </Stage>
    </div>
  );
};

export default App;
