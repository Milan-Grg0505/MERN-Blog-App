import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { setLoading } from '@/redux/authSlice'
import { setBlog } from '@/redux/blogSlice'
import axios from 'axios'
import { Loader2 } from 'lucide-react'
import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { toast } from 'sonner'

const CreateBlog = () => {

  const [title,setTitle] = useState("");
  const [category,setCategory]= useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {blog} = useSelector(state => state.blog);
  const {loading} =useSelector(state=>state.auth);
  // console.log(blog)
  const getSelectedCategory = (value) =>{
    setCategory(value)
  }
  const handleCreateBlog = async () =>{
    try {
      dispatch(setLoading(true))
      const res = await axios.post(`http://localhost:8000/api/v1/blog/`,{title,category},{
        headers:{
          "Content-Type":"application/json"
        },
        withCredentials:true
      });

      if(res.data.success){
        const currentBlogs = Array.isArray(blog) ? blog: [];
        dispatch(setBlog([...currentBlogs,res.data.blog]));
        navigate(`/dashboard/write-blog/${res.data.blog._id}`);
        toast.success(res.data.message);
      }else{
        toast.error("Something went wrong");
      }
    } catch (error) {
      console.log(error)
    }finally{
      dispatch(setLoading(false))
    }
  }


  return (
    <div className='p-4 md:pr-20 h-screen md:ml-[320px] pt-20'>
      <Card className="md:p-10 p-4 dark:bg-gray-800">
        <h1 className='text-2xl font-bold'>Let's create blog</h1>

        <p className=''>Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolores voluptatibus doloribus cumque, ipsam excepturi porro asperiores molestiae possimus laborum autem.</p>
        <div className='mt-7'>
          <div className='space-y-2'>
            <Label>Title</Label>
            <Input type="text" 
            value={title}
            onChange={(e)=> setTitle(e.target.value)}
            placeholder="Your Blog Name" className="bg-white dark:bg-gray-700" />
          </div>
          <div className='mt-4 space-y-2'>
            <Label>Category</Label>
            <Select onValueChange={getSelectedCategory}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Select a category" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel className="font-bold text-lg">Category</SelectLabel>
                  <SelectItem value="Web Development">Web Development</SelectItem>
                  <SelectItem value="Digital Marketing">Digital Marketing</SelectItem>
                  <SelectItem value="Blogging">Blogging</SelectItem>
                  <SelectItem value="Photography">Photography</SelectItem>
                  <SelectItem value="Cooking">Cooking</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>

          </div>

          <div className='flex gap-2 mt-4'>
            <Button disabled={loading} onClick={handleCreateBlog}>
              {
                loading ? 
                <>
                <Loader2 className='mr-2 w-4 h-4 animate-spin'/>
                <p>Please Wait</p>
                </> 
                :
                "Create"
              }
             
            </Button>
          </div>
        </div>
      </Card>

    </div>
  )
}

export default CreateBlog