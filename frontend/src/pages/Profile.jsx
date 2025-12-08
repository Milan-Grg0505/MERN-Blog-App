import { Avatar, AvatarImage } from '@/components/ui/avatar'
import { Card } from '@/components/ui/card'
import userLogo from "../assets/user.jpg"
import React from 'react'
import { Link } from 'react-router-dom'
import { FaFacebook, FaGithub, FaInstagram, FaLinkedin, FaLinkedinIn } from 'react-icons/fa'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Textarea } from '@/components/ui/textarea'

const Profile = () => {
  return (
    <>
      <div className='pt-20 md:ml-[320px] md:h-screen'>
        <div className='max-w-6xl mx-auto mt-8'>
          <Card className="flex md:flex-row flex-col gap-10 p-6 md:p-10 dark:bg-gray-800 mx-4 md:mx-0">
            {/* image section */}
            <div className='flex flex-col items-center justify-center md:w-[400px]'>

              <Avatar className="w-40 h-40 border-2">
                <AvatarImage src={userLogo} />
              </Avatar>
              <h1 className='text-center font-semibold text-xl text-gray-700 dark:text-gray-300 my-3'>Mern stack developer</h1>
              {/* Social media links */}
              <div className='flex gap-4 items-center'>
                <Link>
                  <FaFacebook className='w-6 h-6 text-gray-800 dark:text-gray-300' />
                </Link>
                <Link>
                  <FaLinkedinIn className='w-6 h-6 text-gray-800 dark:text-gray-300' />
                </Link>
                <Link>
                  <FaGithub className='w-6 h-6 text-gray-800 dark:text-gray-300' />
                </Link>
                <Link>
                  <FaInstagram className='w-6 h-6 text-gray-800 dark:text-gray-300' />
                </Link>

              </div>
            </div>

            {/* info section */}
            <div>
              <h1 className='font-bold text-center md:text-start text-4xl mb-7'>Welcome User</h1>
              <p><span className='font-semibold'>Email :</span>user@gmail.com</p>

              <div className='flex flex-col gap-2 items-start justify-start my-5'>
                <Label>About Me</Label>
                <p className='border dark:border-gray-600 p-6 rounded-lg'>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Quas, et? Officia perspiciatis voluptates nostrum fugiat!
                </p>
              </div>

              {/* Edit Profile Dialog */}

              <Dialog>
                <form>
                  <DialogTrigger asChild>
                    <Button>Edit Profile</Button>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader>
                      <DialogTitle className="text-center">Edit profile</DialogTitle>
                      <DialogDescription className="text-center mb-1">
                        Make changes to your profile here.
                      </DialogDescription>
                    </DialogHeader>

                    <div className="grid gap-4">
                      {/* first name and last name */}
                      <div className='flex gap-2'>
                        <div className='space-y-2'>
                          <Label htmlFor="firstName">First Name</Label>
                          <Input
                            name="firstName"
                            placeholder="First Name"
                            type="text"
                            className="text-gray-500"
                          />
                        </div>
                        <div className='space-y-2'>
                          <Label htmlFor="lastName">
                            Last Name
                          </Label>
                          <Input
                            name="lastName"
                            type="text"
                            placeholder="Last Name"
                            className="text-gray-500"
                          />
                        </div>

                      </div>

                      {/* facebook and instagram */}
                      <div className='flex gap-2'>
                        <div className='space-y-2'>
                          <Label htmlFor="facebook">Facebook Name</Label>
                          <Input
                            name="facebook"
                            placeholder="Enter a URL"
                            type="text"
                            className="text-gray-500"
                          />
                        </div>
                        <div className='space-y-2'>
                          <Label htmlFor="instagram">
                            Instagram
                          </Label>
                          <Input
                            name="instagram"
                            type="text"
                            placeholder="Enter a URL"
                            className="text-gray-500"
                          />
                        </div>

                      </div>

                      {/* linkedin and github */}
                      <div className='flex gap-2'>
                        <div className='space-y-2'>
                          <Label htmlFor="linkedin">Linkedin</Label>
                          <Input
                            name="linkedin"
                            placeholder="Enter a URL"
                            type="text"
                            className="text-gray-500"
                          />
                        </div>
                        <div className='space-y-2'>
                          <Label htmlFor="github">
                            Github
                          </Label>
                          <Input
                            name="github"
                            type="text"
                            placeholder="Enter a URL"
                            className="text-gray-500"
                          />
                        </div>

                      </div>
                      
                      {/* Bio */}
                      <div className='space-y-2'>
                        <Label className="text-right">Description</Label>
                        <Textarea
                          name="bio"
                          className="col-span-3 text-gray-500"
                          placeholder="Enter a description" />

                      </div>

                      {/* Picture */}
                      <div className='space-y-2'>
                        <Label className="text-rigth">Picture</Label>
                        <Input
                          type="file"
                          accept="image/*"
                          className="w-full"
                        />
                      </div>
                    </div>
                    <DialogFooter>
                      <DialogClose asChild>
                        <Button variant="outline">Cancel</Button>
                      </DialogClose>
                      <Button type="submit">Save changes</Button>
                    </DialogFooter>
                  </DialogContent>
                </form>
              </Dialog>
            </div>
          </Card>
        </div>
      </div>

    </>
  )
}

export default Profile