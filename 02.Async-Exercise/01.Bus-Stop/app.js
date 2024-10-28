function getInfo() {
    const stopIdEl = document.querySelector('#stopId').value
    const outputEl = document.querySelector('#buses');
    const busEl = document.querySelector('#stopName');

    const url = `http://localhost:3030/jsonstore/bus/businfo/${stopIdEl}`;


    fetch(url)
        .then(res => res.json())
        .then(stops => {
            outputEl.innerHTML = '';

            busEl.textContent = stops.name;

            Object.entries(stops.buses).forEach(([busNum, busTime]) => {

                const li = document.createElement('li');
                li.textContent = `Bus ${busNum} arrives in ${busTime} minutes`

                outputEl.appendChild(li);
            })
            

        })
        .catch(() => {
            busEl.textContent = 'Error'
        });

}