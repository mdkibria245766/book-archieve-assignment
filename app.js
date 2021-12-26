document.getElementById('error-massage').style.display = 'none';
document.getElementById('spinner').style.display = 'none';
const searchLoadBook = () => {
	const searchField = document.getElementById('search-field');
	const searchText = searchField.value;
	searchField.value = '';
	if (searchText === '') {
		displayError();
	}
	else {
		document.getElementById('spinner').style.display = 'block';
		document.getElementById('error-massage').style.display = 'none';
		document.getElementById('search-result').textContent = '';
		const url = `https://openlibrary.org/search.json?q=${searchText}`;
		fetch(url)
			.then(res => res.json())
			.then(data => displaySearchBook(data))
	}
	const dislayError = () => {
		document.getElementById('error-massage').style.display = 'block';
		document.getElementById('spinner').style.display = 'none';
		document.getElementById('book-number').textContent = '';
	}
};

const displaySearchBook = docs => {

	const searchResult = document.getElementById('search-result');
	searchResult.textContent = '';
	const bookList = docs.docs;
	if (bookList === null) {
		dislayError();
	}
	else {
		document.getElementById('spinner').style.display = 'none';
		document.getElementById('error-massage').style.display = 'none';

		bookList.forEach(book => {

			const div = document.createElement('div');
			div.classList.add('col');
			div.innerHTML = `
		
		
			<div class="card h-50 text-center">
					<img src="https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg" class="card-img-top" alt="...">
					<div class="card-body">
						<h5 class="card-title">${book.title}</h5>
						<p class="card-text">${book.author_facet}</p>
						<p class="card-text">Author Name:${book.author_name}</p>
						<p>first publish:${book.first_publish_year}</p>
						<p>publisher:${book.publisher}</p>
						<p>language:${book.language}</p>
						<p>${book.contributor}</p>
					</div>
			</div>
			
		
			`;

			searchResult.appendChild(div);

		});

	};

};