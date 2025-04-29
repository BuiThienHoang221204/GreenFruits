import React, { useEffect, useState } from 'react'
import { useAppContext } from '../../context/AppContext'
import { toast } from 'react-hot-toast'

function Comments() {
    const { axios, user } = useAppContext()
    const [comments, setComments] = useState([])

    const fetchComment = async () => {
        try {
            const { data } = await axios.get('/api/contact/seller')
            console.log(data);
            if (data.success) {
                setComments(data.contacts)
            } else {
                toast.error(data.message);
            }
        } catch (error) {
            toast.error(error.message);
        }
    }

    useEffect(() => {
        fetchComment()
    }, [])
    return (
        <div className='no-scrollbar flex flex-col h-[95vh] overflow-y-scroll'>
            <div className="md:p-10 p-4 space-y-4">
                <h2 className="text-lg font-medium">Users Contacted </h2>
                {comments.map((comment, index) => (
                    <div key={index} className="flex flex-col md:grid md:grid-cols-[2fr_1fr_1fr_1fr] md:items-center md:flex-row justify-between gap-5 p-5 max-w-4xl rounded-md border border-gray-300">
                        <div className="md:flex md:gap-5">
                            <div className='min-w-60'>
                                <p>Tên người dùng: </p>
                                <p>Email: </p>
                                <p>Số điện thoại: </p>
                                <p>Tiêu đề: </p>
                                <p>Nội dung:</p>
                            </div>
                            <div className='md:min-w-150'>
                                <div key={index} className="flex flex-col font-medium">
                                    <p>{comment.name}</p>
                                    <p>{comment.email}</p>
                                    <p>{comment.phone}</p>
                                    <p>{comment.subject}</p>
                                    <p>{comment.message}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>

    );
}

export default Comments