"use client"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useState } from "react"
export function Update({item, saveChanges}) {
    const [input,setInput] = useState({Title:item.Title, Description:item.Description})
    const handleInputs = (e,id)=>{
        setInput((prev)=>({...prev,[id]:e.target.value}))
    }
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">Update</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Edit Post</DialogTitle>
          <DialogDescription>
            Make changes to your Post here. Click save when you're done.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor={`title${item.id}`} className="text-right">
              Title
            </Label>
            <Input
              id={`title${item.id}`}
              value={input.Title}
              onChange={(e)=>{handleInputs(e,"Title")}}
              className="col-span-3"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor={`description${item.id}`} className="text-right">
              Description
            </Label>
            <Input
              id={`description${item.id}`}
              value={input.Description}
              onChange={(e)=>{handleInputs(e,"Description")}}
              className="col-span-3"
            />
          </div>
        </div>
        <DialogFooter>
          <Button onClick={()=>{saveChanges(item,input)}}>Save</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}