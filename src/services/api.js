import { create } from 'apisauce';
import { AsyncStorage } from 'react-native';
import { BASE_URL } from '../config';

const api = create({
    baseURL: BASE_URL(),
});

api.addAsyncRequestTransform(request => async () => {
    const token = 
            await AsyncStorage.getItem('@AgroCactos:acess_token');

    if(token)
        request.headers['Authorization'] = `Bearer ${token}`;
});

api.addResponseTransform(response => {
    if(!response.ok) throw response;
});

export default api;