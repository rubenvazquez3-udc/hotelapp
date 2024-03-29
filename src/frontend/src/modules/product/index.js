import * as actions from './actions';
import * as actionTypes from './actionTypes';
import * as selectors from './selectors';
import reducer from './reducer';

export {default as FindProducts} from './components/FindProducts';
export {default as AddProduct} from './components/AddProduct';
export {default as UpdateProduct} from './components/UpdateProduct';
export {default as ProductDetails} from './components/ProductDetails';

export default {actions, actionTypes, selectors, reducer};