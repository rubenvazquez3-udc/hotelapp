import {combineReducers} from 'redux';

import app from '../modules/app';
import users from '../modules/users';
import hotels from '../modules/hotel';
import rooms from '../modules/room';
import reservations from '../modules/reservation';
import guests from '../modules/guest';

const rootReducer = combineReducers({
    app: app.reducer,
    users: users.reducer,
    hotels: hotels.reducer,
    rooms: rooms.reducer,
    reservations: reservations.reducer,
    guests: guests.reducer

});

export default rootReducer;
