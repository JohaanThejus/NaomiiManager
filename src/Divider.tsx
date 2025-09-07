import { ReactNode, useState, useRef } from "react";
import "./general.css";

function Divider(props: { initialWidth?: number; children?: ReactNode }) {
  const [width, setWidth] = useState(props.initialWidth || 200);
  const sidebarRef = useRef<HTMLDivElement | null>(null);

  const onMouseDown = (e: React.MouseEvent) => {
    e.preventDefault();
    const startX = e.clientX;
    const startWidth = width;

    const onMouseMove = (moveEvent: MouseEvent) => {
      const newWidth = startWidth + (moveEvent.clientX - startX);
      setWidth(Math.max(newWidth, 100)); // minimum width 100px
    };

    const onMouseUp = () => {
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mouseup", onMouseUp);
    };

    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("mouseup", onMouseUp);
  };

  return (
    <div
      ref={sidebarRef}
      style={{
        width: `${width}px`,
        height: "100%",
        backgroundColor: "#dfdfdf",
        display: "flex",
        flexDirection: "row",
      }}
    >
      <div style={{ flex: 1, overflow: "auto" }}>{props.children}</div>

      <div
        onMouseDown={onMouseDown}
        style={{
          width: "5px",
          cursor: "col-resize",
          background: "#ccc",
        }}
      />
    </div>
  );
}

export default Divider;
