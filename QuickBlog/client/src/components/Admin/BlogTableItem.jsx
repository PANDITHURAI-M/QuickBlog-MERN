import React from 'react'
import Blog from '../../pages/Blog';
import { assets } from '../../assets/assets';
import { useAppContext } from '../../context/AppContext';
import toast from 'react-hot-toast';

const BlogTableItem = ({blog,fetchBlogs,index}) => {

    const {title, createdAt} =blog;
    const BlogDate = new Date(createdAt);

    const {axios} = useAppContext();

    const deleteBlog = async ()=>{
      const confirm = window.confirm('Are you sure you want to delete this blog?')
      if(!confirm) return;
      try {
        const { data } = await axios.post('/api/blog/delete',{id:blog._id})
        if(data.success){
          toast.success(data.messsage)
          await fetchBlogs()
        }else{
          toast.error(data.messsage)
        }
      } catch (error) {
        toast.error(error.messsage)
      }
    }

    const togglePublish = async () =>{
      try {
      const {data} = await axios.post('/api/blog/toggle-publish',{id:blog._id})
      if(data.success){
        toast.success(data.messsage)
        await fetchBlogs()
      }else{
        toast.error(data.messsage)
      }
      } catch (error) {
        toast.error(error.messsage)
      }
    }
  return (
    <tr className='border-y border-gray-300'>
       <th className='px-2 py-4'>{index}</th>
       <td className='px-2 py-4'>{title}</td>
       <td className='px-2 py-4 max-sm:hidden'>{BlogDate.toDateString()}</td>
       <td className='px-2 py-4 max-sm:hidden'>
        <p className={ `${blog.isPublished ? "text-green-500" : "text-orange-700"}`}>{blog.isPublished ? 'Published' : 'Unpublished'}</p>
       </td>

       <td className='px-2 py-4 flex text-xs gap-3'>
           <button onClick={togglePublish} className='border px-2 py-0.5 mt-1 rounded cursor-pointer'>
            {blog.isPublished ? "UnPublish" : "Publish"}
           </button>
           <img src={assets.cross_icon} alt="" className='w-8 hover:scale-110 transition-all cursor-pointer' onClick={deleteBlog} />
       </td>
    </tr>
  )
}

export default BlogTableItem
