'use client'

import { useRouter } from 'next/navigation'

import { resetAuthenticationCredentials } from '../lib/action'
import MenuLink from './navbar/MenuLink'

const LogoutButton: React.FC = () => {
    const router = useRouter();

    const submitLogout = async () => {
        resetAuthenticationCredentials()

        router.refresh()
    }

    return (
        <MenuLink label='logout' onClick={submitLogout} />
    )
}

export default LogoutButton