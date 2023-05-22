import React, { useMemo } from "react";
import classNames from "classnames";
import HomeHeroTitleLink from "./HomeHeroTitleLink";
import { Link } from "react-router-dom";
import { Icon } from "components/common";
import { useTranslation } from "react-i18next";
import { buildPathToProduct } from "routes/product";
import SlideInOutOnChange from "components/common/SlideInOutOnChange/SlideInOutOnChange";

const HomeHeroSubNav = ({ className, activeProduct: category, productsCategories }) => {
  const { t: translate } = useTranslation();

  const fixedSubcategories = useMemo(() => {
    const maxNumOfSubcategories = productsCategories.reduce((acc, { subcategories }) => {
      return Array.isArray(subcategories) && subcategories.length > acc
        ? subcategories.length
        : acc;
    }, 0);

    const categorySubcategories = category.subcategories || [];
    // Массив состоящий из пустых объектов, которые нужны для заполнения текущей поднавигации,
    // чтобы ее размер был равен максимально возможному размеру.
    // Нужно для предотвращения резкого появления элементов поднавигации при ее смене
    const fillers = Array.from({
      length: maxNumOfSubcategories - categorySubcategories.length,
    });

    return [...categorySubcategories, ...fillers];
  }, [category, productsCategories]);

  return (
    <nav className={classNames("home-hero-sub-nav nav", className)}>
      <div className="home-hero-sub-nav__inner row">
        <div className="home-hero-sub-nav__header col-12">
          <HomeHeroTitleLink to={buildPathToProduct(category.id)}>
            {translate(category.name)}
          </HomeHeroTitleLink>
        </div>
        <div className="home-hero-sub-nav__body col-10 col-sm-12 col-md-11 col-lg-8 col-xl-10">
          <ul className="home-hero-sub-nav__list nav__list row">
            {fixedSubcategories.map((subcategory, i) => {
              const pathToProduct = subcategory
                ? buildPathToProduct(category.id, subcategory.id, subcategory.products[0].id)
                : i;
              return (
                <li key={i} className="home-hero-sub-nav__item col-6 col-sm-4 col-lg-6">
                  <SlideInOutOnChange trigger={pathToProduct}>
                    {subcategory && (
                      <Link
                        to={pathToProduct}
                        className="home-hero-sub-nav__link home-hero__sub-nav-link nav__link link_with-arrow-icon-and-overflow"
                      >
                        {translate(subcategory.name)}
                        <Icon name="link-arrow-up" className="link__arrow-icon" />
                      </Link>
                    )}
                  </SlideInOutOnChange>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </nav>
  );
};

// export class HomeHeroSubNav extends Component {
//   static propTypes = {
//     className: PropTypes.string,

//     activeProduct: PropTypes.object,
//   };

//   constructor(props) {
//     super(props);

//     this.maxNumberOfSubNavItems = 0;
//   }

//   getSubcategories() {
//     let result = this.props.activeProduct.subcategories || [];

//     const maxNumOfSubcategories = this.props.productsCategories.reduce((acc, { subcategories }) => {
//       return Array.isArray(subcategories) && subcategories.length > acc
//         ? subcategories.length
//         : acc;
//     }, 0);

//     // Массив состоящий из пустых объектов, которые нужны для заполнения текущей поднавигации,
//     // чтобы ее размер был равен максимально возможному размеру.
//     // Нужно для предотвращения резкого появления элементов поднавигации при ее смене
//     const fillers = Array.from({ length: maxNumOfSubcategories - result.length });

//     result = [...result, ...fillers];

//     return result;
//   }

//   render() {
//     const { activeProduct, t } = this.props;
//     const subcategories = this.getSubcategories();

//     return (
//       <nav className={classNames("home-hero-sub-nav nav", this.props.className)}>
//         <div className="home-hero-sub-nav__inner row">
//           <div className="home-hero-sub-nav__header col-12">
//             <HomeHeroTitleLink
//               to={buildPathToProduct(
//                 activeProduct.id,
//                 activeProduct.subcategories[0].id,
//                 activeProduct.subcategories[0].products[0].id
//               )}
//             >
//               {t(activeProduct.name)}
//             </HomeHeroTitleLink>
//           </div>
//           <div className="home-hero-sub-nav__body col-10 col-sm-12 col-md-11 col-lg-8 col-xl-10">
//             <ul className="home-hero-sub-nav__list nav__list row">
//               {subcategories.map((subcategory, i) => {
//                 const pathToProduct = subcategory
//                   ? buildPathToProduct(activeProduct.id, subcategory.id, subcategory.products[0].id)
//                   : i;
//                 return (
//                   <li key={i} className="home-hero-sub-nav__item col-6 col-sm-4 col-lg-6">
//                     <SlideInOutOnChange trigger={pathToProduct}>
//                       {subcategory && (
//                         <Link
//                           to={pathToProduct}
//                           className="home-hero-sub-nav__link home-hero__sub-nav-link nav__link link_with-arrow-icon-and-overflow"
//                         >
//                           {t(subcategory.name)}
//                           <Icon name="link-arrow-up" className="link__arrow-icon" />
//                         </Link>
//                       )}
//                     </SlideInOutOnChange>
//                   </li>
//                 );
//               })}
//             </ul>
//           </div>
//         </div>
//       </nav>
//     );
//   }
// }

export default HomeHeroSubNav;
