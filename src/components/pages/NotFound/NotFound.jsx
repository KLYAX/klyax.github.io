import React, { useContext, useEffect } from "react";
import { useTranslation } from "react-i18next";

import { Link } from "react-router-dom";
import { Icon, RawHtml } from "components/common";

import homeRoute from "routes/home";
import aboutRoute from "routes/about";
import productsRoute from "routes/products";
import NotFoundControlCabinet from "./NotFoundControlCabinet";

import gsap from "gsap";
import { AppPageTransitionContext } from "App";

const NotFound = () => {
  const { t: translate } = useTranslation();
  const {
    enableScroll,
    disableScroll,
    getHeaderAppearTimeline,
    getOverlayDisappearTween,
  } = useContext(AppPageTransitionContext);

  useEffect(() => {
    const timeline = gsap.timeline();

    timeline.add(getOverlayDisappearTween({ to: { duration: 0 } }));
    timeline.add(enableScroll);
  }, [enableScroll, getOverlayDisappearTween]);

  return (
    <section className="not-found-hero hero">
      <div className="not-found-hero__container container">
        <div className="not-found-hero__inner row">
          <header className="not-found-hero__header col-12 col-lg-4">
            <div className="not-found-hero__header-inner">
              <div className="not-found-hero__header-top row">
                <div className="not-found-hero__title-container col-12">
                  <RawHtml
                    tag="h1"
                    className="not-found-hero__title title title_uppercase title_shrink"
                  >
                    {translate("pages:not-found.title")}
                  </RawHtml>
                </div>
                <div className="not-found-hero__description-container col-12 col-md-4 col-lg-6">
                  <RawHtml tag="p" className="not-found-hero__description">
                    {translate("pages:not-found.description")}
                  </RawHtml>
                </div>
                <div className="not-found-hero__home-link-container col-12 col-md-12">
                  <Link
                    to={homeRoute.path}
                    className="not-found-hero__home-link link link_primary link_accent link_normal link_with-arrow-icon"
                  >
                    Перейти на главную
                    <Icon
                      name="link-arrow-up"
                      className="our-facilities__view-all-icon link__arrow-icon"
                    />
                  </Link>
                </div>
              </div>

              <div className="not-found-hero__header-bottom row">
                <div className="not-found-hero__alternative-container col-6">
                  <RawHtml tag="p" className="not-found-hero__alternative">
                    {translate("pages:not-found.alternative")}
                  </RawHtml>
                </div>

                <div className="not-found-hero__nav-container col-12">
                  <nav className="nav">
                    <ul className="nav__list">
                      {[homeRoute, aboutRoute, productsRoute].map((route, i) => (
                        <li className="nav__item" key={i}>
                          <Link to={route.path} className="nav__link link_with-arrow-icon">
                            {translate(route.nav.label)}
                            <Icon
                              name="link-arrow-up"
                              className="nav__link-icon link__arrow-icon"
                            />
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </nav>
                </div>
              </div>
            </div>
          </header>

          <NotFoundControlCabinet />
        </div>
      </div>
    </section>
  );
};

export default NotFound;
