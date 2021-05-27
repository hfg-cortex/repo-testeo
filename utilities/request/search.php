<?php
    include('connection.php');

    $toSearch = $_POST['search'];
    if(!empty($toSearch) && isset($connection)) 
    {
        $query = "SELECT * FROM agenda WHERE name LIKE '$toSearch%'";

        $qResult = mysqli_query($connection,$query);
        if(!$qResult) {
            die('Error de consulta'. mysqli_error($connection));
        } 
    
        $json = array();
        while($row = mysqli_fetch_array($qResult) )
        {
            $json[] = array(
                'name' => $row['name'],
                'telphone' => $row['telphone'],
                'id' => $row['id']
            );
        }
        echo json_encode($json);
    } 
?>