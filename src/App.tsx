import { Provider } from "react-redux";
import Pages from "./components/Pages/Pages";
import store from "./services/store";

function App() {
  return (
    <>
     <Provider store={store}>
      <div className="App">
        {/* Your App content */}
        
         <Pages/>


      </div>
    </Provider>
    </>
  );
}

export default App;
