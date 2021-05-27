<?php
    include('connection.php');

    $id = $_POST['id'];
    $name = $_POST['name'];
    $tel = $_POST['telphone'];

    $query = "UPDATE agenda SET name ='$name', telphone = '$tel' WHERE id='$id' ";

    if(! mysqli_query($connection,$query))
    {  
        die("error en la consulta de actualizar tarea");
    }
    echo "update success";

?>