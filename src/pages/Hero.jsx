import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/swiper-bundle.css";
import p1 from "../assets/p1.jpg";
import p2 from "../assets/p2.jpg";

const Hero = () => {
  const [categories, setCategories] = useState([]);
  const [loadingCategories, setLoadingCategories] = useState(true);
  const navigate = useNavigate();

  // Fetch categories from the backend
  const fetchCategories = async () => {
    try {
      const response = await fetch("http://localhost:5000/usercategories");
      if (response.ok) {
        const data = await response.json();
        setCategories(data);
      } else {
        console.error("Failed to fetch categories");
      }
    } catch (error) {
      console.error("Error fetching categories:", error);
    } finally {
      setLoadingCategories(false);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const handleCategoryClick = (categoryId) => {
    navigate(`/search?categoryId=${categoryId}`);
  };

  return (
    <div className="p-2 pb-16">
      <Swiper spaceBetween={50} slidesPerView={1} pagination={{ clickable: true }}>
        <SwiperSlide>
          <img src={p1} className="rounded-2xl" alt="Slide 1" />
        </SwiperSlide>
        <SwiperSlide>
          <img src={p2} className="rounded-2xl" alt="Slide 2" />
        </SwiperSlide>
      </Swiper>

      <div className="mt-1 w-full grid grid-cols-3 gap-2 justify-items-center">
        {loadingCategories ? (
          <p>Loading categories...</p>
        ) : (
          categories.map((category) => (
            <div
              key={category.id}
              onClick={() => handleCategoryClick(category.id)}
              className="h-28 w-28 gap-2 bg-white shadow-lg border rounded-xl flex flex-col justify-center items-center cursor-pointer"
            >
              <img
                src={`http://localhost:5000${category.image}`}
                alt={category.name}
                className="h-14 w-14 object-cover rounded-md mb-2"
              />
              <h3 className="text-md">{category.name}</h3>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Hero;
