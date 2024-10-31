import { AuthProvider } from "./providers/AuthProvider";
import ReactQueryProvider from "./providers/ReactQueryProvider";
import Router from "./providers/Router";

function App() {
  return (
    <ReactQueryProvider>
      <AuthProvider>
        <Router />
      </AuthProvider>
    </ReactQueryProvider>
  );
}

export default App;
