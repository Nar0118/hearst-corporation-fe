import { useCallback, useEffect, useRef, useState } from "react";

import "./index.css";

const WorldMap = ({ items }: any): JSX.Element => {
  const canvasRef = useRef(null);
  const map = useRef(null);
  const [svgData, setSVGData] = useState(null);
  const [ctx, setCtx] = useState<any>(null);
  const [canvasPaths, setCanvasPaths] = useState([]);

  const fillPath = useCallback((context: any, path: any, active = false) => {
    if (active) {
      context.fillStyle = "#008000";
      context.fill(path);
    } else {
      context.fillStyle = "#6DB66D";
      context.strokeStyle = "#ffffff";
      context.fill(path);
      context.stroke(path);
    }
  }, []);

  useEffect(() => {
    fetch("/world.svg")
      .then((data) => data.text())
      .then((data: any) => setSVGData(data));
  }, []);

  const addColors = (context: any) => {
    if (svgData) {
      const parser = new DOMParser();
      const svg = parser.parseFromString(svgData, "image/svg+xml");
      const paths = svg.querySelectorAll("path");

      const pathsArr: any = [];
      for (let i = 0; i < paths.length; i++) {
        const path = new Path2D(paths[i].getAttribute("d") as any);

        const countryClass = paths[i].getAttribute("class");
        const countryName = paths[i].getAttribute("name");
        const a = items.find(
          (el: any) => el.location == countryName || el.location == countryClass
        );
        if (a) {
          fillPath(context, path, true);
          pathsArr.push({
            active: true,
            path,
          });
        } else {
          fillPath(context, path);
          pathsArr.push({
            active: false,
            path,
          });
        }
      }
      setCanvasPaths(pathsArr);
    }
    return context;
  };

  const onResize = () => {
    if (map?.current &&  canvasRef?.current) {
    const canvas = canvasRef.current as any;
      const context = (canvas as any).getContext("2d");
      canvas.width = (map.current as any).clientWidth;
      (map.current as any).height = (map.current as any).clientWidth / 2;
      canvas.height = (map.current as any).clientWidth / 2;
      setCtx(context);
      context.scale(canvas.clientWidth * (0.22 / 460), canvas.clientHeight * (0.202 / 259));
      addColors(context);
    }
  }

  useEffect(() => {
    if (svgData) {
      onResize()
    }
  }, [svgData, fillPath, map, canvasRef]);

  const handleMouseMove = (event: any) => {
    if (!ctx) return;

    const rect = event.target.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;

    canvasPaths.forEach((path: any) => {
      if (path.active) {
        return fillPath(ctx, path.path, true);
      } else {
        return fillPath(ctx, path.path, ctx.isPointInPath(path.path, x, y));
      }
    });
  };

  useEffect(() => {
    addColors(ctx);
  }, [items]);

  return (
    <div className="map-container">
      <div className="map-title">Machine per Country</div>
      <div className="map" ref={map}>
        <canvas
          width='100%'
          height='100%'
          ref={canvasRef}
          onMouseMove={handleMouseMove}
        />
      </div>
    </div>
  );
};

export default WorldMap;
