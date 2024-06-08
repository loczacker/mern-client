import React, { useState } from 'react';
import useAuth from '../../hooks/useAuth';
import { useLoaderData, useNavigate } from 'react-router-dom';
import useAxiosFetch from '../../hooks/useAxiosFetch';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { storage } from '../../config/firebase.init';

const UpdateUsers = () => {
    const { user } = useAuth();
    const userCredentials = useLoaderData();
    const axiosFetch = useAxiosFetch();
    const axiosSecure = useAxiosSecure();
    const navigate = useNavigate();

    const [selectedImage, setSelectedImage] = useState(userCredentials?.photoURL || '');
    const [imageFile, setImageFile] = useState(null);

    const handleFormSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        const updatedData = Object.fromEntries(formData.entries());

        // Nếu người dùng chọn ảnh mới, upload ảnh lên Firebase Storage và cập nhật URL của ảnh
        if (imageFile) {
            const storageRef = ref(storage, `user-images/${imageFile.name}`);
            await uploadBytes(storageRef, imageFile);
            const imageURL = await getDownloadURL(storageRef);
            updatedData.photoURL = imageURL; // Cập nhật URL của ảnh vào dữ liệu người dùng
        }

        axiosSecure.patch(`/update-user/${userCredentials?._id}`, updatedData).then(res => {
            if (res.data.modifiedCount > 0) {
                alert("User updated successfully!");
                navigate('/dashboard/manage-users');
            }
        }).catch(err => console.log(err));
    }

    const handleImageChange = (event) => {
        const file = event.target.files[0];
        setImageFile(file); // Lưu trữ file ảnh đã chọn
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
