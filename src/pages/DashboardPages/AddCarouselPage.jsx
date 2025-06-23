import { useState } from 'react';

const AddCarouselPage = () => {
  const [formData, setFormData] = useState({
    title: '',
    subtitle: '',
    image: null
  });
  const [previewUrl, setPreviewUrl] = useState('');
  const [message, setMessage] = useState({ text: '', type: '' });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData(prev => ({ ...prev, image: file }));
      setPreviewUrl(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!formData.title || !formData.subtitle || !formData.image) {
      setMessage({ text: 'All fields are required', type: 'error' });
      return;
    }

    const data = new FormData();
    data.append('title', formData.title);
    data.append('subtitle', formData.subtitle);
    data.append('image', formData.image);

    try {
      const response = await fetch('https://henza.zaffarsons.com/henza/add-carousel', {
        method: 'POST',
        body: data
      });

      const result = await response.json();

      if (response.ok) {
        setMessage({ text: 'Carousel added successfully!', type: 'success' });
        // Reset form
        setFormData({ title: '', subtitle: '', image: null });
        setPreviewUrl('');
        document.getElementById('image-upload').value = '';
      } else {
        setMessage({ text: result.message || 'Error adding carousel', type: 'error' });
      }
    } catch (error) {
      setMessage({ text: 'Network error: ' + error.message, type: 'error' });
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="min-w-md mx-auto bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">Add New Carousel Item</h2>
        
        {message.text && (
          <div className={`mb-4 p-3 rounded ${message.type === 'success' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
            {message.text}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
              Title
            </label>
            <input
              type="text"
              id="title"
              name="title"
              value={formData.title}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              placeholder="Flash Sale"
            />
          </div>

          <div className="mb-4">
            <label htmlFor="subtitle" className="block text-sm font-medium text-gray-700 mb-1">
              Subtitle
            </label>
            <input
              type="text"
              id="subtitle"
              name="subtitle"
              value={formData.subtitle}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              placeholder="Up to 70% Off"
            />
          </div>

          <div className="mb-6">
            <label htmlFor="image-upload" className="block text-sm font-medium text-gray-700 mb-1">
              Image
            </label>
            <input
              id="image-upload"
              name="image"
              type="file"
              onChange={handleImageChange}
              className="w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:text-sm file:font-semibold file:bg-indigo-50 file:text-indigo-700 hover:file:bg-indigo-100"
              accept="image/*"
            />
            
            {previewUrl && (
              <div className="mt-4">
                <p className="text-sm text-gray-500 mb-1">Image Preview:</p>
                <img 
                  src={previewUrl} 
                  alt="Preview" 
                  className="max-w-full h-48 object-contain border rounded"
                />
              </div>
            )}
          </div>

          <button
            type="submit"
            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Add Carousel Item
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddCarouselPage;