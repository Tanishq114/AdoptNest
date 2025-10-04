import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useParams, Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useContext } from 'react';
import { AuthContext } from '../context/authContext';

const PetDetails = () => {
  const { id } = useParams();
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const [pet, setPet] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [showContactModal, setShowContactModal] = useState(false);
  const [contactMessage, setContactMessage] = useState('');

  useEffect(() => {
    fetchPetDetails();
  }, [id]);

  const fetchPetDetails = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/api/pets/${id}`);
      setPet(response.data);
    } catch (error) {
      setError('Pet not found');
      console.error('Error fetching pet details:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleContactSeller = () => {
    if (!user) {
      navigate('/login');
      return;
    }
    setShowContactModal(true);
  };

  const handleSendMessage = async () => {
    // In a real app, this would send a message to the seller
    alert('Message sent! The seller will contact you soon.');
    setShowContactModal(false);
    setContactMessage('');
  };

  const getPetStatusColor = (status) => {
    switch (status) {
      case 'available': return 'bg-green-100 text-green-800';
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'adopted': return 'bg-gray-100 text-gray-800';
      case 'sold': return 'bg-blue-100 text-blue-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
          <p className="mt-2 text-gray-600">Loading pet details...</p>
        </div>
      </div>
    );
  }

  if (error || !pet) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
        <div className="text-center">
          <div className="text-6xl mb-4">😿</div>
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Pet Not Found</h2>
          <p className="text-gray-600 mb-6">The pet you're looking for doesn't exist or has been removed.</p>
          <Link
            to="/marketplace"
            className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
          >
            Browse Other Pets
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-8">
      <div className="container mx-auto px-4 max-w-6xl">
        {/* Back Button */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="mb-6"
        >
          <Link
            to="/marketplace"
            className="inline-flex items-center text-blue-600 hover:text-blue-800 transition-colors"
          >
            ← Back to Marketplace
          </Link>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Image Gallery */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="space-y-4"
          >
            <div className="relative">
              {pet.images && pet.images.length > 0 ? (
                <img
                  src={pet.images[currentImageIndex]}
                  alt={pet.name}
                  className="w-full h-96 object-cover rounded-xl shadow-lg"
                />
              ) : (
                <div className="w-full h-96 bg-gray-200 rounded-xl shadow-lg flex items-center justify-center">
                  <span className="text-gray-400 text-6xl">🐾</span>
                </div>
              )}

              {pet.featured && (
                <div className="absolute top-4 left-4 bg-yellow-500 text-white px-3 py-1 rounded-full text-sm font-semibold">
                  Featured
                </div>
              )}

              <div className="absolute top-4 right-4">
                <span className={`px-3 py-1 rounded-full text-sm font-semibold ${getPetStatusColor(pet.status)}`}>
                  {pet.status.charAt(0).toUpperCase() + pet.status.slice(1)}
                </span>
              </div>
            </div>

            {/* Thumbnail Gallery */}
            {pet.images && pet.images.length > 1 && (
              <div className="flex gap-2 overflow-x-auto">
                {pet.images.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentImageIndex(index)}
                    className={`flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden ${
                      currentImageIndex === index ? 'ring-2 ring-blue-500' : ''
                    }`}
                  >
                    <img
                      src={image}
                      alt={`${pet.name} ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            )}
          </motion.div>

          {/* Pet Information */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="space-y-6"
          >
            {/* Header */}
            <div>
              <h1 className="text-3xl font-bold text-gray-800 mb-2">{pet.name}</h1>
              <div className="flex items-center gap-4 text-lg text-gray-600">
                <span className="capitalize">{pet.type}</span>
                {pet.breed && (
                  <>
                    <span>•</span>
                    <span className="capitalize">{pet.breed}</span>
                  </>
                )}
                {pet.age && (
                  <>
                    <span>•</span>
                    <span>{pet.age} months old</span>
                  </>
                )}
              </div>
            </div>

            {/* Price */}
            {pet.isForSale && pet.price && (
              <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-green-600 font-medium">Price</p>
                    <p className="text-3xl font-bold text-green-800">${pet.price}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-green-600">For Sale</p>
                    <p className="text-xs text-green-500">Contact seller for details</p>
                  </div>
                </div>
              </div>
            )}

            {/* Basic Info */}
            <div className="bg-white rounded-lg p-6 shadow-sm">
              <h3 className="text-xl font-semibold text-gray-800 mb-4">Basic Information</h3>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-gray-600">Size</p>
                  <p className="font-medium capitalize">{pet.size}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Location</p>
                  <p className="font-medium">{pet.location || 'Not specified'}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Color</p>
                  <p className="font-medium">{pet.color || 'Not specified'}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Nature</p>
                  <p className="font-medium">{pet.nature || 'Not specified'}</p>
                </div>
              </div>
            </div>

            {/* Health Information */}
            <div className="bg-white rounded-lg p-6 shadow-sm">
              <h3 className="text-xl font-semibold text-gray-800 mb-4">Health Information</h3>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span>Vaccinated</span>
                  <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
                    pet.vaccinated ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                  }`}>
                    {pet.vaccinated ? 'Yes' : 'No'}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span>Spayed/Neutered</span>
                  <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
                    pet.spayedNeutered ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                  }`}>
                    {pet.spayedNeutered ? 'Yes' : 'No'}
                  </span>
                </div>
                {pet.healthNotes && (
                  <div>
                    <p className="text-sm text-gray-600 mb-1">Health Notes</p>
                    <p className="text-sm">{pet.healthNotes}</p>
                  </div>
                )}
              </div>
            </div>

            {/* Personality */}
            {(pet.likes?.length > 0 || pet.dislikes?.length > 0) && (
              <div className="bg-white rounded-lg p-6 shadow-sm">
                <h3 className="text-xl font-semibold text-gray-800 mb-4">Personality</h3>
                <div className="space-y-4">
                  {pet.likes?.length > 0 && (
                    <div>
                      <p className="text-sm text-gray-600 mb-2">Likes</p>
                      <div className="flex flex-wrap gap-2">
                        {pet.likes.map((like, index) => (
                          <span key={index} className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm">
                            {like}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                  {pet.dislikes?.length > 0 && (
                    <div>
                      <p className="text-sm text-gray-600 mb-2">Dislikes</p>
                      <div className="flex flex-wrap gap-2">
                        {pet.dislikes.map((dislike, index) => (
                          <span key={index} className="bg-red-100 text-red-800 px-3 py-1 rounded-full text-sm">
                            {dislike}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Description */}
            {pet.description && (
              <div className="bg-white rounded-lg p-6 shadow-sm">
                <h3 className="text-xl font-semibold text-gray-800 mb-4">About {pet.name}</h3>
                <p className="text-gray-700 leading-relaxed">{pet.description}</p>
              </div>
            )}

            {/* Contact Information */}
            {pet.contactInfo && (
              <div className="bg-white rounded-lg p-6 shadow-sm">
                <h3 className="text-xl font-semibold text-gray-800 mb-4">Contact Information</h3>
                <p className="text-gray-700">{pet.contactInfo}</p>
              </div>
            )}

            {/* Action Buttons */}
            <div className="flex gap-4">
              {pet.status === 'available' && (
                <>
                  {pet.isForSale ? (
                    <button
                      onClick={handleContactSeller}
                      className="flex-1 bg-green-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-green-700 transition-colors"
                    >
                      Contact Seller
                    </button>
                  ) : (
                    <button
                      onClick={handleContactSeller}
                      className="flex-1 bg-blue-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
                    >
                      Request Adoption
                    </button>
                  )}
                </>
              )}
              <button className="bg-gray-100 text-gray-700 py-3 px-6 rounded-lg font-semibold hover:bg-gray-200 transition-colors">
                Save to Favorites
              </button>
            </div>
          </motion.div>
        </div>

        {/* Contact Modal */}
        {showContactModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-white rounded-xl p-6 max-w-md w-full mx-4"
            >
              <h3 className="text-xl font-semibold text-gray-800 mb-4">
                Contact {pet.isForSale ? 'Seller' : 'Owner'}
              </h3>
              <textarea
                value={contactMessage}
                onChange={(e) => setContactMessage(e.target.value)}
                placeholder={`Hi! I'm interested in ${pet.name}. Please let me know more details...`}
                rows="4"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent mb-4"
              />
              <div className="flex gap-3">
                <button
                  onClick={handleSendMessage}
                  className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Send Message
                </button>
                <button
                  onClick={() => setShowContactModal(false)}
                  className="flex-1 bg-gray-300 text-gray-700 py-2 px-4 rounded-lg hover:bg-gray-400 transition-colors"
                >
                  Cancel
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </div>
    </div>
  );
};

export default PetDetails;




