<?php
include('./mysql.php');
$fn=$_GET['fn'];
$fn();
function fnn(){
    $sql='select * from problem';
    $data=select($sql);
    // print_r($data);
    echo json_encode([
        'stateCode'=>200,
        'state'=>'success',
        'data'=>$data
    ]);
}
// fnn();
// 添加数据的方法    初始化表格------truncate problem
function add()
{
 //echo '我是添加';
 $title = $_POST['title'];
 $pos = $_POST['pos'];
 $idea = $_POST['idea'];
  // 数据库的增加    json_encode---将数据转化为字符串   json_decode---将json字符串转化为关联数组
 $sql = "insert into problem values(null,'$title','$pos','$idea')";
 //echo $sql;
  $res = query($sql);
  if($res==1){
    echo json_encode([
      'stateCode'=>200,
      'state'=>'success',
      'data'=>''
    ]);
  }else{
    echo json_encode([
      'stateCode'=>201,
      'state'=>'error',
      'data'=>''
    ]);
  }
}
// 删除数据的方法
function del(){
  $id = $_GET['id'];
  $sql = "delete from problem where id=$id";
  $res = query($sql);
  if($res==1){
    echo json_encode([
      'stateCode'=>200,
      'state'=>'success',
      'data'=>''
    ]);
  }else{
    echo json_encode([
      'stateCode'=>201,
      'state'=>'error',
      'data'=>''
    ]);
  }
}
// 修改数据的方法
function update(){
  $id=$_POST['id'];
  $title=$_POST['title'];
  $pos=$_POST['pos'];
  $idea=$_POST['idea'];
  $sql = "update problem set title='$title',pos='$pos',idea='$idea' where id=$id";

  $res = query($sql);
  if($res==1){
    echo json_encode([
      'stateCode'=>200,
      'state'=>'success',
      'data'=>''
    ]);
  }else{
    echo json_encode([
      'stateCode'=>201,
      'state'=>'error',
      'data'=>''
    ]);
  }
}
?>

















