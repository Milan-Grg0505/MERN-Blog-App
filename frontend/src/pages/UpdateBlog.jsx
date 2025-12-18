import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import JoditEditor from 'jodit-react';
import React, { useRef, useState } from 'react'
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { setLoading } from '@/redux/authSlice';

const UpdateBlog = () => {
  const editor = useRef(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const params = useParams();
  const id = params.blogId;

  const {blog} = useSelector(state => state.blog);
  const selectBlog = blog.find((blog) => blog._id === id);
  const [content,setContent] = useState(selectBlog.description);
  const [previewThumbnail,setPreviewThumbnail] = useState(selectBlog?.thubmbail);
  // console.log(params)

  const [blogData,setBlogData] = useState({
    title:selectBlog?.title ?? "",
    subtitle:selectBlog?.subtitle ?? "",
    description:content ?? "",
    category:selectBlog?.catergoty ?? "",

  });

  const handleChange = (e) =>{
    const {name,value} = e.target;
    setBlogData((prev) => ({
      ...prev,
      [name]:value,
    }))
  }

  const selectCategory = (value) =>{
    const currentBlogs = Array.isArray(blog) ? blog : [];
    setBlogData({...currentBlogs,category:value});
  }

  const selectThumbnail = (e) =>{
    const file = e.target.file?.[0];
    if(file){
      setBlogData({...blogData, thumbnail:file});
      const fileReader = new FileReader();
      fileReader.onloadend=() => setPreviewThumbnail(fileReader.result);
      fileReader.readAsDataURL(file)
    }
  }

  const handleUpdateBlog = async () =>{
    const formData = new FormData();
    formData.append("title",blogData.title);
    formData.append("subtitle",blogData.subtitle);
    formData.append("description",content);
    formData.append("category",blogData.category);
    formData.append("file",blogData.thumbnail);
    try {
      dispatch(setLoading(true))
     const res = await axios.put(`http://localhost:8000/api/v1/blog/${_id}`,formData,{
      headers:{
        "Content-Type":"multipart/form-data"
      },
      withCredentials:true,
     });

     if(res.data.success){
      toast.success(res.data.message);
      console.log(blogData);
     }
    } catch (error) {
      console.log(error)
    }finally{
      dispatch(setLoading(false))
    }
  }

  return (
    <div className='md:ml-[320px] pt-20 px-3 pb-10'>
      <div className='max-w-6xl mx-auto mt-8'>
        <Card className="w-full bg-white dark:bg-gray-800 p-5 space-y-2">
          <h1 className='font-bold text-4xl'>Basic Blog Information</h1>
          <p>Make changes to your blog here.Click publish when you are done.
          </p>

          <div className='space-x-2'>
            <Button>
              Publish
            </Button>
            <Button variant="destructive">
              Remove
            </Button>
          </div>

          <div className='pt-10 space-y-2'>
            <Label>Title</Label>
            <Input type="text" placeholder="Enter a title" className="dark:border-gray-300" />

          </div>

          <div className='space-y-2'>
            <Label>Subtitle</Label>
            <Input type="text" placeholder="Enter a title" className="dark:border-gray-300" />
          </div>

          <div className='space-y-2'>
            <Label>Desctiption</Label>
            <JoditEditor
              ref={editor}
              className='jodit_toolbar'
            />
          </div>

          <div className='space-y-2'>
            <Label>Category</Label>
            <Select>
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

          <div className="space-y-2">
            <Label>Thumbnail</Label>
            <Input
              type="file"
              id="file"
              accept="image/*"
              className="w-fit dark:border-gray-300"
              >
            </Input>
          </div>


          <div className='flex gap-3'>
            <Button>
              Save
            </Button>
            <Button variant="outline" onClick={() =>navigate(-1)}>
              Back
            </Button>

          </div>

        </Card>

      </div>
    </div>
  )
}

export default UpdateBlog