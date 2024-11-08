import { useState, ChangeEvent, FormEvent } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useAppDispatch } from '@/redux/hooks';
import { useLoginMutation } from '@/redux/features/authApiSlice';
import { setAuth } from '@/redux/features/authSlice';
import { toast } from 'react-toastify';
import Cookies from "js-cookie"
import { jwtDecode } from "jwt-decode"

export default function useLogin() {
	const router = useRouter();
	const [errors, setErrors] = useState();
	const searchParams = useSearchParams()

	const next = searchParams.get('next')

	const dispatch = useAppDispatch();
	const [login, { isLoading }] = useLoginMutation();

	const [formData, setFormData] = useState({
		username: '',
		password: '',
	});

	const { username, password } = formData;

	const onChange = (event: ChangeEvent<HTMLInputElement>) => {
		const { name, value } = event.target;
		setFormData({ ...formData, [name]: value });
	};

	const onSubmit = (event: FormEvent<HTMLFormElement>) => {
		event.preventDefault();

		login({ username, password })
			.unwrap()
			.then((data) => {
				Cookies.set('access_token', data?.access, {expires: new Date(new Date().getTime() + 72 * 60 * 60 * 1000)})
				dispatch(setAuth(jwtDecode(data?.access)));
				toast.success('تم تسجيل الدخول');

				return router.push(next || '/');
			})
			.catch((err) => {
				toast.error('حدث خطأ اثناء تسجيل الدخول');
				setErrors(err?.data);
			});
	};
	return {
		username,
		password,
		isLoading,
		onChange,
		onSubmit,
		errors
	};
}