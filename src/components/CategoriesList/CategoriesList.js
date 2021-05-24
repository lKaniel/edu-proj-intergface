import React from 'react';
import classes from "./CategoriesList.module.scss"
import Post from "../Post/Post";
import Category from "../Category/Category";

const CategoriesList = ({categories}) => {

    categories = categories.map((element, index) => {
        return (
            <Category key={element.id} id={element.id} title={element.title} openCategory={()=>{}}/>
        )
    });

    return (
        <div className={classes.CategoriesList}>
            {categories}
        </div>
    );
};

export default CategoriesList;