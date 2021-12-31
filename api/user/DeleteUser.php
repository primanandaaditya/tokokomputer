<?php
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, PATCH, PUT, DELETE, OPTIONS');
header('Access-Control-Allow-Headers: Origin, Content-Type, X-Auth-Token');

require_once ('../Koneksi.php');

$data = json_decode(file_get_contents('php://input'), true);

if (isset($data['id']) ){

    $id         = $data['id'];

    $sql = "CALL SP_DeleteUser(:pid);";
    $stmt = $db->prepare($sql);
    $stmt->bindValue(':pid',        $id,  PDO::PARAM_STR);
    $stmt->execute();
    $user = $stmt->fetch(PDO::FETCH_ASSOC);

    if (!$user){
        $eror=false;
        $pesan='Data berhasil dihapus';
    }else{
        $eror=true;
        $pesan='Data gagal dihapus';
    }



}else{
    $eror=true;
    $pesan='Parameter tidak mencukupi';
}

$arr=array("error"=>$eror,"pesan"=>$pesan);
echo json_encode($arr);

?>

