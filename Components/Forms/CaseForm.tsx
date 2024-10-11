import React, { ChangeEvent, FormEvent, useState } from 'react'
import Button from '@/Components/Common/Button';
import { FloatingInput, FloatingSelectInput, FloatingTextarea, ImageInput } from '@/Components/Forms'
import ToggledCard from '../Cards/ToggledCard';
import CustomerSearchInput from './CustomerSearchInput';

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
    state:  string;
    litigation_type:  string;
    company_representative: string;
    customer: string;
    cust_phone_number:  string;
    commercial_number:  string;
    date_ar:  string;
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
  
    onChange:(event: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLTextAreaElement> )=>void;
    changeCheckBox:(event: ChangeEvent<HTMLInputElement> )=>void;
    selectChange:(e: ChangeEvent<HTMLSelectElement> )=> void;
    imageChange?: (file:File )=> void | undefined;
    changeCustomer: (val:string)=>void,
    caseForm:CaseType,
    formSubmit:(e:FormEvent<HTMLFormElement>) =>void
    isLoading:boolean
    errors?:any | null
    type?: string
    add?:boolean
}
const CaseForm = ({
    onChange, 
    errors, 
    formSubmit, 
    selectChange, 
    changeCustomer, 
    caseForm, 
    imageChange, 
    type, 
    add, 
    isLoading, 
    LitigationTypes,
    cities,
    states,
    circulars,
    company_representatives,
    courts,
    changeCheckBox
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
                    <FloatingInput
                        labelId={'case_number'}
                        type={'text'}
                        onChange={onChange}
                        value={caseForm?.case_number}
                        label={'رقم القضية'}
                        required= {true}
                        errors={errors?.case_number}
                    />
                </div>
                <FloatingInput
                    labelId={'date_ar'}
                    type={'text'}
                    onChange={onChange}
                    value={caseForm?.date_ar}
                    label={'تاريخ القضية'}
                    required= {true}
                    errors={errors?.date_ar}
                />
                <FloatingSelectInput
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
                </FloatingSelectInput>


                

                <FloatingSelectInput
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
                </FloatingSelectInput>


                <FloatingSelectInput
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
                </FloatingSelectInput>

            
                <FloatingSelectInput
                    label='رقم الدائرة'
                    labelId='circular'
                    value={caseForm?.circular}
                    required={true}
                    onChange={selectChange}
                    emptyoption={true}
                    errors={errors?.circular}
                >
                    {
                        circulars?.length?
                            circulars.map(circular=>(
                                <option key={circular.id} value={circular.id}>{circular.number}</option>   
                            ))
                        :
                        null
                    }
                </FloatingSelectInput>
                    

                <FloatingSelectInput
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
                </FloatingSelectInput>

                <FloatingInput
                    labelId={'amount'}
                    type={'text'}
                    onChange={onChange}
                    value={caseForm?.amount}
                    label={'مبلغ القضية'}
                    required= {true}
                    errors={errors?.amount}
                />

                <FloatingInput
                    labelId={'agreement_number'}
                    type={'text'}
                    onChange={onChange}
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
                    label='العميل'
                    labelId='custumer'
                    onChange={changeCustomer}
                    // emptyoption={true}
                    // errors={errors?.litigation_type}
                    oldNameValue={caseForm?.customer_name}
                    type='text'
                >
                </CustomerSearchInput>

                <FloatingInput
                    labelId={'cust_phone_number'}
                    type={'text'}
                    onChange={onChange}
                    value={caseForm?.cust_phone_number}
                    label={'رقم جوال العميل'}
                    required= {true}
                    errors={errors?.cust_phone_number}
                />


                <FloatingInput
                    labelId={'commercial_number'}
                    type={'text'}
                    onChange={onChange}
                    value={caseForm?.commercial_number}
                    label={'رقم السجل التجاري'}
                    required= {true}
                    errors={errors?.commercial_number}
                />

                <FloatingSelectInput
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
                </FloatingSelectInput>

                

                <label
                    htmlFor="Option1"
                    className="flex cursor-pointer items-start gap-4 rounded-md border py-1.5 px-4 transition hover:bg-card"
                    >
                    <div className="flex items-center">
                        &#8203;
                        <input checked={caseForm?.is_aganist_company} name='is_aganist_company' onChange={changeCheckBox} type="checkbox" className="size-4 rounded border" id="Option1" />
                    </div>

                    <div>
                        <strong className="font-medium "> هل القضية ضد الشركة ؟ </strong>
                    </div>
                </label>
                
            </div>
            <div className="mb-2 space-y-3">
                
            </div>
        </ToggledCard>
        
        <ToggledCard
            title='الملاحظات'
            className='bg-container'
        >
            <div className="mt-5">    
                <FloatingTextarea
                    labelId={'notes'}
                    onChange={onChange}
                    value={caseForm?.notes}
                    label={'ملاحظات القضية'}
                    errors={errors?.notes}
                >
                </FloatingTextarea>
            </div>
        </ToggledCard>

        <ToggledCard
            title='المرفقات'
            className='bg-container'
        >
            <div className="grid grid-cols-3 gap-3 items-center">
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
      
      

      

      
      
      <div className="">
          <Button title={type?type:'حفظ'} isLoading={isLoading} submit />
      </div>

    </form>
    </div>
  )
}

export default CaseForm
