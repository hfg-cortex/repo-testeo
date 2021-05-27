<?php
    include('connection.php');
    $query = "SELECT * FROM agenda ";
    $results =  mysqli_query($connection,$query);
    if( !$results ) {
        die("query error");
    } else {
        $json = array();
        while($row = mysqli_fetch_array($results)) {
            $json[] = array(
                'id'        => $row['id'],
                'name'      => $row['name'],
                'telphone'  => $row['telphone']
            );
        }
        echo json_encode($json);  
    }




?>