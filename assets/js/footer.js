/**
 * Centralized Footer Loader
 * This script injects the footer HTML into the page.
 * It uses the 'data-root' attribute to handle relative paths.
 */
(function () {
    const script = document.currentScript;
    const root = script.getAttribute("data-root") || "./";

    const footerHTML = `
    <!-- Main Footer Start -->
    <footer class="main-footer-prime bg-section dark-section">
        <div class="container">
            <div class="row">
                <div class="col-xl-4">
                    <!-- About Footer Start -->
                    <div class="about-footer-prime">
                        <div class="footer-logo-prime">
                            <img src="${root}assets/images/updated-logo.png" alt="Lesca Tech Logo" class="logo-white-bg">
                        </div>
                        <div class="about-footer-content-prime">
                            <p>Lesca Tech Pvt Ltd is a premier industrial engineering firm specializing in
                                high-performance non-metallic fabrication and complex piping solutions for global
                                industries.</p>
                        </div>
                    </div>
                    <!-- About Footer End -->
                </div>

                <div class="col-xl-8">
                    <!-- Footer Links Box Start -->
                    <div class="footer-links-box-prime">
                        <!-- Footer Links Start -->
                        <div class="footer-links-prime">
                            <h2>Quick Links</h2>
                            <ul>
                                <li><a href="${root}index.html">Home</a></li>
                                <li><a href="${root}about.html">About Us</a></li>
                                <li><a href="${root}projects.html">Our Projects</a></li>
                                <li><a href="${root}blog.html">Blog</a></li>
                                <li><a href="${root}career.html">Career</a></li>
                                <li><a href="${root}contact.html">Contact Us</a></li>
                            </ul>
                        </div>
                        <!-- Footer Links End -->

                        <!-- Footer Links Start -->
                        <div class="footer-links-prime">
                            <h2>Our Services</h2>
                            <ul>
                                <li><a href="${root}service/pp-frp-scrubber.html">Industrial Scrubbers</a></li>
                                <li><a href="${root}service/dust-collector.html">Dust Collectors</a></li>
                                <li><a href="${root}service/centrifugal-blower.html">Centrifugal Blowers</a></li>
                                <li><a href="${root}service/storage-tank.html">Storage Tanks</a></li>
                                <li><a href="${root}service.html">View All Services</a></li>
                            </ul>
                        </div>
                        <!-- Footer Links End -->

                        <!-- Footer Links Start -->
                        <div class="footer-links-prime footer-contact-list-prime">
                            <h2>Contact Information</h2>
                            <ul>
                                <li><i class="fa fa-phone"></i><a href="tel:9665790016">+91 96657 90016</a></li>
                                <li><i class="fa fa-envelope"></i><a
                                        href="mailto:info@lescatech.com">info@lescatech.com</a></li>
                                <li><i class="fa fa-envelope"></i><a
                                        href="mailto:project@lescatech.com">project@lescatech.com</a></li>
                                <li><i class="fa fa-location-dot"></i>Plot no-9, Lane
                                    number-2, Markal MIDC, Alandi, Pune-412105</li>
                            </ul>
                        </div>
                        <!-- Footer Links End -->
                    </div>
                    <!-- Footer Links Box End -->
                </div>

                <div class="col-xl-12">
                    <!-- Footer Copyright Box Start -->
                    <div class="footer-copyright-prime">
                        <!-- Footer Copyright Text Start -->
                        <div class="footer-copyright-text-prime">
                            <p>Copyright © 2026 All Rights Reserved.</p>
                            <p> Design & Developed by <a href="https://hindustandigitalservice.com/"
                                    target="_blank"><img src="${root}assets/images/office-logo-footer.png" alt="HDS Logo"></a>
                            </p>
                        </div>
                        <!-- Footer Copyright Text End -->

                        <!-- Footer Social Links Start -->
                        <div class="footer-social-links-prime">
                            <ul>
                                <li><a href="#"><i class="fa-brands fa-pinterest-p"></i></a></li>
                                <li><a href="#"><i class="fa-brands fa-x-twitter"></i></a></li>
                                <li><a href="#"><i class="fa-brands fa-facebook-f"></i></a></li>
                                <li><a href="#"><i class="fa-brands fa-instagram"></i></a></li>
                            </ul>
                        </div>
                        <!-- Footer Social Links End -->
                    </div>
                    <!-- Footer Copyright Box End -->
                </div>
            </div>
        </div>
    </footer>
    <!-- Main Footer End -->
    `;

    // Inject the footer exactly where the script is placed
    script.insertAdjacentHTML("afterend", footerHTML);
})();
