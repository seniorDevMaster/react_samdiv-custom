import React from "react"

import {
    EditorState,
    ContentState,
    convertFromHTML,
    CompositeDecorator,
    convertToRaw,
    getDefaultKeyBinding,
} from "draft-js"

import { Editor } from "react-draft-wysiwyg"
import draftToHtml from "draftjs-to-html"
import htmlToDraft from 'html-to-draftjs';
import embed from "embed-video"

import Config from "../../config.json"

import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css"
import "./admin.css"

const getHtml = (editorState) =>
    draftToHtml(convertToRaw(editorState.getCurrentContent()))
{
    /* new */
}

class InsertBlog extends React.Component {
    state = {
        blogId: localStorage.getItem("blogId"),
        editorState: EditorState.createEmpty(),
    }

    onEditorStateChange = (editorState) => {
        this.setState({
            editorState,
        })
    }

    componentDidMount() {
        fetch(`${Config.serverapi}/getBlogWithID`, {
            method: "post",
            headers: {
                accept: "application/json",
                "content-type": "application/json",
            },
            body: JSON.stringify({ blogId: this.state.blogId }),
        })
            .then((res) => res.json())
            .then((data) => {
                if (this.state.blogId) {
                    const contentBlock = htmlToDraft(data.blogContent);
                    if (contentBlock) {
                        const contentState = ContentState.createFromBlockArray(contentBlock.contentBlocks);
                        const editorState = EditorState.createWithContent(contentState);
                        this.setState({editorState: editorState})
                    }
                }
            })
            .catch((err) => console.log(err))
    }

    uploadImageCallBack = (file) => {
        return new Promise((resolve, reject) => {
            const xhr = new XMLHttpRequest() // eslint-disable-line no-undef
            xhr.open("POST", "https://api.imgur.com/3/image")
            xhr.setRequestHeader("Authorization", "Client-ID 8d26ccd12712fca")
            const data = new FormData() // eslint-disable-line no-undef
            data.append("image", file)
            xhr.send(data)
            xhr.addEventListener("load", () => {
                const response = JSON.parse(xhr.responseText)
                resolve(response)
            })
            xhr.addEventListener("error", () => {
                const error = JSON.parse(xhr.responseText)
                reject(error)
            })
        })
    }

    save = () => {
        let value = getHtml(this.state.editorState)

        if (this.state.blogId) {
            this.fetchFun(`${Config.serverapi}/updateBlog`, {
                blogId: localStorage.getItem("blogId"),
                value,
            })
            localStorage.removeItem("blogId")
        } else this.fetchFun(`${Config.serverapi}/insertBlog`, { value })
    }

    fetchFun = (url, value) => {
        fetch(url, {
            method: "post",
            headers: {
                accept: "application/json",
                "content-type": "application/json",
            },
            body: JSON.stringify(value),
        })
            .then((res) => {
                if (res.status === 200) alert("Success")
            })
            .catch((err) => console.log(err))
    }
    render() {
        const { editorState } = this.state

        return (
            <div style={{ padding: "70px" }}>
                <div className="sample">
                    <div className="froalaHeader">
                        <h2>Full Featured</h2>
                        <button
                            className="btn btn-primary"
                            style={{ float: "right" }}
                            type="submit"
                            onClick={this.save}
                        >
                            Save
                        </button>
                    </div>
                    <Editor
                        editorState={editorState}
                        wrapperClassName="rich-editor demo-wrapper"
                        editorClassName="demo-editor"
                        onEditorStateChange={this.onEditorStateChange}
                        placeholder="The message goes here..."
                        toolbar={{
                            link: {
                                linkCallback: (params) => ({ ...params }),
                            },
                            embedded: {
                                embedCallback: (link) => {
                                    const detectedSrc = /<iframe.*? src="(.*?)"/.exec(
                                        embed(link)
                                    )
                                    return (
                                        (detectedSrc && detectedSrc[1]) || link
                                    )
                                },
                            },
                            image: {
                                uploadCallback: this.uploadImageCallBack,
                                alt: { present: true, mandatory: true },
                                inputAccept:
                                    "image/gif,image/jpeg,image/jpg,image/png,image/svg",
                                previewImage: true,
                            },
                        }}
                    />
                    {/* <div className="html-view"> {getHtml(editorState)} </div> */}
                </div>
            </div>
        )
    }
}

export default InsertBlog
