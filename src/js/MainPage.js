import '../styles/MainPage.scss';
import logo from '../img/logo.png';
import {BsFacebook, BsTwitter, BsDiscord} from "react-icons/bs";
import {useEffect, useState} from "react";
import Posts from "./Posts";
import {Route, Switch, useHistory} from "react-router-dom";
import Post from "./Post";
import AddPost from "./AddPost";


const SocialButton = ({icon}) => {
    const [anim, setAnim] = useState(0);
    return <div className="icon d-flex align-items-center" onClick={() => setAnim(1)} onAnimationEnd={() => setAnim(0)}
                anim={anim}>{icon}</div>
}


function MainPage() {
    const [page, setPage] = useState(1);
    const history = useHistory();
    const whichPage = [
        {
            path: "/",
            exact: true,
            component: Posts
        },
        {
            path: "/post/:id",
            component: Post
        },
        {
            path: "/form",
            component: AddPost
        }
    ];
    return (
        <div className="main">
            <img src={logo} className="logo" alt="logo" width="150" height="150"/>
            <Switch>
                {whichPage.map((route, i) => (
                    <Route key={i} path={route.path} component={route.component} exact={route.exact}/>
                ))}
            </Switch>
            <footer>
                <div className="d-flex flex-row">
                    <div className="mail"> sportes@info.com</div>
                    <div className="social">
                        <SocialButton icon={<BsFacebook/>}/>
                        <SocialButton icon={<BsTwitter/>}/>
                        <SocialButton icon={<BsDiscord/>}/>
                    </div>
                </div>
                <div className="add-post" onClick={() => history.replace("/form")}>
                    Formularz dodawania posta
                </div>
            </footer>
        </div>
    );
}

export default MainPage;
