function solve() {

    const infoEl = document.querySelector('.info');
    const departBtn = document.querySelector('#depart')
    const arriveBtn = document.querySelector('#arrive')

    let stop = {
        next: 'depot'
    }


    function depart() {

        const url = `http://localhost:3030/jsonstore/bus/schedule/${stop.next}`

        fetch(url)
            .then(resp => resp.json())
            .then(res => {
                console.log(res);

                stop = res
                infoEl.textContent = `Next stop ${stop.name}`

            })
            .catch(err => console.log(err));
        departBtn.disabled = true
        arriveBtn.disabled = false

    }

    function arrive() {

        infoEl.textContent = `Arriving at ${stop.name}`
        departBtn.disabled = false
        arriveBtn.disabled = true

    }

    return {
        depart,
        arrive
    };
}

let result = solve();