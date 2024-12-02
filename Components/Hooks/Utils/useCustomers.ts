import { CustomerFormType } from "@/Components/Types/customer";
import { ChangeEvent, useEffect, useState } from "react";
import { DefaultInputValidate } from "../Common/useValidations";
import { ValidationsType } from "@/Components/Types/Others";
import { useGetCustomerDropDownsQuery, useGetCustomerFormDataMutation } from "@/redux/api/utilsApi";

export const useCustomers = ({customerId}:{customerId?:string}) =>{
    const [errors, setErrors] = useState<any>([])
    const {data:dropdowns} = useGetCustomerDropDownsQuery(undefined)
    const [getCustomerFormData] = useGetCustomerFormDataMutation()
    const [customer, setCustomer] = useState<CustomerFormType>({
        id:customerId,
        name:'',
        customer_type:'',
        gender:'',
        identity_number:'',
        is_company:false,
        number:''
    })
    useEffect(()=>{
        if(customerId){
            getCustomerFormData({customer_id:customerId})
                .unwrap()
                .then(res=>{                    
                    setCustomer(res?.customer)
                }).catch(err=>{
                    console.log(err);
                })
        }
    }
    ,[customerId])
    const onChange = (event: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLTextAreaElement>, validationSchema?:ValidationsType ) => {
        const { name, value } = event.target;
        
        if(validationSchema)
            setErrors({...errors, [name]:DefaultInputValidate({name, value, validationSchema})})
        setCustomer({ ...customer, [name]: value });
    };
    
    const selectChange = (e: ChangeEvent<HTMLSelectElement>, validationSchema?:ValidationsType )=>{
        const { name, value } = e.target;        
        if(validationSchema)
          setErrors({...errors, [name]:DefaultInputValidate({name, value, validationSchema})})
        setCustomer({ ...customer, [name]: value });
    }

    const changeCheckBox = (event: ChangeEvent<HTMLInputElement>, validationSchema?:ValidationsType )  =>{
      const { name, checked } = event.target;   
      if(validationSchema)
          setErrors({...errors, [name]:DefaultInputValidate({name, value:checked, validationSchema})})
        setCustomer({ ...customer, [name]: checked })
    }

    const getCustomerAsFormData = () =>{
        
        const formData = new FormData()
        if (customer?.id)
            formData.append('id', customer.id)

        formData.append('number', customer.number)
        formData.append('name', customer.name)
        formData.append('customer_type', customer.customer_type)
        formData.append('identity_number', customer.identity_number)
        formData.append('gender', customer.gender)
        formData.append('is_company', JSON.stringify(customer.is_company))

        return formData
    }
    
    return {
        customer,
        errors,
        dropdowns,
        onChange,
        setErrors,
        setCustomer,
        selectChange,
        changeCheckBox,
        getCustomerAsFormData
    }
}
 