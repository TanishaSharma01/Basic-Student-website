// Function to add product table
function productUpdate()
{   
    var namecheck=/^[A-Za-zÀ-ÿ\s]+$/;
    var emailcheck=/(^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$)/;
    var urlcheck=/(ftp|http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?/;
    var skillcheck=skillChoices();
    
    // checks if the fields are not blank
    if ($("#name").val() != '' && $("#email").val() != '' && $("#website").val() != '' && $("#imageLink").val() != '' 
    && namecheck.test($("#name").val()) && emailcheck.test($("#email").val()) && 
    urlcheck.test($("#website").val()) && urlcheck.test($("#imageLink").val()) && skillcheck!=0) {
            productAdd();
            formClear();
            $("#name").focus();
    }
    else if(skillcheck==0){
        document.getElementById("errorMsg").innerHTML = "Please select atleast one skill.";
    }
    else {
        document.getElementById("errorMsg").innerHTML = "Please Fill all the fields of the form properly";
    }
}

// Variable is declared to distinguish between odd and even row elemnts
let count = 0;
function productAdd()
{
    var genderOutput = genderChoice();
    var skillOutput  = skillChoices();
    var url = $("#website").val();
    var urlNoProtocol = url.replace(/^https?\:\/\//i, "");

    if ($("#productTable tbody").length == 0) {
        $("#productTable").append("<tbody></tbody>");
    }
    // Odd row elements have different styling than even row
    if (count % 2 == 0) {
        $("#productTable tbody").append("<tr>" + "<td id='newData' class='animated fadeIn' style='height:100px'>" + "<b>" + $("#name").val() + "</b>" + "<br>" +
            genderOutput + "<br>" + $("#email").val() + "<br>" + '<u style="color:blue">' + '<a href="' + $("#website").val() +  '" target="_blank">' 
            + urlNoProtocol + '</a>' + "</u>" + "<br>" + skillOutput + "</td>" + "<td id='newData' class='animated fadeIn'>" + '<a href="' 
            + $("#imageLink").val() + '" target="_blank">' + '<img src="' + $("#imageLink").val() + 
            '" alt="Photo" title="Click to open in new tab" style="width:125px;height:100px"></a>' + "</td>" + "</tr>");

    }
    // Even Row elements 
    else {
        $("#productTable tbody").append("<tr>" + "<td id='newData' class='animated fadeIn' >" + "<b>" + $("#name").val() + "</b>" + "<br>" +
            genderOutput + "<br>" + '<u style="color:blue">' + '<a href="' + $("#website").val() +  '" target="_blank">' + 
            urlNoProtocol + '</a>' + "</u>" + "<br>" + $("#email").val() +"<br>" + skillOutput + "</td>" + "<td id='newData' class='animated fadeIn'>" 
            + '<a href="' + $("#imageLink").val() + '" target="_blank">' + '<img src="' + $("#imageLink").val() + 
            '" alt="Photo" title="Click to open in new tab" style="width:125px;height:100px"></a>' + "</td>" + "</tr>");
    }
    count += 1;
}

// Gives the checked radio key for gender
function genderChoice()
{
    const choices = document.querySelectorAll('input[name="genderchoice"]');
    let selectedValue;
    for (const choice of choices) {
        if (choice.checked) {
            selectedValue = choice.value;
            break;
        }
    }
    return selectedValue;
}

// Gives the skill choices made by user
function skillChoices()
{
    const choices = document.querySelectorAll('input[name="skillchoice"]');
    let selectedValue = [];
    for (const choice of choices) {
        if (choice.checked) {
            selectedValue.push(choice.value);
        }
    }
    if(selectedValue.length<0){
        return 0;
    }
    return selectedValue.toString();
}

// Clears the form fields
function formClear()
{
    $("#name").val("");
    $("#email").val("") ;
    $("#website").val("") ;
    $("#imageLink").val("");
    document.getElementById("male").checked = true; //male selected by default
    document.getElementById("java").checked = false; 
    document.getElementById("html").checked = false;
    document.getElementById("css").checked = false;
    document.getElementById("errorMsg").innerHTML = "<br>";
}