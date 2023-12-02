import { LogOut } from "@/assets/icons/log-out"
import { Write } from "@/assets/icons/write"
import { Avatar, Button, Card } from "@/components/ui"
import { Typography } from "@/components/ui/typography"
import { MeResponse, useLogoutMutation } from "@/services/auth/auth-api"
import { FC } from "react"
import s from './personal-info.module.scss'

type PersonalInfoProps = {
   data: MeResponse | null | undefined
   callBack: () => void
}

export const PersonalInfo: FC<PersonalInfoProps> = ({ data, callBack }) => {

   const [logOut] = useLogoutMutation()

   const onChangeHandler = () => callBack()

   return (
      <Card>
         <div style={{ height: '300px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', alignItems: 'center' }}>
            <div style={{ display: 'flex', alignItems: 'center' }}>
               <Typography.H2>Personal Information</Typography.H2>
               <Button variant="secondary" onClick={onChangeHandler} className={s.editButton}>
                  <Write />
               </Button>
            </div>
            <Avatar src={data?.avatar} size={100} />
            <Typography.Body1>{data?.name}</Typography.Body1>
            <Typography.Caption>{data?.email}</Typography.Caption>
            <Button variant={'secondary'} onClick={logOut} className={s.logoutButton}>
               <div style={{ display: 'flex' }}>
                  <div style={{ marginRight: '10px' }}>
                     <LogOut />
                  </div>
                  <Typography.Caption>Log Out</Typography.Caption>
               </div>
            </Button>
         </div>
      </Card>
   )
}