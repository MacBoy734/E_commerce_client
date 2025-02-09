"use client"
import { useState } from "react";
import { useDispatch } from "react-redux"
import { logout } from "../slices/authSlice"
import { toast } from "react-toastify"
import { useRouter } from "next/navigation"


const NewsletterForm = () => {
    const router = useRouter()
    const dispatch = useDispatch()
    const [subject, setSubject] = useState("");
    const [body, setBody] = useState("")
    const [isSending, setIsSending] = useState(false)

    const handleSubmit = async (e) => {
        e.preventDefault();

        if(!body || !subject){
            toast.error('please enter all details!')
            return
        }

        try {
            setIsSending(true)
            const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/users/sendnewsletter`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ subject, body }),
                credentials: 'include'
            });
            if (!res.ok) {
                const { error } = await res.json()
                if (res.status === 403) {
                    dispatch(logout())
                    router.replace('/auth/login')
                    toast.error(error)
                    return
                }
                toast.error(error)
                return
            }
            setSubject('')
            setBody('')
            toast.success('newletter sent successfully')
        } catch (err) {
            toast.error(err.message)
        }finally{
            setIsSending(false)
        }
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4 text-black p-10">
            <div>
                <h1 className="text-center underline text-xl py-10 font-semibold font-montserrat">Send Newsletter</h1>
                <label htmlFor="subject" className="block text-sm font-medium">Subject</label>
                <input
                    id="subject"
                    type="text"
                    value={subject}
                    onChange={(e) => setSubject(e.target.value)}
                    className="w-full p-2 border rounded"
                    required
                />
            </div>
            <div>
                <label htmlFor="body" className="block text-sm font-medium">Body</label>
                <textarea
                    id="body"
                    value={body}
                    onChange={(e) => setBody(e.target.value)}
                    className="w-full p-2 border rounded"
                    required
                />
            </div>
            <button type="submit" disabled={isSending} className={`bg-blue-500 text-white p-2 rounded ${isSending && 'opacity-50'}`}>{isSending ? 'Sending...' : 'Send Newsletter'}</button>
        </form>
    );
};

export default NewsletterForm;
