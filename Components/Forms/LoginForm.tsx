'use client';


import { Form } from '@/Components/Forms';
import { useLogin } from '../Hooks/Auth';

export default function LoginForm() {
	const { username, password, isLoading, onChange, onSubmit, errors } = useLogin();
	const config = [
		{
			labelText: 'اسم المستخدم',
			labelId: 'username',
			type: 'username',
			value: username,
			required: true,
			placeholder:'أدخل اسم المستخدم'
		},
		{
			labelText: 'كلمة السر',
			labelId: 'password',
			type: 'password',
			value: password,
			placeholder:'أدخل كلمة المرور',
			link: {
				linkText: 'Forgot password?',
				linkUrl: '/password-reset',
			},
			required: true,
		},
	];

	return (
		<Form
			config={config}
			isLoading={isLoading}
			btnText='تسجيل الدخول'
			onChange={onChange}
			onSubmit={onSubmit}
			errors={errors}
		/>
	);
}