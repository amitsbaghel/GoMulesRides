interface Scripts {
    name: string;
    src: string;
}  
export const ScriptStore: Scripts[] = [
    {name: 'googledistance', src: 'https://maps.googleapis.com/maps/api/distancematrix/json?key=YOUR_API_KEY_HERE'},
    {name: 'googlemaps', src: 'https://maps.googleapis.com/maps/api/js?key=YOUR_API_KEY_HERE&libraries=places'}

];
