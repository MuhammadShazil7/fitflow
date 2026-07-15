import React, { useState } from 'react';
import { Plus, Camera, X } from 'lucide-react';
import toast from 'react-hot-toast';

const ProgressPhotos = () => {
  const [photos, setPhotos] = useState([]);
  const [showUpload, setShowUpload] = useState(false);

  // Simulate photos (in production, these would be from an API)
  const mockPhotos = [
    { id: 1, date: '2024-01-01', url: 'https://via.placeholder.com/200x200/00ff00/02020a?text=Week+1' },
    { id: 2, date: '2024-01-15', url: 'https://via.placeholder.com/200x200/24cb24/02020a?text=Week+3' },
    { id: 3, date: '2024-02-01', url: 'https://via.placeholder.com/200x200/50d650/02020a?text=Week+5' },
  ];

  const handleUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      // In production, upload to server
      toast.success('Photo uploaded successfully!');
      setShowUpload(false);
    }
  };

  return (
    <div className="bg-[#0a0a1a] rounded-2xl p-4 border border-[#00ff00]/10">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-white font-semibold">Progress Photos 📸</h3>
        <button 
          onClick={() => setShowUpload(true)}
          className="text-sm text-[#00ff00] hover:text-[#24cb24] transition-colors flex items-center gap-1"
        >
          <Plus className="w-4 h-4" />
          Add Photo
        </button>
      </div>

      <div className="grid grid-cols-3 gap-2">
        {photos.length === 0 && mockPhotos.map((photo) => (
          <div key={photo.id} className="relative group">
            <img 
              src={photo.url} 
              alt={`Progress ${photo.date}`}
              className="w-full aspect-square rounded-xl object-cover border border-[#00ff00]/10 hover:border-[#00ff00]/30 transition-all duration-300"
            />
            <div className="absolute bottom-2 left-2 bg-black/70 px-2 py-0.5 rounded text-xs text-white">
              {new Date(photo.date).toLocaleDateString()}
            </div>
          </div>
        ))}
        {photos.map((photo) => (
          <div key={photo.id} className="relative group">
            <img 
              src={photo.url} 
              alt={`Progress ${photo.date}`}
              className="w-full aspect-square rounded-xl object-cover border border-[#00ff00]/10"
            />
            <div className="absolute bottom-2 left-2 bg-black/70 px-2 py-0.5 rounded text-xs text-white">
              {new Date(photo.date).toLocaleDateString()}
            </div>
          </div>
        ))}
      </div>

      {/* Upload Modal */}
      {showUpload && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm">
          <div className="bg-[#0a0a1a] rounded-2xl p-6 border border-[#00ff00]/20 max-w-md w-full">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-bold text-white">Upload Progress Photo</h3>
              <button 
                onClick={() => setShowUpload(false)}
                className="p-1 rounded-lg hover:bg-[#12121e] transition-colors"
              >
                <X className="w-6 h-6 text-gray-400" />
              </button>
            </div>
            <div className="border-2 border-dashed border-[#00ff00]/20 rounded-xl p-8 text-center">
              <Camera className="w-12 h-12 text-gray-500 mx-auto mb-3" />
              <p className="text-gray-400 text-sm mb-2">Drop your photo here or click to browse</p>
              <input
                type="file"
                accept="image/*"
                onChange={handleUpload}
                className="hidden"
                id="photoUpload"
              />
              <label 
                htmlFor="photoUpload"
                className="inline-block bg-[#00ff00] text-[#02020a] px-4 py-2 rounded-xl font-semibold text-sm hover:shadow-[0_0_20px_rgba(0,255,0,0.3)] transition-all duration-300 cursor-pointer"
              >
                Choose Photo
              </label>
            </div>
            <p className="text-xs text-gray-500 text-center mt-3">
              Supported formats: JPG, PNG, GIF (Max 10MB)
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProgressPhotos;