import { ChangeEvent, useEffect, useState } from "react"
import { ValidationsType } from "@/Components/Types/Others";
import { DefaultInputValidate, isErrorsList } from "../Common/useValidations";
import { useAddLawyerMutation, useEditLawyerMutation, useGetAddUserDropDownsQuery, useGetLawyerDetailsMutation, useUserDetailsMutation } from "@/redux/api/accountsApi";
import { toast } from "react-toastify";


const emptyUser = {
    id: '',
    full_name: '',
    username: '',
    role: '',
    user_type: '',
    password:''
}
export const useUsersForm = ({userId, toggler}:{userId?:string, toggler?:boolean}) =>{
    
    
    const [formErrors, setFormErrors] = useState<any>(null)
    const {data:dropDowns} = useGetAddUserDropDownsQuery(undefined)
    const [userDetails] = useUserDetailsMutation()
    const [user, setLawyer] = useState<UserType>(emptyUser)
 

    useEffect(()=>{
        if(userId){
            userDetails({id:userId})
            .unwrap()
            .then(res=>{
                setLawyer(res?.user)
            })
            .catch(err=>{
                
            })
        }else{
            setLawyer(emptyUser)
        }
    }, [userId, toggler])

    const onChange = (event: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLTextAreaElement>, validationSchema?:ValidationsType ) => {
        const { name, value } = event.target;
        if(validationSchema)
            setFormErrors({...formErrors, [name]:DefaultInputValidate({name, value, validationSchema})})
        else{
            setFormErrors({...formErrors, [name]:undefined})   
        }
        setLawyer({ ...user, [name]: value });
    };
    
    const selectChange = (e: ChangeEvent<HTMLSelectElement>,  validationSchema?:ValidationsType)=>{
        const { name, value } = e.target;        
        if(validationSchema)
            setFormErrors({...formErrors, [name]:DefaultInputValidate({name, value, validationSchema})})
        else{
            setFormErrors({...formErrors, [name]:undefined})
        }
        setLawyer({ ...user, [name]: value });
    }


    const getUserAsFormData = () =>{
        
        const formData = new FormData()
        if(user?.id)
            formData.append('id', user.id)
        formData.append('username', user.username)
        formData.append('full_name', user.full_name)
        formData.append('role', user.role)
        formData.append('user_type', user.user_type)
        if(!userId)
            formData.append('password', user.password)

        return formData
    }

    return {
        user,
        formErrors,
        dropDowns,
        setFormErrors,
        onChange,
        selectChange,
        getUserAsFormData,
    }

}

const emptyLawyer = {
    user:'',
    email:'',
    phone_number:'',
    username:'',
    is_consultant:false
}
export const useLawyersForm = ({lawyerId, toggler}:{lawyerId?:string, toggler?:boolean}) =>{
    const [formErrors, setFormErrors] = useState<any>(null)
    const [lawyerDetails] = useGetLawyerDetailsMutation()
    const [lawyer, setLawyer] = useState<LawyerType>(emptyLawyer)
       
    const [addLawyer, {isLoading:addLoading}] = useAddLawyerMutation()
    const [editLawyer, {isLoading:editLoading}] = useEditLawyerMutation()
    
    useEffect(()=>{
        setLawyer(emptyLawyer)
        if(lawyerId){
            lawyerDetails({id:lawyerId})
                .unwrap()
                .then(res=>{
                    setLawyer(res?.lawyer)
                })
                .catch(err=>{
                    setLawyer(emptyLawyer)
                })
        }
    }, [lawyerId, toggler])

    const onChange = (event: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLTextAreaElement>, validationSchema?: ValidationsType) => {
        const { name, value } = event.target;
        if(validationSchema)
            setFormErrors({...formErrors, [name]:DefaultInputValidate({name, value, validationSchema})})
        else{
            setFormErrors({...formErrors, [name]:undefined})   
        }
        setLawyer({ ...lawyer, [name]: value });
    };
    
    const changeUser = (val:string, name:string, validationSchema?:ValidationsType)=>{
        if(validationSchema)
            setFormErrors({...formErrors, user:DefaultInputValidate({name:'user', value:val, validationSchema})})
        setLawyer({ ...lawyer, [name]: val })
    }

    const changeCheckBox = (event: ChangeEvent<HTMLInputElement>, validationSchema?:ValidationsType )  =>{
        const { name, checked } = event.target;   
        if(validationSchema)
            setFormErrors({...formErrors, [name]:DefaultInputValidate({name, value:checked, validationSchema})})
          setLawyer({ ...lawyer, [name]: checked })
    }
    useEffect(()=>{
        setFormErrors({...formErrors, user:''})
    }, [lawyer?.user])


    const getLawyerAsFormData = () =>{
        
        const formData = new FormData()
        if(lawyer?.id)
            formData.append('id', lawyer.id)

        formData.append('email', lawyer.email)
        formData.append('phone_number', lawyer.phone_number)
        formData.append('user', lawyer.user)
        formData.append('is_consultant', JSON.stringify(lawyer.is_consultant))
        return formData
    }

    const handleLawyer = (action:()=>void) =>{
        if(lawyerId){
            setFormErrors({...formErrors})
        }
        if(isErrorsList(formErrors, lawyerId?['password']:[])){
            toast.error('برجاء التأكد من إدخال بيانات المستخدم بشكل صحيح أولا')
            return
        }
        if(lawyerId)
        {
            editLawyer({id:lawyerId, form:getLawyerAsFormData()})
            .unwrap()
            .then(res=>{
                toast.success(res?.data?.message || 'تم تعديل المستخدم بنجاح')
                action()
                setLawyer(emptyLawyer)
            })
            .catch(err=>{
                setFormErrors(err?.data?.errors)
                if(err?.status !== 403)
                    toast.error(err?.data?.message || 'حدث خطأ ما أثناء إضافة المستخدم')
            })
        }else{
            addLawyer({form:getLawyerAsFormData()})
                .unwrap()
                .then(res=>{
                    toast.success(res?.data?.message || 'تم نعديل المستخدم بنجاح')
                    action()
                    setLawyer(emptyLawyer)
                })
                .catch(err=>{
                    setFormErrors(err?.data?.errors)
                    if(err?.status !== 403)
                        toast.error(err?.data?.message || 'حدث خطأ ما أثناء إضافة المستخدم')
                })
        }
    }

    return {
        lawyer,
        formErrors,
        isLoading:addLoading || editLoading,
        onChange,
        changeUser,
        changeCheckBox,
        handleLawyer,
    }
}