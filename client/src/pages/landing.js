import React, { useEffect } from "react"

let scroll = 0;

const Landing = () => {

    window.addEventListener("scroll", () => {
        if (window.location.pathname === "/") {
            scroll = window.pageYOffset
            return scroll;
        }
    })

    useEffect(() => {
        setTimeout(() => {
            window.scrollTo({ top: scroll, behavior: "smooth" })
        }, 100)
    }, [])

    return (
        <div className="landing">
            <header className="header_landing">
                <div className="menu">
                    <div className="logo">
                        <h1>Research Hub</h1>
                    </div>
                    <ul className="navbar-nav">
                        <li><a href="/login"><button>Login</button></a></li>
                        <span>|</span>
                        <li><a href="/register"><button>Register</button></a></li>
                    </ul>
                </div>

            </header>
            <main className="main">

                <div className="features">
                    <div className="feature">
                        <div className="feature_text">
                            <p>A platform for researchers to share their research work and collaborate with other researchers.</p>
                            <small>Join our community of researchers and share your findings with the world.</small>
                            <a href="/register"><button>Get Started</button></a>
                        </div>
                        <div className="feature_img">
                            <img src="https://res.cloudinary.com/diauabgmc/image/upload/v1684126101/img_532474_kcc526.png" alt="" />
                        </div>
                    </div>
                    <div className="f feature0">
                        <div className="feature_img">
                            <img src="https://res.cloudinary.com/diauabgmc/image/upload/v1685577241/123_xhztso.png" alt="" />
                        </div>
                        <div className="feature_text">
                            <h2>Share your research work</h2>
                            <p>Share your research work with other researchers and get feedback from them.</p>
                        </div>
                    </div>
                    <div className="f feature1">
                        <div className="feature_img">
                            <img src="https://res.cloudinary.com/diauabgmc/image/upload/v1685576573/Science_qvlvvx.png" alt="" />
                        </div>
                        <div className="feature_text">
                            <h2>Collaborate with other researchers</h2>
                            <p>Collaborate with other researchers and work together on research projects.</p>
                        </div>
                    </div>
                    <div className="f feature2">
                        <div className="feature_img">
                            <img src="https://res.cloudinary.com/diauabgmc/image/upload/v1640600459/samples/cloudinary-icon.png" alt="" />
                        </div>
                        <div className="feature_text">
                            <h2>Get feedback from other researchers</h2>
                            <p>Get feedback from other researchers on your research work.</p>
                        </div>
                    </div>
                    <div className="f feature3">
                        <div className="feature_img">
                            <img src="https://res.cloudinary.com/diauabgmc/image/upload/v1684124663/Adapted_Wikipedia20symbol_chemistry_kwplnp.svg" alt="" />
                        </div>
                        <div className="feature_text">
                            <h2>Discover research</h2>
                            <p>Discover research work done by other researchers.</p>
                            <form action="/search">
                                <input type="text" placeholder="Search research" />
                                <button type="submit">Search</button>
                            </form>
                        </div>
                    </div>
                </div>
            </main>
            <footer className="text-center text-white">

                <div className="container pt-4">
                    <div className="mb-4">

                        <a
                            className="btn btn-link btn-floating btn-lg text-dark m-1"
                            href="#!"
                            role="button"
                            data-mdb-ripple-color="dark"
                        ><i className="fab fa-facebook-f"></i
                        ></a>

                        <a
                            className="btn btn-link btn-floating btn-lg text-dark m-1"
                            href="#!"
                            role="button"
                            data-mdb-ripple-color="dark"
                        ><i className="fab fa-twitter"></i
                        ></a>

                        <a
                            className="btn btn-link btn-floating btn-lg text-dark m-1"
                            href="#!"
                            role="button"
                            data-mdb-ripple-color="dark"
                        ><i className="fab fa-google"></i
                        ></a>

                        <a
                            className="btn btn-link btn-floating btn-lg text-dark m-1"
                            href="#!"
                            role="button"
                            data-mdb-ripple-color="dark"
                        ><i className="fab fa-linkedin"></i
                        ></a>
                        <a
                            className="btn btn-link btn-floating btn-lg text-dark m-1"
                            href="#!"
                            role="button"
                            data-mdb-ripple-color="dark"
                        ><i className="fab fa-github"></i
                        ></a>
                    </div>
                </div>

                <div className="text-center text-dark p-3">
                    © 2023 Copyright:
                    <a className="text-dark" href="https://researchhubbe.onrender.com/">ResearchHub.com</a>
                </div>
            </footer>
        </div>
    )
}

export default Landing