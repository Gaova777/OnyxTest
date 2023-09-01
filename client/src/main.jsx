import ReactDOM from "react-dom/client";
import {BrowserRouter} from "react-router-dom"
import App from "./App";
import MasterProvider from "./Provider";

ReactDOM.createRoot(document.getElementById('root')).render(
<MasterProvider>
  <BrowserRouter>
    <App/>
  </BrowserRouter>
</MasterProvider>

  )
