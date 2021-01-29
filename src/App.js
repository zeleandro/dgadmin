import React, { StrictMode, useEffect } from 'react';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import AppRouter from 'routers/AppRouter';
import Preloader from 'components/ui/Preloader';

import ReactGA from 'react-ga';
ReactGA.initialize('G-8EW9Q8WFDQ');


const App = ({ store, persistor }) => {
			useEffect(()=>{
				ReactGA.pageview(window.location.pathname + window.location.search);
			})
			return(
				<StrictMode>
					<Provider store={store}>
						<PersistGate loading={<Preloader />} persistor={persistor}>
							<AppRouter />
						</PersistGate>
					</Provider>
				</StrictMode>
)};

export default App;
