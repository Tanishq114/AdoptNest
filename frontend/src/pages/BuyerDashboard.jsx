import React, { useState, useEffect, useContext } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { AuthContext } from '../context/authContext';

const BuyerDashboard = () => {
  const { user } = useContext(AuthContext);
  const [favorites, setFavorites] = useState([]);
  const [purchaseHistory, setPurchaseHistory] = useState([]);
  const [inquiries, setInquiries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('favorites');

  useEffect(() => {
    if (user) {
      fetchDashboardData();
    }
  }, [user]);

  const fetchDashboardData = async () => {
    try {
      // In a real app, these would be separate API calls
      // For now, we'll simulate the data
      setFavorites([]);
      setPurchaseHistory([]);
      setInquiries([]);
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleRemoveFavorite = (petId) => {
    setFavorites(prev => prev.filter(pet => pet.id !== petId));
  };

  const handleAddToFavorites = async (petId) => {
    // In a real app, this would make an API call
    console.log('Adding pet to favorites:', petId);
  };

  if (!user) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Please Login</h2>
          <p className="text-gray-600">You need to be logged in to access your dashboard.</p>
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
          <p className="mt-2 text-gray-600">Loading your dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-8">
      <div className="container mx-auto px-4 max-w-7xl">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-4xl font-bold text-gray-800 mb-4">Buyer Dashboard</h1>
          <p className="text-gray-600 text-lg">Manage your favorites, purchases, and inquiries</p>
        </motion.div>

        {/* Quick Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8"
        >
          <div className="bg-white rounded-xl p-6 shadow-lg">
            <div className="text-2xl font-bold text-red-600">{favorites.length}</div>
            <div className="text-sm text-gray-600">Favorite Pets</div>
          </div>
          <div className="bg-white rounded-xl p-6 shadow-lg">
            <div className="text-2xl font-bold text-green-600">{purchaseHistory.length}</div>
            <div className="text-sm text-gray-600">Purchases</div>
          </div>
          <div className="bg-white rounded-xl p-6 shadow-lg">
            <div className="text-2xl font-bold text-blue-600">{inquiries.length}</div>
            <div className="text-sm text-gray-600">Active Inquiries</div>
          </div>
        </motion.div>

        {/* Actions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-xl p-6 shadow-lg mb-8"
        >
          <div className="flex flex-wrap gap-4">
            <Link
              to="/marketplace"
              className="bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
            >
              Browse Pets
            </Link>
            <Link
              to="/pet-listing"
              className="bg-green-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-green-700 transition-colors"
            >
              List Your Pet
            </Link>
          </div>
        </motion.div>

        {/* Tabs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-xl shadow-lg overflow-hidden"
        >
          <div className="border-b border-gray-200">
            <nav className="flex space-x-8 px-6">
              {[
                { id: 'favorites', name: 'Favorites', count: favorites.length },
                { id: 'purchases', name: 'Purchases', count: purchaseHistory.length },
                { id: 'inquiries', name: 'Inquiries', count: inquiries.length }
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`py-4 px-1 border-b-2 font-medium text-sm ${
                    activeTab === tab.id
                      ? 'border-blue-500 text-blue-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  {tab.name} ({tab.count})
                </button>
              ))}
            </nav>
          </div>

          <div className="p-6">
            {/* Favorites Tab */}
            {activeTab === 'favorites' && (
              <div>
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-2xl font-semibold text-gray-800">Favorite Pets</h2>
                  <Link
                    to="/marketplace"
                    className="text-blue-600 hover:text-blue-800 font-medium"
                  >
                    Browse More Pets
                  </Link>
                </div>

                {favorites.length === 0 ? (
                  <div className="text-center py-12">
                    <div className="text-6xl mb-4">❤️</div>
                    <h3 className="text-xl font-semibold text-gray-800 mb-2">No favorites yet</h3>
                    <p className="text-gray-600 mb-6">Start browsing pets and add them to your favorites!</p>
                    <Link
                      to="/marketplace"
                      className="bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
                    >
                      Browse Pets
                    </Link>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {favorites.map((pet) => (
                      <motion.div
                        key={pet.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="bg-gray-50 rounded-xl p-4 hover:shadow-lg transition-shadow"
                      >
                        <div className="flex items-center space-x-4">
                          <div className="flex-shrink-0">
                            {pet.images && pet.images.length > 0 ? (
                              <img
                                className="h-16 w-16 rounded-lg object-cover"
                                src={pet.images[0]}
                                alt={pet.name}
                              />
                            ) : (
                              <div className="h-16 w-16 rounded-lg bg-gray-200 flex items-center justify-center">
                                <span className="text-gray-400 text-2xl">🐾</span>
                              </div>
                            )}
                          </div>
                          <div className="flex-1 min-w-0">
                            <h3 className="text-lg font-semibold text-gray-900 truncate">{pet.name}</h3>
                            <p className="text-sm text-gray-500 capitalize">{pet.type} • {pet.breed}</p>
                            {pet.isForSale && pet.price && (
                              <p className="text-sm font-medium text-green-600">${pet.price}</p>
                            )}
                          </div>
                          <div className="flex flex-col space-y-2">
                            <Link
                              to={`/pet-details/${pet.id}`}
                              className="text-blue-600 hover:text-blue-800 text-sm font-medium"
                            >
                              View
                            </Link>
                            <button
                              onClick={() => handleRemoveFavorite(pet.id)}
                              className="text-red-600 hover:text-red-800 text-sm font-medium"
                            >
                              Remove
                            </button>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* Purchases Tab */}
            {activeTab === 'purchases' && (
              <div>
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-2xl font-semibold text-gray-800">Purchase History</h2>
                </div>

                {purchaseHistory.length === 0 ? (
                  <div className="text-center py-12">
                    <div className="text-6xl mb-4">🛒</div>
                    <h3 className="text-xl font-semibold text-gray-800 mb-2">No purchases yet</h3>
                    <p className="text-gray-600 mb-6">Your purchase history will appear here once you buy a pet.</p>
                    <Link
                      to="/marketplace"
                      className="bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
                    >
                      Browse Pets
                    </Link>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {purchaseHistory.map((purchase) => (
                      <div key={purchase.id} className="bg-gray-50 rounded-lg p-4">
                        <div className="flex justify-between items-start">
                          <div className="flex items-center space-x-4">
                            <div className="flex-shrink-0">
                              <img
                                className="h-12 w-12 rounded-lg object-cover"
                                src={purchase.pet.images?.[0]}
                                alt={purchase.pet.name}
                              />
                            </div>
                            <div>
                              <h3 className="font-semibold text-gray-900">{purchase.pet.name}</h3>
                              <p className="text-sm text-gray-500">{purchase.pet.type} • {purchase.pet.breed}</p>
                              <p className="text-sm text-gray-500">Purchased on {new Date(purchase.date).toLocaleDateString()}</p>
                            </div>
                          </div>
                          <div className="text-right">
                            <p className="font-semibold text-green-600">${purchase.amount}</p>
                            <p className="text-sm text-gray-500">{purchase.status}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* Inquiries Tab */}
            {activeTab === 'inquiries' && (
              <div>
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-2xl font-semibold text-gray-800">My Inquiries</h2>
                </div>

                {inquiries.length === 0 ? (
                  <div className="text-center py-12">
                    <div className="text-6xl mb-4">💬</div>
                    <h3 className="text-xl font-semibold text-gray-800 mb-2">No inquiries yet</h3>
                    <p className="text-gray-600 mb-6">Your inquiries to pet owners will appear here.</p>
                    <Link
                      to="/marketplace"
                      className="bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
                    >
                      Browse Pets
                    </Link>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {inquiries.map((inquiry) => (
                      <div key={inquiry.id} className="bg-gray-50 rounded-lg p-4">
                        <div className="flex justify-between items-start">
                          <div className="flex items-center space-x-4">
                            <div className="flex-shrink-0">
                              <img
                                className="h-12 w-12 rounded-lg object-cover"
                                src={inquiry.pet.images?.[0]}
                                alt={inquiry.pet.name}
                              />
                            </div>
                            <div>
                              <h3 className="font-semibold text-gray-900">{inquiry.pet.name}</h3>
                              <p className="text-sm text-gray-500">{inquiry.pet.type} • {inquiry.pet.breed}</p>
                              <p className="text-sm text-gray-600 mt-1">{inquiry.message}</p>
                              <p className="text-sm text-gray-500">Sent on {new Date(inquiry.date).toLocaleDateString()}</p>
                            </div>
                          </div>
                          <div className="text-right">
                            <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
                              inquiry.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                              inquiry.status === 'accepted' ? 'bg-green-100 text-green-800' :
                              'bg-red-100 text-red-800'
                            }`}>
                              {inquiry.status}
                            </span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default BuyerDashboard;




