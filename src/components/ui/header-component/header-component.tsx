import { LogOut } from '@/assets/icons/log-out.tsx'
import { Logo } from '@/assets/icons/logo.tsx'
import { ProfileIcon } from '@/assets/icons/profile.tsx'
import { Avatar, DropdownComponent, Header } from '@/components/ui'
import { Typography } from '@/components/ui/typography'
import { useLogoutMutation, useMeQuery } from '@/services/auth/auth-api.ts'
import { Outlet, useNavigate } from 'react-router-dom'

export const Layout = () => {

  const { data } = useMeQuery()
  const [logOut] = useLogoutMutation()
  const navigate = useNavigate()

  return (
    <>
      <Header>
        <div onClick={() => navigate('/')}>
          <Logo />
        </div>
        {data?.name ? (
          <DropdownComponent trigger={<button><Avatar name={data.name} src={data.avatar} /></button>}>
            <div style={{ display: 'flex', alignItems: 'center' }} onClick={() => navigate('/profile')}>
              <div style={{ marginRight: '10px' }}>
                <ProfileIcon />
              </div>
              <Typography.Caption>My Profile</Typography.Caption>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', width: '140px' }} onClick={logOut}>
              <div style={{ marginRight: '10px' }}>
                <LogOut />
              </div>
              <Typography.Caption>Log Out</Typography.Caption>
            </div>
          </DropdownComponent>
        ) : (<></>)}
      </Header>
      <Outlet />
    </>
  )
}
