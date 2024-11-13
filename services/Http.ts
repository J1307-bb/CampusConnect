import Utils from './Utils';
import Session from './Session';

const Http = {
	apiUrl: 'https://campusconnectapi.azurewebsites.net',
	getUrlPath: (path: string) => {
		const url = path.startsWith('http') ? path : `${Http.apiUrl}${path}`;
		return url;
	},
	prepareHeaders: async (headers: any) => {
		headers = headers || {};
		headers.token = headers.token || await Session.getAccessToken();
		return headers;
	},
	prepareSendData: async (path: string, data: any, options: any) => {
		const { headers, method = 'GET', sendFile } = options;

		let url = Http.getUrlPath(path);
		let headersData = await Http.prepareHeaders(headers) || {};
		let body: any;

		if (method.toUpperCase() !== 'GET') {
			if (sendFile) {
				headersData = await Http.prepareHeaders({
					...headersData,
					"Content-Type": "multipart/form-data",
				});

				body = new FormData();

				Object.keys(data).forEach(key => {
					body.append(key, data[key]);
				});
			} else {
				headersData = await Http.prepareHeaders({
					...headersData,
					"Content-Type": "application/json",
				});
				body = JSON.stringify(data);
			}
		} else if (data && Object.keys(data).length > 0) {
			const character = url.includes('?') ? '&' : '?';
			url += character + Utils.objectToQueryString(data);
		}

		return { headers: headersData, url, body };
	},
	doRequest: async (path: string, data: any, options: any, tryCount: number = 1): Promise<any> => {
		const { json = true, method = 'GET', errors } = options;
		const { headers, url, body } = await Http.prepareSendData(path, data, options);

		try {
			const response = await fetch(url, { method, headers, body });
			if (json) {
				return {
					status: response.status,
					data: await response.json(),
					headers: response.headers,
				};
			}

			return response;
		} catch (error) {
			console.error('Error:', error);
			if (errors && tryCount < errors.maxTry) {
				return Http.doRequest(path, data, options, tryCount + 1);
			}
			throw error;
		}
	},
	get: (path: string, data: any, options?: any) => {
		return Http.doRequest(path, data, { ...options, method: 'GET' });
	},
	post: (path: string, data: any, options?: any) => {
		return Http.doRequest(path, data, { ...options, method: 'POST' });
	},
	put: (path: string, data: any, options?: any) => {
		return Http.doRequest(path, data, { ...options, method: 'PUT' });
	},
	delete: (path: string, data: any, options?: any) => {
		return Http.doRequest(path, data, { ...options, method: 'DELETE' });
	},
};
export default Http;
