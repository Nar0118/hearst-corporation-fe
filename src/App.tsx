import { AuthProvider } from "./contexts/authContext";
import RoutesComponent from "./routes";

const App = () => {
  return (
    <div className="App">
      <AuthProvider>
        <div className="routes">
          <RoutesComponent />
        </div>
      </AuthProvider>
    </div>
  );
};

export default App;
