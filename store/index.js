import { configureStore } from '@reduxjs/toolkit';
import createSagaMiddleware from 'redux-saga';
import rootSaga from './saga/index';
import loginSlice from './slices/loginSlice';
import bookTemplateSlice from './slices/bookTemplateSlice';

const sagaMiddleware = createSagaMiddleware();

const store = configureStore({
    reducer: {
        auth: loginSlice,
        bookTemplate: bookTemplateSlice
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            thunk: false,
            serializableCheck: false
        }).concat(sagaMiddleware),
});

sagaMiddleware.run(rootSaga);

export default store;