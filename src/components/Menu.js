"use client"
import Link from "next/link";
import {
    Avatar,
    AvatarFallback,
    AvatarImage,
} from "@/components/ui/avatar"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useState } from "react";
import PocketBase from 'pocketbase';

const pb = new PocketBase('http://172.16.15.132:8080');
export default function Menu() {
    const [data, setData] = useState(pb.authStore.model)
    console.log(data)
    const handleLogout = ()=>{
        pb.authStore.clear()
        window.location.href='/'
    }
    const handleLogin = ()=>{
        window.location.href='/loginForm'
    }
    return (
        <div className="flex justify-between px-5 py-2">
            <div>
                <Link href='.'>Strona1</Link>
                <Link href='/strona2'>Strona2</Link>
            </div>
            <div>
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Avatar>
                            <AvatarImage src={data &&pb.files.getUrl(data,data.avatar)}/>
                            <AvatarFallback>CN</AvatarFallback>
                        </Avatar>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                        {!data &&(

                        <DropdownMenuLabel onClick={handleLogin}>Login</DropdownMenuLabel>
                        )}
                        {data && (

                        <DropdownMenuLabel onClick={handleLogout}>Logout</DropdownMenuLabel>
                        )}
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>
        </div>
    )
}