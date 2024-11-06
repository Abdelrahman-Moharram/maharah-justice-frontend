import { ChangeEvent, FormEvent } from 'react';
import { Input } from '@/Components/Forms';
import { Spinner } from '@/Components/Common';
import ErrorAlert from '../alerts/ErrorAlert';

interface Config {
	labelText: string;
	labelId: string;
	type: string;
	value: string;
	placeholder?: string;
	link?: {
		linkText: string;
		linkUrl: string;
	};
	required?: boolean;
}

interface Props {
	config: Config[];
	isLoading: boolean;
	btnText: string;
	onChange: (event: ChangeEvent<HTMLInputElement>) => void;
	onSubmit: (event: FormEvent<HTMLFormElement>) => void;
	errors? : any
}

export default function Form({
	config,
	isLoading,
	btnText,
	onChange,
	onSubmit,
	errors,
}: Props) {
	
	return (
		<form className='space-y-6' onSubmit={onSubmit}>
			{
				errors?.hasOwnProperty('non_field_errors')?
					<ul className='list-disc'>
						{
							errors['non_field_errors']?.map((i:string)=>(
								<li key={i} className='text-red-500'>{i}</li>
							))
						}
					</ul>
				:null
			}
			{
				errors?.detail?
					<ErrorAlert 
						text={errors.detail}
					/>
				:null
			}
			{config.map(input => (
				<Input
					label={input.labelText}
					placeholder={input.placeholder}
					key={input.labelId}
					labelId={input.labelId}
					type={input.type}
					onChange={(e:ChangeEvent<HTMLInputElement>)=>onChange(e)}
					value={input.value}
					required={input.required}
					errors={errors?.hasOwnProperty(input.labelId) ? errors[input.labelId]: []}
					
				/>
			))}

			<div className='pt-2'>
				<button
					type='submit'
					className='flex w-full justify-center rounded-xl bg-primary px-3 py-1.5 text-sm  leading-6 font-[700] shadow-sm hover:bg-primary-hover focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary'
					disabled={isLoading}
				>
					{isLoading ? <span className='flex gap-1 items-center'>{btnText} <Spinner sm /> </span> : `${btnText}`}
				</button>
			</div>
		</form>
	);
}