import '../styles/MainPage.scss';
import card from '../img/card.jpg';
import {MdArrowBackIos, MdArrowForwardIos} from "react-icons/md";
import {BiLastPage, BiFirstPage} from "react-icons/bi";
import {useEffect, useRef, useState} from "react";
import axios from "axios";
import {useHistory} from "react-router-dom";
import button from "bootstrap/js/src/button";


const ArrowButton = ({icon, event}) => {
    const [arrowAnim, setArrowAnim] = useState(0);
    const onClick = () => {
        setArrowAnim(1);
    }
    const onAnimationEnd = () => {
        setArrowAnim(0);
    }
    return <div className="arrow d-flex align-items-center" onClick={onClick} onAnimationEnd={onAnimationEnd}
                arrowanim={arrowAnim}>{icon}</div>
}

function Posts() {
    const [posts, setPosts] = useState([]);
    const [page, setPage] = useState(1);
    const [lastPage, setLastPage] = useState(50);
    const history = useHistory();
    const prevButtonClass = useRef('disabled');
    const nextButtonClass = useRef('');

    useEffect(() => {
        async function fetchAPI() {
            let result = await axios.get("https://jsonplaceholder.typicode.com/posts?_page="+page+"&_limit=2");
            console.log(result);
            setPosts(result.data);
        }

        if(page > 1){
           prevButtonClass.current = '';
        } else {
            prevButtonClass.current = 'disabled';
        }

        if(page === lastPage){
            nextButtonClass.current = 'disabled';
        } else {
            nextButtonClass.current = '';
        }

        fetchAPI()
    }, [page]);


    return(
        <main className="d-flex flex-column align-items-center justify-content-between">
            {posts.length > 0 ? (<div>{posts.map(post => (
                <div className="card bg-black">
                    <img src={card} height="300" className="card-img-top" alt="..."/>
                    <div className="card-body">
                        <h5 className="card-title">{post.title}</h5>
                        <p className="card-text">{post.body}</p>
                        <div className="d-flex flex-row justify-content-between">
                            <div className="btn btn-outline-orangered" onClick={() => history.replace('/post/'+post.id)}>Czytaj całość</div>
                            <div className="d-flex align-items-center">22 lutego 2022</div>
                        </div>
                    </div>
                </div>
            ))}
            </div>) : (
                <div className="spinner-border text-warning" role="status">
                    <span className="visually-hidden">Loading...</span>
                </div>
            )}
            <nav className="nav d-flex justify-content-between">
                <div>
                    <button className={`arrow-button ${prevButtonClass.current}`} onClick={()  => setPage(1)}>
                        <ArrowButton icon={<BiFirstPage/>}/>
                    </button>
                    <button className={`arrow-button ${prevButtonClass.current}`} onClick={()  => setPage(page - 1)}>
                        <ArrowButton icon={<MdArrowBackIos/>}/>
                    </button>
                </div>
                <div>
                    <button className={`arrow-button ${nextButtonClass.current}`} onClick={()  => setPage(page + 1)}>
                        <ArrowButton icon={<MdArrowForwardIos/>} />
                    </button>
                    <button className={`arrow-button ${nextButtonClass.current}`} onClick={()  => setPage(lastPage)}>
                        <ArrowButton icon={<BiLastPage/>} />
                    </button>
                </div>
            </nav>
        </main>
    );
}
export default Posts;