'use client';

import { useVerify } from '@/Components/Hooks/Auth';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function Setup() {
	useVerify();
	return <ToastContainer />;
}