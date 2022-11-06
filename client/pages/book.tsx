import { useEffect, useState } from 'react';
import styles from '../styles/Book.module.css'

const Book = () => {

  const [pages, setPages] = useState([
    "마음속으로 고민을 생각하고 클릭해보세요",
  ])
  const [flipped, setFliped] = useState(false)

  useEffect(() => {
    console.log("화면 시작")
    fetch("/api/answers").then(res => {
      console.log(res.ok)
      return res.json()
    })
      .then(json => {
        console.log(json)
        setPages([...pages, ...json.answers])
      })
  }, [])

  console.log(pages)

  const movePage = (e: any) => {
    console.log("movePage")
    setFliped(true)
  }

  const resetPage = (e: any) => {
    console.log("resetPage")
    setFliped(false)
  }

  return (
    <div className={styles.book}>
      <button onClick={movePage}>한번에 넘기기 도전</button>
      <button onClick={resetPage}>리셋</button>
      <div id="pages" className={styles.pages}>
        {pages.map((v, i) => {
          console.log(typeof v)
          console.log(v, i)
          return (
            <Page key={i}
              pageNum={i}
              text={v}
              defaultFlip={flipped}
              handleOnClick={(e: any) => (v: any) => {
                console.log("click", i, v)
              }}
            />
          )
        })
        }
      </div>
    </div>
  )
}

const Page = ({ pageNum, text, handleOnClick, defaultFlip }: { pageNum: any, text: string, handleOnClick: any, defaultFlip: any }) => {
  const [isFlip, setFliped] = useState(false)


  useEffect(() => {
    console.log("useEffect Page", defaultFlip) 
    setFliped(defaultFlip)
  }, [defaultFlip])

  const onFlipClick = (e: any) => {
    setFliped(!isFlip)
    handleOnClick(pageNum)
  }

  return (
    <>
      <div
        className={!isFlip ? `${styles.page}` : `${styles.page} ${styles.flipped}`}
        onClick={onFlipClick}
        style={{ zIndex: `-${pageNum}` }}
      >
        <p className={styles.para}>{text}</p>
      </div>
      <div className={!isFlip ? `${styles.page}` : `${styles.page} ${styles.flipped}`} onClick={onFlipClick}></div>
    </>
  )
}

export default Book