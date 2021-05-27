<?php
    include('connection.php');

    if(isset($_POST['name']) && isset($_POST['telphone']))
    {
        $name =    $_POST['name'];
        $telphone = $_POST['telphone'];

        $query = "INSERT INTO agenda (name , telphone) VALUES ('$name','$telphone')";
        if(!mysqli_query($connection , $query))
            die('Error al intentar almacenar el contacto');

    }
?>