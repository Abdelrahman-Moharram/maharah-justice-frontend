import React, { ChangeEvent, FormEvent, useState } from 'react'
import Button from '@/Components/Common/Button';
import { Input, SelectInput, TextArea, ImageInput, HijriDateInput, CheckBox } from '@/Components/Forms'
import ToggledCard from '../Cards/ToggledCard';
import CustomerSearchInput from './CustomerSearchInput';
import { DateObject } from 'react-multi-date-picker';
import Link from 'next/link';
import { ValidationsType } from '../Types/Others';
import { caseNumberRegex, commercialNumberRegex, hijriDateRegex, phoneNumberRegex } from '../Hooks/Common/validationsRegexRepo';
import AmountInputField from './AmountInputField';

interface circularType{
    id: string;
    number: string
  }

interface baseType{
    id: string;
    name: string
}
  
interface CaseType{
    case_number:  string;
    agreement_number: string;
    amount: string;
    notes:  string;
    is_aganist_company: boolean;
    court:  string;
    circular: string;
    city: string;
    // state:  string;
    litigation_type:  string;
    company_representative: string;
    customer: string;
    cust_phone_number:  string;
    commercial_number:  string;
    date_ar:  DateObject|null;
    case_attachment?: File[] | null
    customer_name:string
}
interface Props{
    LitigationTypes: baseType[];
    states: baseType[];
    cities: baseType[];
    company_representatives:baseType[];
    courts:baseType[];
    circulars:circularType[];
    caseForm:CaseType,
    isLoading:boolean
    errors?:any | null
    add?:boolean,

