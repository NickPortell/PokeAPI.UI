const serverPort: string = '5000';
const baseUrl: string = 'http://' + window.location.hostname + ':' + serverPort + '/api';

export async function BaseClient(httpMethod: string, apiUrl: string, input: BodyInit | null = null, headers: [string, string][] | null = null): Promise<Response> {
    const requestHeaders = new Headers();
    requestHeaders.set('Access-Control-Allow-Origin', '*')
    if (headers && headers.length > 1) {
        Array.from(headers.entries()).map(([, [key, value]]) => {
            requestHeaders.set(key, value);
        });
    }
    
    const request: RequestInfo = new Request(
        baseUrl + apiUrl,
        {
            method: httpMethod,
            headers: requestHeaders,
            body: input
        }
    )
    return await fetch(request)
}