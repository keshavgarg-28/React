function SearchBar({ searchText, setSearchText }) {
    return (
        <label className="search-box">
            <span aria-hidden="true">&#128269;</span>
            <input
                type="search"
                value={searchText}
                onChange={(event) => setSearchText(event.target.value)}
                placeholder="Search"
            />
        </label>
    );
}

export default SearchBar;
