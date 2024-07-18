/* 
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/ClientSide/javascript.js to edit this template
 */
var jpdbBaseURL = "http://api.login2explore.com:5577";
var jpdbIRL = "/api/irl";
var jpdbIML = "/api/iml";
var stdDBName = "EMP-DB";
var stdRelationName = "StdData";
var connToken = "90932201|-31949213881284029|90963548";
$("#stdid").focus();

function saveRecNo2LS(jsonObj) {
    var lvData = JSON.parse(jsonObj.data);
    localStorage.setItem("recno", lvData.rec_no);

}
function getstdIdAsJsonObj() {
    var stdid = $("#stdid").val();
    var jsonStr = {
        id: stdid
    };
    return JSON.stringify(jsonStr);
}

function fillData(jsonObj) {
    saveRecNo2LS(jsonObj);
    var data = JSON.parse(jsonObj.data).record;
    $("#stdfullname").val(data.fullname);
    $("#stdclass").val(data.class);
    $("#stddob").val(data.dob);
    $("#stdaddress").val(data.address);
    $("#stdenrollmentdate").val(data.address);
}
function resetForm() {
    $("#stdRollNo").val("");
    $("#stdfullname").val("");
    $("#stdclass").val("");
    $("#stddob").val();
    ("#stdaddress").val("");
    $("#stdenrollmentdate").val("");
    $("#stdRollNo").prop("disabled", false);
    $("#save").prop("disabled", true);
    $("#update").prop("disabled", true);
    $("#reset").prop("disabled", true);
    $("#stdRollNo").focus();
}
function validateData() {
    var stdRollNo, stdfullname, stdclass, stddob, stdaddress, stdenrollmentdate;
    stdRollNo = $("#stdRollNo").val();
    stdfullname = $("#stdfullname").val();
    stdclass = $("#stdclass").val();
    stddob = $("#stddob").val();
    stdaddress = $("#stdaddress").val();
    stdenrollmentdate = $("#stdenrollmentdate").val();
    if (stdRollNo === "") {
        alert("student RollNo missing");
        $("#stdRollNo").focus();
        return "";
    }
    if (stdfullname === "") {
        alert("student fullname missing");
        $("#stdfullname").focus();
        return "";
    }
    if (stdclass === "") {
        alert("student class missing");
        $("#stdclass").focus();
        return "";
    }
    if (stddob === "") {
        alert("student dob missing");
        $("#stddob").focus();
        return "";
    }
    if (stdaddress === "") {
        alert("student address missing");
        $("#stdaddress").focus();
        return "";
    }
    if (stdenrollmentdate === "") {
        alert("student enrollmentdate missing");
        $("#stdenrollmentdate").focus();
        return "";
    }
    var jsonStrobj = {
        rollno: stdRollNo,
        fullname: stdfullname,
        class: stdclass,
        dob: stddob,
        address: stdaddress,
        enrollmentdate: stdenrollmentdate
    };
    return JSON.stringify(jsonStrObj);
}
function getEmp() {
    var stdRollNoJsonObj = getstdRollNoAsJsonObj();
    var getRequest = createGET_BY_KEYRequest(connToken, stdDBName, stdRelationName, stdRollNoJsonObj);
    jQuery.ajaxSetup({async: false});
    var resJsonObj = executeCommandAtGivenBaseUrl(getRequest, jpdbBaseLRL, jpdbIRL);
    jQuery.ajaxSetup({async: true});
    if (resJsonObj.status === 400) {
        $("#save").prop("disabled", false);
        $("#update").prop("disabled", false);
        $("#stdfullname").focus();
    } else if (resJsonObj.status === 200) {
        $("#stdRollNo").prop("disabled", true);
        fillData(resJsonObj);
        $("#update").prop("disabled", false);
        $("#reset").prop("disabled", false);
        $("#stdfullname").focus();
    }
}
function saveData() {
    var jsonStrObj = validateData();
    if (jsonStrObj === "") {
        return "";
    }
    var putRequest = createPUTRequest(connToken, jsonStrObj, stdDBName, stdRelationName);
    jQuery.ajaxSetup({async: false});
    var resJsonObj = executeCommandAtGivenBaseUrl(putRequest, jpdbBaseURL, jpdbIML);
    jQuery.ajaxSetup({async: true});
    resetForm();
    $("#stdRollNo").focus();
}
function updateData() {
    $("#update").prop("disabled", true);
    JsonChg = validateData();
    var updateRequest = createUPDATERecordRequest(connToken, jsonChg, stdDBName, stdRelationName, localStorage.getItem("recno"));
    jQuery.ajaxSetup({async: false});
    var resJsonObj = executeCommandAtGivenBaseUrl(updateRequest, jpdbBaseURL, jpdbIML);
    jQuery.ajaxSetup({async: true});
    console.log(resJsonObj);
    resetForm();
    $("#stdRollNo").focus();
}
