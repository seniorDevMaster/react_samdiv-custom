import React from "react"

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

import FroalaEditorComponent from "react-froala-wysiwyg"
import FroalaEditor from "froala-editor"
// import FroalaEditor from 'react-froala-wysiwyg'

import "./admin.css"
import Config from "../../config.json"

FroalaEditor.DefineIcon("insert", { NAME: "plus", SVG_KEY: "add" })
FroalaEditor.RegisterCommand("insert", {
    title: "Insert HTML",
    focus: true,
    undo: true,
    refreshAfterCallback: true,
    callback: function () {
        this.html.insert("My New HTML")
    },
})

class InsertBlog extends React.Component {
    state = {
        content: "",
        blogID: localStorage.getItem("blogID"),
    }

    componentDidMount() {
        fetch(`${Config.serverapi}/getBlogWithID`, {
            method: "post",
            headers: {
                accept: "application/json",
                "content-type": "application/json",
            },
            body: JSON.stringify({ blogID: this.state.blogID }),
        })
            .then((res) => res.json())
            .then((data) => {
                if (this.state.blogID) {
                    this.setState({ content: data.blogContent })
                }
            })
            .catch((err) => console.log(err))
    }

    handleModelChange = (model) => {
        this.setState({
            content: model,
        })
    }

    save = () => {
        let value = this.state.content
        if (this.state.blogID) {
            this.fetchFun(`${Config.serverapi}/updateBlog`, {
                blogId: localStorage.getItem("blogID"),
                value,
            })
            localStorage.removeItem("blogID")
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

                    <FroalaEditorComponent
                        model={this.state.content}
                        onModelChange={this.handleModelChange}
                        config={{
                            //toolbarButtons: ["bold", "insert"],
                            pluginsEnabled: [
                                "table",
                                "spell",
                                "quote",
                                "save",
                                "fontFamily",
                                "fontSize",
                                "quickInsert",
                                "paragraphFormat",
                                "paragraphStyle",
                                "help",
                                "draggable",
                                "align",
                                "link",
                                "lists",
                                "file",
                                "image",
                                "emoticons",
                                "url",
                                "video",
                                "embedly",
                                "colors",
                                "entities",
                                "inlineClass",
                                "inlineStyle",
                                "codeBeautif ",
                                "spellChecker",
                                "imageTUI",
                            ],
                            events: {
                                initialized: function() {
                                },
                                "image.beforeUpload": function (files) {
                                    var editor = this
                                    if (files.length) {
                                        // Create a File Reader.
                                        var reader = new FileReader()
                                        // Set the reader to insert images when they are loaded.
                                        reader.onload = function (e) {
                                            var result = e.target.result
                                            editor.image.insert(
                                                result,
                                                null,
                                                null,
                                                editor.image.get()
                                            )
                                        }

                                        // Read image as base64.
                                        reader.readAsDataURL(files[0])
                                    }
                                    editor.popups.hideAll()
                                    // Stop default upload chain.
                                    return false
                                },
                            }
                        }}
                        tag="textarea"
                    />
                </div>
            </div>
        )
    }
}

export default InsertBlog
