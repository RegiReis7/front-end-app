button = document.getElementById("button");
listButton = document.getElementById("list-button");
postpone = document.getElementById("postpone-button");

button.addEventListener("click", async function (e) {
    e.preventDefault();
    const object = {
        firstName: document.forms["myForm"]["fName"].value,
        lastName: document.forms["myForm"]["lName"].value,
        budget: document.forms["myForm"]["budget"].value
    };

    const response = await fetch("http://localhost:8081/api/collaborators", {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(object)
    });

    document.forms["myForm"].reset();
})

listButton.addEventListener("click", async function (e) {
    e.preventDefault();
    const response = await fetch("http://localhost:8081/api/collaborators");
    const collaborators = await response.json();
    if (collaborators.length > 0) {
        var temp = "";
        var i = 1;
        collaborators.forEach((u) => {
            temp += "<tr>";
            temp += "<td>" + i + "</td>";
            temp += "<td>" + u.idCollaborator + "</td>";
            temp += "<td>" + u.firstName + "</td>";
            temp += "<td>" + u.lastName + "</td>";
            temp += "<td>" + u.budget + "</td></tr>";
            i += 1;
        })

        document.getElementById("table-body").innerHTML = temp;
    }
})

postpone.addEventListener("click", async function (e) {
    e.preventDefault();
    const response = await fetch("http://localhost:8081/api/collaborators/" + document.forms["myForm"]["idCollaborator"].value, {
        method: 'PUT'
    })
})