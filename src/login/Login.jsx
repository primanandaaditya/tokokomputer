import './Login.css'
import {useEffect,useState} from "react";
import { useForm } from "react-hook-form";
import Endpoint from "../config/Endpoint";
import Konstan from "../config/Konstan";
import axios from "axios";
import Loader from "../component/Loader";
import {Link} from "react-router-dom";


export default function Login(){

    const { register, handleSubmit, formState: { errors } } = useForm();
    const [load,setLoad]=useState(false);
    const [hasil,setHasil]=useState('');

    const doLogin = data => {
        setLoad(true);
        console.clear();
        axios.post(Endpoint.BASE_URL + 'user/Login.php',data)
            .then(res => {
                console.log(res);
                if (res.data.error == false){
                    setHasil('');
                    console.log(res.data.pesan.id);
                    console.log(res.data.pesan.email);
                    console.log(res.data.pesan.nama);
                    localStorage.setItem(Konstan.TAG_EMAIL, res.data.pesan.email);
                    localStorage.setItem(Konstan.TAG_ID, res.data.pesan.id);
                    localStorage.setItem(Konstan.TAG_NAMA, res.data.pesan.nama);
                    setLoad(false);
                }else{
                    console.log(res.data.pesan);
                    setHasil(res.data.pesan);
                    setLoad(false);
                }
            });
    }

    return(
        <div>

            <div className="ui container">
                <br/>
                <br/>

                <div className="ui middle aligned center aligned grid">

                    <div className="column">
                        <h2 className="ui image header">

                            <div className="content">
                                LOGIN
                            </div>
                        </h2>

                        <form id="form" onSubmit={handleSubmit(doLogin)} className="ui large form">
                            <div className="ui stacked segment">
                                <div className="field">
                                    <div className="ui left icon input">
                                        <i className="user icon"></i>
                                        <input type="text" {...register("email",{required:true})} name="email" placeholder="E-mail address"/>
                                    </div>
                                </div>
                                <div className="field">
                                    <div className="ui left icon input">
                                        <i className="lock icon"></i>
                                        <input type="password" {...register("password",{required:true})} name="password" placeholder="Password"/>
                                    </div>
                                </div>

                                { load ? <Loader/> : <button className="ui fluid primary large submit button" type="submit">
                                    LOGIN
                                </button>}
                                <br/>
                                <Link to="/register">Register</Link>

                            </div>

                        </form>

                        { hasil }
                    </div>


                </div>
            </div>

        </div>
    )
}