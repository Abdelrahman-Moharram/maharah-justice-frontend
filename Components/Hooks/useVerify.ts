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
				Cookies.set('access_token', data?.access)
			})
			.catch(()=>{
				dispatch(setLogout())
			})
			.finally(() => {
				dispatch(finishInitialLoad());
			});		
	}, [dispatch, verify]);
}