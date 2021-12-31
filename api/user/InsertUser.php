<?php
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, PATCH, PUT, DELETE, OPTIONS');
header('Access-Control-Allow-Headers: Origin, Content-Type, X-Auth-Token');

require_once ('../Koneksi.php');

$data = json_decode(file_get_contents('php://input'), true);

if (isset($data['nama']) && isset($data['email']) && isset($data['password'])){

    $email      = $data['email'];
    $password   = $data['password'];
    $nama       = $data['nama'];
    $cpassword  = password_hash($password, PASSWORD_DEFAULT);


    $sql = "CALL SP_InsertUser(:pnama,:pemail,:ppassword,@phasil);";
    $stmt = $db->prepare($sql);
    $stmt->bindValue(':pnama',      $nama,      PDO::PARAM_STR);
    $stmt->bindValue(':pemail',     $email,     PDO::PARAM_STR);
    $stmt->bindValue(':ppassword',  $cpassword,  PDO::PARAM_STR);
    $stmt->execute();


    $sql = "SELECT @phasil;";
    $stmt = $db->prepare($sql);
    $stmt->execute();
    $user = $stmt->fetch(PDO::FETCH_ASSOC);

    $eror=false;
    $pesan=$user['@phasil'];

}else{
    $eror=true;
    $pesan='Parameter tidak mencukupi';
}

$arr=array("error"=>$eror,"pesan"=>$pesan);
echo json_encode($arr);

?>

