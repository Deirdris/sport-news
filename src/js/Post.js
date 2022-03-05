import '../styles/MainPage.scss';
import {useEffect, useRef, useState} from "react";
import axios from "axios";
import card from "../img/card.jpg";
import avatar from "../img/avatar.png";
import button from "bootstrap/js/src/button";
import {MdArrowBackIos, MdArrowForwardIos} from "react-icons/md";
import {useHistory, useParams} from "react-router-dom";
import * as Yup from "yup";
import {ErrorMessage, Field, Form, Formik} from "formik";
import '../styles/form.scss';

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

function Post() {
    const [post, setPost] = useState({});
    const [fetched, setFetched] = useState(false);
    const [comments, setComments] = useState([]);
    const [page, setPage] = useState(1);
    const [ifComment, setIfComment] = useState(false);
    const buttonClass = useRef('disabled');
    let { id } = useParams();
    const history = useHistory();

    useEffect(() => {
        async function fetchAPI() {
            let result = await axios.get("https://jsonplaceholder.typicode.com/posts/"+id);
            let resultC = await axios.get("https://jsonplaceholder.typicode.com/posts/1/comments?_page="+page+"&_limit=2")
            console.log(result);
            setPost(result.data);
            setComments(resultC.data);
            setFetched(true);
        }

        if (page > 1) {
            buttonClass.current = '';
        } else {
            buttonClass.current = 'disabled';
        }
        fetchAPI()

    }, [page]);

    return (
        <main className="d-flex flex-column align-items-center justify-content-between">
            {fetched ? (
                <div>
                    <div className="card bg-black">
                        <img src={card} height="300" className="card-img-top" alt="..."/>
                        <div className="card-body">
                            <h5 className="card-title">{post.title}</h5>
                            <p className="card-text">{post.body}</p>
                            <div className="d-flex flex-row justify-content-between">
                                <div>
                                    <div className="btn btn-outline-orangered" onClick={() => history.replace('/')}>Strona główna</div>
                                    <div className="btn btn-outline-orangered comment" onClick={() => setIfComment(true)}>Dodaj komentarz</div>
                                </div>
                                <div className="d-flex align-items-center">22 lutego 2022</div>
                            </div>
                        </div>
                    </div>
                    <div> {ifComment ? (
                        <Formik
                            initialValues={{title: '', body: '', email: ''}}
                            validationSchema={Yup.object({
                                title: Yup.string()
                                    .required('Podaj tytuł komentarza'),
                                body: Yup.string().required('Podaj treść komentarza'),
                                email: Yup.string().email('Niepoprawny adres e-mail').required('Podaj email'),
                            })}
                            onSubmit={async (values, {setSubmitting}) => {
                                const comment = {title: values.title, body: values.body, userId: 1, email: values.email};
                                const result =  await axios.post("https://jsonplaceholder.typicode.com/posts/"+id+"/comments", comment);
                                console.log(result)
                                setSubmitting(false);
                                setIfComment(false);
                            }}
                        >
                            <Form className="auth-window comment-form">
                                <div className="auth-name comment-name">Nowy komentarz</div>
                                <div className="group">
                                    <label className="auth-label" htmlFor="title">Tytuł</label>
                                    <Field className="auth-input" name="title" type="text"/>
                                    <ErrorMessage name="title" component="div" className="error"/>
                                </div>
                                <div className="group">
                                    <label className="auth-label" htmlFor="body">Treść</label>
                                    <Field  className="auth-input" name="body" as="textarea" cols="40" rows="4"/>
                                    <ErrorMessage name="body" component="div" className="error"/>
                                </div>
                                <div className="group">
                                    <label className="auth-label" htmlFor="email">E-mail</label>
                                    <Field  className="auth-input" name="email" type="email"/>
                                    <ErrorMessage name="email" component="div" className="error"/>
                                </div>
                                <input type="submit" className="btn btn-outline-orangered" value="Dodaj komentarz" />
                            </Form>
                        </Formik>
                    ) : comments.map(comment => (
                        <div className="card bg-comment">
                            <div className="card-body">
                                <h5 className="card-title">{comment.name}</h5>
                                <p className="card-text">{comment.body}</p>
                                <div className="d-flex flex-row justify-content-end">
                                    <div className="d-flex align-items-center email">{comment.email}</div>
                                    <img src={avatar} height="50" width="50" className="avatar" alt="..."/>
                                </div>
                            </div>
                        </div>
                    ))}
                    </div>
                </div>
            ) : (
                <div className="spinner-border text-warning" role="status">
                    <span className="visually-hidden">Loading...</span>
                </div>
            )}
            <nav className="nav d-flex justify-content-between">
                <button className={`arrow-button ${buttonClass.current}`} onClick={() => setPage(page - 1)}>
                    <ArrowButton icon={<MdArrowBackIos/>}/>
                </button>
                <button className="arrow-button" onClick={() => setPage(page + 1)}>
                    <ArrowButton icon={<MdArrowForwardIos/>}/>
                </button>
            </nav>
        </main>
    );
}

export default Post;