

const mapdata = {
    lat: -25.363, lng: 131.044
}

declare var google: any;
// declare const GMaps: any;

export function initMap() {
    const latLng = mapdata;
    const map = new google.maps.Map(document.getElementById('map'), {
        zoom: 4,
        center: latLng
    });
    const market = new google.maps.Marker({
        position: latLng,
        map: map
    });
}
