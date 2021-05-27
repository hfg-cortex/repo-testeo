$(()=>{

    function getPathList() {
        return "utilities\\request\\list.php";
    }

    function getPathSearch() {
        return "utilities\\request\\search.php";
    }
    
    function getPathToAddContact(){
        return "utilities\\request\\add.php"
    }

    function getPathDelete(){
        return "utilities\\request\\delete.php"
    }

    function getToEdit(){
        return "utilities\\request\\edit.php"
    }

    function getSingleContact() {
        return "utilities\\request\\single.php"
    }


    function setDefaults()
    {
        $('#id_contact').val("");
        $('#name_contact').val("");
        $('#telphone_contact').val("");
    }

    function isnum(x){
        for(let i = 0; i < 10 ; i++){
            if( x == i ) return true;
        }
        return false;
    }

    function isName(input)
    {   
        for(let i = 0; i < input.length; i++) 
        {   let char = input[i];
            if( char === '\'' || char === '%' ||
                char === '$' || char ==='"' || char === ',' ||
                char === '\\' || char === '-' || char === '_' ||
                isnum(char)
            ) return false;
        }
        return true;
    }

    function isTelphone(input){
        return (input.length===10 || input.length === 8);
    }    
    /*      LISTAR CONTENIDO     */
    function listAll() 
    {
        $.ajax({
            url: getPathList(),
            type: 'GET',
            success: (r) => {
                const contactList = JSON.parse(r);
                let template = '';
                contactList.forEach(contact => {
                    template += `
                        <tr contactId="${contact.id}"> 
                            <td>${contact.id}</td>
                            <td><a href="#" class="contact_item">${contact.name}</a></td>
                            <td>${contact.telphone}</td>
                            <td>
                                <button class="contact_delete btn btn-danger">
                                    Borrar
                                </button>
                            </td>
                        </tr>`
                });
                $('#list_contact').html(template);
            }
        });
    }  
    /*          BUSCAR           */
    let searchPath = getPathSearch();
    $('#search_results').hide();
    $('#search_contact').keyup( () => {
        if($('#search_contact').val()) {
            let searchValue = $('#search_contact').val();
            if(isName(searchValue)){
                $.ajax( {
                    url : searchPath,
                    type: 'POST',
                    data: {search : searchValue },
                    success : (r) => {
                        let resultSet = JSON.parse(r);
                        let template = '';
                        resultSet.forEach(c => {
                            template += `<li>${c.name} : ${c.telphone} </li>`;
                        });
                        $('#search_content').html(template);
                        $('#search_results').show();                        
                    }
                }); 
            } else {
                console.log("caracteres ilegales en la busqueda");
            }
        }
    });

    $('#save_contact').submit( (e) => {
        let name = $('#name_contact').val() , tel = $('#telphone_contact').val();  
        if(isName(name) && isTelphone(tel)) {

                const data = {
                id: $('#id_contact').val(),
                name : name, 
                telphone : tel
            };
            let path = (data.id === "") ? getPathToAddContact() : getToEdit() ;
            $.post(path, data, (r) => {
                $('#save_contact').trigger('reset');
                listAll();
            });   
        } else {
            let temp = ("Error:\nNombre:" + 
            (!isName(name)? " Invalido. \nEs posible que exitan caracteres ilegales '?¿,._-!\n":"Valido\n") 
            +"Telefóno: "+(!isTelphone(tel)? "Invalido.\nEl telefóno debe tener 8 o 10 caracteres.\n":"Valido\n"));
            console.log(temp);
            alert(temp);
        }
        setDefaults();
        e.preventDefault();
        
    });


    $(document).on('click','.contact_delete', function () {
        let id = $($(this)[0].parentElement.parentElement).attr('contactId');
        $.post(getPathDelete(), {id}, (r) => {
            listAll();
            console.log(r);
        });
    });

    $(document).on('click','.contact_item', function (){
        let element = $(this)[0].parentElement.parentElement;
        let id = $(element).attr('contactId');

        $.post(getSingleContact(), {id} , (r)=>{
            const contact = JSON.parse(r);
            $('#name_contact').val(contact.name);
            $('#telphone_contact').val(contact.telphone);
            $('#id_contact').val(contact.id);
        });
    });
    listAll();
});



