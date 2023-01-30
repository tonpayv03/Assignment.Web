export class OrderDetails {



    constructor(
                url = '',
                requestJson = null,
                hasLoading = true,
                requestMethod = 'POST',
                showError = true) {        
        this.requestUrl = url;
        this.requestJson = requestJson;
        this.hasLoading = hasLoading;
        this.requestMethod = requestMethod;
        this.showError = showError;
    }        
}

export const OrderPostType = {
    POST: 'POST',
    GET: 'GET',
    POSTFROMDATA: 'POSTFROMDATA'
}