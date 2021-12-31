<?php
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, PATCH, PUT, DELETE, OPTIONS');
header('Access-Control-Allow-Headers: Origin, Content-Type, X-Auth-Token');

require_once ('../Koneksi.php');

$sql = "CALL SP_SelectUser()";
$stmt = $db->prepare($sql);
$param = array();

$stmt->execute($param);

$posisi = array();
while ( $user = $stmt->fetch(PDO::FETCH_ASSOC)){
    $posisi[] = $user;
}

$pesan = $posisi;
$eror = false;

$arr=array("error"=>$eror,"pesan"=>$pesan);
echo json_encode($arr);

?>

