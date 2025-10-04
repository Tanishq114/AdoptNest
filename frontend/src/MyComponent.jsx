import { useState } from "react";

const MyComponent = () => {
  // Dummy data for adoptable pets
  const celebrityPets = [
    {
      id: 1,
      petName: "Nova",
      petOwner: "Mukesh Ambani",
      petLocation: "Mumbai, India",
      breed: "Scottish Fold",
      image: "https://images.unsplash.com/photo-1518791841217-8f162f1e1131?q=80&w=800&auto=format&fit=crop",
      description: "Calm and affectionate. Vaccinated. Color: Silver. Nature: Gentle. Likes: window-sun, feather-toys. Dislikes: loud sounds.",
    },
    {
      id: 2,
      petName: "Zara",
      petOwner: "Nita Ambani",
      petLocation: "Mumbai, India",
      breed: "Chihuahua",
      image: "https://images.unsplash.com/photo-1518020382113-a7e8fc38eac9?q=80&w=800&auto=format&fit=crop",
      description: "Playful and social. Vaccinated. Color: Fawn. Nature: Chirpy. Likes: chew-toys. Dislikes: long baths.",
    },
    {
      id: 3,
      petName: "Aero",
      petOwner: "Radhakishan Damani",
      petLocation: "Pune, India",
      breed: "Golden Retriever",
      image: "https://images.unsplash.com/photo-1507149833265-60c372daea22?q=80&w=800&auto=format&fit=crop",
      description: "Friendly and loyal. Vaccinated. Color: Golden. Nature: Outdoorsy. Likes: fetch, kids. Dislikes: being alone.",
    },
    {
      id: 4,
      petName: "Luna",
      petOwner: "Shiv Nadar",
      petLocation: "Delhi, India",
      breed: "Poodle",
      image: "https://images.unsplash.com/photo-1548199973-03cce0bbc87b?q=80&w=800&auto=format&fit=crop",
      description: "Smart and hypoallergenic. Vaccinated. Color: White. Nature: Curious. Likes: puzzle-games. Dislikes: vacuum cleaners.",
    },
    {
      id: 5,
      petName: "Kyro",
      petOwner: "Gautam Adani",
      petLocation: "Ahmedabad, India",
      breed: "Bull Terrier",
      image: "https://images.unsplash.com/photo-1543466835-00a7907e9de1?q=80&w=800&auto=format&fit=crop",
      description: "Confident and protective. Vaccinated. Color: Brindle. Nature: Alert. Likes: tug-of-war. Dislikes: strangers at door.",
    },
  ];

  return (
    <div style={{ textAlign: "center", padding: "20px", backgroundColor: "#f5f5f5" }}>
      <h2>Available Pets for Adoption</h2>
      <p>Explore adoptable pets with vaccination, color, nature, likes and dislikes.</p>

      <div style={{ display: "flex", justifyContent: "center", gap: "15px", flexWrap: "wrap" }}>
        {celebrityPets.map((pet) => (
          <div 
            key={pet.id} 
            style={{
              width: "250px",
              padding: "15px",
              backgroundColor: "#fff",
              borderRadius: "10px",
              boxShadow: "0px 4px 10px rgba(0,0,0,0.1)",
              textAlign: "left",
            }}
          >
            <div style={{ width: "100%", height: "180px", borderRadius: "10px", overflow: "hidden", background: "#f2f2f2" }}>
              <img 
                src={pet.image} 
                alt={pet.petName} 
                style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} 
              />
            </div>
            <h3>{pet.petName}</h3>
            <p><strong>Owner:</strong> {pet.petOwner}</p>
            <p><strong>Location:</strong> {pet.petLocation}</p>
            <p><strong>Breed:</strong> {pet.breed}</p>
            <p>{pet.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyComponent;
