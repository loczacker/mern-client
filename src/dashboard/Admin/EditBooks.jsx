import React, { useState } from 'react';
import { useLoaderData, useParams } from 'react-router-dom';
import { Button, Label, Select, TextInput, Textarea } from "flowbite-react";

const EditBooks = () => {
  const { id } = useParams();
  const { bookTitle, authorName, imageURL, category, bookDescription, bookPDFURL, price } = useLoaderData();

  const bookCategories = [
    "Fiction", "Non-Fiction", "Mistery", "Programming", "Science Fiction", "Fantasy", "Horror",
    "Bibliography", "Autobiography", "History", "Self-help", "Memoir", "Business", "Children Books",
    "Travel", "Religion", "Art and Design"
  ];

  const [selectedBookCategory, setSelectedBookCategory] = useState(bookCategories[0]);
  const [selectedImage, setSelectedImage] = useState(imageURL || null);

  const handleChangeSelectedValue = (event) => {
    setSelectedBookCategory(event.target.value);
  };

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();

    reader.onload = () => {
      setSelectedImage(reader.result);
    };

    if (file) {
      reader.readAsDataURL(file);
    }
  };

  const handleUpdate = (event) => {
    event.preventDefault();
    const form = event.target;

    const bookTitle = form.bookTitle.value;
    const authorName = form.authorName.value;
    const imageURL = selectedImage;
    const category = form.categoryName.value;
    const bookDescription = form.bookDescription.value;
    const bookPDFURL = form.bookPDFURL.value;
    const price = form.price.value;

    const updateBookObj = {
      bookTitle, authorName, imageURL, category, bookDescription, bookPDFURL, price
    };

    fetch(`http://localhost:5001/book/${id}`, {
      method: 'PATCH',
      headers: {
        'Content-type': 'application/json'
      },
      body: JSON.stringify(updateBookObj)
    }).then(res => res.json()).then(data => {
      alert("Book is updated successfully!!!");
    });
  };

  return (
    <div className='px-4 my-12'>
      <h2 className='mb-8 text-3xl font-bold'>Update the book data</h2>

      <form onSubmit={handleUpdate} className="flex lg:w-[1180px] flex-col flex-wrap gap-4">
        {/* first row */}
        <div className='flex gap-8'>
          <div className='lg:w-1/2'>
            <div className="mb-2 block">
              <Label htmlFor="bookTitle" value="Book Title" />
            </div>
            <TextInput id="bookTitle" name='bookTitle' type="text" placeholder="Book name" required
              defaultValue={bookTitle} />
          </div>

          {/* authorName */}
          <div className='lg:w-1/2'>
            <div className="mb-2 block">
              <Label htmlFor="authorName" value="Author Name" />
            </div>
            <TextInput id="authorName" name='authorName' type="text" placeholder="Author Name" required
              defaultValue={authorName} />
          </div>
        </div>

        {/*2nd Row */}
        <div className='flex gap-8'>
          {/* Input chọn file */}
          <div className='lg:w-1/2'>
            <div className="mb-2 block">
              <Label htmlFor="imageFile" value="Upload Book Image" />
            </div>
            <input
              id="imageFile"
              name="imageFile"
              type="file"
              accept="image/*"
              required
              onChange={handleImageChange} 
            />

            {/* Hiển thị ảnh */}
            <div className='mt-2'>
              {selectedImage && (
                <img src={selectedImage} alt="Selected Image" className="h-40 w-auto" />
              )}
            </div>
          </div>

          {/* Category */}
          <div className='lg:w-1/2'>
            <div className="mb-2 block">
              <Label htmlFor="inputState" value="Book Category" />
            </div>

            <Select id='inputState' name='categoryName' className='w-full rounded' value={selectedBookCategory}
              onChange={handleChangeSelectedValue}>
              {
                bookCategories.map((option) => <option key={option} value={option}>{option}</option>)
              }
            </Select>
          </div>
        </div>

        {/* bookDescription */}
        <div>
          <div className="mb-2 block">
            <Label htmlFor="bookDescription" value="Book Description" />
          </div>
          <Textarea id="bookDescription" name='bookDescription' placeholder="Write your book description..." required rows={6}
            defaultValue={bookDescription}
            className='w-full' />
        </div>

        {/* book pdf link */}
        <div>
          <div className="mb-2 block">
            <Label htmlFor="bookPDFURL" value="Book PDF URL" />
          </div>
          <TextInput id="bookPDFURL" name='bookPDFURL' type="text" placeholder="Book pdf url" required
            defaultValue={bookPDFURL} />
        </div>

        {/* price book */}
        <div>
          <div className="mb-2 block">
            <Label htmlFor="price" value="Price" />
          </div>
          <TextInput id="price" name='price' type="text" placeholder="Price book" required
            defaultValue={price} />
        </div>

        <Button type="submit" className='mt-5'>Update Book</Button>
      </form>
    </div>
  );
};

export default EditBooks