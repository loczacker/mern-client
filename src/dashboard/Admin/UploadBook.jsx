import React, { useState } from 'react'
import { Button, Label, Select, TextInput, Textarea } from "flowbite-react";
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { storage } from '../../config/firebase.init';

const UploadBook = () => {
  const bookCategories = [
    "Fiction",
    "Non-Fiction",
    "Mistery",
    "Programming",
    "Science Fiction",
    "Fantasy",
    "Horror",
    "Bibliography",
    "Autobiography",
    "History",
    "Self-help",
    "Memoir",
    "Businnes",
    "Children Books",
    "Travel",
    "Religion",
    "Art and Design"
  ]

  const [selectedBookCategory, setSelectedBookCategory] = useState(bookCategories[0]);
  const [imageFile, setImageFile] = useState(null);

  const handleChangeSelectedValue = (event) => {
    setSelectedBookCategory(event.target.value);
  }

  // handle file change
  const handleFileChange = (event) => {
    setImageFile(event.target.files[0]);
  }

  // handle book submission
  const handleBookSubmit = async (event) => {
    event.preventDefault();

    const form = event.target;

    if (!imageFile) {
      alert("Please select an image file");
      return;
    }

    try {
      // Upload file to Firebase Storage
      const storageRef = ref(storage, `book-images/${imageFile.name}`);
      await uploadBytes(storageRef, imageFile);
      const imageUrl = await getDownloadURL(storageRef);

      // Prepare form data
      const formData = {
        bookTitle: form.bookTitle.value,
        authorName: form.authorName.value,
        bookDescription: form.bookDescription.value,
        bookPDFURL: form.bookPDFURL.value,
        price: form.price.value,
        category: selectedBookCategory,
        imageURL: imageUrl
      };

      // Send form data to backend
      const response = await fetch("http://localhost:5001/upload-book", {
        method: "POST",
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });

      const data = await response.json();
      alert("Book uploaded successfully!!!");
      form.reset();
      setImageFile(null);
    } catch (error) {
      console.error('Error uploading book:', error);
      toast.error("Error uploading book");
    }
  };

  return (
    <div className='px-4 my-12'>
      <h2 className='mb-8 text-3xl font-bold'>Upload A book</h2>

      <form onSubmit={handleBookSubmit} className="flex lg:w-[1400px] flex-col flex-wrap gap-4">
        {/* First row */}
        <div className='flex gap-8'>
          <div className='lg:w-1/2'>
            <div className="mb-2 block">
              <Label htmlFor="bookTitle" value="Book Title" />
            </div>
            <TextInput id="bookTitle" name='bookTitle' type="text" placeholder="Book name" required />
          </div>

          {/* AuthorName */}
          <div className='lg:w-1/2'>
            <div className="mb-2 block">
              <Label htmlFor="authorName" value="Author Name" />
            </div>
            <TextInput id="authorName" name='authorName' type="text" placeholder="Author Name" required />
          </div>
        </div>

        {/* 2nd Row */}
        <div className='flex gap-8'>
          <div className='lg:w-1/2'>
            <div className="mb-2 block">
              <Label htmlFor="imageFile" value="Book Image" />
            </div>
            <input id="imageFile" name="imageFile" type="file" accept="image/*" onChange={handleFileChange} required />
            {imageFile && <img src={URL.createObjectURL(imageFile)} alt="Book Preview" className='h-[100px] w-[100px] mt-2' />}
          </div>

          {/* Category */}
          <div className='lg:w-1/2'>
            <div className="mb-2 block">
              <Label htmlFor="inputState" value="Book Category" />
            </div>
            <Select id='inputState' name='categoryName' className='w-full rounded' value={selectedBookCategory} onChange={handleChangeSelectedValue}>
              {bookCategories.map((option) => <option key={option} value={option}>{option}</option>)}
            </Select>
          </div>
        </div>

        {/* BookDescription */}
        <div>
          <div className="mb-2 block">
            <Label htmlFor="bookDescription" value="Book Description" />
          </div>
          <Textarea id="bookDescription" name='bookDescription' placeholder="Write your book description..." required rows={6} className='w-full' />
        </div>

        {/* Book pdf link */}
        <div>
          <div className="mb-2 block">
            <Label htmlFor="bookPDFURL" value="Book PDF URL" />
          </div>
          <TextInput id="bookPDFURL" name='bookPDFURL' type="text" placeholder="Book pdf url" required />
        </div>

        {/* Price book */}
        <div>
          <div className="mb-2 block">
            <Label htmlFor="price" value="Price" />
          </div>
          <TextInput id="price" name='price' type="text" placeholder="Price book" required />
        </div>

        <Button type="submit" className='mt-5'>Upload Book</Button>
      </form>
    </div>
  );
}

export default UploadBook;
