import { ChangeEvent, useEffect, useState } from "react"
import { ValidationsType } from "@/Components/Types/Others";
import { DefaultInputValidate } from "../Common/useValidations";
import { useGetAddUserDropDownsQuery, useUserDetailsMutation } from "@/redux/api/accountsApi";
interface UserType{
    id?: string,
    full_name: string,
    username: string,
    role: string,
    user_type: string,
    password:string
}

const emptyUser = {
    id: '',
    full_name: '',
    username: '',
    role: '',
    user_type: '',
    password:''
}
export const useUsersForm = ({userId}:{userId?:string}) =>{
    
    
    const [formErrors, setFormErrors] = useState<any>(null)
    const {data:dropDowns} = useGetAddUserDropDownsQuery(undefined)
    const [userDetails] = useUserDetailsMutation()
    const [user, setUser] = useState<UserType>(emptyUser)

    useEffect(()=>{
        if(userId){
            userDetails({id:userId})
            .unwrap()
            .then(res=>{
                setUser(res?.user)
            })
            .catch(err=>{
                console.log(err);
            })
        }else{
            setUser(emptyUser)
        }
    }, [userId])

    const onChange = (event: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLTextAreaElement>, validationSchema?:ValidationsType ) => {
        const { name, value } = event.target;
        if(validationSchema)
            setFormErrors({...formErrors, [name]:DefaultInputValidate({name, value, validationSchema})})
        else{
            setFormErrors({...formErrors, [name]:undefined})   
        }
        setUser({ ...user, [name]: value });
    };
    
    const selectChange = (e: ChangeEvent<HTMLSelectElement>,  validationSchema?:ValidationsType)=>{
        const { name, value } = e.target;        
        if(validationSchema)
            setFormErrors({...formErrors, [name]:DefaultInputValidate({name, value, validationSchema})})
        else{
            setFormErrors({...formErrors, [name]:undefined})
        }
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