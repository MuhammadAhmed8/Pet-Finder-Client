import { createStore, compose, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { createBrowserHistory } from "history";
import { routerMiddleware } from "connected-react-router";
import rootReducer from "../reducers";
import { enableBatching } from "redux-batched-actions";

//History object to be used by redux and router to synchronize both together
export const history = createBrowserHistory();

//routerMiddleware(history) if you want to dispatch history actions
//(e.g.to change URL with push('/path/to/somewhere')).
const router = routerMiddleware(history);

const middleware = [thunk, router];

//Store enhancer to enhance the middleware abilities
const enhancers = compose(
  applyMiddleware(...middleware),
  window.__REDUX_DEVTOOLS_EXTENSION__ && process.env.NODE_ENV !== "production"
    ? window.__REDUX_DEVTOOLS_EXTENSION__()
    : (f) => f
);

export default function configureStore(initialState = {}) {
  const store = createStore(
    enableBatching(rootReducer(history)),
    initialState,
    enhancers
  );

  if (module.hot) {
    module.hot.accept("../reducers", () =>
      store.replaceReducer(require("../reducers"))
    );
  }

  return store;
}

// redux-batched-actions,
// a batching action creator and associated higher order
// reducer for Redux that enables batching subscriber
// notifications for an array of actions.

//Read it for Redux and router configuration
//https://github.com/supasate/connected-react-router
