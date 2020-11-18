// import x from "./config/abc.ts";
// import x from "./config/abc.ts";
// console.log(x);
const getEntityTypeUrl = "http://localhost:3000/getDistincts/entity_type";
const getEventUrl = "http://localhost:3000/getDistincts/event";
const getAssociatedTypeUrl = "http://localhost:3000/getDistincts/associated_type";
const getDomianUrl = "http://localhost:3000/getDistincts/domain";
function fillDropdown(fieldName, responseData) {
    const dropdown = document.getElementById(fieldName);
    responseData.data.forEach(element => {
        let fieldNewOption = document.createElement("option");
        fieldNewOption.value = element[fieldName];
        fieldNewOption.text = element[fieldName];
        dropdown.appendChild(fieldNewOption);
    });
}
fetch(getEntityTypeUrl)
    .then((response) => response.json())
    .then(function (responseData) {
    fillDropdown("entity_type", responseData);
})
    .catch(function (error) {
    alert(error);
});
fetch(getAssociatedTypeUrl)
    .then((response) => response.json())
    .then(function (responseData) {
    fillDropdown("associated_type", responseData);
})
    .catch(function (error) {
    alert(error);
});
fetch(getDomianUrl)
    .then((response) => response.json())
    .then(function (responseData) {
    fillDropdown("domain", responseData);
})
    .catch(function (error) {
    alert(error);
});
fetch(getEventUrl)
    .then((response) => response.json())
    .then(function (responseData) {
    fillDropdown("event", responseData);
})
    .catch(function (error) {
    alert(error);
});
let pageNumber;
const pageSize = 3;
let AuditDataUrl;
let lastPage = true;
function onSubmit() {
    var x = document.getElementById("dataAndNavigation");
    x.style.display = "block";
    lastPage = false;
    const id = document.getElementById("id").value;
    const entity_id = document.getElementById("entity_id").value;
    const entity_type = document.getElementById("entity_type").value;
    const associated_id = document.getElementById("associated_id").value;
    const associated_type = document.getElementById("associated_type").value;
    const domain = document.getElementById("domain").value;
    const sourceapplication = document.getElementById("sourceapplication").value;
    const event = document.getElementById("event").value;
    const changes = document.getElementById("changes").value;
    const userid = document.getElementById("userid").value;
    const useridtype = document.getElementById("useridtype").value;
    const usertype = document.getElementById("usertype").value;
    const sD = document.getElementById("startDate").value;
    const sT = document.getElementById("startTime").value;
    const eD = document.getElementById("endDate").value;
    const eT = document.getElementById("endTime").value;
    let start = "";
    let end = "";
    if (sD) {
        start = sD + " " + sT;
    }
    if (eD) {
        end = eD + " " + eT;
    }
    console.log("html----", start);
    AuditDataUrl = "http://localhost:3000/search?startDateTime=" + start + "&endDateTime=" + end + "&id=" + id + "&entity_id=" + entity_id + "&entity_type=" + entity_type + "&associated_id=" + associated_id + "&associated_type=" + associated_type + "&domain=" + domain + "&sourceapplication=" + sourceapplication + "&event=" + event + "&changes=" + changes + "&userid=" + userid + "&useridtype=" + useridtype + "&usertype=" + usertype;
    const getAuditDataUrl = AuditDataUrl + "&pageNumber=" + 1 + "&pageSize=" + pageSize;
    getDataAndUpdateHtml(getAuditDataUrl);
}
function onNext() {
    console.log(pageNumber, lastPage);
    if (!lastPage) {
        const getAuditDataUrl = AuditDataUrl + "&pageNumber=" + ++pageNumber + "&pageSize=" + pageSize;
        console.log(getAuditDataUrl);
        getDataAndUpdateHtml(getAuditDataUrl);
    }
}
function onPrevious() {
    console.log(pageNumber, lastPage);
    if (pageNumber > 1) {
        lastPage = false;
        const getAuditDataUrl = AuditDataUrl + "&pageNumber=" + --pageNumber + "&pageSize=" + pageSize;
        console.log(getAuditDataUrl);
        getDataAndUpdateHtml(getAuditDataUrl);
    }
}
function getDataAndUpdateHtml(getAuditDataUrl) {
    fetch(getAuditDataUrl)
        .then((response) => response.json())
        .then(function (auditdata) {
        console.log(auditdata);
        if (auditdata.metadata.status === "error") {
            throw (auditdata.metadata.error);
        }
        if (auditdata.metadata.totalCount < auditdata.metadata.pageSize) {
            lastPage = true;
        }
        if (auditdata.metadata.totalCount !== 0) {
            const pageNumberHtml = document.getElementById("PageNumber");
            pageNumber = auditdata.metadata.pageNumber;
            pageNumberHtml.innerHTML = pageNumber;
            append_row(auditdata.data);
        }
        else {
            emptyTable();
        }
    })
        .catch(function (error) {
        alert(error);
    });
}
function append_row(data) {
    emptyTable();
    var table = document.getElementById("auditData");
    data.forEach(function (object) {
        // console.log(typeof object.changeby);
        var tr = document.createElement("tr");
        tr.innerHTML = "<td>" + object.id + "</td>" +
            "<td>" + object.entity_id + "</td>" +
            "<td>" + object.entity_type + "</td>" +
            "<td>" + object.associated_id + "</td>" +
            "<td>" + object.associated_type + "</td>" +
            "<td>" + object.domain + "</td>" +
            "<td>" + object.sourceapplication + "</td>" +
            "<td>" + object.event + "</td>" +
            "<td>" + JSON.stringify(object.changes) + "</td>" +
            "<td>" + object.userid + "</td>" +
            "<td>" + object.useridtype + "</td>" +
            "<td>" + object.usertype + "</td>" +
            "<td>" + new Date(object.changetimestamp).toUTCString() + "</td>";
        table.appendChild(tr);
    });
}
function emptyTable() {
    let table = document.getElementById("auditData");
    let tableData = document.getElementsByTagName("tr");
    for (let i = tableData.length - 1; i > 0; i--) {
        console.log(tableData[i]);
        table.removeChild(tableData[i]);
    }
}
//# sourceMappingURL=testing.js.map