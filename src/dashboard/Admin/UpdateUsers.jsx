import React, { useState } from 'react';
import useAuth from '../../hooks/useAuth';
import { useLoaderData } from 'react-router-dom';
import useAxiosFetch from '../../hooks/useAxiosFetch';
import useAxiosSecure from '../../hooks/useAxiosSecure';

const UpdateUsers = () => {
    const { user } = useAuth();
    const userCredentials = useLoaderData();
    const axiosFetch = useAxiosFetch();
    const axiosSecure = useAxiosSecure();

    const [selectedImage, setSelectedImage] = useState(userCredentials?.photoURL || '');

    const handleFormSubmit = (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        const updatedData = Object.fromEntries(formData);
        axiosSecure.put(`/update-user/${userCredentials?._id}`, updatedData).then(res => {
            if (res.data.modifiedCount > 0) {
                alert("User updated successfully!");
            }
        }).catch(err => console.log(err));
    }

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

    const handleURLChange = (event) => {
        const url = event.target.value;
        setSelectedImage(url);
    };

    return (
        <div>
            <h1 className='text-center text-4xl font-bold mt-5'>Update: <span className='text-secondary'>{user?.displayName}</span></h1>
            <p className='text-center'>Change details about <span className='text-red-400 font-bold'>{user?.displayName}</span></p>
            <section className=''>
                <div className='mx-auto px-4 py-16 sm:px-6 lg:px-8'>
                    <div className='rounded-lg bg-white p-8 shadow-lg lg:p-12'>
                        <form className='space-y-4' onSubmit={handleFormSubmit}>
                            <div className='grid grid-cols-1 gap-4 sm:grid-cols-2'>
                                <div>
                                    <label className='ml-2 pb-4' htmlFor='name'>Name</label>
                                    <input
                                        className='w-full rounded-lg mt-3 border outline-none border-secondary p-3 text-sm'
                                        placeholder='Your Name'
                                        type='text'
                                        required
                                        defaultValue={userCredentials?.name || ''}
                                        id='name'
                                        name='name'
                                    />
                                </div>
                                <div>
                                    <label className='ml-2' htmlFor='phone'>Phone</label>
                                    <input
                                        className='w-full mt-3 rounded-lg border outline-none border-secondary p-3 text-sm'
                                        placeholder='Phone Number'
                                        required
                                        type='tel'
                                        id='phone'
                                        defaultValue={userCredentials?.phone || ''}
                                        name='phone'
                                    />
                                </div>
                            </div>
                            <div className='grid grid-cols-1 gap-4 sm:grid-cols-2'>
                                <div>
                                    <label className='ml-2' htmlFor='address'>Address</label>
                                    <input
                                        className='w-full mt-2 rounded-lg border outline-none border-secondary p-3 text-sm'
                                        placeholder='Address'
                                        required
                                        defaultValue={userCredentials?.address}
                                        name='address'
                                        type='text'
                                    />
                                </div>
                                <div>
                                    <label className='ml-2' htmlFor='photoURL'>Photo URL</label>
                                    <input
                                        className='w-full mt-2 rounded-lg border outline-none border-secondary p-3 text-sm'
                                        placeholder='Photo URL'
                                        name='photoURL'
                                        type='text'
                                        defaultValue={userCredentials?.photoURL}
                                        onBlur={handleURLChange}
                                    />
                                </div>
                            </div>
                            <div>
                                <label className='ml-2' htmlFor='photoFile'>Upload Photo</label>
                                <input
                                    className='flex'
                                    name='photoFile'
                                    type='file'
                                    accept='image/*'
                                    onChange={handleImageChange}
                                />
                            </div>
                            <div>
                                {selectedImage && (
                                    <img src={selectedImage} alt='Selected' className='h-40 w-auto mt-4' />
                                )}
                            </div>
                            <div>
                                <label className='ml-2' htmlFor='message'>About</label>
                                <textarea
                                    className='w-full resize-none rounded-lg border-secondary border outline-none p-3 text-sm'
                                    placeholder='About user'
                                    rows='4'
                                    defaultValue={userCredentials?.about || ''}
                                    name='about'
                                    id='message'
                                ></textarea>
                            </div>
                            <div className='mt-4'>
                                <button
                                    type='submit'
                                    className='inline-block w-full rounded-lg bg-secondary px-5 py-3 font-medium text-white sm:w-auto'
                                >
                                    Update user
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </section>
        </div>
    );
}

export default UpdateUsers;
