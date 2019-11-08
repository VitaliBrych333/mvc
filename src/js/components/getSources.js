import { API } from './api';
import proxy from './proxyFactoryRequests';

export default async function getSources(language) {
	const response = await proxy.createRequest(`https://newsapi.org/v2/sources?language=${language}&apiKey=${API}`, 'GET').sendRequest();

	if (response.ok === false) {
		import(/* webpackChunkName: "lazyLoaderError" */ './lazyLoaderError').then(module => {
			const Error = module.default;
			let newError = new Error(responseNews.statusText);
			newError.showError();
            newError.hideError();
		});
	} else {
		const myJson = await response.json();
		const sources = myJson.sources;

		if (sources.length > 100) {
			import(/* webpackChunkName: "lazyLoaderError" */ './lazyLoaderError').then(module => {
				const Error = module.default;
			    let newError = new Error('Error. You got more than 100 sources');
			    newError.showError();
                newError.hideError();
			});
		} else {
			return sources;
		}
	}
}