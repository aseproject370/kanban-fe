import React from 'react';
import Header from './layout/header';
import Footer from './layout/footer';
import SideNav from './layout/sidenav';
import Banner from './layout/banner';
import { Outlet } from 'react-router-dom';
import styles from './home.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { toggle } from '../store/uiSlice';
import { Link } from 'react-router-dom';

const Home = () => {

    const sideNavToggle = useSelector(state => state.toggle.display);
    const dispatch = useDispatch();
    const isLoggedIn = useSelector(state => state.auth.isLoggedIn);

    return (
        <>
            {!isLoggedIn && <>
                <div class="bg-white p-8 rounded-md shadow-md">
                   
                    <h1 class="text-2xl font-semibold mb-4">Login to the app first</h1>
                    <Link to="/">GO TO LOGIN</Link>
                </div>
            </>}
            {isLoggedIn &&
            <div className={styles.App}>
                <Header></Header>
                <div className={styles.body}>
                    {sideNavToggle && < SideNav></SideNav >}
                    <div>
                        {/* <Banner></Banner> */}
                      
                        <Outlet></Outlet>
                    </div>
                </div>
                </div>
            }
        </>

    );
}

export default Home
