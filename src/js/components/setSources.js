import search from './search';
import drawArticles from './drawArticles';
import { setCurrentData } from './showArticles';

function drawFirstArticles() {
	document.querySelector('.articles').innerHTML = '';
    search().then((res) => {
        drawArticles(res, 0, 10);
        setCurrentData(res, 0, 10);
	})
	// .catch((err) => {
	// 	import(/* webpackChunkName: "lazyLoaderError" */ './lazyLoaderError').then(module => {
	// 		let Error = module.default;
	// 		let newError = new Error(err);
	// 		newError.showError();
	// 		newError.hideError();
	// 	});
	// })
}

export default function setSources(sources) {
    document.querySelector('#sources').innerHTML = '';
    sources.forEach((item) => {
        const newOption = document.createElement('option');
        newOption.innerHTML = `${item.id}`;
        document.querySelector('#sources').appendChild(newOption);
    });
    document.querySelector('#sources').disabled = false;
    document.querySelector('#search').disabled = false;
	document.querySelector('#search').addEventListener('click', drawFirstArticles);
}
