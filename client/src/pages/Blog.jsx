import React from 'react'
import { blogs } from '../assets/data'

const Blog = () => {
  return (
    <div className="pb-28 pt-20 font-sans text-gray-800">
      <div className="max-padd-container">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {blogs.map((blog, index) => (
            <div key={index} className="group">
              {/* Card */}
              <div className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300 flex flex-col h-full">
                
                {/* Image */}
                <div className="relative overflow-hidden h-48 w-full flex-shrink-0">
                  <img
                    src={blog.image}
                    alt={blog.title}
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-pink-50/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </div>

                {/* Info */}
                <div className="p-4 flex flex-col flex-1">
                  <p className="text-xs text-pink-400 font-medium mb-1">{blog.category}</p>
                  <h5 className="text-md font-semibold text-gray-900 mb-2 line-clamp-2">{blog.title}</h5>
                  <p className="text-gray-600 text-sm line-clamp-3 flex-1">{blog.description}</p>
                  <button className="mt-3 text-pink-500 font-medium underline text-sm hover:text-pink-600 transition-colors">
                    Continue reading
                  </button>
                </div>

              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Blog