    onChange:(event: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLTextAreaElement>, validationSchema?:ValidationsType )=>void;
    changeCheckBox:(event: ChangeEvent<HTMLInputElement>, validationSchema?:ValidationsType )=>void;
    selectChange:(e: ChangeEvent<HTMLSelectElement>, validationSchema?:ValidationsType )=> void;
    imageChange?: (file:File )=> void | undefined;
    changeCustomer: (val:string, validationSchema?:ValidationsType)=>void,
    formSubmit:(e:FormEvent<HTMLFormElement>) =>void
    changeDate:(date:DateObject | null, validationSchema?:ValidationsType)=>void
}
const CaseForm = ({
    onChange, 
    errors, 
    formSubmit, 
    selectChange, 
    changeCustomer, 
    caseForm, 
    imageChange, 
    add, 
    isLoading, 
    LitigationTypes,
    cities,
    // states,
    circulars,
    company_representatives,
    courts,
    changeCheckBox,
    changeDate
  }:Props) => {
    const [file, setFile] = useState<File|null>(null)
    const changeCurrentFile = (e:ChangeEvent<HTMLInputElement> ) =>{
        const files = e.target.files
        if (files?.length && imageChange){
            imageChange(files[0])
            setFile(null)
        }
    }
  return (

    <div>
      <form
        encType='multipart/form-data'
        onSubmit={(e)=>formSubmit(e)}
        method='post'
      >
        <ToggledCard 
            title='البيانات الأساسية'
            className='bg-container'
        >
            <div className="grid lg:grid-cols-3 sm:grid-cols-1 space-y-5 gap-4 py-5 rounded-md items-center">
                
                <div className="mt-5">
                    <Input
                        labelId={'case_number'}
                        type={'text'}
                        onChange={e=>onChange(e, {minLength:{value:10}, alter_name:'رقم القضية', regex:{value:caseNumberRegex, message:'برجاء التأكد من رقم القضية'}})}
                        value={caseForm?.case_number}
                        label={'رقم القضية'}
                        required= {true}
                        errors={errors?.case_number}
                    />
                </div>
                <HijriDateInput
                    labelId={'date_ar'}
                    onChange={e=>changeDate(e,  {regex:{value:hijriDateRegex, message:'تاريخ القضية غير صحيح'}})}
                    value={caseForm?.date_ar}
                    label={'تاريخ القضية'}
                    required= {true}
                    errors={errors?.date_ar}
                />
                {/* <SelectInput
                    label='حالة القضية'
                    labelId='state'
                    value={caseForm?.state}
                    required={true}
                    onChange={selectChange}
                    emptyoption={true}
                    errors={errors?.state}
                >
                    {
                        states?.length?
                            states.map(state=>(
                            <option key={state.id} value={state.id}>{state.name}</option>   
                            ))
                        :
                        null
                    }    
                </SelectInput> */}


                

                <SelectInput
                    label='المدينة'
                    labelId='city'
                    value={caseForm?.city}
                    required={true}
                    onChange={selectChange}
                    emptyoption={true}
                    errors={errors?.city}

                >
                    {
                        cities?.length?
                            cities.map(city=>(
                                <option key={city?.id} value={city?.id}>{city?.name}</option>   
                            ))
                        :
                        null
                    }  
                </SelectInput>


                <SelectInput
                    label='المحكمة'
                    labelId='court'
                    value={caseForm?.court}
                    required={true}
                    onChange={selectChange}
                    emptyoption={true}
                    errors={errors?.court}
                >
                    {
                        courts?.length?
                        courts.map(court=>(
                            <option key={court.id} value={court.id}>{court.name}</option>   
                            ))
                        :
                        null
                    }    
                </SelectInput>

            
                <Input
                    label='رقم الدائرة'
                    labelId='circular'
                    value={caseForm?.circular}
                    required={true}
                    onChange={e=>onChange(e,  {minValue:{value:1}, maxValue:{value:50}, alter_name:'رقم الدائرة'})}
                    errors={errors?.circular}
                    type='text'
                />
                
                    

                <SelectInput
                    label='نوع القضية'
                    labelId='litigation_type'
                    value={caseForm?.litigation_type}
                    required={true}
                    onChange={selectChange}
                    emptyoption={true}
                    errors={errors?.litigation_type}
                >
                    {
                    LitigationTypes?.length?
                        LitigationTypes.map(LitigationType=>(
                        <option key={LitigationType.id} value={LitigationType.id}>{LitigationType.name}</option>   
                        ))
                    :
                    null
                    }
                </SelectInput>

                <AmountInputField
                    labelId={'amount'} // need to add pattern to it
                    onChange={onChange}
                    value={caseForm?.amount}
                    label={'مبلغ القضية'}
                    required= {true}
                    errors={errors?.amount}
                />

                <Input
                    labelId={'agreement_number'}
                    type={'text'}
                    onChange={e=>onChange(e)}
                    value={caseForm?.agreement_number}
                    label={'رقم الإتفاقية'}
                    required= {true}
                    errors={errors?.agreement_number}
                />

            </div>


        </ToggledCard>

      
        <ToggledCard
            title='أطراف القضية و بيانات العميل'
            className='bg-container'
        >
            <div className="grid lg:grid-cols-2 sm:grid-cols-1  gap-4 py-5 rounded-md items-center">
                <CustomerSearchInput
                    label='إبحث برقم الهوية او إسم العميل'

                    labelId='custumer'
                    onChange={changeCustomer}
                    // emptyoption={true}
                    errors={errors?.customer}
                    oldNameValue={caseForm?.customer_name}
                    type='text'
                />

                <Input
                    labelId={'cust_phone_number'}
                    type={'text'}
                    onChange={e=>onChange(e, {alter_name:"رقم جوال العميل", regex:phoneNumberRegex})}
                    value={caseForm?.cust_phone_number}
                    label={'رقم جوال العميل'}
                    required= {true}
                    errors={errors?.cust_phone_number}
                />


                <Input
                    labelId={'commercial_number'}
                    type={'text'}
                    onChange={(e)=>onChange(e, {minLength:{value:10}, regex:{value:commercialNumberRegex, message:'برجاء التأكد من رقم السجل التجاري'}})}
                    value={caseForm?.commercial_number}
                    label={'رقم السجل التجاري'}
                    required= {true}
                    errors={errors?.commercial_number}
                />

                <SelectInput
                    label='مفوض الشركة'
                    labelId='company_representative'
                    value={caseForm?.company_representative}
                    required={true}
                    onChange={selectChange}
                    emptyoption={true}
                    errors={errors?.company_representatives}

                >
                    {
                        company_representatives?.length?
                            company_representatives.map(cr=>(
                                <option key={cr?.id} value={cr?.id}>{cr?.name}</option>   
                            ))
                        :
                        null
                    }  
                </SelectInput>

                

                <div className="mt-5">
                    <CheckBox 
                        changeCheckBox={changeCheckBox}
                        checked={caseForm?.is_aganist_company}
                        label='هل القضية ضد الشركة ؟ '
                        labelId='is_aganist_company'
                        name='is_aganist_company'
                    />
                </div>
                
            </div>
            
        </ToggledCard>
        
        <ToggledCard
            title='الملاحظات'
            className='bg-container'
        >
            <div className="mt-5">    
                <TextArea
                    labelId={'notes'}
                    onChange={onChange}
                    value={caseForm?.notes}
                    label={'ملاحظات القضية'}
                    errors={errors?.notes}
                >
                </TextArea>
            </div>
        </ToggledCard>

        <ToggledCard
            title='المرفقات'
            className='bg-container'
        >
            <div className="grid lg:grid-cols-6 md:grid-cols-4 sm-grid-cols-2 gap-3 items-center">
                {
                    caseForm?.case_attachment?.length?
                        caseForm.case_attachment?.map((attch:File|string, idx)=>(
                            <div className="" key={idx}>
                                <ImageInput
                                    labelId={'image'}
                                    type={'file'}
                                    onChange={changeCurrentFile}
                                    file={attch}
                                    label={`المرفق رقم(${idx})`}
                                    required= {false}
                                    errors={errors?.attch}
                                />
                            </div>
                        ))
                    :null
                }

                <div className="">
                    <ImageInput
                        labelId={'image'}
                        type={'file'}
                        onChange={changeCurrentFile}
                        file={file}
                        label={`المرفقات`}
                        required= {false}
                        // errors={errors?.attch}
                    />
                </div>
            </div>
        </ToggledCard>
      
      

      

      
      
      <div className="grid grid-cols-2 gap-2">
            <Button submit className='bg-primary hover:bg-transparent border-primary' title={'حفظ'} isLoading={isLoading} />
            <Link 
                href={'/cases'} 
                className='w-full py-2 rounded-lg border border-secondary text-center hover:bg-secondary hover:text-white transition-all'
            >
                إلغاء
            </Link>
      </div>

    </form>
    </div>
  )
}

export default CaseForm
