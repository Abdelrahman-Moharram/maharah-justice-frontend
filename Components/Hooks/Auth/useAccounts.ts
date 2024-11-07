import { ChangeEvent, useState } from "react"
import { ValidationsType } from "@/Components/Types/Others";
import { DefaultInputValidate } from "../Common/useValidations";
import { useGetAddUserDropDownsQuery } from "@/redux/api/accountsApi";
interface UserType{
    id?: string,
    full_name: string,
    username: string,
    role: string,
    user_type: string,
    password:string
}
export const useUsersForm = () =>{
    const [formErrors, setFormErrors] = useState<any>(null)
    const {data:dropDowns} = useGetAddUserDropDownsQuery(undefined)
    const [user, setUser] = useState<UserType>({
        id: '',
        full_name: '',
        username: '',
        role: '',
        user_type: '',
        password:''
    })

    const onChange = (event: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLTextAreaElement>, validationSchema?:ValidationsType ) => {
        const { name, value } = event.target;
        if(validationSchema)
            setFormErrors({...formErrors, [name]:DefaultInputValidate({name, value, validationSchema})})
        setUser({ ...user, [name]: value });
    };
    
    const selectChange = (e: ChangeEvent<HTMLSelectElement>,  validationSchema?:ValidationsType)=>{
        const { name, value } = e.target;        
        if(validationSchema)
            setFormErrors({...formErrors, [name]:DefaultInputValidate({name, value, validationSchema})})
        setUser({ ...user, [name]: value });
    }


    const getUserAsFormData = () =>{
        
        const formData = new FormData()
        if(user?.id)
            formData.append('id', user.id)
        formData.append('username', user.username)
        formData.append('full_name', user.full_name)
        formData.append('role', user.role)
        formData.append('user_type', user.user_type)
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