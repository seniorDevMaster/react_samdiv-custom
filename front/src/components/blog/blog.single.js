import React, { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import { Link } from "react-router-dom"

// Require Editor JS files.
import "froala-editor/js/froala_editor.pkgd.min.js"
import "froala-editor/js/plugins.pkgd.min.js"
import "froala-editor/js/third_party/embedly.min.js"
import "froala-editor/js/plugins/fullscreen.min.js"

// Require Editor CSS files.
import "froala-editor/css/froala_style.min.css"
import "froala-editor/css/froala_editor.pkgd.min.css"
import "froala-editor/css/third_party/embedly.min.css"
import "froala-editor/css/plugins/fullscreen.min.css"

import FroalaEditorView from "react-froala-wysiwyg/FroalaEditorView"

import Config from "../../config.json"

import PageTitle from "../common/page.title"
import { JwModal } from "../dialog"
import Login from "../dialog/login"
import CommentForm from "../comment/comment-form"

import "./blog.single.css"

function SinglePost(props) {
    const socialAuth = useSelector((state) => state.auths)
    const [blogContent, setBlogContent] = useState()
    const [commentContent, setCommentContent] = useState()
    const [commentCnt, setCommentCnt] = useState(0)
    const [blogLike, setBlogLike] = useState(0)
    var comments = []

    useEffect(() => {
        fetchAndSetDataFromServer(
            `${Config.serverapi}/getBlogAndComment`,
            { blogId: props.match.params.id },
            1
        )
        fetchAndSetDataFromServer(`${Config.serverapi}/getLikeCount`, {
            blogId: props.match.params.id,
        })
    }, [])

    const goBack = () => {
        props.history.goBack()
    }

    const handleAddComment = (commentBody) => {
        var today = new Date().toLocaleDateString(undefined, {
            day: "2-digit",
            month: "2-digit",
            year: "numeric",
            hour: "2-digit",
            minute: "2-digit",
            second: "2-digit",
        })
        const comment = {
            blogId: blogContent[0]._id,
            parentId: 0,
            userName: socialAuth.profile.name,
            avatarUrl: socialAuth.profile.profilePicURL,
            email: socialAuth.profile.email,
            content: commentBody,
            commentDate: today,
        }

        fetchAndSetDataFromServer(`${Config.serverapi}/saveComment`, {
            comment,
        })
    }
    const handleCommentPost = (id, selfId) => {
        var today = new Date().toLocaleDateString(undefined, {
            day: "2-digit",
            month: "2-digit",
            year: "numeric",
            hour: "2-digit",
            minute: "2-digit",
            second: "2-digit",
        })
        const comment = {
            blogId: blogContent[0]._id,
            parentId: selfId,
            userName: socialAuth.profile.name,
            avatarUrl: socialAuth.profile.profilePicURL,
            email: socialAuth.profile.email,
            content: document.getElementById(id).childNodes[0].value,
            commentDate: today,
            parentKey: id,
        }

        fetchAndSetDataFromServer(`${Config.serverapi}/saveComment`, {
            comment,
        })

        document.getElementById(id).style.display = "none"
        document.getElementById(id).childNodes[0].value = ""
    }
    const handleCommentReply = (id) => {
        document.getElementById(id).style.display = "inline-block"
    }
    const handleCommentCancel = (id, parentId) => {
        document.getElementById(id).style.display = "none"
    }
    const handleLike = () => {
        console.log('socialAuth : ------- ', socialAuth)
        socialAuth.auth
            ? fetchAndSetDataFromServer(`${Config.serverapi}/updateLike`, {
                  blogId: blogContent[0]._id,
                  email: socialAuth.profile.email,
              })
            : JwModal.open("auth-modal")()
    }
    function getCommentSequenceData(commentData, padding = 0) {
        commentData.padding = padding
        comments.push(commentData)

        if (commentData.children.length > 0) {
            for (let i = 0; i < commentData.children.length; i++) {
                getCommentSequenceData(commentData.children[i], padding + 50)
            }
        }
    }
    function fetchAndSetDataFromServer(url, value, type = 2) {
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
                if (data.status === 1) {
                    setBlogLike(data.likecnt)
                    return
                }
                if (type === 1) setBlogContent(data.blogData)

                comments = []
                for (let i = 0; i < data.commentData.length; i++) {
                    getCommentSequenceData(data.commentData[i])
                }

                setCommentCnt(data.commentCount)
                setCommentContent(comments)
            })
            .catch((err) => console.log(err))
    }
    const commentNode = Array.isArray(commentContent)
        ? commentContent.map((comment) => {
              if (!comment.commentAllow) return

              return (
                  <div
                      className="CommentLevel top"
                      key={comment.selfId}
                      style={{ paddingLeft: comment.padding }}
                  >
                      <div className="Comment">
                          <div
                              className="Avatar"
                              style={{
                                  backgroundImage: `url(${comment.avatarUrl})`,
                                  borderRadius: "20px",
                                  width: "40px",
                                  height: "40px",
                              }}
                          ></div>
                          <div className="right">
                              <div className="top">
                                  <p> {comment.userName} </p>
                              </div>
                              <div className="message">
                                  <p> {comment.content} </p>
                              </div>
                              <div className="bottom">
                                  <div className="left">
                                      <span className="date desktopOnly">
                                          {comment.commentDate}
                                      </span>
                                      {socialAuth.auth ? (
                                          <button
                                              className="reply"
                                              onClick={() =>
                                                  handleCommentReply(
                                                      comment._id
                                                  )
                                              }
                                          >
                                              Reply
                                          </button>
                                      ) : null}
                                  </div>
                              </div>
                              {socialAuth.auth ? (
                                  <div
                                      id={comment._id}
                                      className=""
                                      style={{ display: "none", width: "100%" }}
                                  >
                                      <textarea
                                          className="commentTextarea"
                                          placeholder="Comment:"
                                      ></textarea>
                                      <button
                                          className="reply"
                                          onClick={() =>
                                              handleCommentPost(
                                                  comment._id,
                                                  comment.selfId
                                              )
                                          }
                                      >
                                          Post
                                      </button>
                                      <button
                                          className="reply"
                                          onClick={() =>
                                              handleCommentCancel(comment._id)
                                          }
                                      >
                                          Cancel
                                      </button>
                                  </div>
                              ) : null}
                          </div>
                      </div>
                  </div>
              )
          })
        : null

    const commentNew = (
        <div className="read">
            <button
                className="Button primary big"
                onClick={JwModal.open("auth-modal")}
            >
                Comment Now
            </button>
            {commentNode}
        </div>
    )

    return (
        <div className="main-content">
            <PageTitle title="Blog Details" bgimg="/images/bg/services.jpg" />

            <section>
                <div className="container mt-30 mb-30 pt-30 pb-30">
                    <div className="row">
                        <div className="mainContent col-md-12">
                            <div className="voteAndSocial">
                                <div className="comment counter">
                                    <span className="icon">
                                        <svg viewBox="0 0 18 18">
                                            <path d="M12.595 13.364c.01-.111.02-.197.028-.251.058-.405.372-.702.74-.702h1.257c1.035-.002 1.875-.934 1.88-2.082V4.764c-.001-1.155-.842-2.092-1.878-2.094H3.38c-1.034.002-1.873.931-1.88 2.076v5.565c.001 1.156.842 2.092 1.878 2.094h6.626c.292 0 .557.189.68.484.408.977 1.07 1.576 1.94 1.85a6.004 6.004 0 0 1-.03-1.375zm1.51 1.119c.048.314.136.521.235.606.566.487.258 1.497-.458 1.497-1.87 0-3.423-.785-4.33-2.51H3.376C1.513 14.07.004 12.39 0 10.311V4.74C.014 2.673 1.52 1.004 3.378 1h11.245c1.864.004 3.373 1.686 3.377 3.763v5.57c-.01 2.07-1.518 3.744-3.378 3.748h-.551c.004.138.016.273.035.402zm-8.423-5.81a1.114 1.114 0 1 0 0-2.229 1.114 1.114 0 0 0 0 2.229zm3.268 0a1.114 1.114 0 1 0 0-2.229 1.114 1.114 0 0 0 0 2.229zm3.318 0a1.114 1.114 0 1 0 0-2.229 1.114 1.114 0 0 0 0 2.229z"></path>
                                        </svg>
                                    </span>
                                    <span className="count">{commentCnt}</span>
                                </div>
                                <div
                                    className="upvote counter"
                                    onClick={(e) => handleLike(e)}
                                >
                                    <span className="icon">
                                        <svg viewBox="0 0 12 12">
                                            <path d="M1 10L6 0l5 10z"></path>
                                        </svg>
                                    </span>
                                    <span className="count">{blogLike}</span>
                                </div>
                                <div className="social">
                                    <a
                                        href="https://www.facebook.com"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="icon"
                                    >
                                        <svg
                                            height="12"
                                            viewBox="0 0 11.73 22.58"
                                        >
                                            <path d="M7.61 22.58v-10.3h3.46l.52-4h-4V5.7c0-1.16.32-2 2-2h2.13V.16A28.47 28.47 0 0 0 8.63 0C5.56 0 3.47 1.87 3.47 5.31v3H0v4h3.47v10.3h4.14z"></path>
                                        </svg>
                                    </a>
                                    <a
                                        href="https://twitter.com"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="icon centerIcon"
                                    >
                                        <svg
                                            height="10"
                                            viewBox="0 0 20.42 16.67"
                                        >
                                            <path
                                                d="M10 5.18c0-.28-.06-.53-.07-.78a4 4 0 0 1 .73-2.57A4.08 4.08 0 0 1 13.93 0 4 4 0 0 1 17 1.15a.43.43 0 0 0 .46.12 8.68 8.68 0 0 0 2.2-.84l.2-.1a4.36 4.36 0 0 1-1.75 2.28A9 9 0 0 0 20.42 2l-.21.3a3.83 3.83 0 0 1-.23.3A8.45 8.45 0 0 1 18.5 4a.28.28 0 0 0-.13.27A12 12 0 0 1 17 10.18a11.8 11.8 0 0 1-3.37 4.11 11.17 11.17 0 0 1-4.39 2.06 12.53 12.53 0 0 1-4.44.22 11.87 11.87 0 0 1-4.74-1.73L0 14.79a8.6 8.6 0 0 0 6.16-1.74 4.28 4.28 0 0 1-3.91-2.91h.95a6.18 6.18 0 0 0 .89-.12A4.2 4.2 0 0 1 .8 5.88a4 4 0 0 0 1.81.49 4.23 4.23 0 0 1-1.78-3A4.07 4.07 0 0 1 1.38.79 12.06 12.06 0 0 0 10 5.18z"
                                                id="iOjKBC.tif"
                                            ></path>
                                        </svg>
                                    </a>
                                    <a
                                        href="https://www.linkedin.com/company/samdiv-technologies-ltd"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="icon"
                                    >
                                        <svg height="10" viewBox="0 0 16.99 17">
                                            <path d="M3.85 17H.34V5.67h3.51zM2.07 4.18a2.09 2.09 0 1 1 2.08-2.09 2.08 2.08 0 0 1-2.08 2.09zM17 17h-3.5v-5.95c0-1.63-.62-2.54-1.91-2.54s-2.14.95-2.14 2.54V17H6.09V5.67h3.36v1.52a4 4 0 0 1 3.42-1.87c2.4 0 4.12 1.47 4.12 4.5V17z"></path>
                                        </svg>
                                    </a>
                                </div>
                            </div>
                            <div className="filter">
                                <button className="Button iconButton noPadding">
                                    <div className="icon">
                                        <svg
                                            id="Réteg_1"
                                            xmlns="http://www.w3.org/2000/svg"
                                            viewBox="0 0 7 12"
                                        >
                                            <path
                                                id="path-1_1_"
                                                d="M5.9 0c.4 0 .9.3 1 .7s.1.9-.2 1.2L2.7 6l4 4.1c.3.5.3 1.1-.1 1.6s-1.1.4-1.5.1l-4.8-5c-.4-.4-.4-1.2 0-1.6L5.1.3c.2-.2.5-.3.8-.3z"
                                            ></path>
                                        </svg>
                                    </div>
                                    <Link to={`/post`}>
                                        <div
                                            className="desktopOnly goBackLink"
                                            onClick={(e) => goBack(e)}
                                        >
                                            Back to News
                                        </div>
                                    </Link>
                                </button>
                            </div>
                            <div className="col-sm-offset-1 blog-posts">
                                <article className="post clearfix mb-0">
                                    <FroalaEditorView
                                        model={
                                            blogContent
                                                ? blogContent[0].blogContent
                                                : null
                                        }
                                    />

                                    {!socialAuth.auth ? (
                                        commentNew
                                    ) : (
                                        <div>
                                            <div className="cell">
                                                <h2>Join The Discussion</h2>
                                                <div className="comment-box">
                                                    <CommentForm
                                                        addComment={
                                                            handleAddComment
                                                        }
                                                    />
                                                </div>
                                            </div>
                                            {commentNode}
                                        </div>
                                    )}
                                </article>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <JwModal id="auth-modal">
                <Login />
            </JwModal>
        </div>
    )
}

export default SinglePost
