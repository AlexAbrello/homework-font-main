import { useMeQuery } from "@/services/auth/auth-api"
import { useState } from "react"
import { EditInfo } from "./edit-info/edit-info"
import { PersonalInfo } from "./personal-info/personal-info"


export const Profile = () => {

   const [showInput, setShowInput] = useState(false)

   const { data } = useMeQuery()

   const onChangeHandler = () => setShowInput(!showInput)

   return (
      <>
         {data && showInput
            ? <EditInfo data={data} callBack={onChangeHandler} />
            : <PersonalInfo data={data} callBack={onChangeHandler} />}
      </>

   )
}