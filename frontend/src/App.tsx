import "./App.css";
import getNotes from "./hooks/getNotes";

console.log(await getNotes());

function App() {
  return <>Hello world!</>;
}

export default App;
