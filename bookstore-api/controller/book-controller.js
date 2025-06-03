
const Book = require("../modals/book")

const getAllBooks = async (req,res) => {
    try {
        const books = await Book.find({});
        res.status(200).json({
            message: "Book fetched successfully",
            data: books,
            success: true,
        })
    } catch (error) {
        res.status(400).json({message: error})
    }
}

const getSingleBookByid = async (req,res) => {
    
    const bookId = req.params.bookId;
    console.log("bookid",bookId)
    try {
        // if(!mongoose.Types.ObjectId.isValid(bookId)) res.status(400).json({message: "Invalid Book ID is format",success: false})
        const bookFromDB= await Book.findById(bookId);
        if(!bookFromDB){
            res.status(404).json({message: "Book not found",success: false})
        }
         return res.status(200).json({
            message: "Book fetched successfully",
            data: bookFromDB,
            success: true,
        });

    } catch (error) {
        res.status(400).json({message: error,success: false})
    }
}

const addNewBook = async (req,res) => {
    try{
        const payload = req.body;
        const bookInDB = await Book.create(payload);
        res.status(201).json({
            message: "Book Added successfully",
            data: bookInDB,
            success: true,
        })
    } catch(err){
        console.error(err);
        res.status(500).json({
            message: err?._message,
            error: err.message,
            success: false,
        });
    }

}

const updateBook = async (req,res) => {
    const bookId = req.params.bookId;
    try {
        const updatedBook = await Book.findByIdAndUpdate(bookId,req.body,{new:true});
        if(updatedBook){
            res.status(200).json({
                success: true,
                data: updatedBook,
                message: "Book updated successfully"
            })
        }else{
            res.status(404).json({
                success: false,
                error: updatedBook,
                message: "Book does not exist!"
            })
        }
        
    } catch (error) {
        console.error(err);
        res.status(500).json({
            message: err.message,
            error: err.message,
            success: false
        })
    }
}

const deleteBook = async (req,res) => {
    const bookId = req.params.bookId;
    try {
        const deletedBook = await Book.findByIdAndDelete(bookId);
        if(deletedBook){
            res.status(200).json({
                success: true,
                data: deletedBook,
                message: "Book Deleted successfully"
            })
        }else{
            res.status(404).json({
                success: false,
                error: deletedBook,
                message: "Book does not exist!"
            })
        }
        
    } catch (error) {
        console.error(err);
        res.status(500).json({
            message: err.message,
            error: err.message,
            success: false
        })
    }

}

module.exports = {
    getAllBooks,
    getSingleBookByid,
    addNewBook,
    updateBook,
    deleteBook
}