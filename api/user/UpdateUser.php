<?php
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, PATCH, PUT, DELETE, OPTIONS');
header('Access-Control-Allow-Headers: Origin, Content-Type, X-Auth-Token');

require_once ('../Koneksi.php');

$data = json_decode(file_get_contents('php://input'), true);

if (isset($data['nama']) && isset($data['email']) && isset($data['id'])){

    $email      = $data['email'];
    $id         = $data['id'];
    $nama       = $data['nama'];


    $sql = "CALL SP_UpdateUser(:pnama,:pemail,:pid);";
    $stmt = $db->prepare($sql);
    $stmt->bindValue(':pnama',      $nama,      PDO::PARAM_STR);
    $stmt->bindValue(':pemail',     $email,     PDO::PARAM_STR);
    $stmt->bindValue(':pid',        $id,  PDO::PARAM_STR);
    $stmt->execute();
    $user = $stmt->fetch(PDO::FETCH_ASSOC);

    if (!$user){
        $eror=false;
        $pesan='Data berhasil diupdate';
    }else{
        $eror=true;
        $pesan='Data gagal diupdate';
    }



}else{
    $eror=true;
    $pesan='Parameter tidak mencukupi';
}

$arr=array("error"=>$eror,"pesan"=>$pesan);
echo json_encode($arr);

?>

