'use server';

import { error } from "console";
import { cookies } from "next/headers";

export async function handleRefresh() {
    console.log('handleRefresh')
    const cookieStore = await cookies()

    const refreshToken = await getRefreshToken()

    const token = await fetch('http://localhost:8000/api/auth/token/refresh/',
        {
            method: 'POST',
            body: JSON.stringify({
                refresh: refreshToken
            }),
            headers: {
                "Accept": 'application/json',
                'Content-Type': 'application/json'
            }
        }
    ).then(response => response.json())
    .then((data) => {
        console.log('response - refresh', data)

        if (data.access) {
            cookieStore.set('session_access_token', data.access, {
                httpOnly: true,
                secure: process.env.NODE_ENV === 'production',
                maxAge: 60*60, //1 hour
                path: '/'
            })
            
            return data.access
        } else{
            resetAuthenticationCredentials()
        }
    }).catch((error) => {
        console.log('error', error)

        resetAuthenticationCredentials()
    })

    return token
}

export async function handleLogin(userId: string, accessToken: string, refreshToken: string){
    const cookieStore = await cookies();
    cookieStore.set('session_userid', userId, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        maxAge: 60*60*24*7, //one week
        path: '/'
    })
    cookieStore.set('session_access_token', accessToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        maxAge: 60*60, //1 hour
        path: '/'
    })
    cookieStore.set('session_refresh_token', refreshToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        maxAge: 60*60*24*7, //one week
        path: '/'
    })
}

export async function resetAuthenticationCredentials(){
   const cookieStore = await cookies()
   cookieStore.set('session_userid', '')
   cookieStore.set('session_access_token', '')
   cookieStore.set('session_refresh_token', '')
}

// get data

export async function getUserId(){
    const cookieStore = await cookies()
    const userId = cookieStore.get('session_userid')?.value
    return userId ? userId : null
}

export async function getAccessToken(){
    const cookieStore = await cookies()
    let accessToken= cookieStore.get('session_access_token')?.value

    if (!accessToken){
        accessToken = await handleRefresh()
    }
    return accessToken

}

export async function getRefreshToken(){
    const cookieStore = await cookies()
    const refreshToken= cookieStore.get('session_refresh_token')?.value
    return refreshToken 

}