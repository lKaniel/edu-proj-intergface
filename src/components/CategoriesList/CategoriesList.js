import React from 'react';
import classes from "./CategoriesList.module.scss"
import Post from "../Post/Post";
import Category from "../Category/Category";
import CategoryCreator from "../CategoryCreator/CategoryCreator";

const CategoriesList = ({categories, addCategory, removeCategory, selectCategory}) => {

    categories = categories.map((element, index) => {
        return (
            <Category key={element.id} id={element.id} title={element.title} openCategory={()=>{}} removeCategory={removeCategory} selectCategory={selectCategory}/>
        )
    });

    return (
        <div className={classes.CategoriesList}>
            {categories}
            <CategoryCreator addCategory={addCategory}/>
        </div>
    );
};

export default CategoriesList;