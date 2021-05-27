<?php
    include('connection.php');

    if(isset($_POST['id'])){
        $id = $_POST['id'];
        $query = "SELECT * FROM agenda WHERE id='$id'";
        if(!($result = mysqli_query($connection, $query))) {
            die("Failed Query");
        }

        $json = array();
        while($row = mysqli_fetch_array($result))
        {
            $json[] = array(
                'name' => $row['name'],
                'id' => $row['id'],
                'telphone' => $row['telphone']
            );
        }

        echo json_encode($json[0]);
    }

?>