import { Component, createSignal, Show } from "solid-js";
import { Circle, Layer, Rect, Stage } from "../lib";

const App: Component = () => {
  const [x1, setX1] = createSignal(50);
  const [show, setShow] = createSignal(true);
  const [rectPos, setRectPos] = createSignal({ x: 100, y: 100 });
  return (
    <div class="h-screen">
      <button onClick={() => setShow(!show())}>
        <Show when={show()} fallback={<>show</>}>
          hide
        </Show>{" "}
        the Circle
      </button>
      <input
        type="range"
        min={0}
        max={1000}
        value={x1()}
        onInput={(e) => setX1(e.currentTarget.valueAsNumber)}
      />
      <input
        type="range"
        min={0}
        max={1000}
        value={rectPos().x}
        onInput={(e) =>
          setRectPos({ x: e.currentTarget.valueAsNumber, y: rectPos().y })
        }
      />
      <input
        type="range"
        min={0}
        max={1000}
        value={rectPos().y}
        onInput={(e) =>
          setRectPos({ x: rectPos().x, y: e.currentTarget.valueAsNumber })
        }
      />
      {/* <Show when={show()}>ok</Show> */}
      <Stage class="h-full">
        <Layer>
          <Circle
            {...{
              x: x1(),
              y: 50,
              width: 100,
              height: 50,
              fill: "red",
              stroke: "black",
              strokeWidth: 4,
              visible: show(),
            }}
          />
          <Rect
            {...{
              x: rectPos().x,
              y: rectPos().y,
              width: 100,
              height: 50,
              fill: "red",
              stroke: "black",
              strokeWidth: 4,
              draggable: true,
            }}
            onMouseOver={(e) => console.log(e)}
            onMouseOut={(e) => console.log(e)}
            onDragMove={(e) => setRectPos(e.target.getPosition())}
          />
        </Layer>
      </Stage>
    </div>
  );
};

export default App;
