var map = L.map('map', { zoomControl: false })

const ipAddressOutput = document.getElementById('ip-address-output')
const locationOutput = document.getElementById('location-output')
const timeZoneOutput = document.getElementById('timezone-output')
const ispOutput = document.getElementById('isp-output')

function handleSubmit(e) {
    e.preventDefault()
    let value = e.target[0].value;
    addressLoader(value)
}

function addressLoader(ipAddress = "") {
    fetch(`https://geo.ipify.org/api/v2/country,city?apiKey=at_CwkJICB9Xy2IRTBfb6hDHTHk0DAhT&ipAddress=${ipAddress}`).then(res => res.json())
        .then(data => infoLoader(data))
}

function infoLoader(data) {

    let lat = data.location.lat
    let lng = data.location.lng
    map.setView([lat, lng], 13);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19,
        attribution: '© OpenStreetMap'
    }).addTo(map);

    var Icon = L.icon({
        iconUrl: 'images/icon-location.svg',

        iconSize: [38, 38], // size of the icon
        iconAnchor: [22, 38], // point of the icon which will correspond to marker's location
        popupAnchor: [-3, -76] // point from which the popup should open relative to the iconAnchor
    });

    L.marker([lat, lng], { icon: Icon }).addTo(map);

    let ip = data.ip
    ipAddressOutput.textContent = ip
    let location = `${data.location.city}, ${data.location.country}`
    locationOutput.textContent = location
    let timezone = data.location.timezone
    timeZoneOutput.textContent = `UTC ${timezone}`
    let isp = data.isp
    ispOutput.textContent = isp
}

addressLoader()

