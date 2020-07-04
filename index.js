require('dotenv').config()
const transform = require("./transform.js")
const chart = require("./charts.js")
const axios = require('axios');

let hashMap = new Map()
let limit = 50;

function getJobs(offset = 0, data = []) {
    let instance = axios.create({
        baseURL: `https://landing.jobs/api/v1/jobs?limit=${limit}&offset=${offset}`,
        headers: { 'Authorization': `Token token=${process.env.TOKEN}` }
    })
    return instance.get()
        .then(response => {
            if (response.data.length > 0) {
                data.push(...response.data)
                return getJobs(offset + 50, data)
            } else {
                return data
            }
        })
        .catch(error => {
            console.log(error);
        })
}

function getTechs(jobs) {
    let tags = []
    jobs.map((job) => {
        job.tags.map((tag) => {
            if (hashMap.has(tag)) {
                let value = hashMap.get(tag)
                hashMap.set(tag, ++value)
            } else {
                hashMap.set(tag, 1)
            }
            tags.push(tag)
        })
    })

    const mapSorted = new Map([...hashMap.entries()].sort((a, b) => b[1] - a[1]));
    const visualData = transform.percentages(mapSorted)
    console.table(mapSorted);
    console.log(`Numero total de anuncios: ${jobs.length}`)
    chart.generateChart(visualData);

}


getJobs().then(jobs => getTechs(jobs))


