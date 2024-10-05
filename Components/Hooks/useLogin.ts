import { useState, ChangeEvent, FormEvent } from 'react';
import { useRouter } from 'next/navigation';
import { useLoginMutation } from '@/redux/features/authApiSlice';
import { toast } from 'react-toastify';
import Cookies from "js-cookie"
import { jwtDecode } from "jwt-decode"

export default function useLogin() {
	const router = useRouter();
	const [errors, setErrors] = useState();
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
        Cookies.set('access_token', data?.access)
				dispatch(setAuth(jwtDecode(data?.access)));
				toast.success('Logged in');
				router.push('/');
			})
			.catch((err) => {
				toast.error('Failed to log in');
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