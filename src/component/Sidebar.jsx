import {Link} from "react-router-dom";

export default function Sidebar(props) {
    return (
        <div>
            <div className="ui visible left demo vertical sidebar labeled icon menu">
                <Link className="item" to="/home">
                    <i className="home icon"></i>
                    Home
                </Link>
                <Link className="item" to="/listuser">
                    <i className="user icon"></i>
                    User
                </Link>
                <a className="item">
                    <i className="home icon"></i>
                    Home
                </a>
                <a className="item">
                    <i className="block layout icon"></i>
                    Topics
                </a>
                <a className="item">
                    <i className="smile icon"></i>
                    Friends
                </a>
            </div>

            <div className="ui container">
                <br/>
                {props.children}

            </div>

        </div>

    );
}
