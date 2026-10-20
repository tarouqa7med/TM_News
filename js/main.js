
$("form").submit(function (e) { 
        e.preventDefault();
        
        let category = $("select#category").val(),
                search = $("input#search").val();
        getData(category, search, 1);
});
