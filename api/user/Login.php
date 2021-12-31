<?php
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, PATCH, PUT, DELETE, OPTIONS');
header('Access-Control-Allow-Headers: Origin, Content-Type, X-Auth-Token');
require_once ('../Koneksi.php');

$data = json_decode(file_get_contents('php://input'), true);

if (isset($data['email']) && isset($data['password'])){
    $email      = $data['email'];
    $password   = $data['password'];

    $sql    = "CALL SP_Login(:pemail,:ppassword,@phasil);";
    $stmt   = $db->prepare($sql);
    $stmt->bindValue(':pemail',     $email,     PDO::PARAM_STR);
    $stmt->bindValue(':ppassword',  $password,  PDO::PARAM_STR);
    $stmt->execute();

    $sql    = "SELECT @phasil;";
    $stmt   = $db->prepare($sql);
    $stmt->execute();
    $user   = $stmt->fetch(PDO::FETCH_ASSOC);

    $eror   =false;
    $pesan  =$user['@phasil'];

    if ($user['@phasil'] == 1){

        $sql    = "CALL SP_SelectUser_ByEmail(:pemail);";
        $stmt   = $db->prepare($sql);
        $stmt->bindValue(':pemail',$email,     PDO::PARAM_STR);
        $stmt->execute();
        $user   = $stmt->fetch(PDO::FETCH_ASSOC);

        if ($user){
            $id     = $user['id'];
            $nama   = $user['nama'];
            $email  = $user['email'];

            $arData=array("id"=>$id,"nama"=>$nama,"email"=>$email);

            if (password_verify($password,$user['password'])){
                $eror   =false;
                $pesan  =$arData;
            }else{
                $eror   =true;
                $pesan  ='Password salah';
            }
        }else{
            $eror   =true;
            $pesan  ='Terjadi error';
        }

    }else{
        $eror   =true;
        $pesan  ='Email tidak ditemukan';
    }

}else{
    $eror   =true;
    $pesan  ='Parameter tidak mencukupi';
}

$arr=array("error"=>$eror,"pesan"=>$pesan);
echo json_encode($arr);

?>

