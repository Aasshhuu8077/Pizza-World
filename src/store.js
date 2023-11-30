import { createStore } from "redux"
import rootreducer from "./reducer/rootreducer.js"
import { devToolsEnhancer  } from 'redux-devtools-extension';

const store = createStore(rootreducer,devToolsEnhancer())
export default store;