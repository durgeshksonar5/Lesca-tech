/**
 * Centralized Header Loader
 * This script injects the header HTML into the page.
 * It uses the 'data-root' attribute to handle relative paths.
 */
(function () {
  const script = document.currentScript;
  const root = script.getAttribute("data-root") || "./";

  const headerHTML = `
    <!-- Header Start -->
    <header class="main-header">
        <div class="header-sticky">
            <nav class="navbar navbar-expand-lg">
                <div class="container">
                    <!-- Logo Start -->
                    <a class="navbar-brand" href="${root}index.html">
                        <img src="${root}assets/images/updated-logo.png" alt="Lesca Tech Logo" class="logo-white-bg">
                    </a>
                    <!-- Logo End -->

                    <!-- Main Menu Start -->
                    <div class="collapse navbar-collapse main-menu">
                        <div class="nav-menu-wrapper">
                            <ul class="navbar-nav mr-auto" id="menu">
                                <li class="nav-item"><a class="nav-link" href="${root}index.html">Home</a>
                                </li>
                                <li class="nav-item"><a class="nav-link" href="${root}about.html">About Us</a>
                                <li class="nav-item submenu submenu-column-two"><a class="nav-link" href="${root}service.html">Products &
                                        Services</a>
                                    <ul>
                                        <li class="nav-item"><a class="nav-link"
                                                href="${root}service/service-detail-1.html">Storage Tank
                                            </a></li>
                                        <li class="nav-item"><a class="nav-link"
                                                href="${root}service/service-detail-1.html">Mild Steel
                                                Structure</a></li>
                                        <li class="nav-item"><a class="nav-link" href="${root}service/service-detail-1.html">PP
                                                FRP
                                                Scrubber</a></li>
                                        <li class="nav-item"><a class="nav-link"
                                                href="${root}service/service-detail-1.html">FRP Pressure
                                                Vessel</a></li>
                                        <li class="nav-item"><a class="nav-link"
                                                href="${root}service/service-detail-1.html">Dust
                                                Collector</a></li>
                                        <li class="nav-item"><a class="nav-link" href="${root}service/service-detail-1.html">PP
                                                FRP
                                                Tanks</a></li>
                                        <li class="nav-item"><a class="nav-link"
                                                href="${root}service/service-detail-1.html">Centrifugal
                                                Blower</a></li>
                                        <li class="nav-item"><a class="nav-link"
                                                href="${root}service/service-detail-1.html">HVAC Duct</a>
                                        </li>
                                        <li class="nav-item"><a class="nav-link"
                                                href="${root}service/service-detail-1.html">FRP Reactor</a>
                                        </li>
                                        <li class="nav-item"><a class="nav-link" href="${root}service/service-detail-1.html">PP
                                                FRP Pipe</a>
                                        </li>
                                        <li class="nav-item"><a class="nav-link"
                                                href="${root}service/service-detail-1.html">High Pressure
                                                Blower</a></li>
                                        <li class="nav-item"><a class="nav-link"
                                                href="${root}service/service-detail-1.html">FRP Pipes</a>
                                        </li>
                                        <li class="nav-item"><a class="nav-link"
                                                href="${root}service/service-detail-1.html">Solar System
                                                Installation Service</a></li>
                                    </ul>
                                </li>
                                <li class="nav-item"><a class="nav-link" href="${root}contact.html">Contact Us</a></li>
                            </ul>
                        </div>

                        <!-- Header Btn Start -->
                        <div class="header-btn">
                            <a href="${root}contact.html" class="btn-default">Get a Quote</a>
                        </div>
                        <!-- Header Btn End -->
                    </div>
                    <!-- Main Menu End -->
                    <div class="navbar-toggle"></div>
                </div>
            </nav>
            <div class="responsive-menu"></div>
        </div>
    </header>
    <!-- Header End -->
    `;

  // Inject the header exactly where the script is placed
  script.insertAdjacentHTML("afterend", headerHTML);
})();
