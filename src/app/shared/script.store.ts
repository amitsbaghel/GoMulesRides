interface Scripts {
    name: string;
    src: string;
}  
export const ScriptStore: Scripts[] = [
    {name: 'googledistance', src: 'https://maps.googleapis.com/maps/api/distancematrix/json?key=HERE_YOUR_API'},
    {name: 'googlemaps', src: 'https://maps.googleapis.com/maps/api/js?key=<HERE_YOUR_API>&libraries=places'}

];