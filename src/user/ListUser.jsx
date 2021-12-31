import Sidebar from "../component/Sidebar";
import {useEffect, useState} from "react";
import axios from "axios";
import Endpoint from "../config/Endpoint";
import Loader from "../component/Loader";

export default function ListUser(){

    const [list,setList]=useState([]);
    const [load,setLoad]=useState(false);

    useEffect( () => {
        setLoad(true)
        axios.get(Endpoint.BASE_URL + `user/GetAllUser.php`)
            .then(res => {
                console.clear();
                console.log(res.data.pesan);
                setList(res.data.pesan);
                setLoad(false)
            })

    },[])

    return(
        <Sidebar>
            <h1 className="ui header">Daftar User</h1>

            { load ? <Loader/> : <table className="ui celled table">
                <thead>
                <tr>
                    <th>Nama</th>
                    <th>Email</th>
                </tr>
                </thead>
                <tbody>

                {list.map(x => (
                    <tr key={x.id}>
                        <td>{x.nama}</td>
                        <td>{x.email}</td>
                    </tr>
                ))}
                </tbody>
            </table> }


        </Sidebar>
    );
}