import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import NavBar from '../components/NavBar';
import { createPost, uploadPostImage } from '../apicalls/postCalls';

function CreatePost({ user }) {
  const navigate = useNavigate();
  const fileInputRef = useRef(null);
  const [text, setText] = useState('');
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [uploading, setUploading] = useState(false);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      // Create preview
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleRemoveImage = () => {
    setImageFile(null);
    setImagePreview('');
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!text.trim() && !imageFile) {
      setError('Please add text or an image');
      return;
    }

    setLoading(true);
    try {
      let imageUrl = '';

      // Upload image to Cloudinary if selected
      if (imageFile) {
        setUploading(true);
        imageUrl = await uploadPostImage(imageFile);
        setUploading(false);
      }

      // Create post with Cloudinary URL
      await createPost(text, imageUrl);
      navigate('/home');
    } catch (err) {
      setError(err.message || 'Failed to create post');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    navigate('/home');
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <NavBar name={user.name} />
      <div className="max-w-2xl mx-auto px-4 py-6">
        <div className="bg-gray-50 border-2 border-black p-6 font-mono">
          <h1 className="text-2xl font-bold uppercase border-b-2 border-black pb-4 mb-6">
            Create Post
          </h1>

          <form onSubmit={handleSubmit}>
            {/* Text Area */}
            <div className="mb-6">
              <label className="block text-sm font-bold mb-2">What's on your mind?</label>
              <textarea
                value={text}
                onChange={(e) => setText(e.target.value)}
                placeholder="Share your thoughts..."
                className="w-full p-3 border-2 border-black font-mono text-sm focus:outline-none min-h-32"
              />
            </div>

            {/* Image Upload */}
            <div className="mb-6">
              <label className="block text-sm font-bold mb-2">Add Image (Optional)</label>
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                disabled={loading || uploading}
                className="block w-full text-sm p-2 border-2 border-black"
              />
            </div>

            {/* Image Preview */}
            {imagePreview && (
              <div className="mb-6">
                <p className="text-sm font-bold mb-2">Preview:</p>
                <div className="border-2 border-black p-2">
                  <img
                    src={imagePreview}
                    alt="Preview"
                    className="w-full max-h-96 object-cover"
                  />
                </div>
                <button
                  type="button"
                  onClick={handleRemoveImage}
                  disabled={loading || uploading}
                  className="mt-2 px-3 py-1 border-2 border-black bg-gray-50 hover:bg-gray-200 disabled:bg-gray-300 text-sm font-bold"
                >
                  Remove Image
                </button>
              </div>
            )}

            {/* Error Message */}
            {error && (
              <div className="mb-6 p-3 border-2 border-red-500 bg-red-50">
                <p className="text-sm text-red-700 font-bold">{error}</p>
              </div>
            )}

            {/* Action Buttons */}
            <div className="flex gap-4">
              <button
                type="submit"
                disabled={loading || uploading}
                className="flex-1 px-4 py-3 border-2 border-black bg-gray-50 hover:bg-gray-200 disabled:bg-gray-300 font-bold uppercase text-sm"
              >
                {uploading ? 'Uploading...' : loading ? 'Publishing...' : 'Publish Post'}
              </button>
              <button
                type="button"
                onClick={handleCancel}
                disabled={loading || uploading}
                className="flex-1 px-4 py-3 border-2 border-black bg-gray-50 hover:bg-gray-200 disabled:bg-gray-300 font-bold uppercase text-sm"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default CreatePost;
