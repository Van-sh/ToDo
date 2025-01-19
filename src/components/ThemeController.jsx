import { useEffect } from "react";
import { themeChange } from "theme-change";

import "./ThemeController.css";

function ThemeController() {
   useEffect(() => {
      themeChange(false);
   }, []);

   return (
      <div className="flex justify-center">
         <div className="dropdown dropdown-top dropdown-hover themer">
            <div tabIndex={0} role="button" className="btn btn-outline btn-secondary m-1 rounded-full">
               Theme
               <svg
                  width="12px"
                  height="12px"
                  className="inline-block h-2 w-2 fill-current opacity-60 rotate-180"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 2048 2048"
               >
                  <path d="M1799 349l242 241-1017 1017L7 590l242-241 775 775 775-775z"></path>
               </svg>
            </div>
            <ul tabIndex={0} className="dropdown-content bg-base-300 rounded-box z-[1] w-52 p-2 shadow-2xl">
               <li>
                  <input
                     type="radio"
                     name="theme-dropdown"
                     className="theme-controller btn btn-sm btn-block btn-ghost justify-start"
                     aria-label="Default"
                     value="default"
                     data-set-theme=""
                  />
               </li>
               <li>
                  <input
                     type="radio"
                     name="theme-dropdown"
                     className="theme-controller btn btn-sm btn-block btn-ghost justify-start"
                     aria-label="Dark"
                     value="night"
                     data-set-theme="night"
                  />
               </li>
               <li>
                  <input
                     type="radio"
                     name="theme-dropdown"
                     className="theme-controller btn btn-sm btn-block btn-ghost justify-start"
                     aria-label="Light"
                     value="winter"
                     data-set-theme="winter"
                  />
               </li>
            </ul>
         </div>
      </div>
   );
}

export default ThemeController;
