import React from "react"
import { Link } from "react-router-dom"

const Footer = () => {

    return (
        <div className="footer bg-light position-absolute">
            <footer class="text-center text-white">
                <div class="container pt-4">
                    <section class="mb-4">

                        <a
                            class="btn btn-link btn-floating btn-lg text-dark m-1"
                            href="#!"
                            role="button"
                            data-mdb-ripple-color="dark"
                        ><i class="fab fa-facebook-f"></i
                        ></a>

                        <a
                            class="btn btn-link btn-floating btn-lg text-dark m-1"
                            href="#!"
                            role="button"
                            data-mdb-ripple-color="dark"
                        ><i class="fab fa-twitter"></i
                        ></a>

                        <a
                            class="btn btn-link btn-floating btn-lg text-dark m-1"
                            href="#!"
                            role="button"
                            data-mdb-ripple-color="dark"
                        ><i class="fab fa-linkedin"></i
                        ></a>
                        <a
                            class="btn btn-link btn-floating btn-lg text-dark m-1"
                            href="#!"
                            role="button"
                            data-mdb-ripple-color="dark"
                        ><i class="fab fa-github"></i
                        ></a>
                    </section>
                </div>

                <div class="text-center text-dark p-3">
                    © 2020 Copyright:
                    <a class="text-dark" href="https://researchhubbe.onrender.com/">ResearchHub.com</a>
                </div>
            </footer>
        </div>
    )
}

export default Footer
