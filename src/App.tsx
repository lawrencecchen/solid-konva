import { Component, createSignal, Show } from "solid-js";
import { Circle, Layer, Rect, Stage } from "../lib";

const App: Component = () => {
  const [x1, setX1] = createSignal(50);
  const [show, setShow] = createSignal(true);
  const [show2, setShow2] = createSignal(true);
  const [circlePos, setCirclePos] = createSignal({ x: 200, y: 200 });
  const [rectPos, setRectPos] = createSignal({ x: 100, y: 100 });
  return (
    <div class="h-screen">
      <div>
        <button onClick={() => setShow(!show())}>
          <Show when={show()} fallback={<>show</>}>
            hide
          </Show>{" "}
          the Circle with visible prop
        </button>
        <button onClick={() => setShow2(!show2())}>
          <Show when={show2()} fallback={<>show</>}>
            hide
          </Show>{" "}
          the Rectangle with {"<Show />"}
        </button>
      </div>
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
      <div>
        {circlePos().x} - {circlePos().y}
      </div>
      <Stage style={{ height: "100vh" }}>
        <Layer>
          <Show when={show()}>
            <Circle
              {...{
                x: circlePos().x,
                y: circlePos().y,
                width: 100,
                height: 50,
                fill: "red",
                stroke: "black",
                strokeWidth: 4,
                draggable: true,
              }}
              onDragMove={(e) => setCirclePos(e.target.getPosition())}
            />
          </Show>
          <Circle
            {...{
              x: x1(),
              y: 50,
              width: 100,
              height: 50,
              fill: "red",
              stroke: "black",
              strokeWidth: 4,
              // visible: show(),
            }}
          />
          <Show when={show2()}>
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
              onDragMove={(e) => setRectPos(e.target.getPosition())}
            />
          </Show>
        </Layer>
      </Stage>
    </div>
  );
};

export default App;
