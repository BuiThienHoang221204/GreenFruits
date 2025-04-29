import React, { useEffect, useState } from 'react';
import { useAppContext } from '../context/AppContext';

function SideBar() {
    const [activeCategory, setActiveCategory] = useState('All');  
    const {products, setFilteredCategory, filteredCategory, navigate} = useAppContext()
    console.log(filteredCategory);
    const sidebarLinks = [
        { text: 'All', path: 'All' },
        { text: 'Organic veggies', path: 'Vegetables' },
        { text: 'Fresh Fruits', path: 'Fruits' },
        { text: 'Cold Drinks', path: 'Drinks' },
        { text: 'Instant Food', path: 'Instant' },
        { text: 'Dairy Products', path: 'Dairy' },
        { text: 'Bakery & Breads', path: 'Bakery' },
        { text: 'Grains & Cereals', path: 'Grains' },
    ];

    useEffect(() => {
        const results = products.filter(item => {
          const matchCategory = activeCategory === 'All' || item.category === activeCategory;
          return matchCategory;
        });
        setFilteredCategory(results);
      }, [activeCategory]);

    return (
        <div className="mt-8 md:w-50 w-16 border-r h-[95vh] text-base border-gray-300 pt-4 md:flex flex-col transition-all duration-300 hidden">
            <h2 className='text-3xl font-medium my-4'>Category</h2>
            {sidebarLinks.map((item) => (
                <div
                    key={item.text}
                    className={`
                        flex items-center py-5 px-4 gap-3 cursor-pointer w-50
                        ${activeCategory === item.path
                            ? "border-r-4 md:border-r-[6px] bg-primary/10 border-primary text-primary"
                            : "hover:bg-gray-100/90 border-white text-gray-700"
                        }
                    `}
                    onClick={() => {
                        setActiveCategory(item.path);
                        scrollTo(0, 0);
                    }}
                >
                    <p className="md:block hidden text-center">{item.text}</p>
                </div>
            ))}
        </div>
    );
}

export default SideBar;
