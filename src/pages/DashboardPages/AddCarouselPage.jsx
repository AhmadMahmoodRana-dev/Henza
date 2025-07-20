import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const AddCarouselPage = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const isEditMode = Boolean(id);
  
  const [formData, setFormData] = useState({
    title: '',
    subtitle: '',
    image: null,
    active: 'Y'
  });
  
  const [currentImage, setCurrentImage] = useState('');
  const [previewUrl, setPreviewUrl] = useState('');
  const [message, setMessage] = useState({ text: '', type: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // Fetch carousel item data in edit mode
  useEffect(() => {
    if (!isEditMode) return;
    
    const fetchCarouselItem = async () => {
      setIsLoading(true);
      try {
        const response = await fetch(`https://henza.zaffarsons.com/henza/get-carousel`);
        const data = await response.json();
        
        if (response.ok) {
          const item = data.find(item => item.id === id);
          if (item) {
            setFormData({
              title: item.title,
              subtitle: item.subtitle,
              active: item.Active || 'Y',
              image: null
            });
            setCurrentImage(item.image);
          } else {
            setMessage({ text: 'Carousel item not found', type: 'error' });
          }
        } else {
          setMessage({ text: 'Failed to fetch carousel item', type: 'error' });
        }
      } catch (error) {
        setMessage({ text: 'Network error: ' + error.message, type: 'error' });
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchCarouselItem();
  }, [id, isEditMode]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    
    const img = new Image();
    const objectUrl = URL.createObjectURL(file);
    img.src = objectUrl;

    img.onload = () => {
      if (img.width > 1600 || img.height > 600) {
        setMessage({ text: 'Image size must be 1500x500 pixels or smaller.', type: 'error' });
        setFormData(prev => ({ ...prev, image: null }));
        setPreviewUrl('');
        document.getElementById('image-upload').value = '';
        URL.revokeObjectURL(objectUrl);
      } else {
        setFormData(prev => ({ ...prev, image: file }));
        setPreviewUrl(objectUrl);
        setMessage({ text: '', type: '' });
      }
    };

    img.onerror = () => {
      setMessage({ text: 'Invalid image file.', type: 'error' });
      setFormData(prev => ({ ...prev, image: null }));
      setPreviewUrl('');
      document.getElementById('image-upload').value = '';
    };
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Validation
    if (!formData.title || (!formData.image && !isEditMode)) {
      setMessage({ text: 'Title and image are required', type: 'error' });
      setIsSubmitting(false);
      return;
    }

    const data = new FormData();
    data.append('title', formData.title);
    data.append('subtitle', formData.subtitle);
    data.append('active', formData.active);
    
    if (formData.image) {
      data.append('image', formData.image);
    }

    try {
      let response;
      
      if (isEditMode) {
        // Update existing carousel item
        response = await fetch(`https://henza.zaffarsons.com/henza/update-carousel/${id}`, {
          method: 'PUT',
          body: data
        });
      } else {
        // Create new carousel item
        response = await fetch('https://henza.zaffarsons.com/henza/add-carousel', {
          method: 'POST',
          body: data
        });
      }

      const result = await response.json();

      if (response.ok) {
        setMessage({ 
          text: isEditMode 
            ? 'Carousel updated successfully!' 
            : 'Carousel added successfully!', 
          type: 'success' 
        });
        
        if (!isEditMode) {
          // Reset form after successful creation
          setTimeout(() => {
            setFormData({ title: '', subtitle: '', image: null, active: 'Y' });
            setPreviewUrl('');
            document.getElementById('image-upload').value = '';
          }, 1500);
        }
      } else {
        setMessage({ 
          text: result.message || (isEditMode ? 'Error updating carousel' : 'Error adding carousel'), 
          type: 'error' 
        });
      }
    } catch (error) {
      setMessage({ text: 'Network error: ' + error.message, type: 'error' });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleReset = () => {
    setFormData({ title: '', subtitle: '', image: null, active: 'Y' });
    setPreviewUrl('');
    setCurrentImage('');
    setMessage({ text: '', type: '' });
    if (document.getElementById('image-upload')) {
      document.getElementById('image-upload').value = '';
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading carousel data...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-2xl mx-auto bg-white p-8 rounded-xl shadow-lg">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">
            {isEditMode ? 'Edit Carousel Item' : 'Add New Carousel Item'}
          </h1>
          <p className="text-gray-600 mt-2">
            {isEditMode 
              ? 'Update your carousel slide' 
              : 'Create engaging slides for your homepage carousel'}
          </p>
        </div>
        
        {message.text && (
          <div className={`mb-6 p-4 rounded-lg ${
            message.type === 'success' 
              ? 'bg-green-50 text-green-800 border border-green-200' 
              : 'bg-red-50 text-red-800 border border-red-200'
          }`}>
            <div className="flex items-start">
              <div className={`mr-3 mt-0.5 flex-shrink-0 w-5 h-5 rounded-full ${
                message.type === 'success' ? 'bg-green-500' : 'bg-red-500'
              }`}></div>
              <p>{message.text}</p>
            </div>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-1">
              <label htmlFor="title" className="block text-sm font-medium text-gray-700">
                Title *
              </label>
              <input
                type="text"
                id="title"
                name="title"
                value={formData.title}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition"
                placeholder="Flash Sale"
                required
              />
            </div>
            
            <div className="space-y-1">
              <label htmlFor="subtitle" className="block text-sm font-medium text-gray-700">
                Subtitle
              </label>
              <input
                type="text"
                id="subtitle"
                name="subtitle"
                value={formData.subtitle}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition"
                placeholder="Up to 70% Off"
              />
            </div>
          </div>
          
          <div className="space-y-1">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Status
            </label>
            <div className="flex space-x-6">
              <label className="flex items-center cursor-pointer">
                <input
                  type="radio"
                  name="active"
                  value="Y"
                  checked={formData.active === 'Y'}
                  onChange={handleInputChange}
                  className="h-4 w-4 text-indigo-600 border-gray-300 focus:ring-indigo-500"
                />
                <span className="ml-2 block text-sm font-medium text-gray-700">
                  <span className="flex items-center">
                    <span className={`inline-block w-2 h-2 rounded-full mr-2 ${formData.active === 'Y' ? 'bg-green-500' : 'bg-gray-300'}`}></span>
                    Active
                  </span>
                </span>
              </label>
              
              <label className="flex items-center cursor-pointer">
                <input
                  type="radio"
                  name="active"
                  value="N"
                  checked={formData.active === 'N'}
                  onChange={handleInputChange}
                  className="h-4 w-4 text-indigo-600 border-gray-300 focus:ring-indigo-500"
                />
                <span className="ml-2 block text-sm font-medium text-gray-700">
                  <span className="flex items-center">
                    <span className={`inline-block w-2 h-2 rounded-full mr-2 ${formData.active === 'N' ? 'bg-red-500' : 'bg-gray-300'}`}></span>
                    Inactive
                  </span>
                </span>
              </label>
            </div>
          </div>
          
          <div className="space-y-1">
            <label htmlFor="image-upload" className="block text-sm font-medium text-gray-700">
              Image {!isEditMode && '*'}
            </label>
            
            <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-dashed border-gray-300 rounded-lg">
              <div className="space-y-1 text-center">
                <svg className="mx-auto h-12 w-12 text-gray-400" stroke="currentColor" fill="none" viewBox="0 0 48 48" aria-hidden="true">
                  <path d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                <div className="flex text-sm text-gray-600">
                  <label htmlFor="image-upload" className="relative cursor-pointer bg-white rounded-md font-medium text-indigo-600 hover:text-indigo-500 focus-within:outline-none">
                    <span>Upload a file</span>
                    <input 
                      id="image-upload" 
                      name="image" 
                      type="file" 
                      onChange={handleImageChange}
                      className="sr-only" 
                      accept="image/*"
                      required={!isEditMode}
                    />
                  </label>
                  <p className="pl-1">or drag and drop</p>
                </div>
                <p className="text-xs text-gray-500">
                  PNG, JPG, GIF up to 10MB
                </p>
              </div>
            </div>
            
            {(previewUrl || currentImage) && (
              <div className="mt-4">
                <p className="text-sm text-gray-700 mb-2">Image Preview:</p>
                <div className="border rounded-lg p-2 bg-gray-50">
                  <img 
                    src={previewUrl || currentImage} 
                    alt="Preview" 
                    className="max-w-full h-48 object-contain mx-auto"
                  />
                </div>
                
                {previewUrl && isEditMode && (
                  <button
                    type="button"
                    onClick={() => {
                      setFormData(prev => ({ ...prev, image: null }));
                      setPreviewUrl('');
                      document.getElementById('image-upload').value = '';
                    }}
                    className="mt-2 text-sm text-red-600 hover:text-red-800 flex items-center"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                    Remove new image
                  </button>
                )}
              </div>
            )}
          </div>
          
          <div className="bg-amber-50 p-4 rounded-lg border border-amber-200">
            <div className="flex">
              <div className="flex-shrink-0">
                <svg className="h-5 w-5 text-amber-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                </svg>
              </div>
              <div className="ml-3">
                <h3 className="text-sm font-medium text-amber-700">Image Requirements</h3>
                <div className="mt-2 text-sm text-amber-600">
                  <ul className="list-disc pl-5 space-y-1">
                    <li>Dimensions: 1500 × 500 pixels or smaller</li>
                    <li>Formats: JPG, PNG, GIF</li>
                    <li>Max size: 10MB</li>
                    <li>Recommended: Use high-quality images with text overlay</li>
                    {isEditMode && (
                      <li className="font-semibold">Leave image blank to keep existing image</li>
                    )}
                  </ul>
                </div>
              </div>
            </div>
          </div>
          
          <div className="flex justify-between gap-3 pt-4">
            <div>
              <button
                type="button"
                onClick={() => navigate('/dashboard/Themes')}
                className="px-6 py-3 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 transition"
              >
                Back to List
              </button>
            </div>
            
            <div className="flex gap-3">
              <button
                type="button"
                onClick={handleReset}
                className="px-6 py-3 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 transition"
              >
                Reset Form
              </button>
              <button
                type="submit"
                disabled={isSubmitting}
                className={`px-6 py-3 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition ${
                  isSubmitting 
                    ? 'bg-indigo-400 cursor-not-allowed' 
                    : 'bg-indigo-600 hover:bg-indigo-700'
                }`}
              >
                {isSubmitting ? (
                  <span className="flex items-center">
                    <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    {isEditMode ? 'Updating...' : 'Adding...'}
                  </span>
                ) : (
                  isEditMode ? 'Update Carousel' : 'Add Carousel Item'
                )}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddCarouselPage;