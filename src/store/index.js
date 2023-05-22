import { createStore } from "redux";
import rootReducer from "./reducers";

export default createStore(
  rootReducer,
  // включаем расширение хрома, для дебага redux
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);
