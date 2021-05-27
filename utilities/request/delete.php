<?php 
    include('connection.php');
    if(isset($_POST['id'])) {
        $id = $_POST['id'];
        $query = "DELETE FROM agenda WHERE id = '$id' ";
        if(!mysqli_query($connection,$query))
            die('Query error');
        
        echo "Contacto eliminado";
    } 
?>