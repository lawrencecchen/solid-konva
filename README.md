# Solid Konva

Solid.js bindings for Konva.js

## Examples

https://stackblitz.com/edit/vitejs-vite-ey9bl2?file=src%2FApp.tsx

```tsx
import { Component, createSignal } from "solid-js";
import { Circle, Layer, Rect, Stage } from "solid-konva";

const App: Component = () => {
  const [x, setX] = createSignal(50);
  const [y, setY] = createSignal(50);
  return (
    <div>
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
      <Stage style={{ height: "100vh" }}>
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
```

### `npm dev` or `npm start`

Runs the app in the development mode.<br>
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br>

### `npm run build`

Builds the app for production to the `dist` folder.<br>
It correctly bundles Solid in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br>
Your app is ready to be deployed!

## Deployment

You can deploy the `dist` folder to any static host provider (netlify, surge, now, etc.)
