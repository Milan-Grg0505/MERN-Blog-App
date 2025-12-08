import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Logo from "../assets/logo.png"
import { Input } from './ui/input'
import { Button } from './ui/button'
import { ChartColumnBig, LogOut, Search, User } from 'lucide-react'
import { FaMoon, FaRegEdit, FaSun } from 'react-icons/fa'
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar'
import { useDispatch, useSelector } from 'react-redux'
import { toggleTheme } from "../redux/themeSlice.js"
import { toast } from 'sonner'
import axios from 'axios'
import { setUser } from '@/redux/authSlice'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { LiaCommentSolid } from "react-icons/lia"

const Navbar = () => {
  const { user } = useSelector(state => state.auth);
  const { theme } = useSelector(state => state.theme)
  // console.log(theme)
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = async (e) => {
    try {

      const res = await axios(`http://localhost:8000/api/v1/user/logout`, {
        withCredentials: true
      });

      if (res.data.success) {
        navigate("/")
        dispatch(setUser(null));
        toast.success(res.data.message);
      }

    } catch (error) {
      console.log(error)
      toast.error(error)
    }
  }

  return (
    <>
      <div className='py-2 fixed w-full dark:bg-gray-800 dark:border-b-gray-600 border-b-gray-300 border-2 bg-white z-50'>
        <div className='max-w-7xl mx-auto flex justify-between items-center px-4 md:px-2'>

          {/* logo section */}
          <div className='flex gap-7 items-center'>
            <Link to="/">
              <div className='flex gap-2 items-center'>
                <img
                  src={Logo}
                  alt="logo"
                  className='w-7 h-7 md:w-10 md:h-10 dark:invert' />
                <h1 className='font-bold text-3xl md:text-4xl'>
                  Logo
                </h1>
              </div>
            </Link>

            {/* search button */}
            <div className='relative hidden md:block'>
              <Input
                type="text"
                placeholder="Search here..."
                className="border border-gray-70 dark:bg-gray-500 bg-gray-300 w-[300px] hidden md:block"
              />
              <Button className="absolute right-0 top-0">
                <Search />
              </Button>
            </div>

          </div>

          {/* nav section */}
          <nav className='flex md:gap-7 gap-4 items-center'>
            <ul className='hidden md:flex gap-7 items-center text-xl font-semibold'>
              <Link to={'/'}>Home</Link>
              <Link to={"/blogs"}>Blogs</Link>
              <Link to="/about">About</Link>
            </ul>

            {/* dark mode and white mode */}
            <div className='flex'>
              <Button onClick={() => dispatch(toggleTheme())}>
                {
                  theme === "light" ? <FaMoon /> :
                    <FaSun />
                }

              </Button>

              {
                user ?
                  <div className='ml-7 flex gap-3 items-center'>

                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Avatar>
                          <AvatarImage src="https://github.com/shadcn.png" />
                          <AvatarFallback>
                            Avatar
                          </AvatarFallback>
                        </Avatar>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent className="w-56" align="start">
                        <DropdownMenuLabel>My Account</DropdownMenuLabel>
                        <DropdownMenuGroup>
                          <DropdownMenuItem>
                            {/* icon */}
                            <User />
                            Profile
                            <DropdownMenuShortcut>⇧⌘P</DropdownMenuShortcut>
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            {/* icon */}
                            <ChartColumnBig />
                            Your Blogs
                            <DropdownMenuShortcut>⌘B</DropdownMenuShortcut>
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            {/* icon */}
                            <LiaCommentSolid />
                            Comments
                            <DropdownMenuShortcut>⌘C</DropdownMenuShortcut>
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            {/* icon */}
                            <FaRegEdit />
                            Write Blog
                            <DropdownMenuShortcut>⌘W</DropdownMenuShortcut>
                          </DropdownMenuItem>
                        </DropdownMenuGroup>


                        <DropdownMenuSeparator />
                        <DropdownMenuItem>
                          {/* icon */}
                          <LogOut />
                          Log out
                          <DropdownMenuShortcut>⇧⌘Q</DropdownMenuShortcut>
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>

                    <Button onClick={handleLogout}>
                      Logout
                    </Button>

                  </div>
                  :
                  <div className='ml-7 md:flex gap-2'>

                    <Link to="/login">
                      <Button>Login</Button>
                    </Link>

                    <Link to={"/signup"}
                      className='hidden md:block'>
                      <Button>SignUp</Button>
                    </Link>

                  </div>
              }

            </div>

          </nav>

        </div>

      </div>
    </>
  )
}

export default Navbar