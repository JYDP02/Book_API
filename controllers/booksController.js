const Book = require("../model/book");

exports.addBook = async (req, res) => {
    const { name, imageUrl, author, pages, price } = req.body;

    if (name && imageUrl && author && pages && price) {
        let book = new Book({
            name: name,
            imageUrl: imageUrl,
            author: author,
            pages: pages,
            price: price
        });
        await book.save()
            .then(() => res.status(200).send(`created successfully`))
            .catch(err => res.status(400).send("Book Can't Be Saved"));
    } else {
        res.status(400).send("Book name and imageUrl are required");
    }
}

exports.getBooks = async (req, res) => {
    const allBooks = await Book.find({})
        .then(books => res.status(200).send(books))
        .catch(err => res.status(400).send("Couldn't Get all Books"));
}

exports.getBook = async (req, res) => {
    if (req.params.name) {
        console.log(req.params.name);
        const book = await Book.findOne({ name: req.params.name })
            .then(book => res.status(200).send(book))
            .catch(err => res.status(400).send("Couldn't FInd Book"));
    }
    else {
        res.status(400).send("Book name is required");
}};

exports.updateBook = async (req, res) => {
    const bookName = req.params.name;
    const { name, imageUrl, author, pages, price } = req.body;
    const newBook = { name, imageUrl, author, pages, price };

    if (bookName) {
        let book = await Book.findOne({ name: bookName });
        if (book) {
            await Book.updateOne(book, newBook)
                .then(book => res.status(200).send(book))
                .catch(err => res.status(500).send("Book update failed"));
        }
    } else {
        res.status(404).send("Please enter details to update");
    }
};

exports.deleteBook = async (req, res) => {
    const bookName = req.params.name;
    const isBook = await Book.findOne({ name: bookName });
    if (isBook) {
        await Book.deleteOne({ name: bookName })
            .then(book => res.status(200).send("Book deleted successfully"))
            .catch(err => res.status(400).send("Couldn't delete book"));
    } else {
        res.status(404).send("Book does not exist");
    }
}