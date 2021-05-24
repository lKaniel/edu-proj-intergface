import React, {useCallback, useEffect, useState} from 'react';
import axios from "axios";
import PostsList from "./components/PostsList/PostsList";
import Header from "./components/Header/Header";
import CategoriesList from "./components/CategoriesList/CategoriesList";

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

    const getData = useCallback(async () => {
        if (state.activeCategoryId === null) {
            let request = `http://localhost:4000/getcategories`;
            const categories = (await axios.get(request)).data;
            setState((prev) => {
                return {
                    ...prev,
                    categories
                }
            })
            return
        }
        if (state.activePostId === null) {
            let request = `http://localhost:4000/getcategory?id=1${state.activeCategoryId}`;
            const posts = (await axios.get(request)).data;
            setState((prev) => {
                return {
                    ...prev,
                    posts
                }
            })
            return
        }
        let tabs = []
        let request = `http://localhost:4000/getpost?id=${posts[state.activePostId].id}`;
        tabs = (await axios.get(request)).data;
        setState((prev) => {
            return {
                ...prev,
                tabs
            }
        })


    }, [state.activePostId])

    useEffect(() => {
        getData()
    }, [getData]);

    const swapActive = useCallback((amount) => {
        setState((prev) => {
            if (prev.active + amount >= 0) {
                return {
                    ...prev,
                    active: prev.active + amount
                }
            } else {
                return {
                    ...prev,
                    active: 0
                }
            }
        })
    },[])

    const addPost = useCallback(async (title)=>{
        const response = await axios.post("http://localhost:4000/addpost",{
            title
        });
        getData();
        return response
    },[swapActive])

    const removePost = useCallback(async (id)=>{
        const response = await axios.post("http://localhost:4000/removepost",{
            id
        });
        getData()
        return response
    },[swapActive])

    const addTextTab = useCallback(async (post_id, text)=>{
        const response = await axios.post("http://localhost:4000/addtexttab",{
            post_id,
            text
        });
        getData();
        return response
    },[getData])

    const removeTab = useCallback( async (id) => {
        const response = await axios.post("http://localhost:4000/removetab",{
            id
        });
        getData();
        return response
    },[])


    return (
        <div className="App">
            <Header/>
            <CategoriesList categories={state.categories}/>
            {/*<PostsList*/}
            {/*    posts={state.posts}*/}
            {/*    active={state.activePostId}*/}
            {/*    swapActive={swapActive}*/}
            {/*    addPost={addPost}*/}
            {/*    tabs={state.tabs}*/}
            {/*    removePost={removePost}*/}
            {/*    addTextTab={addTextTab}*/}
            {/*    removeTab={removeTab}*/}
            {/*/>*/}
        </div>
    );
}

export default App;
