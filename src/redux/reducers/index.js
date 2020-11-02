import productReducer from './productReducer';
import basketReducer from './basketReducer';
import authReducer from './authReducer';
import profileReducer from './profileReducer';
import filterReducer from './filterReducer';
import checkoutReducer from './checkoutReducer';
import userReducer from './userReducer';
import miscReducer from './miscReducer';
import orderReducer from './orderReducer';
import categoryReducer from './categoryReducer';
import brandReducer from './brandReducer';

const rootReducer = {
	products: productReducer,
	basket: basketReducer,
	auth: authReducer,
	profile: profileReducer,
	filter: filterReducer,
	users: userReducer,
	checkout: checkoutReducer,
	app: miscReducer,
	orders: orderReducer,
	categories: categoryReducer,
	brands: brandReducer
};

export default rootReducer;
