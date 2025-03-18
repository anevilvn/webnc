import React, { useState } from 'react';
import { Link } from 'react-router-dom';
const ProductCollection = ({categories}) => {
    const [products, setProducts] = useState([]);
    return (
        <div className='w-full'>
            <div className='container mx-auto'>

                <div className='w-full flex justify-between items-center'>
                    <div className='w-full'>
                        <h2 className='text-2xl text-gray-700 font-semibold'>Thời trang EGA
                        </h2>
                    </div>
                </div>

                <div className='w-full flex justify-between items-center mt-4 gap-4'>
                    <div className='w-full'>
                        {categories.map((category, index) => (
                            <div key={index} className='w-full'>
                                <Link to={`/collections/${category.name}`} className='w-full'>
                                    <div className='w-full rounded-full border-x-orange-50'>
                                        <img src={'https://theme.hstatic.net/200000696635/1001257291/14/season_coll_3_img_large.png?v=107'} alt={category.name} className='w-full h-full object-cover' />
                                    </div>
                                    <h3 className='text-lg text-gray-700 font-semibold'>{category.name}</h3>
                                </Link>
                            </div>
                        ))}

                    </div>
                </div>

            </div>
        </div>
    );
};

export default ProductCollection;
