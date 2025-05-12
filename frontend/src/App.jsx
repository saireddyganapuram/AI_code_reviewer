import React, { useEffect , useState} from 'react'
import './App.css'
import "prismjs/themes/prism-tomorrow.css"
import prism from "prismjs"
import Editor from "react-simple-code-editor"
import axios from 'axios'
import Markdown from "react-markdown"
import rehypeHighlight from "rehype-highlight"
import "highlight.js/styles/github-dark.css"

const App = () => {

  const [code, setCode] = useState(`function sum () {
    return a+b
    }`);

  const [review, setReview] = useState(``);

  useEffect(() => {
    prism.highlightAll()
  }
  , [])

   async function reviewCode () {
    try {
    const res = await axios.post('http://localhost:3000/ai/get-review',{code});
    setReview(res.data);
  } catch (error) {
    console.error('Error fetching review:', error.response?.data || error.message); 
  }
  }

  return (
    <>
      <main>
        <div className="left">
          <div className="code">
            <Editor
              value={code}
              onValueChange={code => setCode(code)}
              highlight={code => prism.highlight(code, prism.languages.js, 'js')}
              padding={10}
              style={{
                fontFamily: '"Fira code", "Fira Mono", monospace',
                fontSize: 16,
                backgroundColor: "#000000",
                color: "#fff",
                border: "2px solid #ddd",
                height: "100%",
                width: "100%",
                borderRadius: "5px",
              }}
            />
          </div>
          <div className="review" onClick={reviewCode}>Review</div>
        </div>
        <div className="right">
              <Markdown
                rehypePlugins={[rehypeHighlight]}
              
              >{review}</Markdown>
        </div>
      </main>
    </>
  )
}

export default App