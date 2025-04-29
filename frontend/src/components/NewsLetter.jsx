import React from 'react'
import { assets } from '../assets/assets'

function NewsLetter() {
    return (
        <div className="mt-6 flex flex-col items-center  text-gray-900/60 rounded-xl md:w-full md:py-8 py-6">
            <div className="flex items-center justify-center p-3 bg-red-100 rounded-full">
                <img src={assets.logo} alt="faceIcon" />
            </div>
            <h2 className="text-slate-900 my-3 md:text-4xl text-2xl font-bold">Enjoying this post?</h2> 
            <p className="text-sm text-slate-900/60 mt-1 text-center">Subscribe to get more content like this delivered to your inbox for free!</p>
            <div className="flex items-center mt-5 md:w-150 md:px-16 px-6">
                <input type="email" placeholder="Enter Your Email" className="text-sm border-r-0 outline-none border border-gray-500/50 pl-3 w-full h-10 rounded-l-md" />
                <button type="button" className="font-medium text-sm text-white bg-primary w-36 h-10 rounded-r-md">Subscribe</button>
            </div>
        </div>
    )
}

export default NewsLetter