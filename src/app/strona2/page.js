"use client"
import PocketBase from 'pocketbase';
import { baseUrl } from '@/lib/constants'
import { useEffect, useState } from 'react';
import { AlertCircle } from "lucide-react"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import {
  Alert,
  AlertDescription,
  AlertTitle,
} from "@/components/ui/alert"
import { Button } from '@/components/ui/button';
import { Update } from '@/components/UpdatePost';
const pb = new PocketBase(baseUrl);
export default function Home() {
  const [data, setData] = useState(pb.authStore.model)
  const [posts, setPosts] = useState(null)
  useEffect(() => {
    getPosts()
  }, [])
  const getPosts = async () => {
    try {
      const records = await pb.collection('Posts').getFullList({
        sort: '-created',
      });
      setPosts(records)
    }
    catch (err) {
      console.log(err)
    }
  }
  const postDelete = async (item) => {
    try {
      await pb.collection('Posts').delete(item.id);
      setPosts((prev) => prev.filter((ite) => ite.id !== item.id))
    }
    catch (err) {
      console.log(err)
    }
  }
  const saveChanges = async (item, input) => {
    const record = await pb.collection('Posts').update(item.id, input);
    var tempArr = [...posts]
    for (let i in tempArr) {
      if (record.id == tempArr[i].id) {
        tempArr[i] = record
      }
    }
    setPosts(tempArr)
  }
  if (!posts) {
    return <p>Loading...</p>;
  }
  return (
    <>
      {data ? (
        <div>
          <h1>Dane</h1>
          {posts ? (
            posts.map((item) => (
              <Card key={item.id}>
                <CardHeader>
                  <CardTitle>{item.Title}</CardTitle>
                </CardHeader>
                <CardContent>
                  {item.Description}
                </CardContent>
                <CardFooter>
                  {item.Author_id === data.id ? (
                    <>
                      <AlertDialog>
                        <AlertDialogTrigger asChild>
                          <Button variant='destructive'>Delete</Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                          <AlertDialogHeader>
                            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                            <AlertDialogDescription>
                              This action cannot be undone. This will permanently delete your account
                              and remove your data from our servers.
                            </AlertDialogDescription>
                          </AlertDialogHeader>
                          <AlertDialogFooter>
                            <AlertDialogCancel>Cancel</AlertDialogCancel>
                            <AlertDialogAction onClick={() => { postDelete(item) }}>Continue</AlertDialogAction>
                          </AlertDialogFooter>
                        </AlertDialogContent>
                      </AlertDialog>
                      <Update item={item} saveChanges={saveChanges} />
                    </>
                  ) : ('Nie możesz')}
                </CardFooter>
              </Card>
            ))
          ) : (
            <p>No posts available</p> // Or any other fallback message
          )}
        </div>
      ) : (
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>
            Your session has expired. Please log in again.
            <Button variant='outline' onClick={() => window.location.href = '/loginForm'} className='ml-2'>Login</Button>
          </AlertDescription>
        </Alert>
      )}
    </>
  );
}
