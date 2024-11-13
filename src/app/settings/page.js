"use client"
import Image from "next/image";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import {baseUrl} from '@/lib/constants'
import { useState } from "react";
import PocketBase from 'pocketbase'
import { Button } from "@/components/ui/button";
const pb = new PocketBase(baseUrl);
export default function Settings() {
    const [data, setData] = useState(pb.authStore.model)
    const [img, setImg] = useState(null)
    if(!data){
        window.location.href='/'
    }
    const handleImage = (e)=>{
        setImg(e.target.files[0])
    }
    const submitForm = async()=>{
        const dat = {
            avatar:img
        }
        const record = await pb.collection('users').update(data.id, dat);
        window.location.reload()
    }
  return (
    <div className='flex justify-center items-center'>
        {data &&(
            <div className="flex gap-2 flex-col">
        <Image src={pb.files.getUrl(data,data.avatar)} width={300} height={300} alt='imageS'/>
        <div className="flex flex-col space-y-1.5">
              <Label htmlFor="avatar">Change</Label>
              <Input id="avatar" placeholder="Image..." onChange={(e)=>{handleImage(e)}} type='file' />
              <Button onClick={submitForm}>Change</Button>
        </div>
        </div>
        )}
    </div>
  )
}