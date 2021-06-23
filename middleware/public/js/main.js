

function getIDtoDelete(accountID) {
    console.log(accountID);
    console.log("Get ID");
    document.getElementById('confirmDelete').value = accountID
}

function getIDtoEditInfo(accountID) {
    let accountName = document.getElementById('accountName' + accountID).innerText
    let accountEmail = document.getElementById('accountEmail' + accountID).innerText
    let accountOldPassword = document.getElementById('accountOldPassword').innerText
    let accountNewPassword = document.getElementById('accountNewPassword').innerText
    let confirmNewPassword = document.getElementById('confirmNewPassword').innerText


    console.log(accountID);
    document.getElementById('accountIDtoEdit').value = accountID
    document.getElementById('accountNameToEdit').value = accountName
    document.getElementById('accountEmailToEdit').value = accountEmail
    if (accountOldPassword != '' && accountNewPassword != '' && confirmNewPassword != '') {
        document.getElementById('accountOldPassword').value = accountOldPassword
        document.getElementById('accountNewPassword').value = accountNewPassword
        document.getElementById('confirmNewPassword').value = confirmNewPassword
    }
    // document.getElementById('accountPasswordToEdit').value = accountPassword



}

function getIDtoEditImg(accountID) {
    document.getElementById('accIDtoEditImge').value = accountID
    console.log(accountID);

}


function getImgeInfoToEdit() {
    let imgePath = $('#accountImgeToEdit').val();
    imgePath = imgePath.slice(12)
    document.getElementById('uploadImgeToEdit').value = "You Choosed: " + imgePath
    console.log(imgePath);
    $('#checkImge').show()


}


function setOldName(){
    let oldName = document.getElementById('profileName').innerText
    // console.log(oldName);
    document.getElementById('accountNameToEdit').value = oldName

}


function setOldEmail(){
    let oldName = document.getElementById('userEmail').innerText
    // console.log(oldName);
    document.getElementById('accountEmailToEdit').value = oldName

}




$("#changePasswordButton").click(function () {
    $("#changePasswordDiv").toggle();
});


$('#uploadImgeToEdit').click(function () {
    $('#accountImgeToEdit').click();

});

$("#secretKey").click(function () {
    $("#keyInfo").toggle();
});


$("#autoLogout").click(function () {
    $("#logoutInfo").toggle();
});





let toggler = document.getElementById("dash");
//=======================================================================

// =================================NavigationBar Toggling=================================
$("#toggle").click(function () {

    let left = $('.side-navbar').css('left');
    if (left == '-240px') {
        $('.side-navbar').animate({ left: "0px" }, 600);
        $('.right-side-navbar').animate({ left: "240px" }, 600);
        toggler.classList.remove('fa-align-justify')
        toggler.classList.add('fa-times')



    }
    else {
        $('.side-navbar').animate({ left: "-240px" }, 600);
        $('.right-side-navbar').animate({ left: "0px" }, 600);
        toggler.classList.add('fa-align-justify')
        toggler.classList.remove('fa-times')
    }


})



