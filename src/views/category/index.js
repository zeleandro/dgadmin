import React, { useState, useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';

import CategoryList from 'components/category/CategoryList';
import CategoryItem from 'components/category/CategoryItem';
import Boundary from 'components/ui/Boundary';
import useDocumentTitle from 'hooks/useDocumentTitle';
import useScrollTop from 'hooks/useScrollTop';

const Category = () => {
    useDocumentTitle('DG Limpieza | Categorias');
    useScrollTop();

    const [columnCount, setColumnCount] = useState(6);

    const store = useSelector(state => ({
        filter: state.filter,
        requestStatus: state.app.requestStatus,
        isLoading: state.app.loading,
        categories: state.categories.items,
        lastRefKey: state.categories.lastRefKey,
        categoriesCount: state.categories.items.length,
        totalCategoriesCount: state.categories.total,
    }));

    const onCategoriesLengthChanged = () => {
        const width = window.screen.width - 250; // minus 250px padding
        const pLen = store.categories.length;

        setColumnCount(Math.floor(width / 160));
        if ((columnCount >= pLen) && pLen !== 0) {
            setColumnCount(pLen);
        }
    };

    useEffect(() => {
        onCategoriesLengthChanged();
    }, []);

    return (
        <>
            <div className="col-xl-12 col-lg-12 col-md-12">
                <div className="card mb-lg-0">
                    <div className="card-body">
                        {/* {!store.requestStatus && (
                            <div className="product-list-header">
                                <div className="product-list-header-title">
                                    {(
                                        <h5>
                                            {store.categories.length > 0
                                                && `Se encontraron ${store.categories.length} ${store.categories.length > 1 ? 'categorías' : 'categoría'}`
                                            }
                                        </h5>
                                    )}
                                </div>
                            </div>
                        )} */}
                        <Boundary>
                            <CategoryList {...store}>
                                {() => (
                                    <>
                                        <div className="section-title center-block text-center">
                                            <h1>Categorias</h1>
                                            </div>
                                        <div className="item-all-cat center-block text-center doctor-categories closed ">
                                            
                                                
                                                    <div className="row">
                                                        {store.categories.length === 0 ? new Array(12).fill({}).map((category, index) => (
                                                            <CategoryItem
                                                                key={`product-skeleton ${index}`}
                                                                category={category}
                                                            />
                                                        )) : store.categories.map(category => (
                                                            <CategoryItem
                                                                key={category.id}
                                                                isLoading={store.isLoading}
                                                                category={category}
                                                            />
                                                        ))}
                                                    </div>
                                        </div>
                                    </>
                                )}
                            </CategoryList>
                        </Boundary>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Category;
