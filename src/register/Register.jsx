
import Loader from "../component/Loader";
import {Link} from "react-router-dom";
import {useState, useRef} from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import Endpoint from "../config/Endpoint";
import Konstan from "../config/Konstan";



export default function Register(){


    const { register, handleSubmit, watch, formState: { errors } } = useForm({});
    const [load,setLoad]=useState(false);
    const [hasil,setHasil]=useState('');
    const password = useRef({});
    password.current = watch("password", "");
    const onSubmit = async data => {
        alert(JSON.stringify(data));
    };


    const doRegister = data => {
        setLoad(true);
        console.clear();
        axios.post(Endpoint.BASE_URL + 'user/InsertUser.php',data)
            .then(res => {
                console.log(res);
                if (res.data.error == false){
                    if (res.data.pesan == '0'){
                        setHasil('Email sudah terdaftar! Mohon gunakan email lain');
                    }else{
                        setHasil('Register berhasil!');
                    }

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
                              REGISTER
                          </div>
                      </h2>

                      <form id="form" onSubmit={handleSubmit(doRegister)}  className="ui large form">
                          <div className="ui stacked segment">
                              <div className="field">
                                  <div className="ui left icon input">
                                      <i className="user icon"></i>
                                      <input type="text" {...register("nama")}  name="nama" placeholder="Isi nama"/>
                                  </div>
                              </div>
                              <div className="field">
                                  <div className="ui left icon input">
                                      <i className="tag icon"></i>
                                      <input type="text" {...register("email")}   name="email" placeholder="Alamat email"/>
                                  </div>
                              </div>
                              <div className="field">
                                  <div className="ui left icon input">
                                      <i className="lock icon"></i>
                                      <input type="password"  name="password" {...register( "password", {
                                          required: "Harap isi password",
                                          minLength: {
                                              value: 3,
                                              message: "Password must have at least 3 characters"
                                          }
                                      })} placeholder="Password"/>
                                  </div>
                                  {errors.password && <p>{errors.password.message}</p>}

                              </div>
                              <div className="field">
                                  <div className="ui left icon input">
                                      <i className="lock icon"></i>
                                      <input type="password"  name="cpassword" {...register("cpassword",{
                                          validate: value =>
                                              value === password.current || "Kedua password tidak sama"
                                      })} placeholder="Ulangi password"/>
                                  </div>
                              </div>
                              {errors.cpassword && <p>{errors.cpassword.message}</p>}


                              { load ? <Loader/> : <button className="ui fluid primary large submit button" type="submit">
                                  SUBMIT
                              </button>}
                              <br/>
                              <Link to="/">Login</Link>

                          </div>

                      </form>
                      <br/>
                      <br/>
                      { hasil }
                  </div>
              </div>
          </div>
      </div>
    );
}