export default function (context) {
    let apiBasePath = 'https://www.localpanda.com/api/';
    if(context.isDev){
        apiBasePath = 'http://13.59.63.205/api/'
    }

    context.apiBasePath = apiBasePath;
}