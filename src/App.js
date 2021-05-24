import React, {useCallback, useEffect, useState} from 'react';
import axios from "axios";
import PostsList from "./components/PostsList/PostsList";
import Header from "./components/Header/Header";
import CategoriesList from "./components/CategoriesList/CategoriesList";
import Post from "./components/Post/Post";

function App() {

    const [state, setState] = useState({
        categories: [],
        posts: [],
        tabs: [],
        activeCategoryId: null,
        activeCategoryTitle: null,
        activePostId: null,
        activePostTitle: null
    })

    const getCategoriesData = useCallback(async () => {
        let request = `http://localhost:4000/getcategories`;
        const categories = (await axios.get(request)).data;
        setState((prev) => {
            return {
                ...prev,
                categories
            }
        })
    }, [])

    const getPostsData = useCallback(async (activeCategoryId) => {
        let request = `http://localhost:4000/getcategory?id=${activeCategoryId}`;
        const posts = (await axios.get(request)).data;

        setState((prev) => {
            return {
                ...prev,
                posts
            }
        })
    }, [])

    const getTabsData = useCallback(async (activeTabId) => {
        let request = `http://localhost:4000/getpost?id=${activeTabId}`;
        const tabs = (await axios.get(request)).data;

        setState((prev) => {
            return {
                ...prev,
                tabs
            }
        })
    }, [])

    useEffect(() => {
        getCategoriesData()
    }, [getCategoriesData]);

    const goBack = useCallback(()=>{
        setState((prev)=>{
            if (prev.activePostId){
                return{
                    ...prev,
                    activePostId: null,
                    activePostTitle: null
                }
            }
            if (prev.activeCategoryId){
                return{
                    ...prev,
                    activeCategoryId: null,
                    activeCategoryTitle: null
                }
            }
        })
    })

    const addCategory = useCallback(async (title) => {
        const response = await axios.post("http://localhost:4000/addcategory", {
            title
        });
        getCategoriesData();
        return response
    }, [])

    const removeCategory = useCallback(async (id) => {
        const response = await axios.post("http://localhost:4000/removecategory", {
            id
        });
        getCategoriesData()
        return response
    }, [])

    const selectCategory = useCallback(async (id, title) => {
        setState((prev) => {
            return {
                ...prev,
                activeCategoryId: id,
                activeCategoryTitle: title
            }
        })
        getPostsData(id);
    }, [])

    const selectPost = useCallback(async (id, title) => {
        setState((prev) => {
            return {
                ...prev,
                activePostId: id,
                activePostTitle: title
            }
        })
        getTabsData(id);
    }, [])

    const addPost = useCallback(async (title) => {
        console.log(state.activeCategoryId)
        const response = await axios.post("http://localhost:4000/addpost", {
            title,
            category_id: state.activeCategoryId
        });
        getPostsData(state.activeCategoryId);
        return response
    }, [state.activeCategoryId])

    const removePost = useCallback(async (id) => {
        const response = await axios.post("http://localhost:4000/removepost", {
            id
        });
        getPostsData(state.activeCategoryId);
        return response
    }, [state.activeCategoryId])

    const addTextTab = useCallback(async (post_id, text) => {
        const response = await axios.post("http://localhost:4000/addtexttab", {
            post_id,
            text
        });
        getTabsData(state.activePostId);
        return response
    }, [state.activePostId])

    const removeTab = useCallback(async (id) => {
        const response = await axios.post("http://localhost:4000/removetab", {
            id
        });
        getTabsData(state.activePostId);
        return response
    }, [state.activePostId])


    return (
        <div className="App">
            <Header goBack={goBack} categoryTitle={state.activeCategoryTitle} postTitle={state.activePostTitle}/>
            {!state.activeCategoryId ?
                <CategoriesList categories={state.categories} addCategory={addCategory} removeCategory={removeCategory}
                                selectCategory={selectCategory}/> : null
            }
            {state.activeCategoryId && !state.activePostId ?
                <PostsList
                    posts={state.posts}
                    selectPost={selectPost}
                    addPost={addPost}
                    removePost={removePost}
                /> : null
            }
            {state.activePostId ?
                <Post
                    id={state.activePostId}
                    title={state.activePostTitle}
                    tabs={state.tabs}
                    addTextTab={addTextTab}
                    removeTab={removeTab}
                />
                : null}


        </div>
    );
}

export default App;
