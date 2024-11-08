import { useEffect } from 'react';
import { useAppDispatch } from '@/redux/hooks';
import { finishInitialLoad, setLogout } from '@/redux/features/authSlice';
import { useVerifyMutation } from '@/redux/features/authApiSlice';
import Cookies from "js-cookie"

export default function useVerify() {
	const dispatch = useAppDispatch();

	const [verify] = useVerifyMutation();

	useEffect(() => {
		verify(undefined)
			.unwrap()
			.then((data:{access:string}) => {
				if(data?.access)
					Cookies.set('access_token', data?.access, {expires: new Date(new Date().getTime() + 72 * 60 * 60 * 1000)})
			})
			.catch(()=>{
				dispatch(setLogout())
			})
			.finally(() => {
				dispatch(finishInitialLoad());
			});		
	}, [dispatch, verify]);
}