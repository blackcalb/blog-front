import ReactQueryProvider from "./providers/ReactQueryProvider";
import Router from "./providers/Router";

function App() {
  return (
    <ReactQueryProvider>
      <Router />
    </ReactQueryProvider>
  );
}

export default App;
