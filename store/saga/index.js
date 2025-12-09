import BookTemplateSaga from './bookTemplateSaga';
import RegisterSaga from './loginSaga';
import { all } from 'redux-saga/effects';

export default function* rootSaga() {
    yield all([
        RegisterSaga(),
        BookTemplateSaga(),
    ]);
}