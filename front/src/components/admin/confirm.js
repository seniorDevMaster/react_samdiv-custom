import React, { useEffect, useState } from "react"
import Config from "../../config.json"

import "./admin.css"
function Confirm(props) {
    const [userData, setUserData] = useState()

    useEffect(() => {
        getAndSetServerData(`${Config.serverapi}/getCommentListWithBlogName`)
    }, [])

    const handleDeleteConfirm = (id) => {
        var r = window.confirm("The data you have deleted once can't retrieve again.");
        if (r == true) {
            handleDelete(id)
        } 
    }
    const handleDelete = (id) => {
        getAndSetServerData(`${Config.serverapi}/deleteComment`, {
            deleteId: id,
        })
    }
    const handleBlock = (id, status) => {
        getAndSetServerData(`${Config.serverapi}/updateCommentBlockAndAllow`, {
            blockId: id,
            blockStatus: status,
        })
    }
    function getAndSetServerData(url, value) {
        fetch(url, {
            method: "post",
            headers: {
                accept: "application/json",
                "content-type": "application/json",
            },
            body: JSON.stringify(value),
        })
            .then((res) => res.json())
            .then((data) => {
                console.log('data : ----------- ', data)
                setUserData(data)
            })
            .catch((err) => console.log(err))
    }

    let list = Array.isArray(userData)
        ? userData.map((user, key) => {
              return (
                  <tr id={user._id}>
                      <td className="col-md-1">{key}</td>
                      <td className="col-md-2">{user.blogTitle}</td>
                      <td className="col-md-1">{user.userName}</td>
                      <td className="col-md-5">{user.content}</td>
                      <td className="col-md-1">{user.commentDate}</td>
                      <td className="col-md-2" style={{ textAlign: "center" }}>
                          <button
                              className="btn btn-danger"
                              onClick={() => {
                                  handleDeleteConfirm(user._id)
                              }}
                          >
                              Delete
                          </button>
                          <button
                              className={
                                  user.commentAllow
                                      ? "btn btn-default"
                                      : "btn btn-info"
                              }
                              onClick={() => {
                                  handleBlock(user._id, user.commentAllow)
                              }}
                          >
                              {user.commentAllow ? "Block" : "Allow"}
                          </button>
                      </td>
                  </tr>
              )
          })
        : null

    return (
        <div className="blogList">
            <table id="customers" className="col-sm-12">
                <tr>
                    <th className="col-md-1">{"No"}</th>
                    <th className="col-md-2">{"BlogTitle"}</th>
                    <th className="col-md-1">{"UserName"}</th>
                    <th className="col-md-5">{"Description"}</th>
                    <th className="col-md-1">{"CommentDate"}</th>
                    <th className="col-md-2">{"Performance"}</th>
                </tr>
                {list}
            </table>
        </div>
    )
}

export default Confirm
