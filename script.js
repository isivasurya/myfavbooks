document.addEventListener('DOMContentLoaded', function () {
    let ovl = document.querySelector('.popovlay')
    let pup = document.querySelector('.popup')
    let addbooks = document.querySelector('#addbook')
    let cls = document.querySelector('#clsbtn')

    addbooks.addEventListener('click', function () {
        ovl.style.display = 'block'
        pup.style.display = 'block'
    })

    cls.addEventListener('click', function () {
        ovl.style.display = 'none'
        pup.style.display = 'none'
    })

    let contt = document.querySelector('.cont')
    let bkn = document.querySelector('#bkname')
    let athn = document.querySelector('#authname')
    let desc = document.querySelector('#descp')
    let addbook = document.querySelector('#adddbtn')

   
    loadBooksFromCookies()

    addbook.addEventListener('click', function () {
        let dv = document.createElement('div')
        dv.setAttribute("class", "bookcont")
        dv.innerHTML = `<h2>${bkn.value}</h2>
                        <h5>${athn.value}</h5>
                        <p>${desc.value}</p>
                        <button type="button" onclick="deletbook(event)">Delete</button>`
        contt.append(dv)

        saveBookToCookies(bkn.value, athn.value, desc.value)

        ovl.style.display = 'none'
        pup.style.display = 'none'
    })

    function deletbook(event) {
        event.target.parentElement.remove()
        removeBookFromCookies(event.target.parentElement.querySelector('h2').innerText)
    }

    function saveBookToCookies(bookName, authorName, description) {
        let books = getBooksFromCookies()
        books.push({ bookName, authorName, description })
        document.cookie = `books=${JSON.stringify(books)};path=/`
    }

    function getBooksFromCookies() {
        let cookies = document.cookie.split('; ')
        let booksCookie = cookies.find(cookie => cookie.startsWith('books='))
        return booksCookie ? JSON.parse(booksCookie.split('=')[1]) : []
    }

    function loadBooksFromCookies() {
        let books = getBooksFromCookies()
        books.forEach(book => {
            let dv = document.createElement('div')
            dv.setAttribute("class", "bookcont")
            dv.innerHTML = `<h2>${book.bookName}</h2>
                            <h5>${book.authorName}</h5>
                            <p>${book.description}</p>
                            <button type="button" onclick="deletbook(event)">Delete</button>`
            contt.append(dv)
        })
    }

    function removeBookFromCookies(bookName) {
        let books = getBooksFromCookies()
        books = books.filter(book => book.bookName !== bookName)
        document.cookie = `books=${JSON.stringify(books)};path=/`
    }
})
