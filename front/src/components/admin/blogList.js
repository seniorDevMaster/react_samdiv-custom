import React, { useEffect, useState } from "react"
import Config from "../../config.json"
import { Redirect } from "react-router-dom"

import "./admin.css"

function BlogList(props) {
    const [blogContent, setBlogContent] = useState()

    useEffect(() => {
        fetch(`${Config.serverapi}/getBlogList`, {
            method: "post",
            headers: {
                "accept": "application/json",
                "content-type": "application/json",
            },
        })
            .then((res) => res.json())
            .then((data) => {
                setBlogContent(data)
            })
            .catch((err) => console.log(err))
    }, [])

    const handleEdit = (id) => {
        localStorage.setItem('blogId', id)
        window.location.href = '/admin/insertBlog'
    }

    let list = Array.isArray(blogContent)
        ? blogContent.map((blog, key) => {
            return (
                <tr id={blog._id} key={key} >
                    <td className="col-md-3 txt-center">{key}</td>
                    <td
                        className="col-md-6 txt-center"
                    >
                        {blog.blogTitle}
                    </td>
                    <td className="col-md-3 txt-center" style={{ textAlign: "center" }}>
                        <button
                            type="button"
                            className="blogEdit"
                            onClick={() => {
                                handleEdit(blog._id)
                            }}
                        >
                            <svg viewBox="0 0 24 24">
                                <path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34c-.39-.39-1.02-.39-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z"></path>
                            </svg>
                        </button>
                    </td>
                </tr>
            )
        })
        : null

    return (
        <div className="blogList">
            <table id="customers" className="col-sm-12">
                <thead>
                    <tr>
                        <th className="col-md-2">{"No"}</th>
                        <th className="col-md-6">{"BlogTitle"}</th>
                        <th className="col-md-3">{"Edit"}</th>
                    </tr>
                </thead>
                <tbody>
                    {list}
                </tbody>
            </table>
        </div>
    )
}

export default BlogList
