import { useUpdateUser } from '@/Components/Hooks';
import { createSlice } from '@reduxjs/toolkit';
import Cookies from "js-cookie"
const colormode = Cookies.get('colormode') || 'light'
const isAuthenticated = Cookies.get('access_token') ? true : false



const emptyUser = {
	username:'',
	full_name:"",
	id:'',
	role:''
}
interface user {
    id:string;
	full_name: string;
	username: string;
	role:string;

}
interface AuthState {
	isAuthenticated: boolean;
	isLoading: boolean;
    user:user,
	colormode:string
}

const initialState = {
    isAuthenticated: isAuthenticated,
	isLoading: true,
    user: emptyUser,
	colormode:colormode
} as AuthState;

const authSlice = createSlice({
	name: 'auth',
	initialState,
	reducers: {
		setAuth: (state, action) => {
			if(action.payload)
			{
				state.isAuthenticated = true;
				state.user = action.payload
			}
			state.isLoading = false
		},
		changeColorMode: (state)=>{
			Cookies.set('colormode', state.colormode === 'light'?'dark':'light') 
			state.colormode = state.colormode === 'light'?'dark':'light'
		},
		setLogout: state => {
			
			Cookies.remove('access_token')
			state.isAuthenticated = false;
			state.user = emptyUser

		},
		finishInitialLoad: state => {
			state.isLoading = false;
		},
	},
});

export const { setAuth, setLogout, finishInitialLoad, changeColorMode } = authSlice.actions;
export default authSlice.reducer;