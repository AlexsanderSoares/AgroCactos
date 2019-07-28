import { create } from 'apisauce';
import { AsyncStorage } from 'react-native';

const api = create({
    baseURL: '',
});

api.addAsyncRequestTransform(request => async () => {
    const token = 
            await AsyncStorage.getItem('@AgroCactos:token');

    if(token)
        request.headers['Authorization'] = `Bearer ${token}`;
});

api.addResponseTransform(response => {
    if(!response.ok) throw response;
});

export default api;