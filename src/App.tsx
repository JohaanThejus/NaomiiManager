import "./App.css";
import Divider from "./Divider";
import ServiceRef from "./ServiceRef";

function App() {
  return (
    <main className="container" style={{ display: "flex", height: "100%" }}>
      <Divider initialWidth={200}>
          <ServiceRef name={"Main"} since={23} bin_path="22"></ServiceRef>
      </Divider>

      <div style={{ flex: 1}}
        className="main-panel">
      </div>
    </main>
  );
}

export default App;
