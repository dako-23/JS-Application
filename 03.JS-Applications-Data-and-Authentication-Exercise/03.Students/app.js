async function solve() {

    const url = 'http://localhost:3030/jsonstore/collections/students';
    const tableEl = document.querySelector('#results tbody');
    document.querySelector('#form').addEventListener('submit', createStudents)

    const res = await fetch(url);
    const data = await res.json();

    // console.log(data);


    Object.values(data).forEach(({ facultyNumber, firstName, grade, lastName, _id }) => {

        const tr = document.createElement('tr');
        tr.id = _id;

        const firstNameTr = tr.insertCell(0);
        firstNameTr.textContent = firstName;

        const lastNameTr = tr.insertCell(1);
        lastNameTr.textContent = lastName;

        const facNumTr = tr.insertCell(2);
        facNumTr.textContent = facultyNumber;

        const gradeTr = tr.insertCell(3);
        gradeTr.textContent = Number(grade).toFixed(2);


        tableEl.appendChild(tr)

    })

    async function createStudents(e) {
        e.preventDefault();

        const { facultyNumber, firstName, grade, lastName } = Object.fromEntries(new FormData(e.currentTarget));

        if (facultyNumber == '' || firstName == '' || grade == '' || lastName == '') return;

        const res = await fetch(url, {
            method: 'POST',
            body: JSON.stringify({
                facultyNumber,
                firstName,
                grade,
                lastName

            }),
            headers: {
                'Content-Type': 'application/json'
            }
        })

        e.target.reset();

    }



}
solve();


















// async function previewStudents(e) {

//     e.preventDefault();

//     const res = await fetch(url);
//     const data = await res.json();

//     Object.values(data).forEach(({ facultyNumber, firstName, grade, lastName, _id }) => {

//         const tr = document.createElement('tr');
//         tr.id = _id;

//         const firstNameTr = tr.insertCell(0);
//         firstNameTr.textContent = firstName;

//         const lastNameTr = tr.insertCell(1);
//         lastNameTr.textContent = lastName;

//         const facNumTr = tr.insertCell(2);
//         facNumTr.textContent = facultyNumber;

//         const gradeTr = tr.insertCell(3);
//         gradeTr.textContent = Number(grade).toFixed(2);


//         tableEl.appendChild(tr)

//     })


//     if (facultyNumber == '' || firstName == '' || grade == '' || lastName == '' || _id == '') return
//     const res1 = await fetch(url, {
//         method: 'POST',
//         body: JSON.stringify({
//             facultyNumber: facultyNumber.value,
//             firstName: firstName.value,
//             grade: grade.value,
//             lastName: lastName.value,
//             _id: _id.value
//         }),
//         headers: {
//             'Content-Type': 'application/json'
//         }
//     })

//     const data1 = await res1.json()

//     console.log(data1);

//     facultyNumber.value = ''
//     firstName.value = ''
//     grade.value = ''
//     lastName.value = ''
//     _id.value = ''

// }