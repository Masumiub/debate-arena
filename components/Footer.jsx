import React from 'react';
import { FaGoogle } from "react-icons/fa";
import { FaFacebook } from "react-icons/fa";
import { FaYoutube } from "react-icons/fa";
import Link from 'next/link'
import { FaLinkedinIn } from "react-icons/fa";
import { FaTwitter } from "react-icons/fa6";
import { IoIosCall } from "react-icons/io";
import { MdEmail } from "react-icons/md";
import { FaLocationDot } from "react-icons/fa6";
//import logo from '../assets/logo.png'

const Footer = () => {
    return (
        <div className='shadow-md rounded-t-2xl'>
            <footer className="footer lg:footer-horizontal text-base-content px-5 pt-40 pb-40 mx-auhref" >

                <nav>
                    <div className='flex items-center'>
                     <img src="/assets/icons8-debate-100.png" alt="logo" className='w-12 mr-2' />
                    <Link href='/' className="text-3xl font-bold">Debate Arena</Link>
                    </div>

                    <p className='my-3'>Create or join debates, argue your stance, <br /> vote for the most compelling responses, and climb the scoreboard!</p>
                   
                    <div className='flex items-center gap-2'>
                    <div className='p-3 bg-blue-100 rounded-lg'><IoIosCall className='text-black'/> </div>
                    <p>+88 000 1111 2233 </p>
                    </div>

                    <div className='flex items-center gap-2 mt-3'>
                    <div className='p-3 bg-blue-100 rounded-lg'><MdEmail className='text-black'/></div>
                    <p>debateArena@contact.com</p>
                    </div>

                    <div className='flex items-center gap-2 mt-3'>
                    <div className='p-3 bg-blue-100 rounded-lg'><FaLocationDot className='text-black'/></div>
                    <p>1216/1/A, Street No - 98, Gulshan <br />
                    Dhaka, Bangladesh</p>
                    </div>

                </nav>
                <nav>
                    <h6 className="footer-title">Company</h6>
                        <Link href='/'>Home</Link>
                        <Link href='/all-debates'>Debates</Link>
                        <Link href='/'>About us</Link>
                        <Link href='/scoreboard'>Scores</Link>
                </nav>
                <nav>
                    <h6 className="footer-title">General</h6>
                    <Link href='/'>Our Team</Link> 
                    <a className="link link-hover">Terms & conditions</a>
                    <Link href='/'>Contact Us</Link> 
                    
                </nav>
                <form>
                    <h6 className="footer-title">Newsletter</h6>
                    <fieldset className="w-80">
                        <label>Enter your email address</label>
                        <div className="join mt-2">
                            <input
                                type="text"
                                placeholder="username@site.com"
                                className="input input-bordered join-item" />
                            <button className="btn bg-blue-500 text-white join-item">Join</button>
                        </div>
                    </fieldset>

                    <h6 className="footer-title">Follow us: </h6>
                    <div className='flex gap-3'>
                        
                        <a href="https://www.facebook.com/masum.musfique.2025" target='_blank'><FaFacebook size={20}/></a>
                        <a href="https://www.linkedin.com/in/musfique-77-masum/" target='_blank'><FaLinkedinIn size={20}/></a>
                        <a href="https://www.x.com/" target='_blank'><FaTwitter size={20}/></a>
                    </div>
                </form>
            </footer>
            <footer className="footer sm:footer-horizontal footer-center text-base-content py-8 px-4">
                <aside>
                    <p>Copyright © {new Date().getFullYear()} - All right reserved by Debate-Arena Ltd</p>
                </aside>
            </footer>
        </div>
    );
};

export default Footer;