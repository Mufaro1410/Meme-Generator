import { useEffect, useState } from "react"

export default function Main() {
  const [meme, setMeme] = useState({
    url: "http://i.imgflip.com/1bij.jpg",
    topText: "One does not simply",
    bottomText: "Walk into Mordor"
  })
  const [memes, setMemes] = useState([])

  useEffect(() => {
    fetch("https://api.imgflip.com/get_memes")
      .then(res => res.json())
      .then(data => setMemes(data.data.memes))
      // .then(data => console.log(data.data.memes))
  }, [])

  const handleChange = (e) => {
    let { name, value } = e.target
    setMeme(prevMeme => ({...prevMeme, [name]: value}))
  }

  const getMeme = () => {
    let randomNumber = Math.floor(Math.random() * memes.length)
    setMeme(prevMeme => ({...prevMeme, url: memes[randomNumber].url, topText:"", bottomText: ""}))
  }

  return (
    <main>
      <div className="form">
          <label>Top Text
            <input
              type="text"
              placeholder="One does not simply"
              name="topText"
              value={meme.topText}
              onChange={handleChange}
            />
          </label>

          <label>Bottom Text
            <input
              type="text"
              placeholder="Walk into Mordor"
              name="bottomText"
              value={meme.bottomText}
              onChange={handleChange}
            />
          </label>
          <button onClick={getMeme}>Get a new meme image 🖼</button>
      </div>
      <div className="meme">
        <img src={meme.url} />
        <span className="top">{meme.topText}</span>
        <span className="bottom">{meme.bottomText}</span>
      </div>
    </main>
  )
}
