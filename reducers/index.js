import { userReducer } from './userReducer';
import {combineReducers} from 'redux';
import {SearchReducer} from './SearchReducer'
import {cartReducer} from "./cartReducer"
import {drawerReducer} from "./drawerreducer"
import {couponReducer} from "./couponreducer"

 const rootReducer = combineReducers(
    {
        user:userReducer,
        search:SearchReducer,  
        cart:cartReducer,
        drawer:drawerReducer,
        coupon:couponReducer,
    }
);

export default rootReducer;